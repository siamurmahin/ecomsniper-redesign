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
    headlineParts: [
      { text: 'Wir wissen, was es ' },
      { text: 'gekostet hat', mark: true },
      { text: ', dieses Geld zu verdienen.' },
    ],
    statementParts: [
      { text: 'Wenn du für etwas bezahlst, gibst du uns ' },
      { text: 'Stunden deines Lebens', mark: true },
      { text: '. Daran denken wir.' },
    ],

    hours: ['Die Spätschichten.', 'Die Überstunden.', 'Die müden Morgen.'],
    statement: 'Wenn du für etwas bezahlst, gibst du uns Stunden deines Lebens. Daran denken wir.',

    figure: {
      label: 'Was ein Monat kostet',
    },

    ctas: {
      primary: { label: 'Preise ansehen' },
      secondary: { label: 'Playbook kostenlos holen' },
    },

    cost: {
      eyebrow: 'Die Kosten',
      headline: 'Wir wissen, was das kostet.',
      hours: [
        { who: 'Für manche', what: 'ein paar Stunden Arbeit' },
        { who: 'Für andere', what: 'eine Woche mit frühen Morgen und langen Tagen' },
      ],
      unknown: 'Wir wissen nicht, wer von beiden du bist.',
      body: [
        'Für manche sind 200 $ ein paar Stunden Arbeit. Für andere eine Woche mit frühen Morgen und langen Tagen. Wir wissen nicht, wer von beiden du bist. Also behandeln wir jeden wie den Zweiten.',
        'Das heißt: wir sind vorsichtig. Wir überstürzen keine Funktionen, die nicht fertig sind. Wir versprechen nichts, bei dem wir uns nicht sicher sind. Lieber langsamer und richtig.',
        'Es heißt auch, dass wir Support-Nachrichten so beantworten, als hätte die Person am anderen Ende hart dafür gearbeitet. Weil sie das hat.',
      ],
    },

    origin: {
      eyebrow: 'Wie das angefangen hat',
      headline: 'Wie das angefangen hat.',
      body: [
        'Vor Jahren haben wir das alles von Hand gemacht. Produkte finden. Angebote erstellen. Jeden Tag Preise prüfen. Das hat Stunden gekostet. Die Ergebnisse waren in Ordnung, aber die Arbeit hörte nie auf.',
        'Also haben wir uns Werkzeuge gebaut, um es uns leichter zu machen. Dann fragten andere, ob sie die auch nutzen dürfen. So wurde daraus eine Firma.',
        'Wir sind keine Genies. Wir hatten einfach keine Lust mehr, immer dasselbe zu tun. Und jetzt fühlen wir uns verantwortlich für die Menschen, die uns dafür bezahlen, ihnen die Arbeit leichter zu machen.',
      ],
    },

    giving: {
      eyebrow: 'Das Weitergeben',
      headline: 'Wohin ein Teil davon geht.',
      lead: 'Ein Teil von dem, was du uns zahlst, geht an Menschen, die es nötiger haben.',
      gifts: [
        { label: 'Waisenhäuser', body: 'Wir besuchen Waisenhäuser.' },
        {
          label: 'Medizinische Hilfe',
          body: 'Wir helfen Familien, die sich medizinische Versorgung nicht leisten können.',
        },
        {
          label: 'Schulen',
          body: 'Wir unterstützen Schulen, die kaum offen bleiben können.',
        },
      ],
      body: [
        'Das ist kein Marketing. Wir machen es einfach. Wenn du dabei bist, bist du Teil davon.',
      ],
      everySubscription:
        'Jedes Abo hilft uns, ein bisschen mehr für Menschen zu tun, die es brauchen.',
      /* Mirrors the English gallery position for position — the deck merges
         arrays by index, so a caption added on one side without the other
         shifts every caption after it. */
      gallery: [
        { caption: 'Schulmaterial für Kinder' },
        { caption: 'Zeit im Waisenhaus' },
        { caption: 'Ausgabe von Schulmaterial' },
        { caption: 'Medizinische Unterstützung' },
        { caption: 'Besuch im Waisenhaus' },
        { caption: 'Momente, die zählen' },
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

    offer: {
      eyebrow: 'Das Angebot',
      headline: 'Was du wirklich bekommst.',
      items: [
        {
          lead: 'Werkzeuge, die das Langweilige übernehmen.',
          body: 'Produkte einstellen. Preise beobachten. Bestände verfolgen. Die Dinge, die von Hand Stunden fressen.',
        },
        {
          lead: 'Support von Menschen, die diese Arbeit selbst gemacht haben.',
          body: 'Wenn du fragst, bekommst du eine echte Antwort. Kein Skript.',
        },
        {
          lead: 'Eine Community, die es gemeinsam herausfindet.',
          body: 'Manche Tage laufen gut. Manche sind zäh. Beides wird geteilt.',
        },
      ],
      closer:
        'Das ist alles. Wir sparen dir Zeit bei dem, was sich wiederholt, damit du sie für das ausgeben kannst, wofür man einen Kopf braucht.',
    },

    team: {
      eyebrow: 'Das Team',
      headline: 'Wer wir sind.',
      body: [
        'Ein kleines Team. Und das mögen wir so. Es heißt, dass wir wirklich wissen, was bei unseren Nutzern los ist. Wir lesen die Support-Nachrichten selbst.',
        'Wir wollen keine große Firma werden. Wir wollen für die Leute nützlich sein, die uns vertrauen.',
      ],
      quote: {
        text: 'Ich erinnere mich an ganze Wochenenden voll Arbeit, die zu nichts geführt hat. Dieses Gefühl ist geblieben. Deshalb ist es mir wichtig, die Zeit anderer nicht zu verschwenden. Zeit ist das Einzige, was du nicht zurückbekommst.',
        role: 'Gründer',
      },
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
      secondaryCta: { label: 'Playbook kostenlos holen' },
      assurance: '30 Tage Geld zurück im Monatsplan',
      closer:
        'Die Schulung, die Software und die Menschen, die dich begleiten. Alles an einem Ort.',
    },
  },
};
