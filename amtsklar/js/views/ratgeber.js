/* Amtsklar – guides for common letters */
(function () {
  "use strict";
  const A = (window.Amtsklar = window.Amtsklar || {});
  A.views = A.views || {};
  const { GUIDES } = A.guides;
  let open = null;

  function render(el) {
    const { esc, h, t, state } = A.util;
    const lang = state.lang;
    const tx = (g) => g[lang] || g.en || g.de;
    if (state.shared.openGuide) {
      open = state.shared.openGuide;
      state.shared.openGuide = null;
    }
    el.replaceChildren(
      h(`
      <section class="view" aria-labelledby="r-title">
        <header style="display:grid;gap:10px">
          <p class="eyebrow">${esc(t("r.eyebrow"))}</p>
          <h2 id="r-title">${esc(t("r.title"))}</h2>
          <p class="lede">${esc(t("r.lede"))}</p>
          ${t("r.lang") ? `<p class="small">${esc(t("r.lang"))}</p>` : ""}
        </header>
        <div class="guides">
          ${GUIDES.map((g) => {
            const x = tx(g);
            return `<details class="guide" id="guide-${g.id}"${open === g.id ? " open" : ""}>
              <summary><span class="guide-title">${esc(x.t)}</span><span class="small">${esc(x.s)}</span></summary>
              <div class="guide-body">
                <div><h3>${esc(t("r.check"))}</h3><ul>${x.check.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
                <div><h3>${esc(t("r.steps"))}</h3><ol>${x.steps.map((c) => `<li>${esc(c)}</li>`).join("")}</ol></div>
                ${x.warn ? `<p class="callout">${esc(x.warn)}</p>` : ""}
                <div class="btn-row">
                  ${g.period ? `<button type="button" class="btn" data-action="frist" data-period="${g.period}">${esc(t("r.toFrist"))}</button>` : ""}
                  ${g.template ? `<button type="button" class="btn secondary" data-action="vorlage" data-template="${g.template}">${esc(t("r.toTemplate"))}</button>` : ""}
                </div>
                ${g.terms && g.terms.length ? `<div class="chips"><span class="small">${esc(t("r.terms"))}:</span>${g.terms.map((w) => `<button type="button" class="chip" data-action="wort" data-term="${esc(w)}" lang="de">${esc(w)}</button>`).join("")}</div>` : ""}
              </div>
            </details>`;
          }).join("")}
        </div>
        <p class="small">${esc(t("r.missing"))}</p>
      </section>`)
    );
    el.querySelectorAll("details.guide").forEach((d) =>
      d.addEventListener("toggle", () => {
        if (d.open) open = d.id.replace(/^guide-/, "");
      })
    );
    el.querySelector("section.view").addEventListener("click", (e) => {
      const b = e.target.closest("[data-action]");
      if (!b) return;
      if (b.dataset.action === "frist") {
        state.shared.period = b.dataset.period;
        location.hash = "#frist";
      } else if (b.dataset.action === "vorlage") {
        state.shared.template = b.dataset.template;
        location.hash = "#vorlagen";
      } else if (b.dataset.action === "wort") {
        state.shared.query = b.dataset.term;
        location.hash = "#woerter";
      }
    });
  }
  A.views.ratgeber = { render };
})();
