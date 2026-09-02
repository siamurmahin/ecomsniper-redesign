/**
 * German — 08 — The community.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 */
export const overlay = {
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
};
