/**
 * German — 01 — The hero, and the panel beside it.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 */
export const overlay = {
  HERO: {
    eyebrow: '400+ Mitglieder · 8 Länder · Support rund um die Uhr',
    headlineParts: [
      { text: 'ENTFLIEH DEM ' },
      { text: '9 BIS 5' },
      { text: '.' },
      { text: 'BAU DIR EIN EINKOMMEN, DAS LÄUFT, ' },
      { text: 'WÄHREND DU SCHLÄFST' },
      { text: '.' },
    ],
    markPrefix: 'WÄHREND DU',
    markWords: ['SCHLÄFST', 'ARBEITEST', 'PENDELST'],
    subhead:
      'Software, die für dich einstellt. Eine Schulung, die bei null anfängt. Und Menschen, die um zwei Uhr nachts antworten.',
    primaryCta: { label: 'Starte dein eBay-Geschäft' },
    secondaryCta: { label: 'Hol dir das kostenlose Playbook' },
    secondaryNote: 'Kostenlos mitnehmen',
    blessing: { translation: 'SO GOTT WILL' },
    assurances: [
      { lead: 'Ab 97 $', detail: 'für deinen ersten Monat' },
      { lead: '30 Tage', detail: 'Geld zurück im Monatsplan' },
      { lead: 'Kein Lager', detail: 'und keine eigene Website' },
    ],
    support: [
      {
        title: 'Keine Erfahrung nötig',
        body: 'Schritt für Schritt begleitet',
      },
      {
        title: 'Eine aktive Community',
        body: 'Du gehst den Weg nicht allein',
      },
    ],
  },
  HERO_PANEL: {
    statusLabel: 'Läuft',
    beats: [
      {
        title: 'Findet ein Produkt, das sich schon verkauft',
        rows: [
          {
            label: 'Verkäufe in den letzten 30 Tagen',
          },
          {
            label: 'Marge pro Verkauf',
          },
        ],
        status: 'Gefunden',
      },
      {
        title: 'Schreibt das Angebot und stellt es online',
        rows: [
          {
            label: 'Titel, Merkmale, Beschreibung',
            value: 'Für dich geschrieben',
          },
          {
            label: 'Dein Teil',
            value: 'Ein Klick',
          },
        ],
        status: 'Eingestellt',
      },
      {
        chip: 'Preis- und Bestandsüberwachung',
        title: 'Der Händler ändert etwas. Dein Angebot zieht nach.',
        rows: [
          {
            label: 'Preis beim Händler',
          },
          {
            label: 'Geprüft',
            value: 'rund um die Uhr',
          },
        ],
        status: 'Aktualisiert',
      },
      {
        chip: 'Versand per Klick',
        title: 'Ein Verkauf kommt rein. Du bestätigst einmal.',
        rows: [
          {
            label: 'Bestellsumme',
          },
          {
            label: 'Dein Gewinn',
          },
        ],
        status: 'Bezahlt',
      },
    ],
    finale: {
      chip: 'Und weiter',
      title: 'Das war ein Produkt. Die Software hört da nicht auf.',
      body: 'Bis zu 3.000 Angebote im Monat im Monatsplan, während du schläfst.',
      cta: {
        label: 'Starte für 97 $',
      },
      replay: 'Nochmal ansehen',
    },
  },
};
