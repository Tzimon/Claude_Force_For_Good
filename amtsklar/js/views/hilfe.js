/* Amtsklar – free help view */
(function () {
  "use strict";
  const A = (window.Amtsklar = window.Amtsklar || {});
  A.views = A.views || {};
  const { HELP, GROUPS } = A.help;

  function render(el) {
    const { esc, h, t, state } = A.util;
    const lang = state.lang;
    const tx = (o) => o[lang] || o.en || o.de;
    el.replaceChildren(
      h(`
      <section class="view" aria-labelledby="h-title">
        <header style="display:grid;gap:10px">
          <p class="eyebrow">${esc(t("h.eyebrow"))}</p>
          <h2 id="h-title">${esc(t("h.title"))}</h2>
          <p class="lede">${esc(t("h.lede"))}</p>
        </header>
        <p class="callout warn"><strong>${esc(t("h.emergency"))}</strong></p>
        ${Object.keys(GROUPS)
          .map(
            (g) => `
          <section class="sheet" aria-labelledby="h-${g}">
            <h3 id="h-${g}">${esc(tx(GROUPS[g]))}</h3>
            <div class="help-list">
              ${HELP.filter((x) => x.group === g)
                .map(
                  (x) => `
                <article class="help-item">
                  <h3>${esc(tx(x.name))}</h3>
                  <p>${esc(tx(x.what))}</p>
                  ${x.phone ? `<p>${esc(t("h.phone"))}: <span class="phone">${esc(x.phone)}</span></p>` : ""}
                  ${x.url ? `<p><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.url.replace(/^https:\/\/(www\.)?/, ""))}</a></p>` : ""}
                </article>`
                )
                .join("")}
            </div>
          </section>`
          )
          .join("")}
        <section class="sheet">
          <h3>${esc(t("h.bring"))}</h3>
          <ul style="margin:0;padding-inline-start:1.2em;display:grid;gap:6px">
            <li>${esc(t("h.bring.1"))}</li><li>${esc(t("h.bring.2"))}</li><li>${esc(t("h.bring.3"))}</li><li>${esc(t("h.bring.4"))}</li>
          </ul>
        </section>
      </section>`)
    );
  }
  A.views.hilfe = { render };
})();
