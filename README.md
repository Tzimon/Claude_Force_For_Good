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
| **Frist** – deadline calculator | Calculates the last day to object. It applies the 4-day delivery rule for letters (3 days for letters sent before 2025), the § 188 BGB month rules, and the weekend and public holiday shift for all 16 federal states. It explains every step with the legal source, always recommends the safe (earliest) date, and adds the deadline to your calendar with reminders 3 days and 1 day before. |
| **Brief** – how to read a decision | A sample *Bescheid* (made-up names) with nine numbered parts explained, plus a recommended reading order. |
| **Wörter** – Amtsdeutsch decoder | 65 bureaucratic terms explained in plain German and English, with the meanings also in Ukrainian, Arabic and Turkish. Each comes with a practical tip, and you can search or filter by topic. |
| **Vorlagen** – letter templates | Seven ready-to-send German letters: objection, request for review (§ 44 SGB X), reinstatement after a missed deadline, access to my file, payment in instalments, more time for documents, and an informal application. |
| **Hilfe** – free help | Nationwide free counselling services, crisis lines, and what to bring to an appointment. |

Languages: German, English, Ukrainian, Arabic (right-to-left) and Turkish. The Ukrainian, Arabic
and Turkish translations are AI-assisted and marked as such in the app.

Principles:

- **No sign-up, no tracking, no server.** Everything runs in the browser. Name and address for letters are stored only on the user's device.
- **Works offline.** It can be installed on a phone from the website. `amtsklar/dist/amtsklar.html` is one self-contained file you can e-mail or put on a USB stick.
- **Accessible.** Plain language and a highly legible typeface. axe-core finds no WCAG 2 A or AA violations in any section, in light or dark mode. Works on phones.
- **Conservative by design.** When the law is ambiguous, Amtsklar recommends the earlier date.
- **Tested.** 20 automated tests cover the deadline engine (holidays, month ends, delivery rules), letter generation, translation completeness and offline caching.

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
  js/i18n.js            interface strings (de, en); js/i18n/*.js uk, ar, tr
  js/app.js             shell, routing, deadline view
  js/data/*.js          content: glossary, letter templates, help directory
  js/views/*.js         letter, glossary, templates and help views
  sw.js, manifest.webmanifest, icon.svg   offline / installable app
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

### Legal basis

Every rule the app uses, with its source and the places that most need expert review:
[`amtsklar/RECHTSGRUNDLAGEN.md`](amtsklar/RECHTSGRUNDLAGEN.md) (German).

### Help wanted

- **Legal review:** a lawyer or social counsellor checks the deadline rules, glossary and templates.
- **Translations:** native speakers for Ukrainian, Arabic, Turkish, Russian, Farsi, Dari, Pashto, Kurdish, Tigrinya and other languages.
- **Link check:** confirm the help directory links (they could not be checked from the build environment).
- **Spread the word:** print the [flyer](amtsklar/amtsklar-flyer.pdf) for migration counselling services, Tafeln, libraries, refugee initiatives.

See [CONTRIBUTING.md](CONTRIBUTING.md).

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
