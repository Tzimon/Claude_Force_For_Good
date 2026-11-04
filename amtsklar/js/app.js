/*
 * Amtsklar – app shell: routing, language, deadline calculator view.
 * Other views register themselves on Amtsklar.views before this file runs
 * or after (rendering happens on DOMContentLoaded).
 */
(function () {
  "use strict";
  const A = (window.Amtsklar = window.Amtsklar || {});
  A.views = A.views || {};
  const { LANGS, t: tr } = A.i18n;
  const D = A.deadline;

  const ROUTES = ["frist", "woerter", "vorlagen", "hilfe"];
  const state = {
    lang: "de",
    route: "frist",
    shared: {}, // data passed between views, e.g. deadline -> template
  };

  // ---------------------------------------------------------------- helpers
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem("amtsklar." + key);
      localStorage.setItem("amtsklar." + key, value);
    } catch (e) {
      return null;
    }
    return null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function t(key, vars) {
    return tr(state.lang, key, vars);
  }

  function fmtDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  }

  function todayISO() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function h(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content;
  }

  async function copyText(text, button, doneLabel) {
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        const old = button.textContent;
        button.textContent = doneLabel || "✓";
        setTimeout(() => (button.textContent = old), 1600);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  A.util = { esc, fmtDate, todayISO, h, copyText, store, t: (k, v) => t(k, v), state };

  // ---------------------------------------------------------------- deadline view
  const fristForm = {
    delivery: "post",
    date: "",
    period: "1m",
    state: "BY",
  };

  function renderFrist(el) {
    const savedState = store("state");
    if (savedState && D.STATES[savedState]) fristForm.state = savedState;
    if (!fristForm.date) {
      // Example: a letter dated ten days ago, so the first view shows a real result
      const d = new Date();
      d.setDate(d.getDate() - 10);
      fristForm.date = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    }

    const stateOptions = Object.entries(D.STATES)
      .map(([code, name]) => `<option value="${code}"${code === fristForm.state ? " selected" : ""}>${esc(name)}</option>`)
      .join("");
    const periodOptions = ["1w", "2w", "1m", "3m", "1y"]
      .map((p) => `<option value="${p}"${p === fristForm.period ? " selected" : ""}>${esc(t("frist.period." + p))}</option>`)
      .join("");
    const how = ["post", "formal", "known"]
      .map(
        (k) => `
        <label class="choice">
          <input type="radio" name="delivery" id="delivery-${k}" value="${k}"${fristForm.delivery === k ? " checked" : ""}>
          <span>${esc(t("frist.how." + k))}</span>
          <span class="hint">${esc(t("frist.how." + k + ".hint"))}</span>
        </label>`
      )
      .join("");

    el.replaceChildren(
      h(`
      <section class="view" aria-labelledby="frist-title">
        <header style="display:grid;gap:10px">
          <p class="eyebrow">${esc(t("frist.eyebrow"))}</p>
          <h2 id="frist-title">${esc(t("frist.title"))}</h2>
          <p class="lede">${esc(t("frist.lede"))}</p>
        </header>
        <form class="sheet" id="frist-form" novalidate>
          <fieldset class="field" style="border:0;padding:0;margin:0">
            <legend class="label" style="font-weight:700;margin-bottom:6px">${esc(t("frist.how"))}</legend>
            <div class="choices">${how}</div>
          </fieldset>
          <div class="row-2">
            <div class="field">
              <label for="frist-date" id="frist-date-label"></label>
              <input type="date" id="frist-date" value="${esc(fristForm.date)}" required>
              <span class="hint" id="frist-date-hint"></span>
            </div>
            <div class="field">
              <label for="frist-period">${esc(t("frist.period"))}</label>
              <select id="frist-period">${periodOptions}</select>
              <span class="hint">${esc(t("frist.period.hint"))}</span>
            </div>
          </div>
          <div class="field">
            <label for="frist-state">${esc(t("frist.state"))}</label>
            <select id="frist-state">${stateOptions}</select>
            <span class="hint">${esc(t("frist.state.hint"))}</span>
          </div>
        </form>
        <section class="sheet result" id="frist-result" aria-live="polite"></section>
        <section class="sheet">
          <h3>${esc(t("frist.tips"))}</h3>
          <ul style="margin:0;padding-inline-start:1.2em;display:grid;gap:8px">
            <li>${esc(t("frist.tip.1"))}</li>
            <li>${esc(t("frist.tip.2"))}</li>
            <li>${esc(t("frist.tip.3"))}</li>
            <li>${esc(t("frist.tip.4"))}</li>
          </ul>
        </section>
      </section>`)
    );

    const form = el.querySelector("#frist-form");
    const update = (animate) => {
      fristForm.delivery = form.querySelector('input[name="delivery"]:checked').value;
      fristForm.date = form.querySelector("#frist-date").value;
      fristForm.period = form.querySelector("#frist-period").value;
      fristForm.state = form.querySelector("#frist-state").value;
      store("state", fristForm.state);
      form.querySelector("#frist-date-label").textContent = t("frist.date." + fristForm.delivery);
      form.querySelector("#frist-date-hint").textContent = t("frist.date." + fristForm.delivery + ".hint");
      renderFristResult(el.querySelector("#frist-result"), animate);
    };
    form.addEventListener("input", () => update(true));
    form.addEventListener("change", () => update(true));
    form.addEventListener("submit", (e) => e.preventDefault());
    update(false);
  }

  function renderFristResult(box, animate) {
    let r;
    try {
      r = D.compute({ ...fristForm, today: todayISO() });
    } catch (e) {
      box.replaceChildren(h(`<p class="callout warn">${esc(t("frist.invalid"))}</p>`));
      return;
    }
    state.shared.deadline = r;

    const stepText = (s) => {
      if (s.key === "fiction") return { text: t("frist.step.fiction", { from: fmtDate(s.from), days: s.days, to: fmtDate(s.to) }), law: t("frist.law.fiction") };
      if (s.key === "formal" || s.key === "known") return { text: t("frist.step." + s.key, { to: fmtDate(s.to) }), law: "" };
      if (s.key === "period")
        return { text: t("frist.step.period", { period: t("period." + s.period), from: fmtDate(s.from), to: fmtDate(s.to) }), law: t("frist.law.period") };
      if (s.key === "monthEnd") return { text: t("frist.step.monthEnd", { to: fmtDate(s.to) }), law: t("frist.law.monthEnd") };
      if (s.key === "shift") {
        const list = s.skipped
          .map((x) => `${fmtDate(x.date)}: ${x.reason.type === "holiday" ? x.reason.name : t("weekday." + D.parseISO(x.date).getUTCDay())}`)
          .join(", ");
        return { text: t("frist.step.shift", { list, to: fmtDate(s.to) }), law: t("frist.law.shift") };
      }
      return { text: "", law: "" };
    };

    let countdown = "";
    let cls = "countdown";
    if (r.daysLeft !== null) {
      if (r.daysLeft < 0) {
        countdown = t("frist.daysLeft.past", { n: -r.daysLeft });
        cls += " past";
      } else if (r.daysLeft === 0) {
        countdown = t("frist.daysLeft.0");
        cls += " urgent";
      } else if (r.daysLeft === 1) {
        countdown = t("frist.daysLeft.1");
        cls += " urgent";
      } else {
        countdown = t("frist.daysLeft", { n: r.daysLeft });
        if (r.daysLeft <= 7) cls += " urgent";
      }
    }

    const warnings = r.warnings
      .map((w) =>
        w.key === "partialHoliday"
          ? `<p class="callout">${esc(t("frist.warn.partial", { date: fmtDate(w.date), name: w.name }))}</p>`
          : `<p class="small">${esc(t("frist.warn.received"))}</p>`
      )
      .join("");

    const deadlineText = `${t("weekday." + r.weekday)}, ${fmtDate(r.deadline)}`;
    box.replaceChildren(
      h(`
      <div class="stamp-wrap">
        <div class="stamp${animate ? " fresh" : ""}" role="img" aria-label="${esc(t("frist.result.label") + " " + deadlineText)}">
          <span class="stamp-label">${esc(t("frist.result.label"))}</span>
          <span class="stamp-date">${esc(fmtDate(r.deadline))}</span>
          <span class="stamp-day">${esc(t("weekday." + r.weekday))}</span>
        </div>
      </div>
      ${countdown ? `<p class="${cls}">${esc(countdown)}</p>` : ""}
      <p>${t("frist.result.end", { date: `<span class="mark">${esc(deadlineText)}</span>` })}</p>
      ${r.daysLeft !== null && r.daysLeft < 0 ? `<p class="callout warn">${esc(t("frist.past.help"))}</p>` : ""}
      <div style="display:grid;gap:4px">
        <h3>${esc(t("frist.steps"))}</h3>
        <ol class="steps">
          ${r.steps
            .map((s) => {
              const x = stepText(s);
              return `<li><div><p>${esc(x.text)}</p>${x.law ? `<p class="law">${esc(x.law)}</p>` : ""}</div></li>`;
            })
            .join("")}
        </ol>
      </div>
      ${warnings}
      <div class="btn-row no-print">
        <a class="btn" href="#vorlagen" id="to-template" style="text-decoration:none">${esc(t("frist.toTemplate"))}</a>
        <button class="btn secondary" type="button" id="copy-result">${esc(t("frist.copy"))}</button>
      </div>
    `)
    );
    box.querySelector("#copy-result").addEventListener("click", (e) => {
      const lines = [
        `${t("frist.result.label")}: ${deadlineText}`,
        ...r.steps.map((s) => "- " + stepText(s).text),
        "",
        "Amtsklar – " + t("disclaimer"),
      ];
      copyText(lines.join("\n"), e.currentTarget, t("frist.copied"));
    });
  }

  A.views.frist = { render: renderFrist };

  // ---------------------------------------------------------------- shell
  function renderShell() {
    const lang = LANGS[state.lang];
    document.documentElement.lang = state.lang;
    document.documentElement.dir = lang.dir;

    document.querySelector("#tagline").textContent = t("tagline");
    document.querySelector("#lang-label").textContent = t("language");
    const select = document.querySelector("#lang");
    select.replaceChildren(
      ...Object.entries(LANGS).map(([code, l]) => {
        const o = document.createElement("option");
        o.value = code;
        o.textContent = l.name;
        o.selected = code === state.lang;
        return o;
      })
    );
    const nav = document.querySelector("#tabs");
    nav.replaceChildren(
      ...ROUTES.filter((r) => A.views[r]).map((r) => {
        const a = document.createElement("a");
        a.className = "tab";
        a.href = "#" + r;
        a.textContent = t("nav." + r);
        if (r === state.route) a.setAttribute("aria-current", "page");
        return a;
      })
    );
    document.querySelector("#disclaimer").textContent = t("disclaimer");
    document.querySelector("#privacy").textContent = t("footer.privacy");
    document.querySelector("#source-label").textContent = t("footer.source");
    document.querySelector("#updated").textContent = t("footer.updated");
  }

  function render() {
    renderShell();
    const view = A.views[state.route] || A.views.frist;
    view.render(document.querySelector("#view"), { t, state });
  }

  function routeFromHash() {
    const name = location.hash.replace(/^#/, "");
    return ROUTES.includes(name) && A.views[name] ? name : "frist";
  }

  function init() {
    const saved = store("lang");
    const browser = (navigator.language || "de").slice(0, 2);
    state.lang = LANGS[saved] ? saved : LANGS[browser] ? browser : "de";
    state.route = routeFromHash();
    document.querySelector("#lang").addEventListener("change", (e) => {
      state.lang = e.target.value;
      store("lang", state.lang);
      render();
    });
    window.addEventListener("hashchange", () => {
      state.route = routeFromHash();
      render();
      window.scrollTo(0, 0);
    });
    render();
  }

  A.rerender = render;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
