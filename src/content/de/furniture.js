/**
 * German — The conversion furniture that follows a visitor across every route.
 *
 * Only the keys that differ from English; anything absent falls through to
 * the English deck. See `./index.js` for the rules this copy follows.
 */
export const overlay = {
  STICKY_CTA: {
    message: '30 Tage Geld-zurück-Garantie im Monatsplan',
    price: 'Ab 97 $ im ersten Monat',
    cta: { label: 'Jetzt starten' },
  },
  CONSULT: {
    eyebrow: 'Kostenloses Beratungsgespräch',
    title: 'Sprich mit jemandem, bevor du dich entscheidest.',
    body: 'Lass uns deinen Namen und deine E-Mail-Adresse da und wir vereinbaren ein kostenloses Beratungsgespräch: ein ehrliches Gespräch darüber, wo du stehst und ob das das Richtige für dich ist.',
    points: [
      'Ein Gespräch, kein Verkaufsanruf',
      'Wie dein erster Monat realistisch aussehen würde',
      'Ob EcomSniper das Falsche für dich ist',
    ],
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'Dein Name',
    fieldLabel: 'E-Mail-Adresse',
    placeholder: 'du@beispiel.de',
    cta: 'Kostenloses Gespräch anfragen',
    dismiss: 'Nein, danke',
    privacy: 'Deine Daten sind sicher und werden niemals weitergegeben.',
    done: {
      title: 'Anfrage ist da.',
      body: 'Wir schreiben an diese Adresse, um dein Gespräch zu vereinbaren. Sonst landet nichts in deinem Postfach.',
    },
    error: 'Das ging nicht raus. Versuch es nochmal oder schreib uns direkt.',
  },
  EXIT_INTENT: {
    eyebrow: 'Bevor du gehst',
    title: 'Nimm das Playbook mit.',
    body: 'The Invisible Store: wie eBay-Dropshipping wirklich funktioniert, wenn du keine Ware, keine Website und keine Erfahrung hast. 83 Seiten, kostenlos, ohne Karte.',
    cta: {
      label: 'Schick mir das Playbook',
    },
    dismiss: 'Nein, danke',
  },
};
