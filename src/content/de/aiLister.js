/**
 * Deutsch — AI Lister.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe `../en/aiLister.js`.
 *
 * **Positionsgleich gespiegelt.** Der Merge arbeitet über den Index: `moves.items`
 * und `bulk.items` stehen hier in derselben Reihenfolge, und `headlineParts` hat
 * dieselbe Zahl an Segmenten, sonst landet die Markierung auf dem falschen Wort.
 *
 * Die Schaltflächen der Erweiterung heißen weiterhin „Generate Title" und
 * „Opti List". Sie stehen so in der Software, und eine übersetzte Schaltfläche,
 * die es nicht gibt, ist eine Anleitung ins Leere. Aus demselben Grund bleiben
 * die Beispiel-Links und der Beispieltitel englisch.
 */
export const overlay = {
  AI_LISTER: {
    eyebrow: 'Die Software · AI Powered Lister',

    headlineParts: [{ text: 'Klüger ' }, { text: 'einstellen.', mark: true }],
    headline: 'Klüger einstellen.',

    lead: 'Ein einzelner Artikel oder ein ganzer Schwung. Die KI-Werkzeuge bringen deine Produkte auf eBay. Schnell, einfach, verkaufsbereit.',

    ctas: {
      primary: { label: 'Starte dein eBay-Business' },
      secondary: { label: 'Kostenloses Playbook holen' },
    },

    panel: {
      pick: {
        title: 'Amazon — Produktseite',
        note: 'Darstellung der Oberfläche.',
        meta: 'Prime · Auf Lager',
        action: 'An EcomSniper senden',
      },
      image: {
        title: 'EcomSniper — gefundene Bilder',
        note: 'Darstellung der Oberfläche.',
        label: 'Im Angebot gefundene Bilder',
        found: '6 gefunden',
        chosen: 'Ausgewählt',
      },
      title: {
        title: 'EcomSniper — Generate Title',
        note: 'Darstellung der Oberfläche.',
        badge: 'KI-optimiert',
      },
      list: {
        title: 'EcomSniper — Opti List',
        note: 'Darstellung der Oberfläche.',
        steps: [
          'Titel geschrieben',
          'Bilder angehängt',
          'Artikelmerkmale gefüllt',
          'Auf eBay eingestellt',
        ],
        done: 'Live in deinem Shop',
      },
      bulk: {
        title: 'EcomSniper — Bulk Lister',
        note: 'Darstellung der Oberfläche. Die Zahlen sind Beispiele.',
        label: 'Amazon-Links',
        pasted: '184 Links',
        posting: 'Wird auf eBay eingestellt',
        done: '{n} von 184 eingestellt',
      },
    },

    moves: {
      eyebrow: 'Die vier Schritte',
      headlineParts: [{ text: 'In ' }, { text: 'Minuten', mark: true }, { text: ' eingestellt.' }],
      headline: 'In Minuten eingestellt.',
      lead: 'Vier Schritte, dann bist du fertig.',

      items: [
        {
          title: 'Produkt bei Amazon auswählen',
          body: 'Wähle einfach den Artikel, den du verkaufen willst. Mehr ist nicht nötig.',
        },
        {
          title: 'Bild auswählen',
          body: 'EcomSniper findet die Produktbilder automatisch. Nimm das, das dir am besten gefällt — ohne Bildbearbeitung.',
        },
        {
          title: 'KI-optimierten Titel holen',
          body: 'Klick auf „Generate Title", und die KI von EcomSniper schreibt dir einen guten Titel.',
        },
        {
          title: '„Opti List" klicken und zurücklehnen',
          body: 'Ein Klick, den Rest macht EcomSniper. Dein Produkt landet automatisch in deinem eBay-Shop, ohne weiteres Zutun.',
        },
      ],
    },

    bulk: {
      eyebrow: 'Im Schwung',
      headlineParts: [
        { text: 'Und dann ' },
        { text: 'hunderte', mark: true },
        { text: ' auf einmal.' },
      ],
      headline: 'Und dann hunderte auf einmal.',
      lead: 'Der Bulk Lister stellt hunderte Produkte auf einmal ein. Ohne Aufwand.',

      items: [
        {
          title: 'Amazon-Links sammeln',
          body: 'Nach dem Product Hunter kopierst du einfach alle Amazon-Links, die du einstellen willst.',
        },
        {
          title: 'Artikel einstellen',
          body: 'Das war es. Klick auf „Opti List" und der Bulk Lister macht den Rest: Titel schreiben, Angebote optimieren, in deinem eBay-Konto einstellen. Wenn du zwischendurch pausierst, einfach neu laden, zurücksetzen und weiter.',
        },
      ],
    },
  },
};
