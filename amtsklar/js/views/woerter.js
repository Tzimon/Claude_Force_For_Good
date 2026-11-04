/* Amtsklar – glossary view (Amtsdeutsch decoder) */
(function () {
  "use strict";
  const A = (window.Amtsklar = window.Amtsklar || {});
  A.views = A.views || {};
  const { CATS, TERMS } = A.glossary;
  let query = "";
  let cat = "";

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
  }

  function texts(term, lang) {
    if (term[lang]) return term[lang];
    const extra = A.glossaryI18n && A.glossaryI18n[lang] && A.glossaryI18n[lang][term.w];
    // Translated meaning; the practical tip falls back to English and is marked as such
    if (extra) return { p: extra, tip: term.en.tip, tipLang: "en" };
    return term.en || term.de;
  }

  function render(el) {
    const { esc, h, t, state } = A.util;
    const lang = state.lang;
    const catLabel = (c) => (CATS[c][lang] || CATS[c].en || CATS[c].de);
    el.replaceChildren(
      h(`
      <section class="view" aria-labelledby="w-title">
        <header style="display:grid;gap:10px">
          <p class="eyebrow">${esc(t("w.eyebrow"))}</p>
          <h2 id="w-title">${esc(t("w.title"))}</h2>
          <p class="lede">${esc(t("w.lede"))}</p>
        </header>
        <div class="field">
          <label for="w-search">${esc(t("w.search"))}</label>
          <input type="search" id="w-search" placeholder="${esc(t("w.placeholder"))}" value="${esc(query)}" autocomplete="off">
        </div>
        <div class="chips" role="group" aria-label="${esc(t("w.filter"))}">
          <button type="button" class="chip" data-cat="" aria-pressed="${cat === ""}">${esc(t("w.all"))}</button>
          ${Object.keys(CATS).map((c) => `<button type="button" class="chip" data-cat="${c}" aria-pressed="${cat === c}">${esc(catLabel(c))}</button>`).join("")}
        </div>
        <p class="small" id="w-count" aria-live="polite"></p>
        <div class="terms" id="w-list"></div>
      </section>`)
    );

    const list = el.querySelector("#w-list");
    const count = el.querySelector("#w-count");
    const draw = () => {
      const q = norm(query.trim());
      const hits = TERMS.filter((x) => {
        if (cat && x.cat !== cat) return false;
        if (!q) return true;
        const tx = texts(x, lang);
        return [x.w, x.alt, tx.p, x.de.p, x.en.p].some((s) => norm(s).includes(q));
      }).sort((a, b) => {
        // exact/prefix matches on the term first, then alphabetical
        const qa = q && norm(a.w).startsWith(q) ? 0 : 1;
        const qb = q && norm(b.w).startsWith(q) ? 0 : 1;
        return qa - qb || a.w.localeCompare(b.w, "de");
      });
      count.textContent = t("w.count", { n: hits.length });
      if (!hits.length) {
        list.replaceChildren(h(`<p class="empty">${esc(t("w.none"))}</p>`));
        return;
      }
      list.replaceChildren(
        h(
          hits
            .map((x) => {
              const tx = texts(x, lang);
              const showDe = lang !== "de";
              return `<article class="term" id="term-${esc(norm(x.w).replace(/[^a-z0-9]+/g, "-"))}">
                <div class="term-head"><span class="term-word" lang="de">${esc(x.w)}</span><span class="term-cat">${esc(catLabel(x.cat))}</span></div>
                <p class="term-plain">${esc(tx.p)}</p>
                ${tx.tip ? `<p class="term-tip"${tx.tipLang ? ` lang="${tx.tipLang}" dir="ltr"` : ""}>→ ${esc(tx.tip)}</p>` : ""}
                ${showDe ? `<details class="small"><summary>${esc(t("w.inGerman"))}</summary><p lang="de">${esc(x.de.p)} ${esc(x.de.tip || "")}</p></details>` : ""}
                ${x.alt ? `<p class="small" lang="de">${esc(t("w.also"))}: ${esc(x.alt)}</p>` : ""}
              </article>`;
            })
            .join("")
        )
      );
    };

    el.querySelector("#w-search").addEventListener("input", (e) => {
      query = e.target.value;
      draw();
    });
    el.querySelectorAll(".chip").forEach((b) =>
      b.addEventListener("click", () => {
        cat = b.dataset.cat;
        el.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        draw();
      })
    );
    draw();
  }

  A.views.woerter = { render };
})();
