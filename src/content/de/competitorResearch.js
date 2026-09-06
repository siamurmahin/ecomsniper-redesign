/**
 * Deutsch — Competitor Research.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe
 * `../en/competitorResearch.js`.
 *
 * **Positionsgleich gespiegelt.** Der Merge arbeitet über den Index:
 * `steps.items` steht hier in derselben Reihenfolge wie im Englischen, und
 * `headlineParts` hat dieselbe Zahl an Segmenten, weil sonst die Markierung
 * auf dem falschen Wort landet. Wer einen Schritt ergänzt, ändert beide
 * Dateien im selben Commit.
 *
 * Produktnamen, Verkäufernamen und Preise fallen ins Englische durch: es sind
 * Beispieldaten in einer dargestellten Oberfläche, keine Sprache — und
 * übersetzte Beispielpreise in Euro wären eine Behauptung über einen Markt,
 * den diese Zahlen nicht abbilden. Übersetzt sind nur die Beschriftungen.
 *
 * „Snipe" bleibt stehen. Es ist der Begriff, mit dem das Produkt arbeitet, und
 * in der Erweiterung heißt die Funktion so.
 */
export const overlay = {
  COMPETITOR_RESEARCH: {
    eyebrow: 'Die Software · Competitor Research',

    headlineParts: [{ text: 'Finden. Snipen. ' }, { text: 'Verdienen.', mark: true }],
    headline: 'Finden. Snipen. Verdienen.',

    lead: 'Finde die meistverkauften Angebote deiner Konkurrenz und unterbiete sie für schnelle Verkäufe.',

    ctas: {
      primary: { label: 'Starte dein eBay-Business' },
      secondary: { label: 'Kostenloses Playbook holen' },
    },

    panel: {
      ladder: {
        title: 'Competitor Research — Preisleiter',
        note: 'Darstellung der Oberfläche. Die Preise sind Beispiele, keine Prognose.',
        seller: 'Verkäufer',
        price: 'Angeboten für',
        yoursLabel: 'Dein Angebot',
        floor: 'Dein Einkauf bei Amazon · £11.40',
        summary: 'Günstigstes Angebot für diesen Artikel',
      },

      dossier: {
        title: 'eBay — Suchergebnisse',
        note: 'Darstellung der Oberfläche.',
        column: 'Verkäufer',
        ebay: 'eBay',
        amazon: 'Amazon',
        flag: 'Vermutlich Dropshipper',
        button: 'Konkurrent speichern',
        saved: '{n} gespeichert',
      },

      scan: {
        title: 'Competitor Research — homeandgarden_uk',
        note: 'Darstellung der Oberfläche.',
        window: 'Verkauft in den letzten 3 Tagen',
        repeat: '× {n}',
        summary: '{n} Artikel mehrfach verkauft',
      },

      price: {
        title: 'Competitor Research — unterbieten',
        note: 'Darstellung der Oberfläche. Die Preise sind Beispiele, keine Prognose.',
        lines: [
          { label: 'Günstigstes Angebot' },
          { label: 'Dein Preis' },
          { label: 'Einkauf bei Amazon' },
          { label: 'Nach Gebühren übrig' },
        ],
        caveat:
          'Gebühren nach dem Standardsatz von eBay für diese Kategorie. Deine können abweichen.',
      },

      listed: {
        title: 'EcomSniper — Angebot veröffentlicht',
        note: 'Darstellung der Oberfläche.',
        button: 'Jetzt einstellen',
        state: 'Status',
        live: 'online',
        queued: 'läuft',
        summary: '{n} von 4 veröffentlicht',
      },
    },

    steps: {
      eyebrow: 'Der Snipe',
      headlineParts: [
        { text: 'So hängst du die ' },
        { text: 'Konkurrenz', mark: true },
        { text: ' ab.' },
      ],
      headline: 'So hängst du die Konkurrenz ab.',
      lead: 'Mit EcomSniper findest du laufende Verkäufer, unterbietest sie und verkaufst mehr.',

      items: [
        {
          title: 'Konkurrenten finden',
          body: 'Finde Dropshipper, die von Amazon nach eBay verkaufen, und speichere sie mit dem Competitor-Research-Werkzeug von EcomSniper.',
        },
        {
          title: 'Nach Bestsellern suchen',
          body: 'Der Store jedes Konkurrenten wird automatisch durchsucht — nach Artikeln, die in den letzten Tagen mehrfach verkauft wurden.',
        },
        {
          title: 'Den günstigsten Preis unterbieten',
          body: 'Sieh nach, wer am günstigsten ist, und „snipe" das Angebot: deins geht knapp darunter online.',
        },
        {
          title: 'Angebote einstellen',
          body: 'Ein Klick, und es ist online. EcomSniper füllt die Details aus und veröffentlicht dein unterbietendes Angebot auf eBay.',
        },
      ],
    },
  },
};
