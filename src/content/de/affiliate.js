/**
 * Deutsch — Partnerprogramm, Bedingungen.
 *
 * Mirrors `en/affiliate.js` position for position: the sections array merges
 * **by index**, so an item inserted on the English side without one here
 * silently shifts every clause after it. Adding a clause means editing both
 * files in the same commit.
 *
 * **This is a contract and it has not been reviewed by a lawyer.** It sits
 * under the same open item as the privacy and cookie policies — see
 * `docs/ISSUES.md`. Translated so a German reader is not handed an English
 * contract, not because the translation is authoritative. Where a term of art
 * has no clean German equivalent the English is kept in brackets.
 *
 * Money stays in dollars ("$100 USD") because that is the currency the
 * programme pays in, and converting it would state a threshold that is not
 * in the agreement.
 */
export const overlay = {
  AFFILIATE: {
    eyebrow: 'Partnerprogramm',
    headline: 'Teilnahmebedingungen',
    intro:
      'Danke für dein Interesse an einer Partnerschaft mit EcomSniper. Unser Partnerprogramm belohnt Personen und Unternehmen dafür, EcomSniper zu empfehlen und unsere Community wachsen zu lassen. Mit der Bewerbung oder der Teilnahme am Partnerprogramm stimmst du den folgenden Bedingungen zu.',

    sections: [
      {
        title: 'Aufnahme',
        items: [
          'Für die Teilnahme am EcomSniper-Partnerprogramm musst du die offizielle Bewerbung ausfüllen und einreichen.',
          'EcomSniper behält sich vor, Bewerbungen nach eigenem Ermessen anzunehmen oder abzulehnen.',
          'Bewerber müssen mindestens 18 Jahre alt sein oder das in ihrem Wohnsitzland geltende Mindestalter erreicht haben.',
          'Um teilnahmeberechtigt zu bleiben, musst du ein aktives, bezahltes EcomSniper-Abonnement führen. Wird dein Abonnement inaktiv oder gekündigt, kann auch dein Partnerstatus ausgesetzt oder beendet werden.',
        ],
      },
      {
        title: 'Verhalten und Community-Standards',
        lead: 'Partner vertreten die Marke und die Community von EcomSniper. Professionelles Verhalten wird jederzeit vorausgesetzt. Mit der Teilnahme am Programm verpflichten sich Partner dazu:',
        items: [
          'alle anderen Partner, Mitarbeitenden und Community-Mitglieder zu respektieren.',
          'Drama, Belästigung, toxisches Verhalten und öffentliche Konflikte zu vermeiden.',
          'nicht gegeneinander zu arbeiten, den Wettbewerb nicht zu missbrauchen und nicht zu versuchen, dem Ruf oder Geschäft anderer Partner zu schaden.',
          'professionell zu bleiben, wenn öffentlich oder privat über EcomSniper gesprochen wird.',
        ],
        closer:
          'Werden diese Standards nicht eingehalten, kann das zum Ausschluss aus dem Partnerprogramm und aus der Community führen.',
      },
      {
        title: 'Markenschutz und Ruf',
        lead: 'Partner dürfen der Marke EcomSniper in keiner Weise schaden, sie falsch darstellen oder beschädigen. Ausdrücklich untersagt sind:',
        items: [
          'falsche Behauptungen oder irreführendes Marketing',
          'öffentliche Angriffe auf EcomSniper, Mitarbeitende, Nutzer oder Partner',
          'das Schaffen unnötiger öffentlicher Streitigkeiten über Zahlungen, Richtlinien oder interne Abläufe',
          'die Weitergabe vertraulicher Unternehmensinformationen',
          'jedes Verhalten, das dem Ruf von EcomSniper schaden kann',
        ],
        closerLead:
          'Bei einem Verstoß gegen diesen Abschnitt behält sich EcomSniper das Recht vor:',
        closerItems: [
          'den Partnerzugang sofort zu beenden',
          'den Community-Zugang zu entziehen',
          'Positionen im Unternehmen oder im Team zu entziehen',
          'ausstehende Provisionen oder Partnerzahlungen zu stornieren',
          'die Person dauerhaft von allen Plattformen und Diensten von EcomSniper auszuschließen',
        ],
      },
      {
        title: 'Zuordnung von Empfehlungen',
        items: [
          'Die Zuordnung richtet sich nach der letzten überzeugenden Interaktion, die zur Anmeldung des Kunden bei EcomSniper geführt hat.',
          'Hatten mehrere Partner Kontakt zu demselben Interessenten, erhält der Partner die Gutschrift, der den Nutzer letztlich zum zahlenden Kunden gemacht hat.',
          'Bei Streitigkeiten über eine Zuordnung entscheidet EcomSniper abschließend.',
        ],
      },
      {
        title: 'Richtlinien für die Bewerbung',
        items: [
          'Partner erhalten eigene Empfehlungslinks oder Gutscheincodes.',
          'Partner sind dafür verantwortlich, EcomSniper ethisch und professionell zu bewerben.',
        ],
        closerLead: 'Folgende Methoden sind untersagt:',
        closerItems: [
          'Spam-Marketing',
          'gefälschte Erfahrungsberichte',
          'irreführende Einkommensversprechen',
          'Blackhat-Marketing',
          'Belästigung oder aufgedrängte Werbung',
          'künstliche Dringlichkeit oder falsche Versprechen',
        ],
        closer:
          'Partner müssen sich stets an die Regeln der jeweiligen Plattform, an geltendes Recht und an die Werbevorschriften halten.',
      },
      {
        title: 'Verantwortung für geworbene Nutzer',
        lead: 'Von Partnern wird erwartet, dass sie Verantwortung für die Nutzer übernehmen, die sie zu EcomSniper bringen. Dazu gehört:',
        items: [
          'den Dienst vor der Empfehlung richtig zu erklären',
          'keine falschen Erwartungen zu wecken',
          'geworbenen Nutzern zu helfen, soweit das zumutbar ist',
          'zu einer guten Erfahrung in der Community beizutragen',
        ],
        closer:
          'Partner, die wiederholt schädliche, betrügerische, missbräuchliche oder problematische Nutzer auf die Plattform bringen, können überprüft oder ausgeschlossen werden.',
      },
      {
        title: 'Provisionen',
        items: [
          'Partner erhalten Provisionen auf qualifizierte Verkäufe über ihre freigegebenen Empfehlungslinks oder Gutscheincodes.',
          'Höhe und Struktur der Provisionen können variieren und werden gesondert mitgeteilt.',
        ],
        closerLead:
          'Provisionen können angepasst, verzögert, einbehalten oder zurückgebucht werden bei:',
        closerItems: [
          'Rückerstattungen',
          'Rückbuchungen (Chargebacks)',
          'betrügerischen Transaktionen',
          'Missbrauch des Partnersystems',
          'Verstößen gegen Unternehmensrichtlinien',
        ],
      },
      {
        title: 'Zahlungsbedingungen',
        definitions: [
          {
            term: 'Zahlungsrhythmus',
            body: 'Provisionen werden quartalsweise (alle drei Monate) abgerechnet und in der Regel zwischen dem 1. und dem 10. des Auszahlungsmonats gezahlt.',
          },
          {
            term: 'Auszahlungsantrag',
            body: 'Partner müssen eine Auszahlung über das Partner-Dashboard beantragen, bevor Provisionen bearbeitet werden können.',
          },
          {
            term: 'Verzögerungen',
            body: 'EcomSniper ist bemüht, alle Zahlungen innerhalb des üblichen Zeitfensters zu bearbeiten; gelegentlich kann es aus Prüfungs-, Betriebs- oder Bearbeitungsgründen zu Verzögerungen kommen. Partner verpflichten sich, wegen verzögerter Zahlungen kein öffentliches Drama, keine Streitigkeiten und keine Rufschädigung zu verursachen. Fragen zu Auszahlungen sind direkt und nicht öffentlich mit dem EcomSniper-Team zu klären.',
          },
          {
            term: 'Zahlungsweg',
            body: 'Alle Partnerzahlungen erfolgen ausschließlich über PayPal.',
          },
          {
            term: 'Mindestauszahlung',
            body: 'Für eine Auszahlung ist ein Guthaben von mindestens $100 USD erforderlich.',
          },
          {
            term: 'Gebühren',
            body: 'Partner tragen alle PayPal-Gebühren, Währungsumrechnungs- und Transaktionsgebühren sowie alle lokalen Steuern, die beim Empfang der Zahlung anfallen.',
          },
          {
            term: 'Bestätigung',
            body: 'Partner erhalten eine Bestätigung, sobald eine Zahlung ausgeführt wurde.',
          },
        ],
      },
      {
        title: 'Einhaltung von Vorschriften',
        items: [
          'Partner müssen alle geltenden Gesetze, Vorschriften, Plattformrichtlinien und Branchenstandards einhalten.',
          'Partner dürfen keine Schutzrechte Dritter verletzen.',
          'Partner dürfen Produkte oder Leistungen von EcomSniper nicht falsch darstellen.',
          'Partner dürfen keine irreführenden Verkaufsmethoden einsetzen.',
          'Partner dürfen kein unlauteres Marketing betreiben.',
        ],
      },
      {
        title: 'Beendigung',
        items: [
          'Beide Seiten können die Partnerschaft jederzeit beenden.',
          'EcomSniper behält sich vor, Partner bei Verstößen gegen diese Bedingungen ohne Vorwarnung sofort zu sperren oder auszuschließen.',
        ],
        closerLead: 'Mit der Beendigung:',
        closerItems: [
          'kann der Partnerzugang sofort entzogen werden',
          'kann der Community-Zugang entzogen werden',
          'können künftige Provisionen entfallen',
          'können ausstehende Provisionen einbehalten werden, solange ein Verdacht auf Betrug oder Fehlverhalten geprüft wird',
        ],
      },
      {
        title: 'Änderungen',
        items: [
          'EcomSniper behält sich vor, diese Bedingungen jederzeit und ohne vorherige Ankündigung zu ändern.',
          'Die fortgesetzte Teilnahme am Partnerprogramm nach einer Änderung gilt als Zustimmung zu den geänderten Bedingungen.',
          'Es liegt in der Verantwortung des Partners, sich regelmäßig über die aktuellen Bedingungen zu informieren.',
        ],
      },
    ],

    final: {
      title: 'Abschließende Vereinbarung',
      body: [
        'Mit dem Beitritt zum EcomSniper-Partnerprogramm bestätigst du, dass du alle oben genannten Bedingungen gelesen, verstanden und akzeptiert hast.',
        'Du nimmst außerdem zur Kenntnis, dass ein Verstoß gegen diese Bedingungen zum Ausschluss aus dem Partnerprogramm, zum Verlust von Provisionen oder zur dauerhaften Sperre von Diensten und Communities von EcomSniper führen kann.',
      ],
      contact: 'Bei Fragen zum Partnerprogramm wende dich an das EcomSniper-Team.',
      cta: { label: 'Kontakt' },
    },
  },
};
