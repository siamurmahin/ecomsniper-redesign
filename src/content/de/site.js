/**
 * German — Brand, the URLs everything else points at, and the top navigation.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 */
export const overlay = {
  SITE: {
    guarantee: '30 Tage Geld-zurück-Garantie im Monatsplan',
    priceFrom: 'Ab 97 $ im ersten Monat',
    privacyNote: 'Deine Daten sind sicher und werden niemals weitergegeben.',
    loginLabel: 'Anmelden',
    headerCta: 'Starte für 97 $',
    skipLabel: 'Zum Inhalt springen',
    startCta: { label: 'Starte dein eBay-Geschäft' },
    promises: [
      { text: 'Die Schulung bringt es dir bei' },
      { text: 'Die Software nimmt dir die Arbeit ab' },
      { text: 'Die Community fängt dich auf' },
      { text: 'Die Garantie schützt dich' },
    ],
  },
  /* Positionsgleich gespiegelt: der Merge arbeitet über den Index, und die
     hrefs stehen nur im englischen Deck, damit eine Übersetzung nie eine URL
     anfasst. Produktnamen bleiben englisch — die Werkzeuge heißen in der
     Erweiterung so. */
  NAV_LINKS: [
    {
      label: 'Funktionen',
      items: [
        { label: 'Product Hunter' },
        { label: 'AI Powered Lister' },
        { label: 'Competitor Research' },
        { label: 'Price Monitor' },
      ],
    },
    { label: 'Preise' },
    { label: 'Blog' },
    { label: 'Über uns' },
    { label: 'FAQ' },
    { label: 'Kontakt' },
  ],
};
