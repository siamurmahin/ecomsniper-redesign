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
      {
        title: 'Keine Erfahrung nötig',
        detail: 'Schritt für Schritt begleitet',
      },
      {
        title: 'Eine aktive Community',
        detail: 'Du gehst den Weg nicht allein',
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
