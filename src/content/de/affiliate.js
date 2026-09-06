/**
 * Deutsch — Partnerprogramm, Landingpage und Bewerbungsformular.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe `../en/affiliate.js`.
 *
 * **Positionsgleich gespiegelt.** Der Merge arbeitet über den Index: `facts`,
 * `steps.items` und `eligibility.items` stehen hier in derselben Reihenfolge,
 * und `headlineParts` hat dieselbe Zahl an Segmenten — sonst landet die
 * Markierung auf dem falschen Wort oder ein Label an der falschen Zahl.
 *
 * Beträge bleiben in Dollar ("$100"), weil das Programm in Dollar auszahlt.
 * Eine Umrechnung würde eine Schwelle nennen, die so nicht im Vertrag steht.
 *
 * **Kein Provisionssatz.** Klausel 7 nennt keinen, also nennt diese Seite auch
 * keinen — in beiden Sprachen.
 */
export const overlay = {
  AFFILIATE: {
    eyebrow: 'Partnerprogramm',

    headlineParts: [{ text: 'Verdiene an den Leuten, die du ' }, { text: 'bringst.', mark: true }],
    headline: 'Verdiene an den Leuten, die du bringst.',

    lead: 'Teile deinen Empfehlungslink und verdiene an jedem Abo, das darüber zustande kommt. Ausgezahlt wird vierteljährlich über PayPal, ab $100.',

    ctas: {
      primary: { label: 'Jetzt bewerben' },
      secondary: { label: 'Bedingungen lesen' },
    },

    facts: [
      { label: 'Auszahlung', value: 'Vierteljährlich', note: 'Zwischen dem 1. und 10.' },
      { label: 'Ausgezahlt über', value: 'PayPal', note: 'Der einzige angebotene Weg' },
      { label: 'Mindestbetrag', value: '$100', note: 'Bevor du eine Auszahlung anforderst' },
      { label: 'Voraussetzung', value: '18+', note: 'Und ein bezahltes Abo' },
    ],

    steps: {
      eyebrow: 'So läuft es',
      headlineParts: [{ text: 'Drei Schritte, dann ' }, { text: 'läuft es.', mark: true }],
      headline: 'Drei Schritte, dann läuft es.',

      items: [
        {
          title: 'Bewerben',
          body: 'Erzähl uns, wen du erreichst und wie. Jede Bewerbung wird von einem Menschen gelesen; EcomSniper entscheidet nach eigenem Ermessen über Aufnahme oder Absage.',
        },
        {
          title: 'Link teilen',
          body: 'Aufgenommene Partner bekommen einen eigenen Empfehlungslink oder Gutscheincode. Bewirb ihn ehrlich — keine künstliche Dringlichkeit, keine Einkommensversprechen, kein Spam.',
        },
        {
          title: 'Auszahlung anfordern',
          body: 'Provisionen sammeln sich aus qualifizierten Verkäufen. Ab einem Guthaben von $100 forderst du die Auszahlung im Partner-Dashboard an.',
        },
      ],
    },

    eligibility: {
      title: 'Bevor du dich bewirbst',
      lead: 'Das Programm hat echte Bedingungen, und die liest man besser jetzt als nach einer Absage.',
      items: [
        'Du bist 18 oder so alt, wie es bei dir vorgeschrieben ist.',
        'Du hast ein aktives, bezahltes EcomSniper-Abo — läuft es aus, ruht auch der Partnerstatus.',
        'Du bewirbst es ehrlich. Irreführende Einkommensversprechen und erfundene Bewertungen beenden die Partnerschaft.',
        'Die Provisionssätze legt EcomSniper fest und teilt sie dir nach der Aufnahme mit.',
      ],
    },

    form: {
      eyebrow: 'Die Bewerbung',
      title: 'Bewirb dich für das Programm',
      lead: 'Jede Bewerbung wird von einem Menschen gelesen. Du bekommst so oder so eine Antwort per E-Mail.',

      name: { label: 'Dein Name', placeholder: 'Alex Fischer' },
      email: { label: 'E-Mail', placeholder: 'du@beispiel.de' },
      country: { label: 'Land', placeholder: 'Deutschland' },
      channels: {
        label: 'Wo du es bewerben würdest',
        placeholder: 'YouTube, ein Discord-Server, ein Newsletter — was du wirklich betreibst',
      },
      audience: { label: 'Wie viele Leute du ungefähr erreichst', placeholder: '4.000 Abonnenten' },
      links: {
        label: 'Links zu deinen Kanälen',
        placeholder: 'youtube.com/@deinkanal\ninstagram.com/deinname',
      },

      consent: {
        before: 'Ich habe die ',
        link: { label: 'Bedingungen des Partnerprogramms' },
        after: ' gelesen und stimme ihnen zu.',
      },

      submit: 'Bewerbung senden',
      sending: 'Wird gesendet…',

      done: 'Bewerbung gesendet. Wir lesen jede einzelne und antworten per E-Mail.',
      handoff:
        'Dein E-Mail-Programm sollte sich mit der ausgefüllten Bewerbung öffnen. Dort auf Senden drücken, dann erreicht sie uns.',
      error:
        'Das ging nicht raus. Schreib an management@ecomsniper.io, dann nehmen wir es von dort auf.',
      trap: 'Dieses Feld leer lassen',
    },

    terms: {
      title: 'Die vollständigen Bedingungen',
      body: 'Elf Klauseln zu Aufnahme, Verhalten, Zuordnung von Empfehlungen, Provisionen, Auszahlung und Beendigung. Vor der Bewerbung zu lesen, nicht danach.',
      cta: { label: 'Partnerbedingungen lesen' },
    },
  },
};
