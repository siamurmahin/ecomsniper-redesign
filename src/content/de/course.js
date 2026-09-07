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
    eyebrow: 'Dropship Mastery · der Kurs',

    headlineParts: [
      { text: 'Lerne eBay-Dropshipping — ohne vorher ' },
      { text: 'Ware', mark: true },
      { text: ' zu kaufen.' },
    ],
    headline: 'Lerne eBay-Dropshipping — ohne vorher Ware zu kaufen.',

    lead: 'Dropship Mastery ist das Training Schritt für Schritt — zusammen mit der Software, die den wiederkehrenden Teil übernimmt. Start bei null: kein Lager, keine Website, nichts im Voraus bezahlt außer dem Kurs selbst.',

    /* Beträge stehen nur im englischen Deck. Übersetzt sind die Beschriftungen. */
    heroPanel: {
      eyebrow: 'Der Kurs',
      name: 'Dropship Mastery',
      lead: 'Von null an unterrichtet — Vorkenntnisse sind nicht nötig.',
      modules: [
        { name: 'Das Setup', body: 'Das eBay-Konto, der Shop und die Tools, von ganz vorne.' },
        {
          name: 'Die Beschaffung',
          body: 'Artikel finden, die sich verkaufen — und die Händler, die sie schon führen.',
        },
        {
          name: 'Das Einstellen',
          body: 'Listings schreiben und einstellen, und die Bulk-Tools, die das für dich tun.',
        },
        {
          name: 'Die Abwicklung',
          body: 'Die Bestellung, der Versand und der Käufer am anderen Ende.',
        },
      ],
      taughtBy: 'Unterrichtet von Marc und Sammy, die ihre eigenen E-Mails beantworten.',
      updated: 'Wird aktualisiert, wenn sich die Plattform ändert — nicht liegen gelassen.',
    },

    price: {
      suffix: 'für deinen ersten Monat',
      thereafter: 'danach 199 $ im Monat. Jederzeit kündbar.',
      reversal: '30 Tage Geld zurück im Monatsplan — der ganze Monat, keine Testphase.',
    },

    ctas: {
      primary: { label: 'Jetzt einschreiben' },
      secondary: { label: 'Discord beitreten' },
    },

    proof: [
      { label: 'auf Trustpilot, aus 42 Bewertungen' },
      { label: 'Mitglieder in 8 Ländern' },
      { value: '30 Tage', label: 'Geld zurück im Monatsplan' },
    ],

    fit: {
      eyebrow: 'Bevor du dich einschreibst',
      headlineParts: [{ text: 'Das ist nicht ' }, { text: 'für jeden.', mark: true }],
      headline: 'Das ist nicht für jeden.',
      lead: 'Es lohnt sich zu wissen, auf welcher Seite du stehst, bevor du für irgendetwas bezahlst.',

      for: {
        label: 'Es passt, wenn',
        items: [
          'du ein paar Stunden pro Woche hast und sie lieber in etwas Eigenes steckst als in Zuschauen.',
          'du ein zweites Einkommen willst, das ohne Lager, Marke und Werbebudget auskommt.',
          'du bereit bist, einem Ablauf länger als zwei Wochen zu folgen, bevor du urteilst.',
          'du eine eBay-Shop-Gebühr tragen kannst und den Einkauf der Artikel — den du erst zahlst, nachdem ein Kunde dich bezahlt hat.',
        ],
      },

      against: {
        label: 'Es passt nicht, wenn',
        items: [
          'du etwas suchst, das ohne dich läuft. Das ist ein Geschäft, und es braucht die Stunden.',
          'du die Miete dieses Monats daraus brauchst. Das kann dir niemand versprechen — und wer es tut, verkauft dir etwas anderes.',
          'du hören willst, wie viel du genau verdienen wirst. Wir sagen es dir nicht, weil wir es nicht wissen.',
          'du lieber nicht mit Kunden zu tun hättest. Zu Verkäufen auf eBay gehören Käufer, Fragen und gelegentlich Retouren.',
        ],
      },
    },

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
        gapLabel: 'die Spanne, vor eBay-Gebühren',
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

    objections: {
      eyebrow: 'Die Fragen, die wirklich kommen',
      headlineParts: [{ text: 'Was du dir ' }, { text: 'gerade denkst.', mark: true }],
      headline: 'Was du dir gerade denkst.',
      lead: 'Die fünf häufigsten, so direkt beantwortet, wie es geht. Die allgemeinen Fragen zu Software und Plänen stehen auf der FAQ-Seite.',

      items: [
        {
          question: 'Lohnt sich eBay-Dropshipping 2026 überhaupt noch?',
          answer:
            'Es ist schwerer als 2019 — und es funktioniert weiterhin. Geändert haben sich die Margen und der Anspruch an die Beschaffung, und genau damit verbringt der Kurs seine Zeit. Unser Blogbeitrag zu Margen rechnet die sechs Gebühren durch, die von einem Verkauf abgehen. Lies ihn vor der Einschreibung, nicht danach.',
          cta: { label: 'Zum Beitrag über Margen' },
        },
        {
          question: 'Sperrt eBay mein Konto dafür?',
          answer:
            'Dropshipping von einem Händler verstößt in manchen Märkten gegen die eBay-Richtlinie und ist in anderen erlaubt — und was Konten tatsächlich einschränkt, ist ein Angebot, das du nicht liefern kannst. Der Kurs behandelt die Richtlinie und VeRO-Meldungen, und die Software pausiert ein Angebot, wenn die Quelle ausverkauft ist. Genau dieser Fall verursacht die meisten Mängel.',
          cta: { label: 'Zum VeRO-Leitfaden' },
        },
        {
          question: 'Was brauche ich zum Start außer dem Kurs?',
          answer:
            'Eine eBay-Shop-Gebühr und das Geld für jeden Artikel, nachdem ein Kunde dich dafür bezahlt hat — es kommt also aus einer Zahlung, die du schon erhalten hast. Es gibt keine Ware, die vorher gekauft werden muss. Die typischen monatlichen Kosten stehen auf der FAQ-Seite.',
          cta: { label: 'Typische Kosten ansehen' },
        },
        {
          question: 'Ich habe noch nie online verkauft. Ist das ein Problem?',
          answer:
            'Nein. Der Kurs setzt voraus, dass du noch nie etwas eingestellt hast, und beginnt beim Anlegen des Kontos. Wer schon verkauft hat, ist durch den ersten Teil schnell durch.',
        },
        {
          question: 'Und wenn es nicht das ist, was ich erwartet habe?',
          answer:
            'Sag innerhalb von 30 Tagen im Monatsplan Bescheid, und du bekommst dein Geld zurück. Keine Testphase, keine anteilige Erstattung — der Monat. Wenn es nichts für dich ist, sollst du das lieber sagen, als zu bleiben.',
        },
      ],

      footer: {
        text: 'Alles andere — die Pläne, die Software, wofür die Community da ist —',
        cta: { label: 'steht auf der FAQ-Seite' },
      },
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
