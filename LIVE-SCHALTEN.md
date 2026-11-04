# Amtsklar live schalten – Schritt für Schritt

Mit dieser Anleitung wird Amtsklar zu einer öffentlichen Website, kostenlos über **GitHub Pages**.
Du brauchst etwa 5 Minuten und musst nichts programmieren.

Danach ist die App erreichbar unter:

**https://tzimon.github.io/Claude_Force_For_Good/**

---

## Schritt 1: GitHub Pages einschalten

1. Öffne dein Repository: https://github.com/Tzimon/Claude_Force_For_Good
2. Klicke oben auf **Settings** (Zahnrad-Symbol, ganz rechts in der Leiste).
   Siehst du „Settings“ nicht, klicke auf **„…“**, dann erscheint es.
3. Klicke links in der Seitenleiste auf **Pages** (unter „Code and automation“).
4. Unter **Build and deployment** → **Source** wählst du **GitHub Actions**.
   (Nicht „Deploy from a branch“.)
5. Fertig. Speichern ist nicht nötig, die Auswahl gilt sofort.

## Schritt 2: Veröffentlichung starten

1. Klicke oben im Repository auf **Actions**.
2. Klicke links auf den Workflow **Amtsklar**.
3. Klicke rechts auf **Run workflow** und dann im kleinen Fenster noch einmal auf den grünen
   Button **Run workflow**.
4. Warte 1–2 Minuten. Wenn beide Schritte („test“ und „deploy“) einen **grünen Haken** haben,
   ist die Seite online.

Ab jetzt passiert das **automatisch bei jeder Änderung** am Code. Du musst Schritt 2 nur dieses
eine Mal von Hand machen.

## Schritt 3: Testen

Öffne **https://tzimon.github.io/Claude_Force_For_Good/** – auf dem Computer und auf dem Handy.

- Auf dem Handy kannst du Amtsklar über das Browser-Menü **„Zum Startbildschirm hinzufügen“**
  wie eine App installieren. Sie funktioniert dann auch ohne Internet.
- Der Flyer zum Ausdrucken liegt unter
  **https://tzimon.github.io/Claude_Force_For_Good/flyer.html**. Sein QR-Code führt genau auf
  diese Adresse.

---

## Wenn etwas nicht klappt

| Problem | Lösung |
|---|---|
| Bei „deploy“ steht ein rotes ✗ mit „Get Pages site failed“ | Schritt 1 ist noch nicht erledigt: Source muss auf **GitHub Actions** stehen. Danach in Actions beim fehlgeschlagenen Lauf **Re-run all jobs** klicken. |
| „Branch … is not allowed to deploy to github-pages due to environment protection rules“ | Settings → **Environments** → **github-pages** → unter „Deployment branches and tags“ den Branch `claude/modest-hypatia-5bzjqm` erlauben (oder „No restriction“ wählen). Dann den Lauf neu starten. |
| Der Workflow läuft gar nicht | Settings → **Actions** → **General** → „Allow all actions and reusable workflows“ wählen und speichern. |
| Die Seite zeigt „404“ | 1–2 Minuten warten und neu laden. Prüfen, ob „deploy“ einen grünen Haken hat. |
| Die Seite zeigt eine alte Version | Einmal neu laden (am Handy: Seite schließen und neu öffnen). Die Offline-Funktion hält kurz die alte Version vor. |
| Das Repository ist privat | GitHub Pages für private Repositories braucht ein bezahltes GitHub-Konto. Lösung: Settings → General → ganz unten **Change visibility** → **Public**. Amtsklar enthält keine geheimen Daten. |

---

## Gut zu wissen

- **Welcher Branch wird veröffentlicht?** Immer der *Standard-Branch* des Repositorys (zurzeit
  `claude/modest-hypatia-5bzjqm`, weil es der einzige ist). Wenn du später einen `main`-Branch
  anlegst und ihn unter Settings → General → **Default branch** als Standard einstellst, wird
  automatisch `main` veröffentlicht.
- **Eigene Adresse (optional):** Unter Settings → Pages → **Custom domain** kannst du eine eigene
  Domain eintragen, z. B. `amtsklar.de`, falls du eine kaufst. Dann musst du beim Domain-Anbieter
  einen DNS-Eintrag setzen – GitHub zeigt dir genau, welchen. Ändert sich die Adresse, muss der
  QR-Code im Flyer neu erzeugt werden.
- **Kosten:** GitHub Pages ist für öffentliche Repositories kostenlos.
- **Datenschutz:** Die Website hat kein Tracking und keine Cookies. Nur die Schriftarten kommen
  von Google Fonts.

## Ohne GitHub Pages teilen

Die Datei [`amtsklar/dist/amtsklar.html`](amtsklar/dist/amtsklar.html) enthält die komplette App
in **einer** Datei. Du kannst sie per E-Mail verschicken, auf einen USB-Stick kopieren oder auf
jeden beliebigen Webspace hochladen – Doppelklick genügt zum Öffnen.
