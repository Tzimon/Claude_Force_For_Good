/*
 * Amtsklar – letter templates (Musterbriefe).
 * The letter itself is always German (that is what the authority needs);
 * titles, descriptions, field labels and notes are translated.
 *
 * Field types: text, textarea, date, money. Common fields are defined once.
 */
(function (root) {
  "use strict";

  const COMMON = [
    { id: "name", type: "text", de: "Ihr Vor- und Nachname", en: "Your full name", ph: "Maria Muster" },
    { id: "address", type: "textarea", rows: 2, de: "Ihre Adresse", en: "Your address", ph: "Musterstraße 1\n12345 Musterstadt" },
    { id: "authority", type: "textarea", rows: 3, de: "Behörde und Adresse (steht oben im Brief)", en: "Authority and its address (top of the letter)", ph: "Jobcenter Musterstadt\nAgenturstraße 5\n12345 Musterstadt" },
    { id: "ref", type: "text", de: "Aktenzeichen / Kundennummer / BG-Nummer", en: "Reference number (Aktenzeichen, customer or BG number)", ph: "123A456789" },
    { id: "place", type: "text", de: "Ihr Ort (für das Datum)", en: "Your town (for the date line)", ph: "Musterstadt" },
  ];

  const fmt = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  };

  // v(key) returns the value or a [placeholder]
  const TEMPLATES = [
    {
      id: "widerspruch",
      de: { title: "Widerspruch", desc: "Sie sind mit einem Bescheid nicht einverstanden. Wahrt die Frist – die Begründung können Sie nachreichen." },
      en: { title: "Objection (Widerspruch)", desc: "You disagree with a decision. Meets the deadline – you can send reasons later." },
      fields: [
        { id: "letterDate", type: "date", de: "Datum des Bescheids", en: "Date of the decision" },
        { id: "subject", type: "text", de: "Worum geht es? (steht im Betreff)", en: "What is it about? (subject line of the decision)", ph: "Aufhebungs- und Erstattungsbescheid" },
        { id: "reason", type: "textarea", rows: 4, de: "Begründung (freiwillig, kann nachgereicht werden)", en: "Reasons (optional, can be sent later)", ph: "" },
        { id: "files", type: "check", de: "Akteneinsicht beantragen", en: "Also request access to my file" },
      ],
      subject: (v) => `Widerspruch gegen den Bescheid vom ${v("letterDate", fmt)}${v.has("subject") ? " – " + v("subject") : ""}`,
      body: (v) => {
        const parts = [
          `hiermit lege ich Widerspruch gegen Ihren Bescheid vom ${v("letterDate", fmt)} ein.`,
        ];
        if (v.has("reason")) parts.push(`Begründung:\n${v("reason")}`);
        else parts.push("Die Begründung reiche ich nach.");
        if (v.bool("files")) parts.push("Gleichzeitig beantrage ich Akteneinsicht. Bitte teilen Sie mir mit, wann ich die Akte einsehen kann, oder senden Sie mir Kopien der Unterlagen.");
        parts.push("Bitte bestätigen Sie mir den Eingang dieses Widerspruchs.");
        return parts.join("\n\n");
      },
      notes: {
        de: ["Schicken Sie den Widerspruch so, dass er vor Fristende ankommt. Normale E-Mail reicht oft nicht.", "Machen Sie eine Kopie oder ein Foto für sich.", "Bei Jobcenter-Bescheiden: Sie können den Widerspruch auch über jobcenter.digital einreichen."],
        en: ["Send the objection so that it arrives before the deadline. A normal e-mail is often not enough.", "Keep a copy or a photo for yourself.", "For Jobcenter decisions you can also submit it via jobcenter.digital."],
      },
    },
    {
      id: "ueberpruefung",
      de: { title: "Überprüfungsantrag", desc: "Ein alter Bescheid vom Jobcenter oder Sozialamt war falsch, die Widerspruchsfrist ist aber vorbei (§ 44 SGB X)." },
      en: { title: "Request for review", desc: "An old Jobcenter or social welfare decision was wrong, but the objection deadline has passed (§ 44 SGB X)." },
      fields: [
        { id: "letterDate", type: "date", de: "Datum des Bescheids", en: "Date of the decision" },
        { id: "subject", type: "text", de: "Welcher Bescheid? (z. B. Bewilligungsbescheid für Januar bis Juni)", en: "Which decision? (e.g. approval for January to June)", ph: "Bewilligungsbescheid für den Zeitraum 01.01. bis 30.06." },
        { id: "reason", type: "textarea", rows: 4, de: "Was war falsch? (freiwillig)", en: "What was wrong? (optional)", ph: "Die Heizkosten wurden nicht vollständig berücksichtigt." },
      ],
      subject: (v) => `Antrag auf Überprüfung nach § 44 SGB X – Bescheid vom ${v("letterDate", fmt)}`,
      body: (v) =>
        [
          `hiermit beantrage ich die Überprüfung Ihres Bescheids vom ${v("letterDate", fmt)}${v.has("subject") ? " (" + v("subject") + ")" : ""} nach § 44 SGB X.`,
          v.has("reason")
            ? `Der Bescheid ist meiner Ansicht nach rechtswidrig, weil:\n${v("reason")}`
            : "Ich bitte Sie, den Bescheid in vollem Umfang auf seine Rechtmäßigkeit zu prüfen. Eine genauere Begründung reiche ich gegebenenfalls nach.",
          "Sollte sich ergeben, dass mir zu wenig Leistungen gewährt wurden, bitte ich um Nachzahlung der zustehenden Beträge.",
          "Bitte bestätigen Sie mir den Eingang dieses Antrags und senden Sie mir einen schriftlichen Bescheid.",
        ].join("\n\n"),
      notes: {
        de: ["Bei Bürgergeld und Sozialhilfe wird höchstens ab dem 1. Januar des Vorjahres nachgezahlt (Antrag im Jahr 2026: Nachzahlung ab Januar 2025). Darum: lieber früh stellen.", "Gegen die Antwort können Sie wieder Widerspruch einlegen."],
        en: ["For Bürgergeld and social assistance, back payments go back at most to 1 January of the previous year (application in 2026: back payment from January 2025). So apply early.", "You can object to the answer again."],
      },
    },
    {
      id: "akteneinsicht",
      de: { title: "Akteneinsicht", desc: "Sie möchten lesen, was die Behörde über Sie gespeichert hat – z. B. vor einem Widerspruch." },
      en: { title: "Access to my file", desc: "You want to read what the authority has on file about you – e.g. before an objection." },
      fields: [
        { id: "subject", type: "text", de: "Worum geht es? (freiwillig)", en: "What is it about? (optional)", ph: "Bescheid vom 03.11.2026" },
      ],
      subject: (v) => `Antrag auf Akteneinsicht${v.has("subject") ? " – " + v("subject") : ""}`,
      body: (v) =>
        [
          "hiermit beantrage ich Einsicht in die über mich geführte Akte (§ 25 SGB X bzw. § 29 VwVfG).",
          "Bitte nennen Sie mir einen Termin zur Einsichtnahme oder senden Sie mir Kopien der Unterlagen zu. Zusätzlich beantrage ich Auskunft über die zu meiner Person gespeicherten Daten nach Art. 15 DSGVO.",
          "Bitte bestätigen Sie mir den Eingang dieses Antrags.",
        ].join("\n\n"),
      notes: {
        de: ["Akteneinsicht verlängert keine Fristen. Legen Sie Widerspruch trotzdem rechtzeitig ein.", "Die Datenauskunft nach DSGVO ist kostenlos und muss in der Regel innerhalb eines Monats kommen."],
        en: ["Access to the file does not extend deadlines. Still object in time.", "The GDPR data copy is free and usually must come within one month."],
      },
    },
    {
      id: "raten",
      de: { title: "Ratenzahlung", desc: "Sie sollen Geld zahlen, können es aber nicht auf einmal. Sie bieten monatliche Raten an." },
      en: { title: "Payment in instalments", desc: "You have to pay money but cannot pay it all at once. You offer monthly instalments." },
      fields: [
        { id: "letterDate", type: "date", de: "Datum der Zahlungsaufforderung", en: "Date of the payment demand" },
        { id: "amount", type: "money", de: "Geforderter Betrag in Euro", en: "Amount demanded in euros", ph: "480,00" },
        { id: "rate", type: "money", de: "Rate, die Sie pro Monat zahlen können (Euro)", en: "Instalment you can pay per month (euros)", ph: "30,00" },
        { id: "reason", type: "textarea", rows: 3, de: "Warum können Sie nicht alles zahlen? (kurz)", en: "Why can you not pay it all? (briefly)", ph: "Ich beziehe Bürgergeld und habe keine Ersparnisse." },
        { id: "objection", type: "check", de: "Ich habe auch Widerspruch eingelegt / lege ihn ein", en: "I have also objected / will object" },
      ],
      subject: (v) => `Antrag auf Ratenzahlung – Ihr Schreiben vom ${v("letterDate", fmt)}`,
      body: (v) =>
        [
          `Sie fordern von mir mit Schreiben vom ${v("letterDate", fmt)} einen Betrag von ${v("amount")} Euro.`,
          `Ich kann diesen Betrag nicht auf einmal zahlen. ${v.has("reason") ? v("reason") : ""}`.trim(),
          `Ich beantrage daher, den Betrag in monatlichen Raten von ${v("rate")} Euro zahlen zu dürfen. Bitte teilen Sie mir mit, ab wann und auf welches Konto ich die Raten zahlen soll.`,
          v.bool("objection") ? "Diese Ratenzahlung ist kein Anerkenntnis der Forderung. Gegen den zugrunde liegenden Bescheid habe ich Widerspruch eingelegt bzw. lege ihn ein." : "",
          "Ich bitte außerdem darum, für die Dauer der Ratenzahlung von Mahnungen und Vollstreckungsmaßnahmen abzusehen.",
        ]
          .filter(Boolean)
          .join("\n\n"),
      notes: {
        de: ["Bieten Sie nur Raten an, die Sie wirklich jeden Monat zahlen können.", "Wenn Sie mit der Forderung nicht einverstanden sind: zusätzlich Widerspruch einlegen und das Häkchen setzen."],
        en: ["Only offer instalments you can really pay every month.", "If you disagree with the demand: also object and tick the box."],
      },
    },
    {
      id: "fristverlaengerung",
      de: { title: "Mehr Zeit für Unterlagen", desc: "Die Behörde will Unterlagen bis zu einem Datum. Sie brauchen mehr Zeit." },
      en: { title: "More time for documents", desc: "The authority wants documents by a certain date. You need more time." },
      fields: [
        { id: "letterDate", type: "date", de: "Datum des Schreibens der Behörde", en: "Date of the authority's letter" },
        { id: "until", type: "date", de: "Bis wann brauchen Sie Zeit?", en: "Until when do you need time?" },
        { id: "docs", type: "text", de: "Welche Unterlagen?", en: "Which documents?", ph: "Kontoauszüge der letzten drei Monate" },
        { id: "reason", type: "textarea", rows: 3, de: "Warum brauchen Sie mehr Zeit?", en: "Why do you need more time?", ph: "Die Bank schickt mir die Kontoauszüge erst in zwei Wochen zu." },
      ],
      subject: (v) => `Bitte um Fristverlängerung – Ihr Schreiben vom ${v("letterDate", fmt)}`,
      body: (v) =>
        [
          `mit Schreiben vom ${v("letterDate", fmt)} haben Sie mich gebeten, folgende Unterlagen einzureichen: ${v("docs")}.`,
          `Ich bin bereit, mitzuwirken. Leider kann ich die Unterlagen nicht rechtzeitig einreichen. Grund: ${v("reason")}`,
          `Ich bitte Sie daher, die Frist bis zum ${v("until", fmt)} zu verlängern. Unterlagen, die ich schon habe, füge ich bei.`,
          "Bitte bestätigen Sie mir die Fristverlängerung schriftlich.",
        ].join("\n\n"),
      notes: {
        de: ["Schicken Sie die Bitte VOR Ablauf der Frist.", "Was Sie schon haben, schicken Sie gleich mit – das zeigt, dass Sie mitwirken."],
        en: ["Send the request BEFORE the deadline ends.", "Send what you already have – it shows you are cooperating."],
      },
    },
    {
      id: "antrag",
      de: { title: "Formloser Antrag", desc: "Sie wollen eine Leistung beantragen, haben aber noch nicht alle Formulare. Der Antrag sichert das Datum." },
      en: { title: "Informal application", desc: "You want to apply for a benefit but do not have all forms yet. The application secures the date." },
      fields: [
        { id: "benefit", type: "text", de: "Was beantragen Sie?", en: "What are you applying for?", ph: "Bürgergeld" },
        { id: "reason", type: "textarea", rows: 3, de: "Kurze Erklärung (freiwillig)", en: "Short explanation (optional)", ph: "Mein Arbeitsvertrag endet am 30.11. Danach habe ich kein ausreichendes Einkommen." },
      ],
      subject: (v) => `Antrag auf ${v("benefit")}`,
      body: (v) =>
        [
          `hiermit beantrage ich ${v("benefit")} ab dem heutigen Tag.`,
          v.has("reason") ? v("reason") : "",
          "Bitte senden Sie mir die erforderlichen Antragsformulare zu und teilen Sie mir mit, welche Unterlagen Sie benötigen. Ich reiche sie umgehend nach.",
          "Bitte bestätigen Sie mir den Eingang dieses Antrags.",
        ]
          .filter(Boolean)
          .join("\n\n"),
      notes: {
        de: ["Viele Leistungen (z. B. Bürgergeld, Wohngeld, Sozialhilfe) gibt es erst ab dem Monat oder Tag des Antrags. Darum lieber sofort formlos beantragen.", "Lassen Sie sich die Abgabe bestätigen (Eingangsstempel auf Ihrer Kopie)."],
        en: ["Many benefits (e.g. Bürgergeld, housing benefit, social assistance) only start from the month or day of application. So apply informally right away.", "Get confirmation that you handed it in (stamp on your copy)."],
      },
    },
  ];

  /** Builds the complete letter text (DIN 5008-like plain text). */
  function buildLetter(tpl, values, todayIso) {
    const has = (k) => values[k] !== undefined && String(values[k]).trim() !== "" && values[k] !== false;
    const ph = (k) => {
      const f = [...COMMON, ...tpl.fields].find((x) => x.id === k);
      return "[" + (f ? f.de.replace(/\s*\(.*\)\s*$/, "") : k) + "]";
    };
    const v = (k, transform) => (has(k) ? (transform ? transform(String(values[k]).trim()) : String(values[k]).trim()) : ph(k));
    v.has = has;
    v.bool = (k) => values[k] === true;

    const lines = [];
    lines.push(v("name"));
    lines.push(v("address"));
    lines.push("");
    lines.push(v("authority"));
    lines.push("");
    lines.push(`${has("place") ? values.place.trim() : "[Ort]"}, ${fmt(todayIso)}`);
    lines.push("");
    lines.push(`Aktenzeichen / Kundennummer: ${v("ref")}`);
    lines.push(tpl.subject(v));
    lines.push("");
    lines.push("Sehr geehrte Damen und Herren,");
    lines.push("");
    lines.push(tpl.body(v));
    lines.push("");
    lines.push("Mit freundlichen Grüßen");
    lines.push("");
    lines.push("");
    lines.push(`${v("name")} (Unterschrift)`);
    return lines.join("\n");
  }

  root.Amtsklar = root.Amtsklar || {};
  root.Amtsklar.templates = { COMMON, TEMPLATES, buildLetter };
})(typeof self !== "undefined" ? self : this);
