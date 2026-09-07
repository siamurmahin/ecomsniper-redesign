/**
 * German — the sitemap a person reads.
 *
 * Only the keys that differ from English; anything absent falls through.
 * Arrays merge by position, so a link added here has to sit where its English
 * counterpart does — and the `href` is deliberately not repeated, because the
 * page prefixes every path with the language it is being read in.
 */
export const overlay = {
  SITEMAP: {
    eyebrow: 'Seitenverzeichnis',
    headline: 'Jede Seite dieser Website.',
    lead: 'Die ganze Website auf einen Blick — die Tools, das Training, das Unternehmen und das Kleingedruckte, auf Deutsch und Englisch.',

    groups: [
      {
        title: 'Hier anfangen',
        links: [
          { label: 'Startseite', note: 'Was das ist, für wen es ist, was es kostet.' },
          { label: 'Product Hunter', note: 'Finde, was sich bereits verkauft.' },
          {
            label: 'AI Powered Lister',
            note: 'Titel, Beschreibungen und Artikelmerkmale, für dich geschrieben.',
          },
          {
            label: 'Competitor Research',
            note: 'Behalte die Verkäufer im Blick, gegen die du antrittst.',
          },
          { label: 'Price Monitor', note: 'Preise und Bestand, überwacht während du schläfst.' },
          { label: 'Preise', note: 'Was jeder Tarif kostet und was drin ist.' },
        ],
      },
      {
        title: 'Lernen',
        links: [
          { label: 'Dropship Mastery', note: 'Der Kurs, von null an unterrichtet.' },
          { label: 'The Invisible Store', note: 'Das kostenlose Playbook, ohne Zahlung.' },
          { label: 'Blog', note: 'Was auf eBay gerade funktioniert.' },
        ],
      },
      {
        title: 'Das Unternehmen',
        links: [
          { label: 'Über uns', note: 'Wer dahintersteht und wie es angefangen hat.' },
          { label: 'Kontakt', note: 'Eine Telefonnummer, eine Adresse und ein Mensch.' },
          { label: 'Karriere', note: 'Offene Stellen und wie du dich bewirbst.' },
          { label: 'Affiliate-Programm', note: 'Verdiene an dem, was du empfiehlst.' },
          { label: 'Affiliate-Bedingungen', note: 'Die Regeln, nach denen das Programm läuft.' },
        ],
      },
      {
        title: 'Antworten und Kleingedrucktes',
        links: [
          { label: 'FAQ', note: 'Die Fragen, die der Support am häufigsten beantwortet.' },
          { label: 'AGB', note: 'Wozu du zustimmst.' },
          { label: 'Datenschutzerklärung', note: 'Was erhoben wird und warum.' },
          { label: 'Cookie-Richtlinie', note: 'Jedes Cookie, das diese Seite setzen kann.' },
        ],
      },
    ],

    countLabel: '{n} Seiten aufgeführt, in zwei Sprachen',

    postsLabel: 'Beiträge',
    rolesLabel: 'Offene Stellen',

    crawler: {
      text: 'Maschinen wollen die andere:',
      cta: { label: 'sitemap.xml' },
    },

    language: {
      text: 'Diese Website erscheint auf Deutsch und Englisch. Jede Seite oben hat ein englisches Gegenstück.',
      cta: { label: 'This page in English', href: '/sitemap' },
    },
  },
};
