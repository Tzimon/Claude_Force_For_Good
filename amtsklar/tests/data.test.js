// Consistency checks for content data. Run with: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
global.self = global;
require("../js/i18n.js");
require("../js/data/glossary.js");
const { T } = global.Amtsklar.i18n;
const { CATS, TERMS } = global.Amtsklar.glossary;

test("every interface string exists in German and English", () => {
  const de = Object.keys(T.de), en = Object.keys(T.en);
  assert.deepEqual(de.filter((k) => !en.includes(k)), []);
  assert.deepEqual(en.filter((k) => !de.includes(k)), []);
});

test("glossary entries are complete and unique", () => {
  const seen = new Set();
  for (const x of TERMS) {
    assert.ok(x.w && CATS[x.cat], `term/category: ${x.w}`);
    assert.ok(x.de && x.de.p, `German text: ${x.w}`);
    assert.ok(x.en && x.en.p, `English text: ${x.w}`);
    assert.ok(!seen.has(x.w), `duplicate: ${x.w}`);
    seen.add(x.w);
  }
  assert.ok(TERMS.length >= 60);
});

test("letter templates build complete German letters", () => {
  require("../js/data/templates.js");
  const { TEMPLATES, COMMON, buildLetter } = global.Amtsklar.templates;
  for (const tpl of TEMPLATES) {
    assert.ok(tpl.de.title && tpl.en.title && tpl.notes.de.length && tpl.notes.en.length, tpl.id);
    const empty = buildLetter(tpl, {}, "2026-11-04");
    assert.match(empty, /\[Ihr Vor- und Nachname\]/, tpl.id + " shows placeholders");
    const values = {};
    for (const f of [...COMMON, ...tpl.fields]) values[f.id] = f.type === "date" ? "2026-10-20" : f.type === "check" ? true : "X";
    const full = buildLetter(tpl, values, "2026-11-04");
    assert.doesNotMatch(full, /\[[^\]]+\]/, tpl.id + " has no gaps when filled");
    assert.match(full, /Sehr geehrte Damen und Herren,/);
    assert.match(full, /04\.11\.2026/);
  }
});

test("every translation covers all interface strings", () => {
  require("../js/i18n/uk.js");
  require("../js/i18n/ar.js");
  require("../js/i18n/tr.js");
  require("../js/i18n/ru.js");
  require("../js/i18n/fa.js");
  const en = Object.keys(T.en);
  for (const lang of Object.keys(global.Amtsklar.i18n.LANGS)) {
    const keys = Object.keys(T[lang]);
    assert.deepEqual(en.filter((k) => !keys.includes(k)), [], `${lang} missing keys`);
    assert.deepEqual(keys.filter((k) => !en.includes(k)), [], `${lang} unknown keys`);
    for (const k of en) {
      const vars = (T.en[k].match(/\{\w+\}/g) || []).sort().join();
      assert.equal((T[lang][k].match(/\{\w+\}/g) || []).sort().join(), vars, `${lang}.${k} placeholders`);
    }
  }
});

test("glossary translations cover every term", () => {
  for (const l of ["uk", "ar", "tr", "ru", "fa"]) require(`../js/data/glossary-${l}.js`);
  const tr = global.Amtsklar.glossaryI18n;
  for (const l of ["uk", "ar", "tr", "ru", "fa"]) {
    const keys = Object.keys(tr[l]);
    assert.deepEqual(TERMS.map((x) => x.w).filter((w) => !tr[l][w]), [], `${l} missing`);
    assert.deepEqual(keys.filter((k) => !TERMS.some((x) => x.w === k)), [], `${l} unknown`);
    for (const c of Object.keys(CATS)) assert.ok(CATS[c][l], `${l} category ${c}`);
  }
});

test("service worker caches every script the page loads", () => {
  const fs = require("fs");
  const path = require("path");
  const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
  const sw = fs.readFileSync(path.join(__dirname, "../sw.js"), "utf8");
  for (const [, src] of html.matchAll(/<script src="([^"]+)"/g)) assert.ok(sw.includes(`"${src}"`), `sw.js misses ${src}`);
});

test("guides are complete and link to existing content", () => {
  require("../js/data/guides.js");
  const { GUIDES } = global.Amtsklar.guides;
  const tpl = global.Amtsklar.templates.TEMPLATES.map((x) => x.id);
  for (const g of GUIDES) {
    for (const l of ["de", "en"]) {
      const x = g[l];
      assert.ok(x.t && x.s && x.check.length && x.steps.length, `${g.id}.${l}`);
      assert.equal(x.check.length, g.de.check.length, `${g.id}.${l} check count`);
      assert.equal(x.steps.length, g.de.steps.length, `${g.id}.${l} steps count`);
      assert.equal(!!x.warn, !!g.de.warn, `${g.id}.${l} warn`);
    }
    if (g.template) assert.ok(tpl.includes(g.template), `${g.id} template`);
    if (g.period) assert.ok(["1w", "2w", "1m", "3m", "1y"].includes(g.period));
    for (const w of g.terms || []) assert.ok(TERMS.some((x) => x.w === w), `${g.id} term ${w}`);
  }
});

test("guide translations match the German structure", () => {
  const { GUIDES } = global.Amtsklar.guides;
  for (const l of ["uk", "ar", "tr", "ru", "fa"]) {
    require(`../js/data/guides-${l}.js`);
    const tr = global.Amtsklar.guidesI18n[l];
    assert.deepEqual(Object.keys(tr).sort(), GUIDES.map((g) => g.id).sort(), `${l} guide ids`);
    for (const g of GUIDES) {
      const x = tr[g.id];
      assert.ok(x.t && x.s, `${l}.${g.id} title`);
      assert.equal(x.check.length, g.de.check.length, `${l}.${g.id} check`);
      assert.equal(x.steps.length, g.de.steps.length, `${l}.${g.id} steps`);
      assert.equal(!!x.warn, !!g.de.warn, `${l}.${g.id} warn`);
    }
  }
});
