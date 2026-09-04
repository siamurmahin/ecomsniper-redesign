/**
 * Deutsch — Datenschutz und Cookies.
 *
 * A full translation rather than a partial one: the German pages are indexed
 * separately and Germany is where the strictest of these rules apply, so a
 * half-English legal page is the one page on the site that cannot fall back.
 *
 * THIS NEEDS THE SAME LEGAL SIGN-OFF AS THE ENGLISH. A translated legal term
 * is a legal claim in another jurisdiction, and no lawyer has read this.
 * Tracked in docs/TODO.md under Blocked. See `../en/legal.js` for what was changed
 * from the client's live copy and why.
 */
export const overlay = {
  LEGAL: {
    /** AGB: nur der Titel. Das Dokument liegt in `../de/terms.js` — siehe dort
     *  und in `../en/legal.js`, warum es nicht in diesem Deck steht. */
    terms: { title: 'Allgemeine Geschäftsbedingungen' },
    privacy: {
      title: 'Datenschutzerklärung',
      updated: 'Zuletzt aktualisiert am 3. September 2026',

      sections: [
        {
          heading: 'Hinweis zur Website',
          body: [
            'Wir nutzen Google Analytics, ausgeliefert über den Google Tag Manager, um zu verstehen, wie die Seite genutzt wird, und sie zu verbessern. Nichts davon läuft, bevor du zustimmst — Analyse- und Marketing-Cookies sind standardmäßig aus, und im Cookie-Banner triffst du die Wahl.',
          ],
        },
        {
          heading: 'Welche Daten wir erheben',
          body: ['Wir erheben die folgenden Arten von Daten:'],
          list: [
            'Persönliche Daten: Name, E-Mail-Adresse, Rechnungs- und Lieferadresse sowie Zahlungsdaten, wenn du ein Konto anlegst.',
            'Bestelldaten: Käufe, Bestellhistorie und Transaktionen.',
            'Nutzungsdaten: IP-Adresse, Browsertyp, Geräte-ID und Nutzungsverhalten auf unserer Seite.',
          ],
        },
        {
          heading: 'Cookies und Tracking-Technologien',
          body: [
            'Wir verwenden Cookies und ähnliche Technologien, um wiederkehrende Besuche zu erkennen, deine Einstellungen zu speichern und den Traffic auszuwerten. Notwendige Cookies sind für den Betrieb der Seite erforderlich und lassen sich nicht abschalten. Alles andere bleibt aus, bis du zustimmst, und du kannst deine Wahl jederzeit über den Link im Footer ändern.',
            'Was jedes einzelne Cookie tut, steht in der Cookie-Richtlinie.',
          ],
        },
        {
          heading: 'Wofür wir deine Daten nutzen',
          list: [
            'Um den EcomSniper-Dienst bereitzustellen, zu betreiben und zu verbessern.',
            'Um Zahlungen abzuwickeln und Transaktions-E-Mails zu versenden.',
            'Um Support zu leisten und Anfragen zu beantworten.',
            'Um gesetzlichen Pflichten nachzukommen und Streitfälle zu klären.',
          ],
        },
        {
          heading: 'Weitergabe an Dritte',
          list: [
            'Wir arbeiten mit Dienstleistern für Zahlungsabwicklung, Analyse und Kundensupport. Diese greifen nur auf die Daten zu, die sie benötigen, und sind vertraglich zu deren Schutz verpflichtet.',
            'Wir geben Daten weiter, um gesetzlichen Pflichten nachzukommen oder die Rechte von EcomSniper und die Sicherheit der Nutzer zu schützen.',
            'Bei einer Fusion oder Übernahme können Nutzerdaten auf die neuen Eigentümer übergehen.',
          ],
        },
        {
          heading: 'Datensicherheit',
          body: [
            'Wir folgen anerkannten Standards zum Schutz deiner Daten, einschließlich Verschlüsselung und Zugriffskontrolle. Kein Übertragungsweg im Internet ist jedoch zu 100 % sicher. Die Nutzung erfolgt auf eigenes Ermessen.',
          ],
        },
        {
          heading: 'Deine Rechte',
          list: [
            'Deine persönlichen Daten im Konto-Dashboard einsehen und ändern.',
            'Werbe-E-Mails über den Abmeldelink in jeder E-Mail abbestellen.',
            'Die Löschung deiner Daten verlangen, vorbehaltlich gesetzlicher und finanzieller Aufbewahrungspflichten.',
            'In der EU und in Kalifornien stehen dir zusätzliche Rechte nach DSGVO beziehungsweise CCPA zu.',
          ],
        },
        {
          heading: 'Daten von Kindern',
          body: [
            'EcomSniper richtet sich nicht an Kinder unter 18 Jahren, und wir erheben wissentlich keine personenbezogenen Daten von Minderjährigen.',
          ],
        },
        {
          heading: 'Änderungen dieser Erklärung',
          body: [
            'Wir können diese Datenschutzerklärung von Zeit zu Zeit anpassen. Dann ändern wir das Datum oben auf dieser Seite und veröffentlichen hier die aktuelle Fassung.',
          ],
        },
        {
          heading: 'Kontakt',
          body: [
            'Bei Fragen zu dieser Erklärung oder zum Umgang mit deinen Daten schreib uns an sammy@ecomsniper.io.',
          ],
        },
      ],
    },

    cookies: {
      title: 'Cookie-Richtlinie',
      updated: 'Zuletzt aktualisiert am 3. September 2026',

      intro: [
        'Ein Cookie ist eine kleine Datei, die eine Website in deinem Browser ablegt. Diese Seite listet jedes Cookie auf, das diese Website setzen kann, wofür es da ist und wie lange es gilt.',
        'Notwendige Cookies sind für den Betrieb der Seite erforderlich. Alles andere bleibt aus, bis du zustimmst. Du kannst deine Wahl jederzeit über den Link im Footer ändern.',
      ],

      categoriesHeading: 'Was die Kategorien abdecken',
      tableHeading: 'Die Cookies im Einzelnen',

      columns: {
        name: 'Cookie',
        vendor: 'Gesetzt von',
        purpose: 'Kategorie',
        retention: 'Läuft ab nach',
      },

      emptyTable:
        'Dieser Build lädt derzeit keine optionalen Dienste Dritter, es werden also nur notwendige Cookies gesetzt.',

      contact: 'Fragen zu Cookies oder zu dieser Seite: sammy@ecomsniper.io.',
    },
  },
};
