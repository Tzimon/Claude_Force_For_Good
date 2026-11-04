// Run with: node --test amtsklar/tests/*.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const D = require("../js/deadline.js");

test("Easter Sunday", () => {
  assert.equal(D.toISO(D.easterSunday(2024)), "2024-03-31");
  assert.equal(D.toISO(D.easterSunday(2025)), "2025-04-20");
  assert.equal(D.toISO(D.easterSunday(2026)), "2026-04-05");
  assert.equal(D.toISO(D.easterSunday(2027)), "2027-03-28");
});

test("holidays per state", () => {
  const names = (y, s) => D.holidays(y, s).filter((h) => !h.partial).map((h) => h.date);
  assert.ok(names(2025, "SN").includes("2025-11-19"), "Buß- und Bettag 2025");
  assert.ok(names(2026, "SN").includes("2026-11-18"), "Buß- und Bettag 2026");
  assert.ok(names(2025, "NI").includes("2025-10-31"), "Reformationstag NI");
  assert.ok(!names(2025, "NW").includes("2025-10-31"), "no Reformationstag NW");
  assert.ok(names(2025, "NW").includes("2025-06-19"), "Fronleichnam NW 2025");
  assert.ok(!names(2025, "SN").includes("2025-06-19"), "Fronleichnam SN only partial");
  assert.ok(names(2025, "BE").includes("2025-03-08"), "Frauentag BE");
  assert.ok(names(2025, "MV").includes("2025-03-08"), "Frauentag MV");
  assert.ok(!names(2022, "MV").includes("2022-03-08"), "Frauentag MV only from 2023");
  assert.ok(names(2025, "TH").includes("2025-09-20"), "Weltkindertag TH");
  assert.ok(names(2025, "BE").includes("2025-05-08"), "8 May 2025 BE");
  assert.ok(!names(2026, "BE").includes("2026-05-08"), "8 May 2026 BE not a holiday");
  assert.equal(names(2025, "HH").length, 10, "HH: 9 national + Reformationstag");
});

test("§ 188 BGB month arithmetic", () => {
  const m = (iso, n) => D.toISO(D.addMonths(D.parseISO(iso), n));
  assert.equal(m("2025-01-31", 1), "2025-02-28");
  assert.equal(m("2024-01-31", 1), "2024-02-29");
  assert.equal(m("2025-03-31", 1), "2025-04-30");
  assert.equal(m("2025-11-30", 3), "2026-02-28");
  assert.equal(m("2024-02-29", 12), "2025-02-28");
  assert.equal(m("2025-12-15", 1), "2026-01-15");
});

test("invalid input", () => {
  assert.equal(D.parseISO("2025-02-31"), null);
  assert.throws(() => D.compute({ delivery: "post", date: "x", period: "1m", state: "BY" }), /invalid-date/);
  assert.throws(() => D.compute({ delivery: "post", date: "2025-01-01", period: "1m", state: "XX" }), /invalid-state/);
});

test("normal letter: 4-day delivery fiction since 2025", () => {
  const r = D.compute({ delivery: "post", date: "2025-01-31", period: "1m", state: "BY" });
  assert.equal(r.delivered, "2025-02-04");
  assert.equal(r.deadline, "2025-03-04");
});

test("normal letter sent in 2024: 3-day fiction", () => {
  const r = D.compute({ delivery: "post", date: "2024-12-20", period: "1m", state: "BY" });
  assert.equal(r.delivered, "2024-12-23");
  assert.equal(r.deadline, "2025-01-23");
});

test("formal delivery, month end", () => {
  const r = D.compute({ delivery: "formal", date: "2025-01-31", period: "1m", state: "HE" });
  assert.equal(r.deadline, "2025-02-28");
  assert.ok(r.steps.some((s) => s.key === "monthEnd"));
});

test("deadline on Saturday moves to Monday", () => {
  const r = D.compute({ delivery: "formal", date: "2025-02-01", period: "1m", state: "HE" });
  assert.equal(r.rawEnd, "2025-03-01");
  assert.equal(r.deadline, "2025-03-03");
});

test("deadline on Good Friday moves past Easter Monday", () => {
  const r = D.compute({ delivery: "formal", date: "2025-03-18", period: "1m", state: "BW" });
  assert.equal(r.rawEnd, "2025-04-18");
  assert.equal(r.deadline, "2025-04-22");
  const shift = r.steps.find((s) => s.key === "shift");
  assert.equal(shift.skipped.length, 4);
});

test("Reformationstag depends on the state", () => {
  const ni = D.compute({ delivery: "formal", date: "2025-10-17", period: "2w", state: "NI" });
  assert.equal(ni.deadline, "2025-11-03");
  const he = D.compute({ delivery: "formal", date: "2025-10-17", period: "2w", state: "HE" });
  assert.equal(he.deadline, "2025-10-31");
});

test("partial holiday does not extend the deadline but warns", () => {
  const r = D.compute({ delivery: "formal", date: "2025-07-15", period: "1m", state: "BY" });
  assert.equal(r.deadline, "2025-08-15");
  assert.ok(r.warnings.some((w) => w.key === "partialHoliday"));
});

test("two weeks and one year", () => {
  assert.equal(D.compute({ delivery: "known", date: "2025-06-02", period: "2w", state: "BE" }).deadline, "2025-06-16");
  assert.equal(D.compute({ delivery: "known", date: "2025-06-02", period: "1y", state: "BE" }).deadline, "2026-06-02");
});

test("days left", () => {
  const r = D.compute({ delivery: "known", date: "2025-06-02", period: "2w", state: "BE", today: "2025-06-10" });
  assert.equal(r.daysLeft, 6);
});
