/**
 * German — login and registration.
 *
 * Only the keys that differ from English; anything absent falls through to the
 * English deck. Arrays merge by position, so an item added to a list here has
 * to sit where its English counterpart does.
 *
 * The two departures from the client's own pages are the same in both
 * languages and are explained in `../en/auth.js`: the banned income headline
 * is not carried, and the password minimum is eight rather than six.
 */
export const overlay = {
  AUTH: {
    login: {
      eyebrow: 'Mitglieder',
      headline: 'Willkommen zurück.',
      lead: 'Melde dich an — für dein Dashboard, deine Listings und das Training.',

      form: {
        panelTitle: 'Anmelden',
        email: { label: 'E-Mail', placeholder: 'du@beispiel.de' },
        password: { label: 'Passwort', placeholder: 'Dein Passwort' },
        reveal: { show: 'Passwort anzeigen', hide: 'Passwort verbergen' },
        submit: 'Anmelden',
        forgot: 'Passwort vergessen?',
        switchPrompt: 'Noch kein Konto?',
        switchCta: { label: 'Registrieren' },
        notConnected:
          'Dieses Formular ist ein Entwurf. Hinter dieser Seite steht noch kein Server — nichts, was du eingibst, wird gesendet, gespeichert oder protokolliert.',
      },

      aside: {
        headline: 'Alles, was weiterläuft.',
        items: [
          { label: 'Product Hunter und Competitor Research' },
          { label: 'Der KI-Lister und deine Entwürfe' },
          { label: 'Dropship Mastery, da wo du aufgehört hast' },
        ],
        support: 'Ausgesperrt? Der Support antwortet rund um die Uhr, und ein Mensch liest mit.',
      },
    },

    register: {
      eyebrow: 'Konto erstellen',
      headline: 'Heute starten. Innerhalb von 30 Tagen aussteigen und nichts zahlen.',
      lead: 'Ein Konto für die Software und den Kurs. Der erste Monat kostet 97 $, und die Garantie gilt den ganzen Monat — keine Testphase.',

      steps: [
        { label: 'Konto erstellen', note: 'Deine Daten' },
        { label: 'Zahlung', note: 'Karte und Rechnung' },
      ],

      form: {
        panelTitle: 'Deine Daten',
        email: { label: 'E-Mail-Adresse', placeholder: 'du@beispiel.de' },
        confirmEmail: {
          label: 'E-Mail-Adresse bestätigen',
          placeholder: 'Dieselbe Adresse noch einmal',
        },
        password: { label: 'Passwort', placeholder: 'Mindestens 8 Zeichen' },
        passwordHint: 'Mindestens 8 Zeichen. Länge schlägt Sonderzeichen — ein Satz reicht.',
        reveal: { show: 'Passwort anzeigen', hide: 'Passwort verbergen' },
        consent: {
          before: 'Ich stimme den ',
          terms: { label: 'AGB' },
          between: ' und der ',
          privacy: { label: 'Datenschutzerklärung' },
          after: ' von EcomSniper zu.',
        },
        submit: 'Weiter zur Zahlung',
        switchPrompt: 'Schon Mitglied?',
        switchCta: { label: 'Anmelden' },
        notConnected:
          'Dieses Formular ist ein Entwurf. Hinter dieser Seite steht noch kein Server — nichts, was du eingibst, wird gesendet, gespeichert oder protokolliert.',
        stepTwoNote:
          'Die Zahlung ist Schritt zwei und hier nicht gebaut — der Checkout gehört nicht zu diesem Rebuild.',
      },

      errors: {
        email: 'Gib eine E-Mail-Adresse ein, mit @.',
        confirmEmail: 'Die beiden E-Mail-Adressen stimmen nicht überein.',
        password: 'Verwende mindestens 8 Zeichen.',
        consent: 'Setze den Haken, um AGB und Datenschutzerklärung zuzustimmen.',
      },

      summary: {
        title: 'Dein Abo',
        plan: 'Dropship Mastery & EcomSniper AI',
        items: [
          '3.000 Produkte pro Monat einstellen',
          'KI-generierte Titel, Beschreibungen und Artikelmerkmale',
          'Deine eigene Marke oder dein Wasserzeichen auf den Artikeln',
          'Das komplette Training, aktualisiert wenn sich die Plattform ändert',
        ],
        dueLabel: 'Heute fällig',
        dueValue: '97 $',
        dueCurrency: 'USD',
        guarantee: '30 Tage Geld-zurück-Garantie, im Monatstarif.',
        billing:
          'Ab dem nächsten Monat werden 199 $ monatlich für das Sniper-Paket berechnet, sofern du nicht kündigst. Du kannst jederzeit kündigen.',
      },
    },
  },
};
