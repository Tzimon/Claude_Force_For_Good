# Amtsklar – Rechtsgrundlagen und Methodik

Dieses Dokument legt offen, auf welchen Regeln Amtsklar beruht. Es richtet sich an
Beratungsstellen, Jurist*innen und alle, die die Inhalte prüfen möchten.
**Stand: November 2026.** Fehler bitte als Issue melden:
https://github.com/Tzimon/Claude_Force_For_Good/issues

Amtsklar ist keine Rechtsberatung. Grundsatz bei unklarer Rechtslage: **Amtsklar nennt
immer das frühere, sichere Datum.**

---

## 1. Fristenrechner (`js/deadline.js`)

### 1.1 Bekanntgabe (Zugang des Bescheids)

| Zustellart in der App | Regel | Rechtsgrundlage |
|---|---|---|
| Normaler Brief, E-Mail, Online-Portal | Gilt am **4. Tag** nach Aufgabe zur Post bzw. Absendung als bekannt gegeben. Für Schreiben, die **vor dem 01.01.2025** abgesandt wurden: 3. Tag. | § 41 Abs. 2 VwVfG, § 37 Abs. 2 SGB X, § 122 Abs. 2 AO in der Fassung des Postrechtsmodernisierungsgesetzes |
| Gelber Umschlag (förmliche Zustellung) | Tag der Zustellung = Datum auf dem Umschlag | § 3 VwZG, §§ 177 ff. ZPO |
| Persönlich übergeben | Tag der Übergabe | § 5 VwZG / tatsächlicher Zugang |

**Bewusste Vereinfachung (konservativ):** Fällt der fiktive Bekanntgabetag auf ein Wochenende
oder einen Feiertag, verschiebt Amtsklar ihn **nicht**. Ob § 193 BGB bzw. § 108 Abs. 3 AO
auf den Bekanntgabetag anwendbar ist, beurteilen die Gerichtszweige unterschiedlich (für
die AO bejaht der BFH die Verschiebung). Ohne Verschiebung ergibt sich nie ein zu spätes Datum.

Ging der Brief später als am 4. Tag zu, verschiebt sich die Frist nach hinten. Die Behörde
trägt dafür die Beweislast. Amtsklar weist darauf hin, rechnet aber mit der Vermutung.

### 1.2 Fristbeginn und Fristende

- Der Tag der Bekanntgabe wird nicht mitgezählt (§ 187 Abs. 1 BGB, i. V. m. § 31 Abs. 1
  VwVfG, § 26 Abs. 1 SGB X, § 108 Abs. 1 AO, § 57 VwGO, § 64 SGG).
- Wochenfristen enden am gleichnamigen Wochentag, Monats- und Jahresfristen am Tag mit
  derselben Zahl (§ 188 Abs. 2 BGB).
- Fehlt dieser Tag im Zielmonat, endet die Frist am Monatsletzten (§ 188 Abs. 3 BGB).
  Beispiel: Bekanntgabe 31.01. → Fristende 28.02. bzw. 29.02.
- Fällt das Fristende auf einen Samstag, Sonntag oder gesetzlichen Feiertag, endet sie am
  nächsten Werktag (§ 193 BGB, § 31 Abs. 3 VwVfG, § 26 Abs. 3 SGB X, § 108 Abs. 3 AO,
  § 222 Abs. 2 ZPO, § 57 Abs. 2 VwGO, § 64 Abs. 3 SGG).

### 1.3 Feiertage

Maßgeblich sind die Feiertage am **Sitz der Behörde bzw. des Gerichts**.

- Bundesweit: Neujahr, Karfreitag, Ostermontag, 1. Mai, Christi Himmelfahrt, Pfingstmontag,
  3. Oktober, 1. und 2. Weihnachtstag.
- Landesrecht: Heilige Drei Könige (BW, BY, ST), Internationaler Frauentag (BE ab 2019, MV ab
  2023), Ostersonntag und Pfingstsonntag (BB), Fronleichnam (BW, BY, HE, NW, RP, SL),
  Mariä Himmelfahrt (SL), Weltkindertag (TH ab 2019), Reformationstag (BB, MV, SN, ST, TH;
  HB, HH, NI, SH ab 2018; bundesweit 2017), Allerheiligen (BW, BY, NW, RP, SL),
  Buß- und Bettag (SN), 8. Mai in Berlin 2020 und 2025 (einmalig).
- **Nur regional geltende Feiertage** (Fronleichnam in Teilen von SN und TH, Mariä Himmelfahrt
  in Teilen Bayerns, Augsburger Friedensfest) zählt Amtsklar **nicht** als fristverlängernd
  und zeigt stattdessen einen Hinweis.
- Ostern wird mit dem gregorianischen Algorithmus (anonymer Gregorianischer Algorithmus) berechnet.

### 1.4 Fristlängen in der Auswahl

| Auswahl | Typische Anwendung | Grundlage |
|---|---|---|
| 1 Monat | Widerspruch, Einspruch (Finanzamt), Klage | § 70 VwGO, § 84 SGG, § 355 AO, § 74 VwGO, § 87 SGG |
| 2 Wochen | Einspruch gegen Bußgeldbescheid und Strafbefehl, Widerspruch gegen Mahnbescheid | § 67 OWiG, § 410 StPO, § 692 Abs. 1 Nr. 3 ZPO |
| 1 Jahr | Fehlende oder unrichtige Rechtsbehelfsbelehrung | § 58 Abs. 2 VwGO, § 66 Abs. 2 SGG, § 356 Abs. 2 AO |

### 1.5 Tests

`tests/deadline.test.js` prüft unter anderem: Osterdaten, landesspezifische Feiertage,
Monatsenden inkl. Schaltjahr, 3- vs. 4-Tage-Fiktion, Verschiebung über Karfreitag bis
Dienstag nach Ostern, Reformationstag je nach Land, regionale Feiertage.

---

## 2. Musterbriefe (`js/data/templates.js`)

| Vorlage | Grundlage / Hinweis |
|---|---|
| Widerspruch | Fristwahrung ohne Begründung möglich, Begründung kann nachgereicht werden. |
| Überprüfungsantrag | § 44 SGB X; im SGB II/SGB XII Nachzahlung längstens ab Beginn des Vorjahres (§ 40 Abs. 1 SGB II, § 116a SGB XII) |
| Wiedereinsetzung | 2 Wochen: § 27 SGB X, § 32 VwVfG, § 60 VwGO. 1 Monat: § 67 SGG, § 110 AO. Die App nennt „meist 2 Wochen“ als sichere Untergrenze. |
| Akteneinsicht | § 25 SGB X, § 29 VwVfG; zusätzlich Auskunft nach Art. 15 DSGVO |
| Ratenzahlung | Kein Anerkenntnis, wenn ausdrücklich so formuliert; Hinweis auf parallelen Widerspruch |
| Fristverlängerung | Mitwirkungspflichten §§ 60 ff. SGB I |
| Formloser Antrag | Antragsprinzip, z. B. § 37 SGB II (Leistungen ab Antragsmonat) |

---

## 3. Inhalte mit erhöhtem Prüfbedarf

Diese Stellen sollten besonders von Fachleuten geprüft werden:

1. **Bürgergeld / neue Grundsicherung:** Die Reform kann Regeln (z. B. Leistungsminderungen,
   Aufrechnung) verändert haben. Die App formuliert hier bewusst allgemein.
2. **Ratgeber „Jobcenter will Geld zurück“:** Aufrechnung „meist 10 % des Regelbedarfs“
   (§ 43 SGB II, in bestimmten Fällen 30 %).
3. **Aufenthalt:** Fiktionswirkung nach § 81 Abs. 3 und 4 AufenthG. Für Menschen mit
   vorübergehendem Schutz (§ 24 AufenthG) gelten teils Sonderregeln.
4. **Hilfe-Verzeichnis:** Links und Telefonnummern konnten in der Entwicklungsumgebung nicht
   automatisch geprüft werden.
5. **Übersetzungen** (Ukrainisch, Arabisch, Türkisch, Russisch) sind KI-gestützt und in der App
   als solche gekennzeichnet.

---

## 4. Datenschutz

- Keine Server-Komponente, keine Cookies, kein Tracking, keine Analyse-Tools.
- Gespeichert wird nur im Browser des Geräts (`localStorage`): gewählte Sprache, Bundesland,
  Name und Adresse für Briefe. Löschen: Browserdaten der Seite löschen.
- Schriftarten werden von Google Fonts geladen. In der Offline-Version (`dist/amtsklar.html`)
  ohne Internet wird auf Systemschriften zurückgegriffen.
