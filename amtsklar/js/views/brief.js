/* Amtsklar – "How to read a Bescheid": annotated sample letter (fictional names) */
(function () {
  "use strict";
  const A = (window.Amtsklar = window.Amtsklar || {});
  A.views = A.views || {};

  // Parts of the sample letter. n = marker number shown in the letter.
  const PARTS = [
    { n: 1, de: { t: "Absender", p: "Welche Behörde hat geschrieben? Dorthin schicken Sie auch Ihre Antwort." },
             en: { t: "Sender", p: "Which authority wrote to you? This is also where you send your reply." } },
    { n: 2, de: { t: "Datum des Bescheids", p: "Wichtig für die Frist. Bei normaler Post gilt der Brief 4 Tage später als zugestellt. Geben Sie dieses Datum im Fristenrechner ein." },
             en: { t: "Date of the decision", p: "Important for the deadline. With normal post the letter counts as delivered 4 days later. Enter this date in the deadline calculator." } },
    { n: 3, de: { t: "Aktenzeichen / Nummer", p: "Ihre Fallnummer. Schreiben Sie sie auf jeden Brief an die Behörde." },
             en: { t: "Reference number", p: "Your case number. Write it on every letter to the authority." } },
    { n: 4, de: { t: "Betreff: Was für ein Brief?", p: "„Aufhebung“ heißt: Eine frühere Bewilligung wird zurückgenommen. „Erstattung“ heißt: Sie sollen Geld zurückzahlen." },
             en: { t: "Subject: what kind of letter?", p: "„Aufhebung“ means an earlier approval is cancelled. „Erstattung“ means you are asked to pay money back." } },
    { n: 5, de: { t: "Die Entscheidung", p: "Das ist der Kern: Was hat die Behörde entschieden? Für welchen Zeitraum? Lesen Sie diesen Teil zuerst." },
             en: { t: "The decision", p: "This is the core: what did the authority decide, and for which period? Read this part first." } },
    { n: 6, de: { t: "Betrag und Zahlungsfrist", p: "Wie viel, bis wann, auf welches Konto. Wenn Sie widersprechen, müssen Sie oft trotzdem zahlen – Sie können aber Ratenzahlung oder Stundung beantragen." },
             en: { t: "Amount and payment deadline", p: "How much, by when, to which account. Even if you object you often still have to pay – but you can ask for instalments or a deferral." } },
    { n: 7, de: { t: "Begründung", p: "Warum hat die Behörde so entschieden? Prüfen Sie die Zahlen und Daten. Stimmt alles? Fehler hier sind ein guter Grund für einen Widerspruch." },
             en: { t: "Reasons", p: "Why did the authority decide this? Check the figures and dates. Is everything correct? Mistakes here are a good reason to object." } },
    { n: 8, de: { t: "Rechtsbehelfsbelehrung", p: "Hier steht, wie Sie sich wehren: Widerspruch, Frist (meist 1 Monat), Adresse. Fehlt dieser Teil, haben Sie meist 1 Jahr Zeit." },
             en: { t: "Information on legal remedies", p: "This tells you how to challenge the decision: objection, deadline (usually 1 month), address. If this part is missing, you usually have 1 year." } },
    { n: 9, de: { t: "Keine Unterschrift?", p: "Normal. Maschinell erstellte Bescheide gelten auch ohne Unterschrift." },
             en: { t: "No signature?", p: "Normal. Computer-generated decisions are valid without a signature." } },
  ];

  const m = (n) => `<button type="button" class="anno" data-n="${n}" aria-label="${n}">${n}</button>`;

  // Fictional sample letter (German, as people receive it)
  const LETTER = `
<div class="bescheid" lang="de">
  <div class="b-head">
    <div class="b-part" data-n="1">${m(1)}<strong>Jobcenter Musterstadt</strong><br>Agenturstraße 5 · 12345 Musterstadt</div>
    <div class="b-part b-right" data-n="2">${m(2)}Datum: <span class="mono">20.10.2026</span></div>
  </div>
  <p class="b-addr">Frau<br>Maria Muster<br>Musterstraße 1<br>12345 Musterstadt</p>
  <p class="b-part" data-n="3">${m(3)}BG-Nummer: <span class="mono">12345BG0006789</span></p>
  <p class="b-part b-subject" data-n="4">${m(4)}<strong>Aufhebungs- und Erstattungsbescheid</strong></p>
  <p>Sehr geehrte Frau Muster,</p>
  <p class="b-part" data-n="5">${m(5)}die Entscheidung vom 15.05.2026 über die Bewilligung von Leistungen zur Sicherung des Lebensunterhalts wird für die Zeit vom 01.08.2026 bis 31.08.2026 teilweise in Höhe von 312,40 EUR aufgehoben.</p>
  <p class="b-part" data-n="6">${m(6)}Die überzahlte Leistung in Höhe von <strong>312,40 EUR</strong> ist nach § 50 SGB X zu erstatten. Bitte überweisen Sie den Betrag bis zum 20.11.2026 an die Bundesagentur für Arbeit – Regionaldirektion …</p>
  <p class="b-part" data-n="7">${m(7)}<strong>Begründung:</strong> Sie haben im August 2026 Einkommen aus einer Beschäftigung erzielt. Das Einkommen ist nach § 11 SGB II zu berücksichtigen …</p>
  <p class="b-part" data-n="8">${m(8)}<strong>Rechtsbehelfsbelehrung:</strong> Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden. Der Widerspruch ist schriftlich, in elektronischer Form oder zur Niederschrift beim Jobcenter Musterstadt, Agenturstraße 5, 12345 Musterstadt einzulegen.</p>
  <p class="b-part b-small" data-n="9">${m(9)}Dieses Schreiben wurde maschinell erstellt und ist ohne Unterschrift gültig.</p>
</div>`;

  function render(el) {
    const { esc, h, t, state } = A.util;
    const lang = state.lang;
    const X = A.extraI18n && A.extraI18n[lang];
    const tx = (p) => p[lang] || (X && X.brief[p.n - 1] && { t: X.brief[p.n - 1][0], p: X.brief[p.n - 1][1] }) || p.en || p.de;
    el.replaceChildren(
      h(`
      <section class="view" aria-labelledby="b-title">
        <header style="display:grid;gap:10px">
          <p class="eyebrow">${esc(t("b.eyebrow"))}</p>
          <h2 id="b-title">${esc(t("b.title"))}</h2>
          <p class="lede">${esc(t("b.lede"))}</p>
        </header>
        <div class="anatomy">
          <div class="anatomy-letter">${LETTER}<p class="small">${esc(t("b.sample"))}</p></div>
          <ol class="anatomy-list" id="b-list">
            ${PARTS.map((p) => `<li data-n="${p.n}" tabindex="-1"><span class="anno static" aria-hidden="true">${p.n}</span><div><strong>${esc(tx(p).t)}</strong><p>${esc(tx(p).p)}</p></div></li>`).join("")}
          </ol>
        </div>
        <section class="sheet">
          <h3>${esc(t("b.order"))}</h3>
          <ol style="margin:0;padding-inline-start:1.3em;display:grid;gap:6px">
            <li>${esc(t("b.order.1"))}</li><li>${esc(t("b.order.2"))}</li><li>${esc(t("b.order.3"))}</li><li>${esc(t("b.order.4"))}</li>
          </ol>
          <div class="btn-row"><a class="btn" href="#frist" style="text-decoration:none">${esc(t("b.toFrist"))}</a></div>
        </section>
      </section>`)
    );
    const select = (n) => {
      el.querySelectorAll("[data-n]").forEach((x) => x.classList.toggle("active", x.dataset.n === String(n)));
      const item = el.querySelector(`#b-list li[data-n="${n}"]`);
      if (item && window.matchMedia("(max-width: 899px)").matches) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    el.querySelectorAll(".anno:not(.static)").forEach((b) => b.addEventListener("click", () => select(b.dataset.n)));
    el.querySelectorAll("#b-list li").forEach((li) => li.addEventListener("click", () => select(li.dataset.n)));
  }

  A.views.brief = { render };
})();
