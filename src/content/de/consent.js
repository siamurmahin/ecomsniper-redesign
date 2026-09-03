/**
 * Die Worte des Consent-Banners.
 *
 * German is an overlay: anything omitted here falls through to `en/consent.js`,
 * so a missing key shows English rather than a blank. See `content/index.js`.
 *
 * "Ablehnen" carries the same visual weight as "Alle akzeptieren" in the UI,
 * which the TTDSG requires and which is also why the reject button is not a
 * quieter variant than the accept one.
 */
export const overlay = {
  CONSENT: {
    banner: {
      title: 'Cookies',
      body: 'Notwendige Cookies halten die Seite am Laufen. Alles andere — Messung der Nutzung und Werbung — läuft nur, wenn du zustimmst.',
      policyLabel: 'Cookie-Richtlinie',
      acceptAll: 'Alle akzeptieren',
      rejectAll: 'Alle ablehnen',
      customise: 'Anpassen',
      ariaLabel: 'Cookie-Auswahl',
    },

    panel: {
      title: 'Wähle, was laufen darf',
      body: 'Du kannst das jederzeit über den Link im Footer ändern.',
      save: 'Auswahl speichern',
      acceptAll: 'Alle akzeptieren',
      back: 'Zurück',
      close: 'Schließen',
      alwaysOn: 'Immer aktiv',
    },

    categories: {
      essential: {
        label: 'Notwendig',
        body: 'Merkt sich deine Sprache und diese Auswahl. Ohne sie funktioniert die Seite nicht, und sie werden nie zum Tracking verwendet.',
      },
      analytics: {
        label: 'Analyse',
        body: 'Welche Seiten gelesen werden und wo Leute abbrechen. Google Analytics, geladen über den Google Tag Manager.',
      },
      marketing: {
        label: 'Marketing',
        body: 'Misst, ob eine Anzeige zu etwas geführt hat, und bildet Werbezielgruppen. Meta und TikTok, geladen über den Google Tag Manager.',
      },
    },

    reopen: 'Cookie-Auswahl',
  },
};
