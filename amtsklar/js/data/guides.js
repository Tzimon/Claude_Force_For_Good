/*
 * Amtsklar – guides for common letters (Ratgeber).
 * Each guide: id, icon word, period (deadline preset for the calculator, optional),
 * template (letter template id, optional), terms (glossary terms), and per language:
 * t (title), s (situation, one line), check[] (what to check), steps[] (what to do), warn (optional).
 */
(function (root) {
  "use strict";
  const GUIDES = [
    {
      id: "jobcenter-rueckforderung",
      period: "1m",
      template: "widerspruch",
      terms: ["Aufhebungsbescheid", "Rückforderung", "Ratenzahlung", "Überprüfungsantrag"],
      de: {
        t: "Das Jobcenter will Geld zurück",
        s: "Sie haben einen „Aufhebungs- und Erstattungsbescheid“ bekommen.",
        check: [
          "Für welchen Zeitraum und welchen Betrag? Steht im Teil „Entscheidung“.",
          "Warum? Meist wurde Einkommen angerechnet (Lohn, Kindergeld, Unterhalt). Vergleichen Sie mit Ihren Lohnabrechnungen und Kontoauszügen.",
          "Wurden Freibeträge vom Lohn abgezogen? Vom Arbeitslohn bleibt ein Teil anrechnungsfrei.",
          "Hatten Sie die Änderung rechtzeitig gemeldet? Dann darf oft nur eingeschränkt zurückgefordert werden.",
        ],
        steps: [
          "Frist ausrechnen: meist 1 Monat.",
          "Ist etwas falsch oder unklar: Widerspruch einlegen. Die Begründung können Sie nachreichen.",
          "Akteneinsicht beantragen, wenn Sie die Berechnung nicht verstehen.",
          "Können Sie nicht auf einmal zahlen: Ratenzahlung beantragen. Das Jobcenter darf auch einen Teil (meist 10 % des Regelbedarfs) direkt von Ihrer Leistung einbehalten.",
          "Lassen Sie den Bescheid bei einer Sozialberatung prüfen – Rückforderungen sind oft fehlerhaft.",
        ],
        warn: "Ist die Frist vorbei, hilft oft noch ein Überprüfungsantrag.",
      },
      en: {
        t: "The Jobcenter wants money back",
        s: "You received an „Aufhebungs- und Erstattungsbescheid“ (cancellation and repayment decision).",
        check: [
          "For which period and which amount? See the „decision“ part.",
          "Why? Usually income was counted (wages, child benefit, maintenance). Compare with your payslips and bank statements.",
          "Were allowances deducted from your wages? Part of earned income is not counted.",
          "Had you reported the change in time? Then repayment is often limited.",
        ],
        steps: [
          "Calculate the deadline: usually 1 month.",
          "If something is wrong or unclear: object. You can send the reasons later.",
          "Request access to your file if you do not understand the calculation.",
          "If you cannot pay at once: request instalments. The Jobcenter may also keep part of your benefit (usually 10 % of the standard rate).",
          "Have the decision checked by social counselling – repayment demands are often wrong.",
        ],
        warn: "If the deadline has passed, a request for review (Überprüfungsantrag) often still helps.",
      },
    },
    {
      id: "jobcenter-einladung",
      terms: ["Meldeversäumnis", "Leistungsminderung", "Arbeitsunfähigkeitsbescheinigung"],
      de: {
        t: "Einladung zum Termin beim Jobcenter",
        s: "Sie sollen zu einem bestimmten Tag ins Jobcenter oder zu einem Termin kommen.",
        check: [
          "Datum, Uhrzeit, Ort und Ansprechperson.",
          "Was sollen Sie mitbringen? (Unterlagen, Lebenslauf, Ausweis)",
          "Steht eine „Rechtsfolgenbelehrung“ darin? Dann kann bei Fehlen das Geld gekürzt werden.",
        ],
        steps: [
          "Termin in den Kalender eintragen und pünktlich hingehen.",
          "Können Sie nicht kommen (z. B. Vorstellungsgespräch, krankes Kind): sofort vorher Bescheid geben, mit Nachweis, und um einen neuen Termin bitten.",
          "Krank? Schicken Sie die Krankschreibung. Das Jobcenter kann zusätzlich eine Bescheinigung verlangen, dass Sie nicht zum Termin gehen konnten – fragen Sie Ihre Ärztin oder Ihren Arzt.",
          "Sie dürfen eine Begleitperson (Beistand) mitnehmen.",
          "Lassen Sie sich die Anwesenheit bestätigen, wenn Sie unsicher sind.",
        ],
        warn: "Wer ohne wichtigen Grund fehlt, dem kann das Geld gekürzt werden. Gegen eine Kürzung können Sie Widerspruch einlegen.",
      },
      en: {
        t: "Invitation to a Jobcenter appointment",
        s: "You are asked to come to the Jobcenter or an appointment on a certain day.",
        check: [
          "Date, time, place and contact person.",
          "What should you bring? (documents, CV, ID)",
          "Does it contain a „Rechtsfolgenbelehrung“ (notice of consequences)? Then your money can be cut if you do not come.",
        ],
        steps: [
          "Put the appointment in your calendar and be on time.",
          "If you cannot come (e.g. job interview, sick child): tell them right away, beforehand, with proof, and ask for a new date.",
          "Sick? Send your sick note. The Jobcenter may also ask for confirmation that you were unable to attend – ask your doctor.",
          "You may bring a person to support you (Beistand).",
          "Ask for confirmation that you attended if you are unsure.",
        ],
        warn: "If you miss it without an important reason, your money can be cut. You can object to a cut.",
      },
    },
    {
      id: "aufenthalt-verlaengern",
      terms: ["Aufenthaltserlaubnis", "Fiktionsbescheinigung", "Ausländerbehörde"],
      de: {
        t: "Meine Aufenthaltserlaubnis läuft ab",
        s: "Das Ablaufdatum auf Ihrer Karte oder in Ihrem Pass kommt näher.",
        check: [
          "Genaues Ablaufdatum auf der Karte (eAT).",
          "Welche Unterlagen verlangt Ihre Ausländerbehörde? Oft steht eine Liste auf der Website.",
          "Hat sich etwas geändert (Arbeit, Familie, Adresse)? Das kann wichtig sein.",
        ],
        steps: [
          "Verlängerung früh beantragen – etwa 2 bis 3 Monate vorher.",
          "Kein Termin frei? Stellen Sie den Antrag trotzdem VOR dem Ablaufdatum schriftlich (Online-Formular, E-Mail, Brief oder Fax) und bewahren Sie den Nachweis auf.",
          "Wer rechtzeitig beantragt, darf bis zur Entscheidung bleiben. Die Behörde stellt dafür eine Fiktionsbescheinigung aus.",
          "Arbeitgeber und Jobcenter brauchen oft einen Nachweis – zeigen Sie die Fiktionsbescheinigung oder Ihren Antrag.",
          "Bei Problemen sofort zur Migrationsberatung.",
        ],
        warn: "Ist der Titel schon abgelaufen, bevor Sie den Antrag gestellt haben, wird es deutlich schwieriger. Dann sofort Beratung holen.",
      },
      en: {
        t: "My residence permit is expiring",
        s: "The expiry date on your card or passport is coming closer.",
        check: [
          "The exact expiry date on the card (eAT).",
          "Which documents does your immigration office require? There is often a list on its website.",
          "Has anything changed (job, family, address)? It can matter.",
        ],
        steps: [
          "Apply early – about 2 to 3 months before.",
          "No appointment available? Still apply in writing BEFORE the expiry date (online form, e-mail, letter or fax) and keep proof.",
          "If you apply in time, you may stay until the decision. The office issues a Fiktionsbescheinigung for this.",
          "Employers and the Jobcenter often need proof – show the Fiktionsbescheinigung or your application.",
          "If there are problems, go to migration counselling right away.",
        ],
        warn: "If your permit expired before you applied, things become much harder. Get advice immediately.",
      },
    },
    {
      id: "inkasso-mahnbescheid",
      period: "2w",
      terms: ["Mahnung", "Vollstreckung", "Pfändung", "P-Konto", "Schufa"],
      de: {
        t: "Inkasso-Brief oder Mahnbescheid",
        s: "Eine Firma oder ein Gericht verlangt Geld für eine angebliche Schuld.",
        check: [
          "Kennen Sie die Firma und die Forderung? Gibt es einen Vertrag oder eine Rechnung?",
          "Ist der Betrag richtig? Inkassogebühren sind gesetzlich begrenzt.",
          "Ist die Schuld alt? Viele Forderungen verjähren nach 3 Jahren (ab Ende des Jahres, in dem sie entstanden sind).",
          "Kommt der Brief vom Amtsgericht im gelben Umschlag? Dann ist es ein gerichtlicher Mahnbescheid.",
        ],
        steps: [
          "Nicht ignorieren – aber auch nicht vorschnell zahlen oder etwas unterschreiben.",
          "Unbekannte oder falsche Forderung: schriftlich widersprechen („Ich bestreite die Forderung.“) und Belege verlangen.",
          "Gerichtlicher Mahnbescheid: Widerspruch innerhalb von 2 Wochen ab Zustellung – mit dem beiliegenden Formular, ein Kreuz genügt.",
          "Ist die Forderung berechtigt, aber Sie können nicht zahlen: Ratenzahlung anbieten und Schuldnerberatung kontaktieren.",
          "Konto schützen: in ein P-Konto umwandeln lassen.",
        ],
        warn: "Achtung vor gefälschten Inkasso-Mails. Klicken Sie keine Links und zahlen Sie nicht an unbekannte Konten.",
      },
      en: {
        t: "Debt collection letter or court payment order",
        s: "A company or a court demands money for an alleged debt.",
        check: [
          "Do you know the company and the claim? Is there a contract or an invoice?",
          "Is the amount correct? Debt collection fees are limited by law.",
          "Is the debt old? Many claims expire after 3 years (from the end of the year in which they arose).",
          "Is the letter from the local court in a yellow envelope? Then it is a court payment order (Mahnbescheid).",
        ],
        steps: [
          "Do not ignore it – but do not pay or sign anything in a hurry either.",
          "Unknown or wrong claim: dispute it in writing („Ich bestreite die Forderung.“) and ask for proof.",
          "Court payment order: object within 2 weeks after delivery – using the enclosed form, a cross is enough.",
          "If the claim is justified but you cannot pay: offer instalments and contact debt counselling.",
          "Protect your account: have it converted into a P-Konto.",
        ],
        warn: "Beware of fake debt collection e-mails. Do not click links and do not pay to unknown accounts.",
      },
    },
    {
      id: "steuerbescheid",
      period: "1m",
      terms: ["Einspruch", "Säumniszuschlag", "Stundung", "Steuer-ID"],
      de: {
        t: "Steuerbescheid vom Finanzamt",
        s: "Das Finanzamt hat Ihre Steuer berechnet – mit Erstattung oder Nachzahlung.",
        check: [
          "Steht oben „Erstattung“ (Sie bekommen Geld) oder „Nachzahlung“ (Sie zahlen)?",
          "Hat das Finanzamt von Ihrer Steuererklärung abgewichen? Das steht unter „Erläuterungen“.",
          "Stimmen Einkommen, Kinder und Werbungskosten?",
        ],
        steps: [
          "Frist für den Einspruch: 1 Monat.",
          "Einspruch geht formlos – auch über ELSTER. Begründung und Belege können Sie nachreichen.",
          "Ein Einspruch stoppt die Zahlung nicht automatisch. Dafür „Aussetzung der Vollziehung“ beantragen.",
          "Können Sie die Nachzahlung nicht zahlen: Stundung oder Raten beantragen – sonst kommen Säumniszuschläge dazu.",
          "Hilfe: Lohnsteuerhilfeverein (für Arbeitnehmer günstig) oder Steuerberatung.",
        ],
      },
      en: {
        t: "Tax assessment from the tax office",
        s: "The tax office has calculated your tax – with a refund or an additional payment.",
        check: [
          "Does it say „Erstattung“ (you receive money) or „Nachzahlung“ (you pay)?",
          "Did the tax office deviate from your tax return? See „Erläuterungen“ (explanations).",
          "Are income, children and work expenses correct?",
        ],
        steps: [
          "Deadline for an objection (Einspruch): 1 month.",
          "An objection needs no special form – also possible via ELSTER. You can send reasons and receipts later.",
          "An objection does not stop the payment automatically. For that, request „Aussetzung der Vollziehung“ (suspension).",
          "If you cannot pay: request a deferral or instalments – otherwise late-payment fees are added.",
          "Help: wage tax assistance associations (Lohnsteuerhilfeverein, affordable for employees) or a tax adviser.",
        ],
      },
    },
    {
      id: "familienkasse",
      template: "fristverlaengerung",
      terms: ["Kindergeld", "Mitwirkungspflicht", "Nachweis", "Rückforderung"],
      de: {
        t: "Familienkasse will Unterlagen",
        s: "Die Familienkasse bittet um Nachweise, z. B. Schul- oder Ausbildungsbescheinigung.",
        check: [
          "Welche Unterlagen genau und für welches Kind?",
          "Bis wann? Die Frist steht im Brief.",
          "Ihre Kindergeldnummer (steht oben und enthält „FK“).",
        ],
        steps: [
          "Unterlagen rechtzeitig schicken – Kopien, nie Originale. Auf jede Seite die Kindergeldnummer schreiben.",
          "Einfach und mit Nachweis: Upload im Online-Portal der Familienkasse.",
          "Brauchen Sie mehr Zeit (z. B. Schule stellt Bescheinigung später aus): vor Fristende um Verlängerung bitten.",
          "Hat sich etwas geändert (Ausbildung beendet, Umzug ins Ausland)? Sofort melden.",
        ],
        warn: "Wer nicht antwortet, riskiert, dass das Kindergeld gestoppt und zurückgefordert wird.",
      },
      en: {
        t: "Family benefits office wants documents",
        s: "The Familienkasse asks for proof, e.g. a school or training certificate.",
        check: [
          "Which documents exactly and for which child?",
          "By when? The deadline is in the letter.",
          "Your child benefit number (at the top, it contains „FK“).",
        ],
        steps: [
          "Send the documents in time – copies, never originals. Write the child benefit number on every page.",
          "Easy and with proof: upload in the Familienkasse online portal.",
          "Need more time (e.g. the school issues the certificate later): ask for an extension before the deadline.",
          "Has anything changed (training finished, moving abroad)? Report it immediately.",
        ],
        warn: "If you do not answer, child benefit may be stopped and reclaimed.",
      },
    },
    {
      id: "bussgeld",
      period: "2w",
      terms: ["Bußgeldbescheid", "Anhörung", "Einspruch"],
      de: {
        t: "Bußgeld: Anhörungsbogen oder Bußgeldbescheid",
        s: "Sie sollen zu schnell gefahren sein, falsch geparkt haben oder Ähnliches.",
        check: [
          "Ist es ein „Anhörungsbogen“ (Frage) oder ein „Bußgeldbescheid“ (Entscheidung)?",
          "Stimmen Datum, Ort, Kennzeichen und Vorwurf?",
          "Bußgeldbescheid: Datum der Zustellung auf dem gelben Umschlag notieren.",
        ],
        steps: [
          "Anhörungsbogen: Ihre Angaben zur Person müssen Sie machen. Zur Sache (z. B. wer gefahren ist) müssen Sie nichts sagen.",
          "Bußgeldbescheid: Einspruch nur innerhalb von 2 Wochen ab Zustellung.",
          "Bei Punkten in Flensburg oder Fahrverbot lohnt sich oft anwaltliche Beratung.",
          "Stimmt alles: Betrag fristgerecht zahlen, dann ist die Sache erledigt.",
        ],
      },
      en: {
        t: "Fines: questionnaire or fine notice",
        s: "You are accused of speeding, wrong parking or similar.",
        check: [
          "Is it an „Anhörungsbogen“ (questionnaire) or a „Bußgeldbescheid“ (fine notice)?",
          "Are date, place, number plate and accusation correct?",
          "Fine notice: note the delivery date written on the yellow envelope.",
        ],
        steps: [
          "Questionnaire: you must give your personal details. You do not have to say anything about the matter (e.g. who was driving).",
          "Fine notice: objection only within 2 weeks after delivery.",
          "With penalty points or a driving ban, legal advice is often worthwhile.",
          "If everything is correct: pay on time and the matter is closed.",
        ],
      },
    },
    {
      id: "nebenkosten",
      terms: ["Nebenkostenabrechnung", "Kosten der Unterkunft", "Nachzahlung"],
      de: {
        t: "Nebenkostenabrechnung vom Vermieter",
        s: "Ihr Vermieter rechnet Wasser, Heizung, Müll usw. für ein Jahr ab.",
        check: [
          "Zeitraum: höchstens 12 Monate. Die Abrechnung muss spätestens 12 Monate nach Ende des Zeitraums bei Ihnen sein – sonst muss der Vermieter keine Nachzahlung mehr bekommen.",
          "Sind Ihre Vorauszahlungen richtig abgezogen?",
          "Stimmen Wohnfläche und Verteilerschlüssel?",
        ],
        steps: [
          "Sie dürfen die Belege beim Vermieter ansehen.",
          "Einwände schriftlich innerhalb von 12 Monaten nach Erhalt erheben.",
          "Mit Bürgergeld oder Sozialhilfe: Nachzahlung sofort beim Jobcenter oder Sozialamt einreichen – die Kosten werden oft übernommen. Guthaben müssen Sie melden.",
          "Unklar? Mieterverein fragen.",
        ],
      },
      en: {
        t: "Utility bill from your landlord",
        s: "Your landlord bills water, heating, rubbish etc. for one year.",
        check: [
          "Period: at most 12 months. The bill must reach you no later than 12 months after the period ends – otherwise the landlord can no longer demand extra payment.",
          "Were your advance payments deducted correctly?",
          "Are the floor area and the distribution key correct?",
        ],
        steps: [
          "You may inspect the receipts at your landlord's.",
          "Raise objections in writing within 12 months of receiving the bill.",
          "With Bürgergeld or social assistance: submit the extra payment to the Jobcenter or social welfare office right away – the costs are often covered. You must report refunds.",
          "Unsure? Ask a tenants' association.",
        ],
      },
    },
  ];
  root.Amtsklar = root.Amtsklar || {};
  root.Amtsklar.guides = { GUIDES };
})(typeof self !== "undefined" ? self : this);
