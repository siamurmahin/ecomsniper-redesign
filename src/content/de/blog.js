/**
 * Deutsch — Blog.
 *
 * Only the page's own furniture is translated. **The posts are not**, and that
 * is deliberate on two counts.
 *
 * The English bodies are our draft awaiting the client (see the English file's
 * header). Translating unapproved copy produces two unapproved versions to
 * correct instead of one.
 *
 * More importantly, a translated post is a different document, not a different
 * label: it needs its own title, its own body, its own reading time and its
 * own slug for search to treat it as German rather than as a duplicate. That
 * is a content decision and a cost, not a merge. Until it is made, the posts
 * fall through to English — which is honest — while the page around them
 * reads German.
 *
 * **`posts` merges by position** if it is ever added here, like every array in
 * an overlay. See `content/merge.js`, and the footer bug of 4 Sep.
 */
export const overlay = {
  BLOG: {
    eyebrow: 'Blog',
    headlineParts: [{ text: 'Was wir lernen, ' }, { text: 'aufgeschrieben.', mark: true }],
    headline: 'Was wir lernen, aufgeschrieben.',
    lead: 'Was auf eBay gerade funktioniert, was sich diesen Monat geändert hat und was wir falsch gemacht haben. Geschrieben von den Leuten, die die Software bauen und selbst damit verkaufen.',

    searchLabel: 'Blog durchsuchen',
    searchPlaceholder: 'Beiträge durchsuchen…',
    allLabel: 'Alle',
    resultCount: '{n} Beiträge passen',
    noMatches: 'Dazu passt nichts. Versuch ein anderes Wort oder wähle Alle.',

    featuredLabel: 'Empfohlen',
    readMore: 'Beitrag lesen',
    readTimeSuffix: 'Min. Lesezeit',
    empty: 'Noch nichts veröffentlicht. Bis dahin ist das Playbook das Richtige zum Lesen.',

    post: {
      backLabel: 'Alle Beiträge',
      byLabel: 'Von',
      shareLabel: 'Beitrag teilen',
      nextLabel: 'Weiterlesen',
    },
  },
};
