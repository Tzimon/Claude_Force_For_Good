/* Amtsklar – letter templates view */
(function () {
  "use strict";
  const A = (window.Amtsklar = window.Amtsklar || {});
  A.views = A.views || {};
  const { COMMON, TEMPLATES, buildLetter } = A.templates;

  let current = "widerspruch";
  const values = {};
  let loaded = false;

  function load() {
    if (loaded) return;
    loaded = true;
    const raw = A.util.store("letter");
    if (raw) {
      try {
        Object.assign(values, JSON.parse(raw));
      } catch (e) {
        /* ignore */
      }
    }
  }

  function save() {
    // Only personal fields that repeat across letters are remembered on this device.
    const keep = {};
    for (const f of COMMON) if (values[f.id]) keep[f.id] = values[f.id];
    A.util.store("letter", JSON.stringify(keep));
  }

  // Translated labels from templatesI18n (uk, ar, tr, ru, fa), else the label on the field (de, en)
  function labelFor(f, lang, tplId) {
    const L = A.templatesI18n && A.templatesI18n[lang];
    if (L) {
      const own = tplId ? L.tpl[tplId] && L.tpl[tplId].fields[f.id] : L.common[f.id];
      if (own) return own;
    }
    return f[lang] || f.en || f.de;
  }

  function inputHtml(f, lang, esc, tplId) {
    const label = labelFor(f, lang, tplId);
    const id = "f-" + f.id;
    const val = values[f.id] ?? "";
    if (f.type === "check") {
      return `<label class="choice" style="grid-column:1/-1"><input type="checkbox" id="${id}" data-id="${f.id}"${val === true ? " checked" : ""}><span>${esc(label)}</span></label>`;
    }
    const ph = f.ph ? ` placeholder="${esc(f.ph)}"` : "";
    let control;
    if (f.type === "textarea") control = `<textarea id="${id}" data-id="${f.id}" rows="${f.rows || 3}"${ph}>${esc(val)}</textarea>`;
    else if (f.type === "date") control = `<input type="date" id="${id}" data-id="${f.id}" value="${esc(val)}">`;
    else control = `<input type="text" id="${id}" data-id="${f.id}" value="${esc(val)}"${ph}${f.type === "money" ? ' inputmode="decimal"' : ""}>`;
    const wide = f.type === "textarea" ? ' style="grid-column:1/-1"' : "";
    return `<div class="field"${wide}><label for="${id}">${esc(label)}</label>${control}</div>`;
  }

  function render(el) {
    const { esc, h, t, state, todayISO, copyText } = A.util;
    const lang = state.lang;
    load();
    if (state.shared.template) {
      current = state.shared.template;
      state.shared.template = null;
    }
    // Take over the letter date from the deadline calculator, if available
    if (state.shared.letterDate && !values.letterDate) values.letterDate = state.shared.letterDate;

    const tpl = TEMPLATES.find((x) => x.id === current) || TEMPLATES[0];
    const L = A.templatesI18n && A.templatesI18n[lang];
    const tx = (x) => x[lang] || (L && L.tpl[x.id]) || x.en || x.de;
    const inFrame = window.self !== window.top;

    el.replaceChildren(
      h(`
      <section class="view" aria-labelledby="v-title">
        <header style="display:grid;gap:10px">
          <p class="eyebrow">${esc(t("v.eyebrow"))}</p>
          <h2 id="v-title">${esc(t("v.title"))}</h2>
          <p class="lede">${esc(t("v.lede"))}</p>
        </header>
        <div class="tpl-list" role="group" aria-label="${esc(t("v.choose"))}">
          ${TEMPLATES.map((x) => `<button type="button" class="tpl-card" data-id="${x.id}" aria-pressed="${x.id === tpl.id}"><strong>${esc(tx(x).title)}</strong><span class="small">${esc(tx(x).desc)}</span></button>`).join("")}
        </div>
        <form class="sheet" id="v-form" novalidate>
          <h3>${esc(t("v.you"))}</h3>
          <div class="row-2">${COMMON.map((f) => inputHtml(f, lang, esc)).join("")}</div>
          <h3>${esc(tx(tpl).title)}</h3>
          <div class="row-2">${tpl.fields.map((f) => inputHtml(f, lang, esc, tpl.id)).join("")}</div>
          <p class="small">${esc(t("v.privacy"))}</p>
        </form>
        <section class="sheet" aria-labelledby="v-letter-title">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
            <h3 id="v-letter-title">${esc(t("v.letter"))}</h3>
            <div class="btn-row no-print">
              <button type="button" class="btn" id="v-copy">${esc(t("v.copy"))}</button>
              ${inFrame ? "" : `<button type="button" class="btn secondary" id="v-print">${esc(t("v.print"))}</button><button type="button" class="btn secondary" id="v-download">${esc(t("v.download"))}</button>`}
            </div>
          </div>
          <pre class="letter" id="v-letter" lang="de"></pre>
          <p class="small" id="v-missing"></p>
          <div class="callout"><strong>${esc(t("v.notes"))}</strong>
            <ul style="margin:6px 0 0;padding-inline-start:1.2em;display:grid;gap:4px">${(tpl.notes[lang] || (L && L.tpl[tpl.id] && L.tpl[tpl.id].notes) || tpl.notes.en || tpl.notes.de).map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
          </div>
        </section>
      </section>`)
    );

    const letterEl = el.querySelector("#v-letter");
    const missingEl = el.querySelector("#v-missing");
    const draw = () => {
      const text = buildLetter(tpl, values, todayISO());
      letterEl.textContent = text;
      const missing = (text.match(/\[[^\]]+\]/g) || []).length;
      missingEl.textContent = missing ? t("v.missing", { n: missing }) : t("v.complete");
    };

    const form = el.querySelector("#v-form");
    form.addEventListener("input", (e) => {
      const id = e.target.dataset.id;
      if (!id) return;
      values[id] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      save();
      draw();
    });
    form.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      if (id && e.target.type === "checkbox") {
        values[id] = e.target.checked;
        draw();
      }
    });
    form.addEventListener("submit", (e) => e.preventDefault());

    el.querySelectorAll(".tpl-card").forEach((b) =>
      b.addEventListener("click", () => {
        current = b.dataset.id;
        render(el);
        el.querySelector("#v-form").scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );

    el.querySelector("#v-copy").addEventListener("click", async (e) => {
      const ok = await copyText(letterEl.textContent, e.currentTarget, t("frist.copied"));
      if (!ok) {
        const range = document.createRange();
        range.selectNodeContents(letterEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
    const printBtn = el.querySelector("#v-print");
    if (printBtn) printBtn.addEventListener("click", () => window.print());
    const dlBtn = el.querySelector("#v-download");
    if (dlBtn)
      dlBtn.addEventListener("click", () => {
        const blob = new Blob([letterEl.textContent], { type: "text/plain;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${tpl.id}.txt`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(a.href);
          a.remove();
        }, 500);
      });
    draw();
  }

  A.views.vorlagen = { render };
})();
