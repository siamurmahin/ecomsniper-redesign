/**
 * Deutsch — Über uns.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 *
 * The two rules that carry over matter here as much as anywhere: no income
 * claims, and the guarantee always names the monthly plan — "im Monatsplan".
 * This page's whole argument is that the company is careful with money that
 * was hard to earn, so the German reads plainly rather than warmly.
 *
 * `figure.value` stays "$200": the client charges in dollars.
 */
export const overlay = {
  ABOUT: {
    eyebrow: 'Über uns',
    headline: 'Wir wissen, was es gekostet hat, dieses Geld zu verdienen.',

    figure: {
      label: 'Was ein Monat kostet',
    },

    cost: {
      eyebrow: 'Die Kosten',
      headline: 'Wir wissen, was das kostet.',
      body: [
        'Für manche sind 200 $ ein paar Stunden Arbeit. Für andere eine Woche mit frühen Morgen und langen Tagen. Wir wissen nicht, wer von beiden du bist. Also behandeln wir jeden wie den Zweiten.',
        'Das heißt: wir sind vorsichtig. Wir überstürzen keine Funktionen, die nicht fertig sind. Wir versprechen nichts, bei dem wir uns nicht sicher sind. Lieber langsamer und richtig.',
        'Es heißt auch, dass wir Support-Nachrichten so beantworten, als hätte die Person am anderen Ende hart dafür gearbeitet. Weil sie das hat.',
      ],
    },

    giving: {
      eyebrow: 'Das Weitergeben',
      headline: 'Wohin ein Teil davon geht.',
      body: [
        'Ein Teil von dem, was du uns zahlst, geht an Menschen, die es nötiger haben.',
        'Wir besuchen Waisenhäuser. Wir helfen Familien, die sich medizinische Versorgung nicht leisten können. Wir unterstützen Schulen, die kaum offen bleiben können.',
        'Das ist kein Marketing. Wir machen es einfach. Wenn du dabei bist, bist du Teil davon.',
      ],
      closer: 'Wir erzählen das, weil du jetzt dazugehörst. Nicht, um zu beeindrucken.',
    },

    boundaries: {
      eyebrow: 'Die Grenzen',
      headline: 'Was wir nicht tun.',
      items: [
        {
          lead: 'Wir zeigen dir keine Screenshots von großen Einnahmen.',
          body: 'Die machen falsche Hoffnung. Sie bringen Leute dazu, Geld auszugeben und dasselbe Ergebnis zu erwarten. Das ist dir gegenüber nicht fair.',
        },
        {
          lead: 'Wir drängen dich nicht mit Countdowns',
          body: 'oder „nur noch wenige Plätze". Wenn du eine Woche brauchst, nimm dir eine Woche. Wir sind dann noch da.',
        },
        {
          lead: 'Wir versuchen nicht, so viele Anmeldungen wie möglich zu bekommen.',
          body: 'Lieber 100 Leute, für die es sich wirklich lohnt, als 1.000, die das Gefühl haben, ihr Geld verschwendet zu haben.',
        },
        {
          lead: 'Wir verschwinden nicht,',
          body: 'wenn etwas schiefgeht. Wenn etwas kaputt ist oder bei dir nicht funktioniert, ist das unser Problem. Nicht deins, das du allein lösen musst.',
        },
      ],
      closer: 'Diese Entscheidungen bedeuten langsameres Wachstum. Das ist für uns in Ordnung.',
    },

    responsibility: {
      eyebrow: 'Die Verantwortung',
      headline: 'Wenn es nicht klappt.',
      body: [
        'Manchmal versuchen Leute alles, und es klickt trotzdem nicht. Sie stecken die Zeit rein. Sie folgen den Schritten. Und es funktioniert für sie einfach nicht.',
        'Wenn das passiert, zucken wir nicht mit den Schultern und sagen „wir haben ja nie etwas versprochen". Auf dem Papier stimmt das vielleicht. Richtig fühlt es sich nicht an.',
        'Wir erstatten zurück. Wir versuchen zu helfen. Aber vor allem behalten wir im Kopf, dass diese Person uns ihr Geld und ihre Zeit gegeben hat. Diese Stunden kommen nicht zurück.',
        'Wir können nicht versprechen, dass es bei allen klappt. Das kann niemand. Aber wir können versprechen, dass wir nicht so tun, als wäre es nicht unsere Sache, wenn es nicht klappt.',
        'Wenn du es ehrlich versuchst und es trotzdem nicht funktioniert, tragen wir einen Teil dieser Verantwortung mit. So sehen wir das.',
      ],
    },

    team: {
      eyebrow: 'Das Team',
      headline: 'Wer wir sind.',
      body: [
        'Ein kleines Team. Und das mögen wir so. Es heißt, dass wir wirklich wissen, was bei unseren Nutzern los ist. Wir lesen die Support-Nachrichten selbst.',
        'Wir wollen keine große Firma werden. Wir wollen für die Leute nützlich sein, die uns vertrauen.',
      ],
    },

    invitation: {
      eyebrow: 'Die Einladung',
      headline: 'Wenn du darüber nachdenkst.',
      body: [
        'Lass dir Zeit. Schau dich um. Lies die Bewertungen. Es gibt keine Eile.',
        'Wenn es für dich nicht passt, ist das in Ordnung. Wir hätten lieber, dass du richtig entscheidest als schnell.',
        'Und wenn du dabei bist, geben wir unser Bestes, die Stunden wert zu sein, die du dafür gearbeitet hast.',
      ],
      cta: { label: 'Preise ansehen' },
      assurance: '30 Tage Geld zurück im Monatsplan',
      closer:
        'Die Schulung, die Software und die Menschen, die dich begleiten. Alles an einem Ort.',
    },
  },
};
