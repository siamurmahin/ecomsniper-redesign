/**
 * Deutsch — Product Hunter.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe `../en/productHunter.js`.
 *
 * **Positionsgleich gespiegelt.** Der Merge arbeitet über den Index: `steps.items`
 * steht hier in derselben Reihenfolge wie im Englischen, und `headlineParts`
 * hat dieselbe Zahl an Segmenten, weil sonst die Markierung auf dem falschen
 * Wort landet. Wer einen Schritt ergänzt, ändert beide Dateien im selben Commit.
 *
 * Produktnamen bleiben englisch: „Product Hunter", „AI Lister" und der Button
 * „Extract All Titles" heißen in der Erweiterung so, und eine übersetzte
 * Schaltfläche, die es nicht gibt, ist eine Anleitung ins Leere.
 */
export const overlay = {
  PRODUCT_HUNTER: {
    eyebrow: 'Die Software · Product Hunter',

    headlineParts: [{ text: 'Finde ' }, { text: 'profitable', mark: true }, { text: ' Produkte.' }],
    headline: 'Finde profitable Produkte.',

    lead: 'Finde starke eBay-Verkäufer, hol dir ihre besten Angebote und beziehe sie über Amazon. Alles in einem Werkzeug.',

    ctas: {
      primary: { label: 'Starte dein eBay-Business' },
      secondary: { label: 'Kostenloses Playbook holen' },
    },

    /* Nur die Beschriftungen. `rows` und `titles` fallen ins Englische durch:
       es sind Produktnamen und Preise in einer Beispiel-Oberfläche, keine
       Sprache — und übersetzte Beispielpreise in Euro wären eine Behauptung
       über einen Markt, den diese Zahlen nicht abbilden. */
    panel: {
      hunt: {
        title: 'Product Hunter — Ergebnisse',
        note: 'Darstellung der Oberfläche. Die Preise sind Beispiele, keine Prognose.',
        item: 'Angebot',
        ebay: 'eBay',
        amazon: 'Amazon',
        verdict: 'Differenz',
        hitTitle: 'Teurer als auf Amazon — lohnt sich',
        skip: 'keine',
        scanned: '{n} Angebote geprüft',
        found: '{n} lohnen sich',
      },

      paste: {
        title: 'EcomSniper — Product Hunter',
        note: 'Darstellung der Oberfläche.',
        field: 'Ausgelesene Titel einfügen',
        count: '238 Titel',
        button: 'Search Titles',
      },
    },

    steps: {
      eyebrow: 'Die Jagd',
      headlineParts: [
        { text: 'Die Jagd hat ' },
        { text: 'drei', mark: true },
        { text: ' Schritte.' },
      ],
      headline: 'Die Jagd hat drei Schritte.',
      lead: 'Folge diesen Schritten, dann bist du fertig.',

      items: [
        {
          title: 'Dropshipper finden und Angebote auslesen',
          body: 'Suche auf eBay nach Artikeln, die teurer sind als auf Amazon — ein deutlicher Hinweis auf einen Dropshipper. Öffne dann sein Profil und hol dir mit „Extract All Titles" in EcomSniper eine Liste von allem, was er zuletzt verkauft hat.',
        },
        {
          title: 'Product Hunter öffnen',
          body: 'Öffne die EcomSniper-Erweiterung, wähle „Open Product Hunter" und füge die ausgelesenen Produkttitel in das Textfeld ein.',
        },
        {
          title: '„Search Titles" klicken',
          body: 'Ein Klick, und Product Hunter durchsucht Amazon nach jedem Titel deiner Liste. Sekunden später hast du eine fertige Liste profitabler Artikel — bereit zum Einstellen mit dem AI Lister von EcomSniper.',
        },
      ],
    },
  },
};
