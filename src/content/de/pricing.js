/**
 * German — The plans. Used by the pricing page and the homepage preview.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 */
export const overlay = {
  PRICING: {
    eyebrow: 'Tarife',
    headline: 'Starte für 97 $.',
    lead: 'Drei Wege hinein. Die Garantie unten gilt für den Monatsplan.',
    plans: [
      {
        badge: 'Am beliebtesten',
        priceSuffix: 'erster Monat',
        thereafter: 'danach 199 $ im Monat',
        summary: 'Für alle, die bei null anfangen.',
        features: [
          'Stelle 3.000 Produkte im Monat ein',
          'Sniper Chrome Extension zum Einstellen und Überwachen per Automatik',
          'Der komplette Kurs Dropship Mastery',
          'Private Dropshipping-Community',
          'Bevorzugter Support',
          'Wir bleiben dran, bis dein erster Verkauf da ist',
        ],
        guarantee: 'Geschützt durch die 30-Tage-Geld-zurück-Garantie.',
        cta: {
          label: 'Starte für 97 $',
        },
      },
      {
        badge: 'Mengenvorteil',
        saving: 'Du sparst 98 $',
        priceSuffix: 'Abrechnung alle 3 Monate',
        thereafter: 'entspricht 166,33 $ im Monat',
        recurring: 'Wiederkehrender 3-Monats-Abrechnungszeitraum',
        summary: 'Für alle, die in Menge einstellen wollen.',
        features: [
          '10.000 Credits (9.000 plus 1.000 Bonus)',
          'Stelle 10.000 Produkte ein',
          'Sniper Chrome Extension zum Einstellen und Überwachen per Automatik',
          'Der komplette Kurs Dropship Mastery',
          'Private Dropshipping-Community',
        ],
        guarantee: 'Keine Rückerstattung, Verkauf ist final.',
        cta: {
          label: 'Hol dir das 10K-Paket',
        },
      },
      {
        badge: 'Enterprise',
        priceSuffix: 'im Monat',
        thereafter: 'monatliche Abrechnung',
        summary: 'Für alle, die voll skalieren wollen.',
        features: [
          'Unbegrenzt viele Produkte einstellen',
          'Der komplette Kurs Dropship Mastery',
          'VIP-Zugang zur privaten Community',
          'Bevorzugter Support rund um die Uhr',
          'Einrichtung komplett für dich erledigt',
          'Eins-zu-eins-Coaching für dein Geschäft',
          'Wir bleiben dran, bis dein Dropshipping-Geschäft läuft',
        ],
        guarantee: 'Keine Rückerstattung, Verkauf ist final.',
        cta: {
          label: 'Hol dir den Enterprise-Tarif',
        },
      },
    ],
    page: {
      eyebrow: 'Die Entscheidung',
      headline: 'Wird das für dich funktionieren?',
      lead: 'Ein abgesicherter Monat beantwortet das besser als jede Seite.',
      guarantee: {
        title: '30 Tage Geld-zurück-Garantie',
        note: 'Ohne Rückfragen',
        promises: [
          {
            text: 'Die Schulung bringt es dir bei',
          },
          {
            text: 'Die Software nimmt dir die Arbeit ab',
          },
          {
            text: 'Die Community fängt dich auf',
          },
          {
            text: 'Die Garantie schützt dich',
          },
        ],
      },
    },
    footnote:
      'Zusätzlich zum Abo einplanen: ein eBay-Shop-Abo und, in den USA, eine Amazon-Prime-Mitgliedschaft. Typische monatliche Kosten stehen im FAQ.',
  },
};
