/**
 * German — The footer: its columns, its links and its small print.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 */
export const overlay = {
  FOOTER: {
    tagline: 'Software, Schulung und Community für eBay-Verkäufer.',
    reviewsCta: 'Bewertungen auf Trustpilot lesen',
    contact: { title: 'Kontakt' },
    social: { title: 'Komm in die Community' },
    secondDoor: {
      title: 'Noch nicht so weit?',
      body: 'Nimm dir das kostenlose Playbook und lies es zuerst. Keine Karte, kein Druck.',
      cta: { label: 'Hol dir das kostenlose Playbook' },
    },
    columns: [
      {
        title: 'Produkt',
        links: [
          { label: 'So funktioniert es' },
          { label: 'Preise' },
          { label: 'Dropship Mastery' },
          { label: 'Kostenloses Playbook' },
        ],
      },
      {
        title: 'Unternehmen',
        links: [
          { label: 'Über uns' },
          { label: 'Blog' },
          { label: 'Karriere' },
          { label: 'Kontakt' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'FAQ' },
          { label: 'Die Garantie' },
          { label: 'Discord beitreten' },
          { label: 'Anmelden' },
        ],
      },
      {
        title: 'Rechtliches',
        links: [{ label: 'AGB' }, { label: 'Datenschutz' }, { label: 'Bewertungen' }],
      },
    ],
    disclaimer:
      'EcomSniper steht in keiner Verbindung zu eBay Inc. oder Amazon.com, Inc. und wird von diesen weder unterstützt noch gesponsert. Gezeigte Ergebnisse stammen von einzelnen Mitgliedern und sind nicht typisch. Deine Ergebnisse hängen von deinem Einsatz, deinem Markt und Faktoren ab, die niemand steuern kann.',
  },
};
