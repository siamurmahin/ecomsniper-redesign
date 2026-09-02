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
    secondaryNote: 'Kostenlos mitnehmen',
    blessing: { translation: 'SO GOTT WILL' },
    assurances: [
      { lead: 'Ab 97 $', detail: 'für deinen ersten Monat' },
      { lead: '30 Tage', detail: 'Geld zurück im Monatsplan' },
      { lead: 'Kein Lager', detail: 'und keine eigene Website' },
    ],
    support: [
      {
        title: 'Keine Erfahrung nötig',
        body: 'Schritt für Schritt begleitet',
      },
      {
        title: 'Eine aktive Community',
        body: 'Du gehst den Weg nicht allein',
      },
    ],
  },

  STICKY_CTA: {
    message: '30 Tage Geld-zurück-Garantie im Monatsplan',
    price: 'Ab 97 $ im ersten Monat',
    cta: { label: 'Jetzt starten' },
  },

  PRICING: {
    eyebrow: 'Tarife',
    headline: 'Starte für 97 $.',
    lead: 'Drei Wege hinein. Die Garantie unten gilt für den Monatsplan.',
    plans: [
      {
        badge: 'Am beliebtesten',
        priceSuffix: 'erster Monat',
        thereafter: 'danach 199 $ im Monat',
        summary: 'Für alle, die bei null anfangen.',
        features: [
          'Stelle 3.000 Produkte im Monat ein',
          'Sniper Chrome Extension zum Einstellen und Überwachen per Automatik',
          'Der komplette Kurs Dropship Mastery',
          'Private Dropshipping-Community',
          'Bevorzugter Support',
          'Wir bleiben dran, bis dein erster Verkauf da ist',
        ],
        guarantee: 'Geschützt durch die 30-Tage-Geld-zurück-Garantie.',
        cta: {
          label: 'Starte für 97 $',
        },
      },
      {
        badge: 'Mengenvorteil',
        saving: 'Du sparst 98 $',
        priceSuffix: 'Abrechnung alle 3 Monate',
        thereafter: 'entspricht 166,33 $ im Monat',
        recurring: 'Wiederkehrender 3-Monats-Abrechnungszeitraum',
        summary: 'Für alle, die in Menge einstellen wollen.',
        features: [
          '10.000 Credits (9.000 plus 1.000 Bonus)',
          'Stelle 10.000 Produkte ein',
          'Sniper Chrome Extension zum Einstellen und Überwachen per Automatik',
          'Der komplette Kurs Dropship Mastery',
          'Private Dropshipping-Community',
        ],
        guarantee: 'Keine Rückerstattung, Verkauf ist final.',
        cta: {
          label: 'Hol dir das 10K-Paket',
        },
      },
      {
        badge: 'Enterprise',
        priceSuffix: 'im Monat',
        thereafter: 'monatliche Abrechnung',
        summary: 'Für alle, die voll skalieren wollen.',
        features: [
          'Unbegrenzt viele Produkte einstellen',
          'Der komplette Kurs Dropship Mastery',
          'VIP-Zugang zur privaten Community',
          'Bevorzugter Support rund um die Uhr',
          'Einrichtung komplett für dich erledigt',
          'Eins-zu-eins-Coaching für dein Geschäft',
          'Wir bleiben dran, bis dein Dropshipping-Geschäft läuft',
        ],
        guarantee: 'Keine Rückerstattung, Verkauf ist final.',
        cta: {
          label: 'Hol dir den Enterprise-Tarif',
        },
      },
    ],
    page: {
      eyebrow: 'Die Entscheidung',
      headline: 'Wird das für dich funktionieren?',
      lead: 'Ein abgesicherter Monat beantwortet das besser als jede Seite.',
      guarantee: {
        title: '30 Tage Geld-zurück-Garantie',
        note: 'Ohne Rückfragen',
        promises: [
          {
            text: 'Die Schulung bringt es dir bei',
          },
          {
            text: 'Die Software nimmt dir die Arbeit ab',
          },
          {
            text: 'Die Community fängt dich auf',
          },
          {
            text: 'Die Garantie schützt dich',
          },
        ],
      },
    },
    footnote:
      'Zusätzlich zum Abo einplanen: ein eBay-Shop-Abo und, in den USA, eine Amazon-Prime-Mitgliedschaft. Typische monatliche Kosten stehen im FAQ.',
  },

  ASSURANCE: {
    countries: {
      eyebrow: 'Unterstützte Länder',
      headline: 'Funktioniert das da, wo du wohnst?',
      body: 'EcomSniper unterstützt die USA, Großbritannien, Deutschland, Frankreich, Australien, Kanada, Spanien und Italien.',
      closer: 'Wo du auch startest: dieselbe Schulung, dieselbe Software, derselbe Support.',
      list: [
        {
          name: 'USA',
        },
        {
          name: 'Großbritannien',
        },
        {
          name: 'Deutschland',
        },
        {
          name: 'Frankreich',
        },
        {
          name: 'Australien',
        },
        {
          name: 'Kanada',
        },
        {
          name: 'Spanien',
        },
        {
          name: 'Italien',
        },
      ],
    },
    guarantee: {
      eyebrow: 'Die Garantie',
      headline: 'Immer noch unsicher?',
      body: 'Teste den Monatsplan 30 Tage lang. Wenn er nichts für dich ist, schreib uns und du bekommst dein Geld zurück. Ohne Rückfragen.',
      promises: [
        {
          text: 'Die Schulung bringt es dir bei',
        },
        {
          text: 'Die Software nimmt dir die Arbeit ab',
        },
        {
          text: 'Die Community fängt dich auf',
        },
        {
          text: 'Die Garantie schützt dich',
        },
      ],
      seal: {
        top: '30',
        bottom: 'Tage',
      },
      marquee: '30 Tage Geld-zurück-Garantie',
      ctaEyebrow: 'Heute starten',
      cta: {
        label: 'Starte dein eBay-Geschäft',
      },
      reassurance: '30 Tage Geld-zurück-Garantie im Monatsplan.',
      closer: 'Jetzt trägst du kein Risiko. Also hast du keine Ausreden.',
    },
  },

  FAQ: {
    eyebrow: 'Bevor du fragst',
    headline: 'Die Fragen, die wirklich kommen.',
    lead: 'Die Antworten decken sich mit unserem FAQ und dem, was der Support sagt. Nichts hier widerspricht dem Hilfebereich.',
    support: {
      title: 'Hängst du noch irgendwo fest?',
      body: 'Der Support antwortet rund um die Uhr, und in der Community sitzen mehrere Hundert Leute, die dieselbe Frage schon gestellt haben.',
      cta: {
        label: 'Frag im Discord',
      },
    },
    groups: [
      {
        label: 'Regeln und Risiko',
      },
      {
        label: 'Geld',
      },
      {
        label: 'Der Einstieg',
      },
      {
        label: 'Was du bekommst',
      },
    ],
    items: [
      {
        q: 'Ist Dropshipping von Amazon zu eBay überhaupt erlaubt?',
        a: 'Du solltest die Regeln kennen, bevor du anfängst, also hier klar und deutlich. Die Dropshipping-Richtlinie von eBay erlaubt den Versand über einen Großhändler. Sie erlaubt nicht, bei einem anderen Händler oder Marktplatz zu kaufen und diesen direkt an deinen Käufer versenden zu lassen. eBay kann Angebote einschränken oder entfernen, die dagegen verstoßen, und VeRO-Meldungen sind ein eigenes Risiko, sobald du eine Marke einstellst, die ihre Angebote schützt. Die Schulung behandelt VeRO, Verkaufslimits und was du meiden solltest. Zwei unserer Guides kannst du sofort kostenlos lesen: wie wir VeRO vermeiden und wie du deine eBay-Verkaufslimits erhöhst.',
      },
      {
        q: 'Was kostet der Start insgesamt?',
        a: 'Die Software kostet 97 $ im ersten Monat, danach 199 $ im Monat. Dazu solltest du ein eBay-Shop-Abo einplanen, das bei rund 7,95 $ im Monat für einen Starter-Shop beginnt, und in den USA eine Amazon-Prime-Mitgliedschaft für 14,99 $ im Monat für kostenlosen Versand. Außerdem brauchst du genug Guthaben auf einer Karte, um einen Artikel zu bezahlen, nachdem dein Kunde dich bezahlt hat — du bestellst erst, wenn dein Geld da ist. Die meisten Mitglieder starten mit ein paar Hundert Dollar Startkapital.',
      },
      {
        q: 'Wie viele Stunden pro Woche kostet das?',
        a: 'Rechne am Anfang mit 1 bis 2 Stunden am Tag, größtenteils Einstellen und Lernen. Sobald die Software Überwachung und Preisanpassung übernimmt, brauchen Mitglieder meist 30 bis 45 Minuten am Tag für Beschaffung und Bestellungen. Im ersten Monat läuft nichts nebenbei. Genau die Menge, die du im ersten Monat einstellst, macht den dritten Monat ruhiger.',
      },
      {
        q: 'Ich habe noch nie online verkauft. Klappt das trotzdem?',
        a: 'Die meisten, die dazukommen, haben noch nie etwas verkauft. Dropship Mastery beginnt bei der Kontoeinrichtung und führt dich durch dein erstes Angebot, deinen ersten Verkauf und deine erste Auszahlung. Wenn du hängst, antwortet der Support rund um die Uhr, und in der Community sitzen mehrere Hundert Leute, die genau da standen, wo du jetzt stehst.',
      },
      {
        q: 'Bekommt mein Käufer einen Lieferschein von Amazon?',
        a: 'Bei den meisten Lieferanten kannst du die Rechnung ausblenden, indem du die Bestellung an der Kasse als Geschenk markierst — und genau das sagt dir die Schulung bei jeder Bestellung. Davon abgesehen öffnen Käufer ein Paket, um die Ware zu prüfen, nicht das Papier. Nach unseren eigenen Zahlen kommt die Beschwerde bei unter 0,1 % der Käufer vor, also nicht bei null. Deshalb zeigt die Schulung auch, wie du antwortest, wenn es passiert.',
      },
      {
        q: 'Kann mein Lieferantenkonto gesperrt werden?',
        a: 'Ja, und alles andere zu behaupten wäre unehrlich. Sperren bei Amazon tauchen typischerweise bei hohem Bestellvolumen auf, ungefähr ab 150 Bestellungen im Monat. Darunter ist es selten ein Thema, und die meisten Mitglieder sind in den ersten Monaten weit davon entfernt. Der Kurs zeigt, wie du das Konto sauber führst und wie du ein zweites eröffnest, wenn dein Volumen dort ankommt.',
      },
      {
        q: 'Wie funktionieren Credits?',
        a: 'Ein Credit ist ein Angebot. Ein KI-optimiertes Angebot — Titel, Beschreibung und Artikelmerkmale für dich geschrieben — kostet 1 Credit. Ein Standardangebot, direkt vom Lieferanten übernommen und auf Wunsch mit deinem eigenen Titel, kostet 0,2 Credits. Ein Monat mit 1.000 Credits sind also 1.000 KI-Angebote oder 5.000 Standardangebote. Teile es dir auf 100 bis 200 am Tag ein, statt alles auf einmal auszugeben: eBay liest eine plötzliche Flut als neuen Verkäufer, der sich seltsam verhält.',
      },
      {
        q: 'Bekomme ich mein Geld zurück, wenn es nichts für mich ist?',
        a: 'Der Monatsplan ist durch eine 30-Tage-Geld-zurück-Garantie abgesichert. Teste ihn 30 Tage lang, und wenn er nichts für dich ist, schreib uns und du bekommst dein Geld zurück. Ohne Rückfragen. Das 10K-Credits-Paket und der Enterprise-Tarif sind vom Umtausch ausgeschlossen und nicht erstattungsfähig, weil beide gegenüber dem Monatspreis rabattiert sind.',
      },
      {
        q: 'Funktioniert das in meinem Land?',
        a: 'EcomSniper unterstützt die USA, Großbritannien, Deutschland, Frankreich, Australien, Kanada, Spanien und Italien. Wo du auch startest: dieselbe Schulung, dieselbe Software, derselbe Support.',
      },
      {
        q: 'Was macht die Software konkret für mich?',
        a: 'Vier Dinge. Sie findet Produkte, die sich bereits verkaufen, über Product Hunter und Competitor Research. Sie schreibt und veröffentlicht deine Angebote, inklusive Titel, Beschreibung und Artikelmerkmalen. Sie überwacht Preis und Bestand beim Händler und aktualisiert dein Angebot automatisch. Und sie bereitet deine Bestellungen so vor, dass der Versand ein Klick ist.',
      },
      {
        q: 'Kann ich mehr als einen eBay-Shop betreiben?',
        a: 'Ja. Mitglieder führen regelmäßig mehrere Shops über ein Konto, und die Tarife richten sich nach der Zahl der Angebote, nicht nach der Zahl der Shops. Der Enterprise-Tarif hebt das Limit ganz auf.',
      },
      {
        q: 'Was passiert mit meinen Angeboten, wenn ich kündige?',
        a: 'Deine Angebote bleiben bei eBay. Es sind deine Angebote in deinem eBay-Konto. Was aufhört, ist die Automatik: Preis- und Bestandsüberwachung, Masseneinstellung und Versand per Klick. Der Shop bleibt dir, die Maschine dahinter nicht.',
      },
      {
        q: 'Warum bringt ihr das bei, wenn ihr damit Geld verdient?',
        a: 'Weil die Software das Geschäft ist, nicht das Geheimnis. Wir verdienen, wenn Mitglieder bleiben, und Mitglieder bleiben, wenn sie tatsächlich verkaufen. Wer nie einen Verkauf macht, kündigt im zweiten Monat. Das Modell sauber beizubringen ist die günstigste Kundenbindung, die wir haben.',
      },
    ],
  },

  PILLARS: {
    eyebrow: 'Das System',
    headline: 'Drei Dinge.',
    headlineMark: 'Ein System',
    headlineTail: '.',
    closer: {
      lead: 'Jedes davon hat eine andere Aufgabe.',
      cta: {
        label: 'Starte dein eBay-Geschäft',
      },
    },
    lead: 'Alles, was du für dein eBay-Geschäft brauchst.',
    items: [
      {
        title: 'Die Software',
        body: 'Sie findet Produkte, stellt sie mit einem Klick ein, wickelt Bestellungen ab und behält deinen Shop im Blick.',
      },
      {
        title: 'Die Community',
        body: 'Support rund um die Uhr, eine private Community und wöchentliche Live-Treffen.',
      },
      {
        title: 'Die Schulung',
        body: 'Dropship Mastery: der komplette Ablauf, Schritt für Schritt erklärt.',
      },
    ],
  },

  HERO_PANEL: {
    statusLabel: 'Läuft',
    beats: [
      {
        title: 'Findet ein Produkt, das sich schon verkauft',
        rows: [
          {
            label: 'Verkäufe in den letzten 30 Tagen',
          },
          {
            label: 'Marge pro Verkauf',
          },
        ],
        status: 'Gefunden',
      },
      {
        title: 'Schreibt das Angebot und stellt es online',
        rows: [
          {
            label: 'Titel, Merkmale, Beschreibung',
            value: 'Für dich geschrieben',
          },
          {
            label: 'Dein Teil',
            value: 'Ein Klick',
          },
        ],
        status: 'Eingestellt',
      },
      {
        chip: 'Preis- und Bestandsüberwachung',
        title: 'Der Händler ändert etwas. Dein Angebot zieht nach.',
        rows: [
          {
            label: 'Preis beim Händler',
          },
          {
            label: 'Geprüft',
            value: 'rund um die Uhr',
          },
        ],
        status: 'Aktualisiert',
      },
      {
        chip: 'Versand per Klick',
        title: 'Ein Verkauf kommt rein. Du bestätigst einmal.',
        rows: [
          {
            label: 'Bestellsumme',
          },
          {
            label: 'Dein Gewinn',
          },
        ],
        status: 'Bezahlt',
      },
    ],
    finale: {
      chip: 'Und weiter',
      title: 'Das war ein Produkt. Die Software hört da nicht auf.',
      body: 'Bis zu 3.000 Angebote im Monat im Monatsplan, während du schläfst.',
      cta: {
        label: 'Starte für 97 $',
      },
      replay: 'Nochmal ansehen',
    },
  },

  PROOF_BAR: {
    countriesLabel: 'Genutzt von Verkäufern in {count} Ländern',
    intro:
      'Genutzt von Verkäufern in den USA, Großbritannien, Kanada, Australien, Deutschland, Frankreich, Spanien und Italien',
    items: [
      {
        label: 'Trustpilot-Bewertung',
        detail: 'aus 42 Bewertungen',
      },
      {
        label: 'Mitglieder',
        detail: 'die auf eBay ein Einkommen aufbauen',
      },
      {
        value: '24/7',
        label: 'Support antwortet',
        detail: 'an 7 Tagen die Woche',
      },
      {
        label: 'Funktioniert mit',
        detail: 'den Marktplätzen, die du schon kennst',
      },
    ],
  },

  AUDIENCE: {
    eyebrow: 'Das Wichtigste zuerst',
    headline: 'Wird das für',
    headlineMark: 'dich',
    headlineTail: ' funktionieren?',
    lead: 'Fangen wir bei den Leuten an, die es schon machen.',
    memberLabel: 'Echtes EcomSniper-Mitglied',
    people: [
      {
        role: 'Arbeitet neun bis fünf',
        story:
          'Rory stellt rund um seine Schichten ein. Sein Ziel: irgendwann den Job ersetzen und mehr Zeit für die Familie haben.',
      },
      {
        role: 'Lieferfahrer und Gig-Worker',
        title: 'Immer noch unterwegs, über 3.500 Bestellungen später',
        story:
          'Opeyemi liefert zwischen den Schichten mit dem Rad aus. In der Spitze 400 £ am Tag, dann eine Sperre, danach weitergemacht. Über 3.500 Bestellungen und immer noch unterwegs.',
      },
      {
        role: 'Elternteil, zu Hause',
        title: 'Jahre auf Poshmark, jetzt ein echter Shop',
        story:
          'Mutter von zwei Kindern, gelernt in der Kinderbetreuung, seit Jahren Wiederverkäuferin auf Poshmark. Jennifer hat genau das gerade in einen echten Shop überführt, Angebot für Angebot.',
      },
      {
        role: 'Quereinsteiger aus dem Büro',
        title: 'Über 2.300 Bestellungen, nebenbei eingestellt',
        story:
          'Skyler hat im Einzelhandel gearbeitet, an Automaten, sogar in der Therapie. Heute ist er tagsüber im IT-Support. Nebenbei stellt er 100 bis 300 Artikel am Tag ein. Über 2.300 Bestellungen.',
      },
      {
        role: 'Kompletter Anfänger, zum ersten Mal online',
        title: 'Nie einen Dollar online verdient, bis er es automatisiert hat',
        story:
          'Will hatte online noch nie einen Dollar verdient. Er fand das Buch des Gründers auf Reddit, hielt manuelles Einstellen für den falschen Weg und hat stattdessen alles automatisiert.',
      },
      {
        role: 'Jung und gerade erst gestartet',
        title: '20 Jahre alt, über 70.000 Credits verbraucht',
        story:
          '20 Jahre alt, kein kaufmännischer Hintergrund, über einen Freund davon gehört. Steven hat auch in den zähen Wochen einfach weiter eingestellt. Seitdem über 70.000 Credits verbraucht.',
      },
      {
        role: 'Bei null gestartet, heute hauptberuflich',
        title: 'Von vorn angefangen, heute sein Haupteinkommen',
        story:
          'Caleb war arbeitslos, hat woanders allein Dropshipping gemacht und Geld verloren. Dann von vorn angefangen. Über 5.600 echte Bestellungen später ist das heute sein Haupteinkommen.',
      },
      {
        role: 'Etablierter Verkäufer, der skaliert hat',
        title: 'Fünf Nachtschichten die Woche, stellt trotzdem täglich ein',
        story:
          '52, verheiratet, zwei Kinder, verkauft bereits über Walmart. Chris arbeitet fünf Nächte die Woche und findet trotzdem täglich Zeit zum Einstellen. Fast 1.000 Bestellungen.',
      },
    ],
    closer: {
      beats: ['Verschiedene Leben.', 'Dasselbe System.'],
      questionLead: 'Bist',
      questionMark: 'du',
      questionTail: 'der Nächste?',
      cta: {
        label: 'Sieh dir die Preise an',
        nudge: 'Sei der Nächste',
      },
    },
  },

  FEATURES: {
    eyebrow: 'Fangen wir mit der Software an',
    headline: 'Die Software macht die schwere Arbeit.',
    lead: 'Sie übernimmt das Wiederkehrende. Du triffst die Entscheidungen.',
    items: [
      {
        title: 'Finde Produkte, die sich schon verkaufen',
        body: 'Product Hunter und Competitor Research zeigen dir Artikel, die gerade laufen — du musst nicht raten.',
        metric: 'Echte Verkaufsdaten',
      },
      {
        title: 'Stelle sie mit einem Klick ein',
        body: 'Die KI schreibt Titel, Beschreibung und Artikelmerkmale. Bis zu 3.000 Angebote im Monat im Monatsplan.',
        metric: 'Bis zu 3.000 Angebote / Monat',
      },
      {
        title: 'Sie behält deinen Shop im Blick',
        body: 'Ändert sich Preis oder Bestand beim Händler, aktualisiert sich dein Angebot im Hintergrund.',
        metric: 'Preis- und Bestandsüberwachung rund um die Uhr',
      },
      {
        title: 'Bestellungen sind mit einem Klick erledigt',
        body: 'Ein Verkauf kommt rein, du bestätigst einmal, den Rest bereitet EcomSniper vor.',
        metric: 'Versand per Klick',
      },
    ],
    closer: {
      lead: 'Mehr Zeit zum Aufbauen. Weniger Zeit am Klicken.',
      cta: {
        label: 'Starte dein eBay-Geschäft',
      },
      guarantee: '30 Tage Geld-zurück-Garantie im Monatsplan',
      bridge: {
        lead: 'Und wenn du mal nicht weiterkommst? Du bist',
        mark: 'nie allein',
        tail: '.',
      },
    },
  },

  COMPARISON: {
    eyebrow: 'Ehrlicher Vergleich',
    headline: 'Was du bekommst, das ein reines Listing-Tool nicht hat.',
    lead: 'Die meisten Dropshipping-Tools verkaufen dir Software und überlassen dir das Geschäft. Hier der Unterschied — auch da, wo wir verlieren.',
    columns: ['EcomSniper', 'Übliches Listing-Tool'],
    rows: [
      {
        feature: 'Masseneinstellung',
      },
      {
        feature: 'Preis- und Bestandsüberwachung',
      },
      {
        feature: 'Wettbewerbsanalyse',
      },
      {
        feature: 'Versand per Klick',
      },
      {
        feature: 'Kompletter Kurs inklusive',
      },
      {
        feature: 'Private Community',
      },
      {
        feature: 'Wöchentliche Live-Calls',
      },
      {
        feature: 'Menschlicher Support rund um die Uhr',
      },
      {
        feature: 'Einrichtung für dich erledigt',
        us: 'Enterprise-Tarif',
      },
      {
        feature: 'Der absolut günstigste Monatspreis',
      },
      {
        feature: 'Kostenloser Tarif',
      },
    ],
    groupLabels: {
      both: 'Können beide',
      ours: 'Nur EcomSniper',
      theirs: 'Wo ein Listing-Tool gewinnt',
    },
    concession:
      'Ein reines Listing-Tool ist günstiger, und manche haben einen kostenlosen Tarif. Beides stimmt.',
    pivot: 'Bleibt nur die Frage, was du eigentlich willst.',
    cta: {
      label: 'Sieh dir die Preise an',
    },
    closer:
      'Wenn für dich nur der Monatspreis zählt, ist ein reines Listing-Tool günstiger. Wenn du willst, dass dir das Geschäft beigebracht wird und Menschen dahinterstehen: genau dafür haben wir das gebaut.',
  },

  TRAINING: {
    eyebrow: 'Schritt für Schritt',
    headline: 'Fängst du bei ',
    headlineMark: 'null',
    headlineTail: ' an?',
    headline: 'Fängst du bei null an?',
    lead: 'Dropship Mastery erklärt den kompletten Ablauf, Schritt für Schritt.',
    steps: [
      {
        text: 'Finde einen Artikel auf der Seite eines Händlers und stelle ihn teurer bei eBay ein.',
      },
      {
        text: 'Ein Kunde kauft den Artikel in deinem eBay-Shop.',
      },
      {
        text: 'Du bestellst ihn beim Händler, direkt an deinen Kunden geliefert.',
      },
      {
        text: 'Die Preisdifferenz behältst du. Das ist dein Gewinn.',
      },
    ],
    closer: {
      lead: 'Du kaufst nie Ware ein. Du verschickst nie ein Paket.',
      detail:
        'Kein Lager. Keine Website. Kein Geld, das in Ware steckt, die du vielleicht nie verkaufst.',
    },
    cta: {
      label: 'Starte dein eBay-Geschäft',
    },
    guarantee: '30 Tage Geld-zurück-Garantie im Monatsplan',
    course: {
      eyebrow: 'Der Kurs',
      body: 'Die Schritt-für-Schritt-Schulung für eBay-Dropshipping, die komplette Anfänger durch den ganzen Ablauf führt. In jedem Tarif enthalten.',
      bullets: [
        'Kein Lager, keine Website',
        'Schritt für Schritt erklärt',
        'Wird aktualisiert, wenn sich eBay und der Markt ändern',
      ],
      instructorsLabel: 'Deine Trainer',
      modules: ['Konto einrichten', 'Produkte finden', 'Dein erstes Angebot', 'Skalieren'],
    },
  },

  COMMUNITY: {
    eyebrow: 'Support und Community',
    headline: 'So sieht',
    headlineMark: '„nie allein“',
    headlineTail: ' aus.',
    lead: 'Einmal fragen. Wir sind da.',
    body: 'Du hängst um zwei Uhr nachts fest und ein echter Mensch antwortet. Dahinter steht eine private Community aus Mitgliedern, die denselben Weg gehen, und jede Woche ein Live-Treffen, in dem du alles fragen kannst.',
    items: [
      {
        label: 'Hilfe, die nie schläft',
        body: 'Chat-Support rund um die Uhr, an 7 Tagen die Woche.',
      },
      {
        label: 'Eine private Community',
        body: 'Mitglieder in jeder Phase, vom ersten Angebot bis hauptberuflich.',
      },
      {
        title: 'Wöchentlich',
        label: 'Live-Treffen',
        body: 'Frag alles, live, bei den Leuten, die das Tool gebaut haben.',
      },
    ],
    drawn: {
      support: {
        status: 'Jetzt online',
      },
      question: {
        body: 'Mein Angebot wurde gerade blockiert. Kennt das jemand?',
      },
      replies: [
        {
          body: 'Kenne ich — das liegt an der Kategorie, nicht am Angebot. Zwei Klicks und es läuft.',
        },
        {
          body: 'Hatte ich letzte Woche genauso. Damit war es weg.',
          role: 'Mitglied',
        },
      ],
      typing: 'Zwei weitere Mitglieder antworten',
      call: {
        title: 'Wöchentlicher Live-Call',
        body: 'Frag alles, live, bei den Leuten, die das Tool gebaut haben.',
      },
      caption:
        'Eine Darstellung, wie eine Frage beantwortet wird — kein Mitschnitt eines echten Gesprächs.',
    },
  },

  FOUNDERS: {
    eyebrow: 'Wer dahintersteht',
    headline: 'Wir haben das Tool gebaut, das wir selbst gebraucht haben.',
    body: [
      'Sammy verkauft seit sieben Jahren auf eBay, angefangen im Kinderzimmer mit einem geliehenen Laptop. Marc war jahrelang in der Sicherheitsbranche, bevor er ganz in den E-Commerce gewechselt ist, und unterrichtet heute die komplette Schulung.',
      'EcomSniper fing als die Skripte an, die wir geschrieben haben, um nicht jeden Abend dieselben drei Aufgaben zu erledigen. Alles darin gibt es, weil es zuerst ein Problem von uns gelöst hat.',
    ],
    closer:
      'Wir betreiben immer noch Shops. Und wir beantworten die Fragen im Chat immer noch selbst.',
    bookCta: {
      label: 'Lies es, bevor du zahlst',
    },
    people: [
      {
        role: 'Mitgründer',
        detail: '7 Jahre Verkauf auf eBay. Betreibt bis heute eigene Shops.',
      },
      {
        role: 'Mitgründer, Leiter der Schulung',
        detail: 'Früher in der Sicherheitsbranche. Unterrichtet Dropship Mastery.',
      },
    ],
  },

  PROOF: {
    eyebrow: 'Schauen wir mal',
    headline: 'Aber funktioniert das',
    headlineMark: 'wirklich',
    headlineTail: '?',
    lead: 'Echte Mitglieder beantworten das. Sieh sie dir an, lies sie, oder schau dir die Belege an.',
    disclaimer:
      'Gezeigte Ergebnisse stammen von einzelnen Mitgliedern und sind nicht typisch. Deine Ergebnisse hängen von deinem Einsatz, deinem Markt und Faktoren ab, die niemand steuern kann. Siehe unseren Ergebnis-Hinweis.',
    cta: {
      label: 'Sieh dir die Preise an',
    },
    verifyLabel: 'Jede Bewertung auf Trustpilot prüfen',
    interviews: {
      eyebrow: 'Sieh sie dir an',
      headline: 'Die Menschen, in ihren eigenen Worten.',
      lead: 'Mitglieder darüber, was wirklich passiert ist — die Zahlen, die Fehler und wie lange es tatsächlich gedauert hat.',
      listLabel: 'Alle Interviews',
      channelLabel: 'Mehr auf dem EcomSniper-Kanal',
      privacyNote: 'Von YouTube wird nichts geladen, bevor du auf Play drückst.',
    },
    receiptsSection: {
      eyebrow: 'Die Belege',
      headline: 'Screenshots, die Mitglieder selbst gepostet haben.',
      lead: 'In der Community geteilt, als es passierte — nicht für diese Seite produziert.',
      closer: {
        cta: {
          label: 'Starte dein eBay-Geschäft',
        },
        guarantee: '30 Tage Geld-zurück-Garantie im Monatsplan',
      },
    },
    testimonials: {
      eyebrow: 'Schriftlich',
      headline: 'Was Mitglieder auf',
      headlineMark: 'Trustpilot',
      headlineTail: ' geschrieben haben.',
      lead: 'Vollständig, in ihren Worten. Jede einzelne steht im öffentlichen Profil.',
    },
    receipts: [
      {
        figureLabel: 'in 31 Tagen',
        caption: '5.059,44 $ in 31 Tagen',
        detail: 'Das eBay-Verkaufs-Dashboard eines Mitglieds, in der Community geteilt.',
      },
      {
        figureLabel: 'aktive Angebote',
        caption: '4.224 aktive Angebote',
        detail: 'Rory, auf dem Weg zu 10.000 Angeboten bei 65 % Gewinnmarge.',
      },
      {
        figure: '2 Konten',
        figureLabel: 'beide auf Allzeithoch',
        caption: 'Zwei Konten, beide auf Allzeithoch',
        detail: 'Im Discord gepostet: Ergebnisse aus zwei Shops in derselben Woche.',
      },
    ],
    videos: [
      {
        figure: '100 $/Tag',
        figureWho: '17-Jähriger',
        guest: 'Mitglieder-Interview',
      },
      {
        figure: '1.600 $/Monat',
        figureWho: '21-Jähriger',
        guest: 'Mitglieder-Interview',
      },
      {
        figure: '18.000 $/Monat',
        figureWho: 'Anfänger',
        guest: 'Mitglieder-Interview',
      },
      {
        guest: 'Sammy, Mitgründer',
      },
      {
        figure: '3.000 $/Monat',
        figureWho: 'Student',
        guest: 'Mitglieder-Interview',
      },
      {
        figure: '800 $/Woche',
        figureWho: 'Vater im Homeoffice',
        guest: 'Mitglieder-Interview',
      },
      {
        figure: '200 $ am zweiten Tag',
        figureWho: 'Neu dabei',
        guest: 'Mitglieder-Interview',
      },
      {
        figure: '2.000 $/Monat',
        guest: 'Mit Lance',
      },
      {
        guest: 'Mit Adam',
      },
      {
        guest: 'Mit Dollins',
      },
      {
        guest: 'Mit Oleg',
      },
      {
        guest: 'Mit Jon',
      },
    ],
  },

  PLAYBOOK: {
    eyebrow: 'Kostenlos, ohne Karte',
    lead: 'Wie eBay-Dropshipping wirklich funktioniert, wenn du keine Ware, keine Website und keine Erfahrung hast.',
    bullets: [
      'Ob eBay-Dropshipping überhaupt erlaubt ist, klar beantwortet',
      'Wie die ersten 30 Tage eines Mitglieds tatsächlich aussahen',
      'Was die tägliche Arbeit ist, sobald deine Angebote online sind',
      'Ob EcomSniper sein Geld wert ist — auch, für wen es das nicht ist',
    ],
    formCta: 'Schick mir das Playbook',
    smallprint:
      'Keine Countdown-Uhren, keine künstliche Knappheit. Abmelden geht am Ende jeder E-Mail.',
    reassurances: ['83 Seiten', 'Kein Spam', 'Keine Kreditkarte', 'Sofort verfügbar'],
    done: {
      title: 'Es gehört dir.',
      body: 'Der Download startet über den Button unten. Eine Kopie ist auch schon zu dir unterwegs — falls sie in ein paar Minuten nicht da ist, schau im Werbung-Ordner nach, und antworte in jedem Fall darauf. Da liest ein Mensch mit.',
      downloadCta: 'Playbook herunterladen',
      upsell: {
        title: 'Lies es zuerst. Und wenn es passt, dann starte.',
        body: 'Das Playbook ist das komplette Modell, ohne etwas zurückzuhalten. Die Software ist das, was dir die Handarbeit abnimmt.',
      },
    },
    privacy: 'Deine Daten sind sicher und werden niemals weitergegeben.',
  },

  CONSULT: {
    eyebrow: 'Kostenloses Beratungsgespräch',
    title: 'Sprich mit jemandem, bevor du dich entscheidest.',
    body: 'Lass uns deinen Namen und deine E-Mail-Adresse da und wir vereinbaren ein kostenloses Beratungsgespräch: ein ehrliches Gespräch darüber, wo du stehst und ob das das Richtige für dich ist.',
    points: [
      'Ein Gespräch, kein Verkaufsanruf',
      'Wie dein erster Monat realistisch aussehen würde',
      'Ob EcomSniper das Falsche für dich ist',
    ],
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'Dein Name',
    fieldLabel: 'E-Mail-Adresse',
    placeholder: 'du@beispiel.de',
    cta: 'Kostenloses Gespräch anfragen',
    dismiss: 'Nein, danke',
    privacy: 'Deine Daten sind sicher und werden niemals weitergegeben.',
    done: {
      title: 'Anfrage ist da.',
      body: 'Wir schreiben an diese Adresse, um dein Gespräch zu vereinbaren. Sonst landet nichts in deinem Postfach.',
    },
    error: 'Das ging nicht raus. Versuch es nochmal oder schreib uns direkt.',
  },

  EXIT_INTENT: {
    eyebrow: 'Bevor du gehst',
    title: 'Nimm das Playbook mit.',
    body: 'The Invisible Store: wie eBay-Dropshipping wirklich funktioniert, wenn du keine Ware, keine Website und keine Erfahrung hast. 83 Seiten, kostenlos, ohne Karte.',
    cta: {
      label: 'Schick mir das Playbook',
    },
    dismiss: 'Nein, danke',
  },

  SEO: {
    home: {
      title: 'EcomSniper — eBay-Dropshipping-Software, Schulung & Community',
      description:
        'Finde Produkte, die sich schon verkaufen, stelle sie mit einem Klick ein und lass EcomSniper deinen eBay-Shop rund um die Uhr überwachen. Software, Schritt-für-Schritt-Schulung und eine Community mit über 400 Mitgliedern. Ab 97 $, 30 Tage Geld-zurück-Garantie im Monatsplan.',
    },
    pricing: {
      title: 'Preise — EcomSniper eBay-Dropshipping-Software',
      description:
        'Starte für 97 $ im ersten Monat, danach 199 $ im Monat, mit 30 Tagen Geld-zurück-Garantie im Monatsplan. In jedem Tarif enthalten: der komplette Kurs Dropship Mastery, die private Community und Support rund um die Uhr.',
    },
    faq: {
      title: 'FAQ — EcomSniper eBay-Dropshipping-Software',
      description:
        'Die Fragen, die wirklich kommen: ob eBay-Dropshipping erlaubt ist, was der Start insgesamt kostet, wie Credits funktionieren, Rückerstattungen, unterstützte Länder und was mit deinen Angeboten passiert, wenn du kündigst.',
    },
    playbook: {
      title: 'The Invisible Store — Kostenloses eBay-Dropshipping-Playbook | EcomSniper',
      description:
        'Ein kostenloses Playbook auf 83 Seiten darüber, wie eBay-Dropshipping wirklich funktioniert — ohne Ware, ohne Website, ohne Erfahrung. Inklusive der Frage, ob es überhaupt erlaubt ist, und für wen EcomSniper das Falsche ist.',
    },
    notFound: {
      title: 'Seite nicht gefunden — EcomSniper',
      description:
        'Diese Seite gibt es nicht. Zurück zur Startseite oder nimm dir das kostenlose Playbook.',
    },
  },

  NOT_FOUND: {
    eyebrow: 'Fehler 404',
    headline: 'Diese Seite ist nicht hier.',
    body: 'Der Link ist vielleicht alt, oder die Seite ist umgezogen. So oder so: die zwei Dinge, die sich lohnen, stehen unten.',
    homeCta: 'Zurück zur Startseite',
    playbookCta: 'Hol dir das kostenlose Playbook',
  },

  A11Y: {
    close: 'Schließen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    language: 'Sprache',
    backToTop: 'Nach oben',
    home: 'EcomSniper Startseite',
    navPrimary: 'Hauptmenü',
    navMobile: 'Mobiles Menü',
    navFooter: 'Fußzeile',
    navQuestionGroups: 'Fragengruppen',
    proofRegion: 'Belege und Vertrauenssignale',
    prevReview: 'Vorherige Bewertung',
    nextReview: 'Nächste Bewertung',
    prevInterview: 'Vorheriges Interview',
    nextInterview: 'Nächstes Interview',
    included: 'Enthalten',
    partlyIncluded: 'Teilweise enthalten',
    notIncluded: 'Nicht enthalten',
    rating: '{n} von 5 Sternen',
    step: 'Schritt {n} von {total}',
    stepWithTitle: 'Schritt {n} von {total}: {title}',
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
        links: [{ label: 'AGB' }, { label: 'Datenschutz' }, { label: 'Bewertungen' }],
      },
    ],
    disclaimer:
      'EcomSniper steht in keiner Verbindung zu eBay Inc. oder Amazon.com, Inc. und wird von diesen weder unterstützt noch gesponsert. Gezeigte Ergebnisse stammen von einzelnen Mitgliedern und sind nicht typisch. Deine Ergebnisse hängen von deinem Einsatz, deinem Markt und Faktoren ab, die niemand steuern kann.',
  },
};
