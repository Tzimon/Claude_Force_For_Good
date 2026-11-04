# Mitmachen bei Amtsklar / Contributing

Danke, dass du helfen möchtest! / Thank you for wanting to help!

## Ohne Programmierkenntnisse / No coding needed

- **Fachliche Prüfung:** Du arbeitest in einer Beratungsstelle, bist Jurist*in oder
  Sozialarbeiter*in? Lies [`amtsklar/RECHTSGRUNDLAGEN.md`](amtsklar/RECHTSGRUNDLAGEN.md) und
  melde Fehler als [Issue](https://github.com/Tzimon/Claude_Force_For_Good/issues).
- **Übersetzungen prüfen:** Ukrainisch, Arabisch, Türkisch und Russisch sind KI-gestützt
  übersetzt. Muttersprachler*innen können Verbesserungen als Issue schicken – einfach den
  falschen und den richtigen Satz nennen.
- **Neue Sprache:** Farsi/Dari, Paschtu, Kurdisch, Tigrinya, Somali, Polnisch, Rumänisch,
  Bulgarisch … sind sehr willkommen.
- **Weitersagen:** Den [Flyer](amtsklar/amtsklar-flyer.pdf) ausdrucken und in Beratungsstellen,
  Tafeln, Bibliotheken, Sprachschulen oder Unterkünften aufhängen.

## Mit Programmierkenntnissen / With code

No build step, no dependencies. Only Node.js for the tests.

```bash
cd amtsklar
node --test tests/*.test.js   # all tests must pass
node tools/build.js           # rebuild dist/ – commit it together with your change
```

Where things live:

| What | File |
|---|---|
| Deadline rules, holidays | `js/deadline.js` (+ tests in `tests/deadline.test.js`) |
| Interface text | `js/i18n.js` (de, en), `js/i18n/<lang>.js` |
| Glossary | `js/data/glossary.js`, translations `js/data/glossary-<lang>.js` |
| Guides | `js/data/guides.js`, translations `js/data/guides-<lang>.js` |
| Letter templates | `js/data/templates.js` |
| Help directory | `js/data/help.js` |

Adding a language: copy `js/i18n/uk.js` to `js/i18n/<code>.js`, translate the values, then add
the script to `index.html` and `sw.js`. The tests show any missing keys or placeholders.

Rules of thumb:

- Plain language. Short sentences. Explain German terms; do not hide them – people need to
  recognise them in their letters.
- When the law is ambiguous, the app recommends the earlier, safe date.
- No tracking, no accounts, no server, no external scripts at runtime.
