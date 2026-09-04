/**
 * Deutsch — Kontakt.
 *
 * Seitenlokale Copy, nicht Teil des globalen Decks — siehe `../en/contact.js`.
 *
 * Der Merge arbeitet über den Index: `methods` steht hier in derselben
 * Reihenfolge wie im Englischen, und `href` wird bewusst nicht übersetzt.
 * Telefonnummer, E-Mail-Adresse und Ort bleiben unverändert — sie sind keine
 * Sprache, sondern Daten.
 */
export const overlay = {
  CONTACT: {
    eyebrow: 'Kontakt',
    headline: 'Wie können wir helfen?',
    lead: 'Einmal fragen. Wir kümmern uns.',
    methodsTitle: 'Direkt erreichen',
    intro: 'Schreib uns — es antwortet ein Mensch.',

    methods: [
      { label: 'Anrufen', value: '1 (800) 994-9831', href: 'tel:+18009949831' },
      {
        label: 'E-Mail',
        value: 'management@ecomsniper.io',
        href: 'mailto:management@ecomsniper.io',
      },
      { label: 'Adresse', value: 'Toronto, Ontario, Kanada' },
    ],

    hours: 'Support rund um die Uhr. Zu jeder Stunde.',
    seal: 'ECOMSNIPER • TORONTO, KANADA • ',

    form: {
      name: { label: 'Dein Name', placeholder: 'John Carter' },
      email: { label: 'Deine E-Mail', placeholder: 'du@email.de' },
      message: {
        label: 'Deine Nachricht',
        placeholder: 'Schreib, was du brauchst. Wir lesen jede Nachricht selbst.',
      },
      panelTitle: 'Schreib uns',
      panelNote: 'Wir lesen jede Nachricht selbst. Keine Ticketnummern, keine Bots.',

      submit: 'Nachricht senden',
      sending: 'Wird gesendet …',

      handoff: 'Dein E-Mail-Programm sollte sich mit der fertigen Nachricht öffnen. Dort absenden.',
      handoffFallback:
        'Falls sich nichts öffnet: schreib an management@ecomsniper.io, wir kümmern uns.',

      done: 'Danke — das ist bei uns angekommen. Wir antworten auf jede Nachricht, meist am selben Tag.',
      error:
        'Das ließ sich nicht senden. Schreib an management@ecomsniper.io, wir kümmern uns darum.',
    },

    secondDoor: {
      title: 'Noch nicht bereit zu fragen?',
      body: 'Nimm dir das kostenlose Playbook und lies es zuerst. Keine Karte, kein Druck.',
      cta: { label: 'Kostenloses Playbook holen' },
    },

    closing: 'Die Schulung, die Software und die Menschen, die dich begleiten. Alles an einem Ort.',
  },
};
