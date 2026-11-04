/*
 * Amtsklar – deadline engine (Fristenrechner)
 *
 * Pure functions, no DOM. Works in the browser (window.Amtsklar.deadline)
 * and in Node (module.exports) so it can be unit-tested.
 *
 * Legal basis (German administrative law, as of 2025):
 *  - Bekanntgabe-Fiktion: a letter sent by post or electronically counts as
 *    delivered on the 4th day after it was sent (§ 41 Abs. 2 VwVfG,
 *    § 37 Abs. 2 SGB X, § 122 Abs. 2 AO; 3 days before 1 Jan 2025,
 *    changed by the Postrechtsmodernisierungsgesetz).
 *  - Start of the deadline: the day of delivery is not counted (§ 187 Abs. 1 BGB).
 *  - End of a deadline in weeks/months/years: § 188 Abs. 2 and 3 BGB.
 *  - If the last day is a Saturday, Sunday or public holiday, the deadline ends
 *    on the next working day (§ 193 BGB, § 31 Abs. 3 VwVfG, § 26 Abs. 3 SGB X,
 *    § 108 Abs. 3 AO, § 222 Abs. 2 ZPO, § 57 VwGO, § 64 Abs. 3 SGG).
 *
 * Deliberately conservative: the engine does NOT postpone the fictional
 * delivery day when it falls on a weekend/holiday (courts disagree on this),
 * so the recommended deadline is never later than the legally correct one.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.Amtsklar = root.Amtsklar || {};
    root.Amtsklar.deadline = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Date helpers. All dates are plain calendar dates handled in UTC to avoid
  // daylight-saving surprises.
  // ---------------------------------------------------------------------------

  function makeDate(year, month, day) {
    // month: 1-12
    return new Date(Date.UTC(year, month - 1, day));
  }

  function parseISO(str) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(str || "").trim());
    if (!m) return null;
    const d = makeDate(+m[1], +m[2], +m[3]);
    // Reject impossible dates like 2025-02-31
    if (d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) return null;
    return d;
  }

  function toISO(date) {
    return date.toISOString().slice(0, 10);
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * 86400000);
  }

  function daysInMonth(year, monthIndex0) {
    return new Date(Date.UTC(year, monthIndex0 + 1, 0)).getUTCDate();
  }

  /**
   * Add calendar months according to § 188 Abs. 2, 3 BGB:
   * the deadline ends on the day of the target month with the same number;
   * if that day does not exist, on the last day of the target month.
   */
  function addMonths(date, months) {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + months;
    const targetYear = y + Math.floor(m / 12);
    const targetMonth = ((m % 12) + 12) % 12;
    const day = Math.min(date.getUTCDate(), daysInMonth(targetYear, targetMonth));
    return new Date(Date.UTC(targetYear, targetMonth, day));
  }

  function isWeekend(date) {
    const wd = date.getUTCDay();
    return wd === 0 || wd === 6;
  }

  // ---------------------------------------------------------------------------
  // Public holidays (gesetzliche Feiertage) per federal state
  // ---------------------------------------------------------------------------

  const STATES = {
    BW: "Baden-Württemberg",
    BY: "Bayern",
    BE: "Berlin",
    BB: "Brandenburg",
    HB: "Bremen",
    HH: "Hamburg",
    HE: "Hessen",
    MV: "Mecklenburg-Vorpommern",
    NI: "Niedersachsen",
    NW: "Nordrhein-Westfalen",
    RP: "Rheinland-Pfalz",
    SL: "Saarland",
    SN: "Sachsen",
    ST: "Sachsen-Anhalt",
    SH: "Schleswig-Holstein",
    TH: "Thüringen",
  };

  /** Easter Sunday (Gregorian calendar, anonymous Gregorian algorithm). */
  function easterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return makeDate(year, month, day);
  }

  /**
   * Returns a Map of ISO date -> holiday name for the given year and state.
   * Holidays that only apply in parts of a state (Fronleichnam in some
   * communities of Sachsen/Thüringen, Mariä Himmelfahrt in parts of Bayern,
   * Augsburger Friedensfest) are included with "partial: true" so the UI
   * can warn about them; they are treated as holidays (conservative choice
   * would be to NOT treat them as holidays, see isHoliday()).
   */
  function holidays(year, state) {
    const list = [];
    const add = (date, name, opts) => list.push({ date: toISO(date), name, partial: !!(opts && opts.partial) });
    const easter = easterSunday(year);
    const has = (states) => states.includes(state);

    // Nationwide
    add(makeDate(year, 1, 1), "Neujahr");
    add(addDays(easter, -2), "Karfreitag");
    add(addDays(easter, 1), "Ostermontag");
    add(makeDate(year, 5, 1), "Tag der Arbeit");
    add(addDays(easter, 39), "Christi Himmelfahrt");
    add(addDays(easter, 50), "Pfingstmontag");
    add(makeDate(year, 10, 3), "Tag der Deutschen Einheit");
    add(makeDate(year, 12, 25), "1. Weihnachtstag");
    add(makeDate(year, 12, 26), "2. Weihnachtstag");

    // State-specific
    if (has(["BW", "BY", "ST"])) add(makeDate(year, 1, 6), "Heilige Drei Könige");
    if ((state === "BE" && year >= 2019) || (state === "MV" && year >= 2023)) {
      add(makeDate(year, 3, 8), "Internationaler Frauentag");
    }
    if (state === "BE" && (year === 2020 || year === 2025)) {
      add(makeDate(year, 5, 8), "Tag der Befreiung (einmalig)");
    }
    if (state === "BB") {
      add(easter, "Ostersonntag");
      add(addDays(easter, 49), "Pfingstsonntag");
    }
    if (has(["BW", "BY", "HE", "NW", "RP", "SL"])) add(addDays(easter, 60), "Fronleichnam");
    if (has(["SN", "TH"])) add(addDays(easter, 60), "Fronleichnam (nur in einigen Gemeinden)", { partial: true });
    if (state === "SL") add(makeDate(year, 8, 15), "Mariä Himmelfahrt");
    if (state === "BY") {
      add(makeDate(year, 8, 15), "Mariä Himmelfahrt (nur in Gemeinden mit überwiegend katholischer Bevölkerung)", { partial: true });
      add(makeDate(year, 8, 8), "Augsburger Friedensfest (nur Stadt Augsburg)", { partial: true });
    }
    if (state === "TH" && year >= 2019) add(makeDate(year, 9, 20), "Weltkindertag");
    if (has(["BB", "MV", "SN", "ST", "TH"]) || (has(["HB", "HH", "NI", "SH"]) && year >= 2018) || year === 2017) {
      add(makeDate(year, 10, 31), "Reformationstag");
    }
    if (has(["BW", "BY", "NW", "RP", "SL"])) add(makeDate(year, 11, 1), "Allerheiligen");
    if (state === "SN") {
      // Wednesday before 23 November
      let d = makeDate(year, 11, 22);
      while (d.getUTCDay() !== 3) d = addDays(d, -1);
      add(d, "Buß- und Bettag");
    }

    return list.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  }

  /**
   * Is the date a non-working day for deadline purposes?
   * Partial holidays are NOT treated as holidays here (conservative: the
   * deadline is not extended because of a holiday that might not apply).
   */
  function nonWorkingReason(date, state) {
    const wd = date.getUTCDay();
    if (wd === 6) return { type: "saturday", name: "Samstag" };
    if (wd === 0) return { type: "sunday", name: "Sonntag" };
    const iso = toISO(date);
    const h = holidays(date.getUTCFullYear(), state).find((x) => x.date === iso && !x.partial);
    if (h) return { type: "holiday", name: h.name };
    return null;
  }

  function partialHolidayOn(date, state) {
    const iso = toISO(date);
    return holidays(date.getUTCFullYear(), state).find((x) => x.date === iso && x.partial) || null;
  }

  // ---------------------------------------------------------------------------
  // Deadline computation
  // ---------------------------------------------------------------------------

  /** Number of days of the delivery fiction for a letter sent on `sentDate`. */
  function fictionDays(sentDate) {
    return sentDate.getTime() >= makeDate(2025, 1, 1).getTime() ? 4 : 3;
  }

  /**
   * Compute a deadline.
   *
   * @param {object} input
   * @param {string} input.delivery  "post"      – normal letter / e-mail / portal message, `date` = date it was sent
   *                                               (if unknown: the date printed on the letter)
   *                                 "formal"    – formal delivery (Zustellung, e.g. yellow envelope), `date` = date
   *                                               written on the envelope
   *                                 "known"     – the exact day the letter was received/handed over, `date` = that day
   * @param {string} input.date      ISO date (YYYY-MM-DD)
   * @param {string} input.period    "1w" | "2w" | "1m" | "3m" | "1y"
   * @param {string} input.state     two-letter state code (see STATES) of the authority/court
   * @returns {object} result with the deadline and a step-by-step explanation
   */
  function compute(input) {
    const steps = [];
    const warnings = [];
    const start = parseISO(input && input.date);
    if (!start) throw new Error("invalid-date");
    if (!STATES[input.state]) throw new Error("invalid-state");
    const period = input.period;

    // 1. Day of delivery (Bekanntgabe / Zustellung)
    let delivered;
    if (input.delivery === "post") {
      const n = fictionDays(start);
      delivered = addDays(start, n);
      steps.push({ key: "fiction", days: n, from: toISO(start), to: toISO(delivered) });
    } else if (input.delivery === "formal" || input.delivery === "known") {
      delivered = start;
      steps.push({ key: input.delivery === "formal" ? "formal" : "known", to: toISO(delivered) });
    } else {
      throw new Error("invalid-delivery");
    }

    // 2. Raw end of deadline (§ 187 Abs. 1, § 188 BGB)
    let rawEnd;
    if (period === "1w") rawEnd = addDays(delivered, 7);
    else if (period === "2w") rawEnd = addDays(delivered, 14);
    else if (period === "1m") rawEnd = addMonths(delivered, 1);
    else if (period === "3m") rawEnd = addMonths(delivered, 3);
    else if (period === "1y") rawEnd = addMonths(delivered, 12);
    else throw new Error("invalid-period");
    steps.push({ key: "period", period, from: toISO(delivered), to: toISO(rawEnd) });
    if ((period === "1m" || period === "3m" || period === "1y") && rawEnd.getUTCDate() !== delivered.getUTCDate()) {
      steps.push({ key: "monthEnd", to: toISO(rawEnd) });
    }

    // 3. Shift to next working day (§ 193 BGB etc.)
    let end = rawEnd;
    const skipped = [];
    let reason = nonWorkingReason(end, input.state);
    while (reason) {
      skipped.push({ date: toISO(end), reason });
      end = addDays(end, 1);
      reason = nonWorkingReason(end, input.state);
    }
    if (skipped.length) steps.push({ key: "shift", skipped, to: toISO(end) });

    // Warnings
    const partial = partialHolidayOn(rawEnd, input.state);
    if (partial) warnings.push({ key: "partialHoliday", name: partial.name, date: toISO(rawEnd) });
    if (input.delivery === "post") warnings.push({ key: "receivedLater" });

    const today = input.today ? parseISO(input.today) : null;
    let daysLeft = null;
    if (today) daysLeft = Math.round((end.getTime() - today.getTime()) / 86400000);

    return {
      delivered: toISO(delivered),
      rawEnd: toISO(rawEnd),
      deadline: toISO(end),
      weekday: end.getUTCDay(),
      daysLeft,
      steps,
      warnings,
    };
  }

  return {
    STATES,
    compute,
    holidays,
    easterSunday,
    addMonths,
    parseISO,
    toISO,
    isWeekend,
    nonWorkingReason,
    fictionDays,
  };
});
