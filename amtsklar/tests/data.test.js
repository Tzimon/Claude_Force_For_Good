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
