/**
 * Deutsch — Dropship Mastery.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe `../en/course.js`,
 * dessen Kopf auch erklärt, welche vier Aussagen der Originalseite hier
 * bewusst fehlen und warum.
 *
 * **Positionsgleich gespiegelt.** Der Merge arbeitet über den Index: Schritte,
 * Boni und Personen stehen hier in derselben Reihenfolge wie im Englischen,
 * und `headlineParts` hat dieselbe Zahl an Segmenten, weil sonst die
 * Markierung auf dem falschen Wort landet.
 *
 * hrefs, E-Mail-Adressen, Icons, Farbtöne und Beträge stehen nur im englischen
 * Deck: eine Übersetzung fasst keine URL und keinen Preis an. Produktnamen
 * bleiben englisch — „Dropship Mastery" und „AI Powered Automation" heißen so.
 */
export const overlay = {
  COURSE: {
    eyebrow: 'Der Kurs',

    headlineParts: [{ text: 'Dropship ' }, { text: 'Mastery', mark: true }],
    headline: 'Dropship Mastery',

    lead: 'Das eBay-Dropshipping-Training Schritt für Schritt, unterrichtet mit dem Sniper-Paket — kein Lager, keine Website, keine Ware, die du bezahlt hast und nicht loswirst.',

    ctas: {
      primary: { label: 'Jetzt einschreiben' },
      secondary: { label: 'Discord beitreten' },
    },

    proof: [
      { label: 'auf Trustpilot, aus 42 Bewertungen' },
      { label: 'Mitglieder in 8 Ländern' },
      { value: '30 Tage', label: 'Geld zurück im Monatsplan' },
    ],

    mechanic: {
      eyebrow: 'So funktioniert es',
      headlineParts: [
        { text: 'Verkaufe den Artikel, ' },
        { text: 'bevor', mark: true },
        { text: ' du ihn kaufst.' },
      ],
      headline: 'Verkaufe den Artikel, bevor du ihn kaufst.',
      lead: 'eBay-Dropshipping ist ein einfaches Modell: Du stellst ein, was ein Händler ohnehin auf Lager hat — und kaufst es erst, wenn dich jemand dafür bezahlt hat.',

      steps: [
        {
          kicker: 'Nichts ausgegeben',
          title: 'Finden und einstellen',
          body: 'Finde einen Artikel bei einem Händler und stelle ihn teurer in deinen eBay-Shop. Nichts ist gekauft, nichts ist geschuldet.',
        },
        {
          kicker: 'Du wirst bezahlt',
          title: 'Ein Kunde kauft ihn',
          body: 'Der Verkauf passiert auf eBay, vor einem Publikum, das schon da ist. Du wirst bezahlt, bevor du etwas ausgegeben hast.',
        },
        {
          kicker: 'Der Händler versendet',
          title: 'Du bestellst an seine Adresse',
          body: 'Du kaufst denselben Artikel beim Händler und gibst Namen und Lieferadresse deines Kunden an statt deiner eigenen. Der Händler versendet direkt.',
        },
        {
          kicker: 'Was übrig bleibt',
          title: 'Die Differenz bleibt dir',
          body: 'Was der Kunde gezahlt hat, minus Einkauf und eBay-Gebühren, gehört dir. Kein Lager, keine Kartons, keine Ware, die im Zimmer steht.',
        },
      ],

      flowCaption:
        'Du kaufst nie auf Vorrat und bezahlst keinen Artikel, bevor dich jemand dafür bezahlt hat. Genau deshalb kann das bei null anfangen.',

      example: {
        label: 'Ihr Beispiel, wie sie es schreiben',
        costLabel: 'kostet beim Händler',
        listLabel: 'im eigenen Shop eingestellt',
        note: 'Eine Darstellung, kein typisches Ergebnis. Nach den Gebühren von eBay bleibt weniger als die Differenz — der Blogbeitrag zu Margen rechnet die sechs Gebühren durch.',
        noteCta: { label: 'Zum Beitrag über Margen' },
      },
    },

    market: {
      eyebrow: 'Warum eBay',
      headlineParts: [{ text: 'Die Käufer sind ' }, { text: 'schon da.', mark: true }],
      headline: 'Die Käufer sind schon da.',
      body: [
        'eBay läuft seit über fünfundzwanzig Jahren und hat ein Publikum aufgebaut, das mit Kaufabsicht kommt. Genau das ist der Teil, für den die meisten Verkäufer Jahre und ein Marketingbudget aufwenden — auf eBay ist er bereits vorhanden.',
        'Deshalb kann dieses Modell ohne Website, Marke oder Werbebudget starten. Du überredest niemanden, einen Shop zu besuchen. Du legst einen Artikel Leuten vor, die genau deswegen gekommen sind.',
      ],
      points: [
        {
          label: 'Über 25 Jahre',
          body: 'Die Plattform handelt seit 1995, durch mehrere Rezessionen hindurch.',
        },
        {
          label: 'Ein Markt, kein Publikum',
          body: 'Menschen kommen auf eBay, um zu kaufen — nicht, um beworben zu werden.',
        },
        {
          label: 'Kein Shop zu bauen',
          body: 'Keine Website, keine Marke, kein Werbebudget vor dem ersten Verkauf.',
        },
      ],
    },

    included: {
      eyebrow: 'Was du bekommst',
      headlineParts: [{ text: 'Der Kurs — und ' }, { text: 'was dazugehört.', mark: true }],
      headline: 'Der Kurs — und was dazugehört.',
      lead: 'Im Paket enthalten, nicht daneben verkauft. Kein Countdown, und der Preis steigt nicht, wenn du eine Woche überlegst.',

      course: {
        body: 'Der gesamte Ablauf, Schritt für Schritt, vom absoluten Anfang bis zu einem Shop, der läuft. Wird aktualisiert, wenn sich eBay und der Markt ändern.',
        bullets: [
          'Von null an — Vorkenntnisse werden nicht vorausgesetzt',
          'Einrichtung, Beschaffung, Einstellen, Abwicklung',
          'Aktualisiert, wenn sich die Plattform ändert',
        ],
      },

      bonuses: [
        {
          body: 'Ein Klick, tausende Angebote — die KI erledigt den Rest und stellt Bestseller in deinen eBay-Shop, während du etwas anderes tust.',
        },
        {
          body: 'Ein erprobter Weg von der Einrichtung bis zum Punkt, an dem der Ablauf läuft, ohne jedes Mal neu gelernt zu werden.',
        },
        {
          body: 'Die private Community für Tipps, Einordnung und Unterstützung in Echtzeit — von denen, die das unterrichten, und von denen, die es neben dir tun.',
        },
      ],
      valueLabel: 'Einzeln verkauft',
      includedLabel: 'Enthalten',
    },

    instructors: {
      eyebrow: 'Wer unterrichtet',
      headlineParts: [{ text: 'Zwei Menschen — mit ' }, { text: 'eigenem Postfach.', mark: true }],
      headline: 'Zwei Menschen — mit eigenem Postfach.',
      lead: 'Beide Trainer veröffentlichen ihre E-Mail-Adresse auf dieser Seite. Das ist dieselbe Aussage, die die Über-uns-Seite über den Support macht — und die, die sich prüfen lässt.',

      people: [
        {
          role: 'Trainer',
          body: 'Mein Ziel ist es, so vielen Teilnehmern wie möglich das Wissen, die Werkzeuge und die Kniffe beizubringen, die ich am Anfang selbst gern gehabt hätte. Ich gebe das an Leute weiter, die sich ein zweites Standbein aufbauen wollen — mit Rat, der dahin passt, wo du wirklich stehst.',
        },
        {
          role: 'Gründer und Trainer',
          body: 'Ich bin dein Ansprechpartner für die Welt des Dropshipping. Ich brenne für Online-Business und habe die Erfahrung dahinter — und ich begleite dich dabei, etwas aufzubauen, das funktioniert. Nicht nur eine Sammlung Videos.',
        },
      ],
    },

    close: {
      eyebrow: 'Wann du willst',
      headlineParts: [
        { text: 'Starte den Kurs — oder ' },
        { text: 'sieh dich erst um.', mark: true },
      ],
      headline: 'Starte den Kurs — oder sieh dich erst um.',
      body: 'Der Discord ist kostenlos, und niemand verkauft dir dort etwas. Wenn du lieber erst liest: Das Playbook ist ebenfalls kostenlos — und die Garantie unten ist das, was passiert, wenn der Kurs nicht das war, was du wolltest.',
      ctas: {
        primary: { label: 'Jetzt einschreiben' },
        secondary: { label: 'Kostenloses Playbook holen' },
      },
    },
  },
};
