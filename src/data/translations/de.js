/**
 * German copy.
 *
 * Only the keys that differ from English go here. Anything missing falls back
 * to the English deck, so a half-finished translation shows English rather
 * than a blank — and a new English string never breaks the German site.
 *
 * The shape mirrors `siteContent.js` exactly. If a key does not exist there,
 * it does nothing here.
 *
 * TWO RULES CARRY OVER, and they matter more in translation than anywhere:
 *
 * 1. No income claims. The client's own German page says
 *    "1.000€–3.000€/Monat" — that is the same class of claim this rebuild
 *    removed from the English site, and it is not repeated here.
 * 2. The guarantee always names the plan: "im Monatsplan". The credits bundle
 *    and Enterprise are final sale, so the unqualified version is a promise
 *    the pricing page contradicts.
 *
 * Prices stay in dollars because that is what the client charges.
 */
export const de = {
  SITE: {
    guarantee: '30 Tage Geld-zurück-Garantie im Monatsplan',
    priceFrom: 'Ab 97 $ im ersten Monat',
    privacyNote: 'Deine Daten sind sicher und werden niemals weitergegeben.',
    startCta: { label: 'Starte dein eBay-Geschäft' },
    promises: [
      { text: 'Die Schulung bringt es dir bei' },
      { text: 'Die Software nimmt dir die Arbeit ab' },
      { text: 'Die Community fängt dich auf' },
      { text: 'Die Garantie schützt dich' },
    ],
  },

  NAV_LINKS: [
    { label: 'Belege' },
    { label: 'So funktioniert es' },
    { label: 'Schulung' },
    { label: 'Über uns' },
    { label: 'Preise' },
    { label: 'FAQ' },
    { label: 'Kontakt' },
  ],

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
    playbookNote: 'Kostenlos mitnehmen',
    blessing: { translation: 'SO GOTT WILL' },
    supports: [
      { title: 'Ab 97 $', detail: 'für deinen ersten Monat' },
      { title: '30 Tage', detail: 'Geld zurück im Monatsplan' },
      { title: 'Kein Lager', detail: 'und keine eigene Website' },
    ],
    reassurances: [
      { title: 'Keine Erfahrung nötig', detail: 'Schritt für Schritt begleitet' },
      { title: 'Eine aktive Community', detail: 'Du gehst den Weg nicht allein' },
    ],
  },

  STICKY_CTA: {
    message: '30 Tage Geld-zurück-Garantie im Monatsplan',
    price: 'Ab 97 $ im ersten Monat',
    cta: { label: 'Jetzt starten' },
  },

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
        links: [
          { label: 'AGB' },
          { label: 'Datenschutz' },
          { label: 'Bewertungen' },
        ],
      },
    ],
    disclaimer:
      'EcomSniper steht in keiner Verbindung zu eBay Inc. oder Amazon.com, Inc. und wird von diesen weder unterstützt noch gesponsert. Gezeigte Ergebnisse stammen von einzelnen Mitgliedern und sind nicht typisch. Deine Ergebnisse hängen von deinem Einsatz, deinem Markt und Faktoren ab, die niemand steuern kann.',
  },
};
