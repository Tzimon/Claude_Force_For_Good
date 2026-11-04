/*
 * Amtsklar – free help directory. Only nationwide, free services.
 * Keep entries factual; verify links before release (see README).
 */
(function (root) {
  "use strict";
  const HELP = [
    {
      group: "urgent",
      name: { de: "Telefonseelsorge", en: "Telefonseelsorge (crisis line)" },
      what: { de: "Wenn Ihnen alles zu viel wird. Rund um die Uhr, anonym, kostenlos.", en: "When everything gets too much. 24/7, anonymous, free (German; chat also online)." },
      phone: "0800 111 0 111 · 0800 111 0 222",
      url: "https://www.telefonseelsorge.de",
    },
    {
      group: "urgent",
      name: { de: "Hilfetelefon Gewalt gegen Frauen", en: "Helpline violence against women" },
      what: { de: "Rund um die Uhr, anonym, kostenlos, in 18 Sprachen.", en: "24/7, anonymous, free, in 18 languages." },
      phone: "116 016",
      url: "https://www.hilfetelefon.de",
    },
    {
      group: "urgent",
      name: { de: "Nummer gegen Kummer", en: "Nummer gegen Kummer (children and parents)" },
      what: { de: "Kinder- und Jugendtelefon: 116 111. Elterntelefon: 0800 111 0 550.", en: "Children and youth: 116 111. Parents: 0800 111 0 550." },
      phone: "116 111 · 0800 111 0 550",
      url: "https://www.nummergegenkummer.de",
    },
    {
      group: "letters",
      name: { de: "Migrationsberatung für Erwachsene (MBE)", en: "Migration counselling for adults (MBE)" },
      what: { de: "Kostenlose Beratung für Zugewanderte ab 27 Jahren: Briefe, Anträge, Arbeit, Sprache. Oft auch in Ihrer Sprache. Beratungsstellen finden Sie im BAMF-NAvI.", en: "Free counselling for immigrants aged 27+: letters, applications, work, language. Often in your language. Find offices with BAMF-NAvI." },
      url: "https://bamf-navi.bamf.de",
    },
    {
      group: "letters",
      name: { de: "Jugendmigrationsdienste (JMD)", en: "Youth migration services (JMD)" },
      what: { de: "Kostenlose Beratung für junge Zugewanderte von 12 bis 27 Jahren.", en: "Free counselling for young immigrants aged 12 to 27." },
      url: "https://www.jugendmigrationsdienste.de",
    },
    {
      group: "letters",
      name: { de: "Sozialberatung von Caritas, Diakonie, AWO, DRK", en: "Social counselling (Caritas, Diakonie, AWO, Red Cross)" },
      what: { de: "In fast jeder Stadt. Hilfe bei Briefen, Anträgen und Geldsorgen – unabhängig von Religion und Herkunft. Caritas bietet auch Online-Beratung.", en: "In almost every town. Help with letters, applications and money worries – regardless of religion or origin. Caritas also offers online counselling." },
      url: "https://www.caritas.de/onlineberatung",
    },
    {
      group: "letters",
      name: { de: "Rechtsantragsstelle am Gericht", en: "Legal application office at the court" },
      what: { de: "Beim Amtsgericht und Sozialgericht. Dort schreibt man Ihre Klage oder Ihren Eilantrag kostenlos auf. Den Beratungshilfeschein (Anwalt für max. 15 €) bekommen Sie beim Amtsgericht.", en: "At the local and social courts. Staff write down your lawsuit or urgent application for free. The certificate for legal advice (lawyer for max. 15 €) is issued at the local court (Amtsgericht)." },
    },
    {
      group: "letters",
      name: { de: "Erwerbslosen- und Sozialhilfeberatung", en: "Counselling for unemployed people and benefit claimants" },
      what: { de: "Unabhängige Beratung zu Jobcenter und Sozialamt. Tacheles e. V. hat ein großes Forum und eine Liste von Beratungsstellen.", en: "Independent advice on Jobcenter and social welfare. Tacheles e. V. runs a large forum and a list of counselling offices." },
      url: "https://tacheles-sozialhilfe.de",
    },
    {
      group: "money",
      name: { de: "Schuldnerberatung", en: "Debt counselling" },
      what: { de: "Kostenlose, seriöse Schuldnerberatung über Wohlfahrtsverbände und Verbraucherzentralen. Achtung vor Firmen, die Geld für „Schuldenhilfe“ verlangen.", en: "Free, reputable debt counselling through charities and consumer centres. Beware of companies charging money for „debt help“." },
      url: "https://www.meine-schulden.de",
    },
    {
      group: "money",
      name: { de: "Verbraucherzentrale", en: "Consumer advice centre" },
      what: { de: "Hilfe bei Verträgen, Rechnungen, Inkasso, Energie und Versicherungen. Teilweise kostenpflichtig, oft günstig.", en: "Help with contracts, bills, debt collection, energy and insurance. Some services cost a small fee." },
      url: "https://www.verbraucherzentrale.de",
    },
    {
      group: "home",
      name: { de: "Mieterverein", en: "Tenants' association" },
      what: { de: "Beratung bei Miete, Nebenkosten und Kündigung. Mitgliedschaft nötig (meist wenige Euro im Monat).", en: "Advice on rent, utility bills and eviction. Membership needed (usually a few euros a month)." },
      url: "https://www.mieterbund.de",
    },
    {
      group: "migration",
      name: { de: "PRO ASYL und Flüchtlingsräte", en: "PRO ASYL and refugee councils" },
      what: { de: "Beratung und Informationen zu Asyl, Duldung und Aufenthalt. PRO ASYL nennt Beratungsstellen in Ihrem Bundesland.", en: "Advice and information on asylum, toleration and residence. PRO ASYL lists counselling offices in your state." },
      url: "https://www.proasyl.de",
    },
    {
      group: "migration",
      name: { de: "Handbook Germany", en: "Handbook Germany" },
      what: { de: "Informationen zum Leben in Deutschland in vielen Sprachen, mit Suche nach Beratungsstellen in der Nähe.", en: "Information about life in Germany in many languages, with a search for local counselling services." },
      url: "https://handbookgermany.de",
    },
  ];
  const GROUPS = {
    urgent: { de: "Sofort Hilfe – rund um die Uhr", en: "Immediate help – 24/7" },
    letters: { de: "Hilfe bei Briefen, Anträgen und Widerspruch", en: "Help with letters, applications and objections" },
    money: { de: "Geld und Schulden", en: "Money and debts" },
    home: { de: "Wohnen", en: "Housing" },
    migration: { de: "Aufenthalt und Migration", en: "Residence and migration" },
  };
  root.Amtsklar = root.Amtsklar || {};
  root.Amtsklar.help = { HELP, GROUPS };
})(typeof self !== "undefined" ? self : this);
