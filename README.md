# Claude Force For Good

Using a limited budget of AI compute to build and contribute things that help people,
with a focus on Germany.

---

## Amtsklar – Behördenbriefe verstehen

**Amtsklar** ("officially clear") is a free web app that helps people understand and answer
German official letters (*Behördenbriefe*): from the Jobcenter, Finanzamt, Ausländerbehörde,
Familienkasse and others.

Every year millions of people receive decisions (*Bescheide*) they cannot fully understand.
If they miss the deadline to object, the decision becomes final, even when it is wrong.
Migrants are hit hardest, but complicated *Amtsdeutsch* confuses native speakers too.

### What it does

| Section | What you get |
|---|---|
| **Frist** – deadline calculator | Calculates the last day to object. It applies the 4-day delivery rule for letters (3 days for letters sent before 2025), the § 188 BGB month rules, and the weekend and public holiday shift for all 16 federal states. It explains every step with the legal source, and always recommends the safe (earliest) date. |
| **Wörter** – Amtsdeutsch decoder | 65 bureaucratic terms explained in plain German and English, each with a practical tip. Searchable and filterable by topic. |
| **Vorlagen** – letter templates | Six ready-to-send German letters: objection (*Widerspruch*), request for review (*Überprüfungsantrag*, § 44 SGB X), access to my file, payment in instalments, more time for documents, and an informal application. |
| **Hilfe** – free help | Nationwide free counselling services, crisis lines, and what to bring to an appointment. |

Principles:

- **No sign-up, no tracking, no server.** Everything runs in the browser. Name and address for letters are stored only on the user's device.
- **Works offline.** `amtsklar/dist/amtsklar.html` is one self-contained file. You can e-mail it, put it on a USB stick, and double-click to open.
- **Accessible and readable.** Plain language, large legible type (Atkinson Hyperlegible), keyboard-friendly, light and dark mode, works on phones.
- **Conservative by design.** When the law is ambiguous, Amtsklar recommends the earlier date.

### Try it

- Website: enable GitHub Pages (see below). The app is then at `https://tzimon.github.io/Claude_Force_For_Good/`
- Offline: download [`amtsklar/dist/amtsklar.html`](amtsklar/dist/amtsklar.html) and open it in any browser.
- Locally: open `amtsklar/index.html`.

### Project structure

```
amtsklar/
  index.html            app page (loads the files below)
  css/app.css           styles (design tokens, light/dark)
  js/deadline.js        deadline engine – pure functions, unit-tested
  js/i18n.js            interface strings (de, en, …)
  js/app.js             shell, routing, deadline view
  js/data/*.js          content: glossary, letter templates, help directory
  js/views/*.js         glossary, templates and help views
  tests/*.test.js       node --test
  tools/build.js        bundles everything into dist/amtsklar.html
  dist/                 single-file builds (committed)
```

Development needs only Node.js and no dependencies:

```bash
cd amtsklar
node --test tests/*.test.js   # run tests
node tools/build.js           # rebuild dist/ after changes
```

### Deploying (one-time setup)

1. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to the default branch. The workflow `.github/workflows/amtsklar.yml` runs the tests and deploys `amtsklar/` to Pages.

### Help wanted

- **Legal review:** a lawyer or social counsellor checks the deadline rules, glossary and templates.
- **Translations:** native speakers for Ukrainian, Arabic, Turkish, Russian, Farsi, Dari, Pashto, Kurdish, Tigrinya and other languages.
- **Link check:** confirm the help directory links (they could not be checked from the build environment).
- **Spread the word:** migration counselling services, Tafeln, libraries, refugee initiatives.

> Amtsklar is not legal advice. The content is checked carefully, but laws change and every case is different.

---

## Earlier contributions: Integreat CMS

Integreat is an open-source multilingual app for refugees and migrants, used by 80+ German
municipalities and maintained by Tür an Tür – Digitalfabrik gGmbH in Augsburg.

| Issue | Change | Status |
|-------|--------|--------|
| [#3808](https://github.com/digitalfabrik/integreat-cms/issues/3808) | Push notifications from the test CMS go to `…-test` topics instead of reaching real users. Also makes pytest collect `TestFirebaseApiClient` again, which CI had been skipping silently. | PR [#4686](https://github.com/digitalfabrik/integreat-cms/pull/4686) |
| [#3339](https://github.com/digitalfabrik/integreat-cms/issues/3339) | URL fields get `https://` added automatically. | PR [#4687](https://github.com/digitalfabrik/integreat-cms/pull/4687) |
| [#4207](https://github.com/digitalfabrik/integreat-cms/issues/4207) | The licenses link appears only next to the current version. | Branch ready; opens when a PR slot is free (open-PR limit) |

Patches and PR texts: [`contributions/integreat-cms/`](contributions/integreat-cms/).
