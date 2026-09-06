/**
 * Deutsch — Price Monitor.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe
 * `../en/priceMonitor.js`, dessen Kopf auch erklärt, welche zwei Absätze auf
 * dieser Seite unser Entwurf sind und nicht die Worte des Kunden.
 *
 * **Positionsgleich gespiegelt.** Der Merge arbeitet über den Index:
 * `changes.items` und `panel.feed.events` stehen hier in derselben Reihenfolge
 * wie im Englischen, und `headlineParts` hat dieselbe Zahl an Segmenten, weil
 * sonst die Markierung auf dem falschen Wort landet.
 *
 * Produktnamen, Uhrzeiten und Preise fallen ins Englische durch: Beispieldaten
 * in einer dargestellten Oberfläche, keine Sprache. Übersetzt sind nur die
 * Beschriftungen und die Texte.
 */
export const overlay = {
  PRICE_MONITOR: {
    eyebrow: 'Die Software · Preisüberwachung in Echtzeit',

    headlineParts: [
      { text: 'Sie ' },
      { text: 'überwacht', mark: true },
      { text: ' deinen Shop für dich.' },
    ],
    headline: 'Sie überwacht deinen Shop für dich.',

    lead: 'Behalte Preisänderungen und ausverkaufte Artikel im Griff, ohne selbst nachzusehen.',

    ctas: {
      primary: { label: 'Starte dein eBay-Business' },
      secondary: { label: 'Kostenloses Playbook holen' },
    },

    panel: {
      feed: {
        title: 'Price Monitor — dein Shop',
        note: 'Darstellung der Oberfläche. Die Preise sind Beispiele, keine Prognose.',
        store: 'Dein Shop',
        state: 'Überwachung läuft',
        idleLabel: 'Nichts zu tun für dich',
        idleNote: 'Lief im Hintergrund.',
        events: [
          { detected: 'Preisänderung erkannt', done: 'Dein Angebot aktualisiert' },
          { detected: 'Bestandsänderung erkannt', done: 'Dein Angebot pausiert' },
          { detected: 'Preisänderung erkannt', done: 'Dein Angebot aktualisiert' },
        ],
      },

      price: {
        title: 'Price Monitor — Einkaufspreis gestiegen',
        note: 'Darstellung der Oberfläche. Die Preise sind Beispiele, keine Prognose.',
        lines: [
          { label: 'Einkauf vorher' },
          { label: 'Einkauf jetzt' },
          { label: 'Dein Angebot vorher' },
          { label: 'Dein Angebot jetzt' },
        ],
        footer: 'Marge gehalten. Ohne dein Zutun.',
      },

      stock: {
        title: 'Price Monitor — ausverkauft',
        note: 'Darstellung der Oberfläche.',
        column: 'Angebot',
        status: 'Status',
        live: 'online',
        paused: 'pausiert',
        footer: 'Ein Angebot, das niemand liefern kann, kostet dich das Konto.',
      },
    },

    changes: {
      eyebrow: 'Zwei Dinge ändern sich',
      headlineParts: [{ text: 'Preise steigen. Bestände ' }, { text: 'gehen aus.', mark: true }],
      headline: 'Preise steigen. Bestände gehen aus.',
      lead: 'Beides, den ganzen Tag, bei jedem Artikel, den du verkaufst.',

      items: [
        {
          title: 'Preise ändern sich',
          body: 'Der Händler ändert einen Preis, und dein Angebot steht plötzlich beim falschen — manchmal unter dem, was der Artikel dich jetzt kostet. Price Monitor beobachtet die Quelle und zieht deinen Preis mit, damit die Marge bleibt, mit der du eingestellt hast.',
        },
        {
          title: 'Artikel sind ausverkauft',
          body: 'Ein Verkauf, den du nicht liefern kannst, ist schlimmer als gar keiner: Stornierung, Rückerstattung und ein Minus in genau der Bewertung, nach der eBay dich beurteilt. Ist die Quelle leer, geht das Angebot offline, bis es wieder da ist.',
        },
      ],
    },

    background: {
      eyebrow: 'Rund um die Uhr, im Hintergrund',
      headlineParts: [{ text: 'Damit du ' }, { text: 'nichts prüfen musst.', mark: true }],
      headline: 'Damit du nichts prüfen musst.',
      lead: 'Preise oder Bestände ändern sich? EcomSniper hält deine Produkte im Hintergrund aktuell.',
      body: 'Es läuft neben dem Rest des Systems. Du findest die Produkte, du stellst sie ein — und die Überwachung hält sie richtig, während du dich um anderes kümmerst.',
    },
  },
};
