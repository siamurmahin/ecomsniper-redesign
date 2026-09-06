/**
 * Deutsch — Karriere.
 *
 * Only the keys that differ from English. The role's own details — title,
 * department, location, pay — stay as they are: a job advert is a legal
 * document about work and money, and translating the terms of one without
 * the client's sign-off would be inventing them. The page furniture around
 * it is German.
 *
 * **`roles` merges by position.** The overlay's first entry lands on the
 * English deck's first role, the second on the second, and so on — see
 * `content/merge.js`. Inserting a role in the English file without inserting
 * the matching entry here shifts every German label onto the wrong job. That
 * is the bug that mislabelled the footer on 4 Sep, and a job advert is a worse
 * place for it.
 *
 * The prose is left in English on purpose. The English copy is **our draft
 * awaiting the client** (see the English file's header); translating an
 * unapproved job description would produce two unapproved versions to correct
 * instead of one. It falls through to English, which is honest about its
 * state. Translate once the client's own text lands.
 */
export const overlay = {
  CAREERS: {
    eyebrow: 'Karriere',
    /* Positional, like every array in an overlay: the marked run has to be the
       second part here too, or the German headline marks the wrong words. */
    headlineParts: [
      { text: 'Mach die beste Arbeit deiner Laufbahn — ' },
      { text: 'bei uns.', mark: true },
    ],
    headline: 'Mach die beste Arbeit deiner Laufbahn — bei uns.',
    lead: 'Ein kleines Team, das Werkzeuge baut, die tausende eBay-Verkäufer nutzen. Bring dein Handwerk mit. Wir bringen die Zeit dafür.',

    openRoles: {
      eyebrow: 'Offene Stellen',
      headline: 'Aktuell eine offene Stelle.',
      empty: 'Momentan ist nichts ausgeschrieben. Die Tür unten steht trotzdem offen.',
      viewLabel: 'Stelle ansehen',
      roles: [
        {
          location: 'Remote',
          type: 'Vollzeit',
        },
      ],
    },

    role: {
      backLabel: 'Alle offenen Stellen',
      applyCta: 'Auf diese Stelle bewerben',
      aboutHeading: 'Über die Stelle',
      responsibilitiesHeading: 'Was du machen würdest',
      requirementsHeading: 'Was wir suchen',
      niceToHaveHeading: 'Schön zu haben',
      factLabels: {
        department: 'Bereich',
        location: 'Ort',
        type: 'Anstellung',
        salary: 'Vergütung',
      },
    },

    apply: {
      eyebrow: 'Die Bewerbung',
      headline: 'Auf diese Stelle bewerben',
      lead: 'Jede Bewerbung wird von einem Menschen gelesen. Du bekommst so oder so eine Antwort.',
      fields: {
        name: { label: 'Dein Name', placeholder: 'Alex Fischer' },
        email: { label: 'E-Mail', placeholder: 'du@beispiel.de' },
        location: { label: 'Wo du sitzt', placeholder: 'Berlin, Deutschland' },
        portfolio: {
          label: 'Portfolio oder Showreel',
          placeholder: 'Ein Link, den wir ansehen können',
        },
        profile: { label: 'LinkedIn oder anderes Profil', placeholder: 'Optional' },
        message: {
          label: 'Warum diese Stelle',
          placeholder: 'Was du gemacht hast — und woran du als Nächstes arbeiten willst.',
        },
      },
      submit: 'Bewerbung senden',
      attachNote: 'Häng deinen Lebenslauf an diese E-Mail, falls du einen hast.',
      sending: 'Wird gesendet…',
      sent: 'Danke — deine Bewerbung ist da. Wir melden uns so oder so.',
      failed: 'Das ging nicht raus. Schreib uns stattdessen eine E-Mail, wir greifen sie auf.',
    },

    speculative: {
      eyebrow: 'Nichts dabei',
      headline: 'Erzähl uns trotzdem, was du machst.',
      body: 'Lieber hören wir von jemandem, der gut ist und für den gerade nichts ausgeschrieben ist, als dass wir ihn verpassen. Schick uns, was du gebaut hast und woran du arbeiten willst.',
      cta: 'Schreib uns',
    },
  },
};
