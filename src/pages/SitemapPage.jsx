import { Link, useLocation } from 'react-router';
import { SITEMAP as EN_SITEMAP } from '../content/en/sitemap';
import { overlay as germanSitemap } from '../content/de/sitemap';
import { BLOG } from '../content/en/blog';
import { CAREERS } from '../content/en/careers';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { toneOf } from '../lib/signalTones';
import HeroDots from '../components/hero/HeroDots';
import Icon from '../components/ui/Icon';

/**
 * The sitemap a person reads.
 *
 * `sitemap.xml` is generated for crawlers; this is the other half. Two jobs:
 * somebody who would rather see the shape of the site than hunt through a nav,
 * and a crawler that lands on a deep page and needs one link back to
 * everything else.
 *
 * ## It is an index, not a card grid
 *
 * The obvious build is four rounded cards in a two-by-two. That is the shape
 * this site uses for things that are *choices* — plans, features, bonuses —
 * and a directory is not a choice, it is a list you scan. So it is set as
 * one: hairline-separated rows, the destination on the left and what is there
 * on the right, under a tone-ruled heading per group. Nothing is raised off
 * the page, because nothing here is competing for a click.
 *
 * The one-line note beside each link is the part that earns the page. A
 * sitemap that is only link text is a worse nav; a sitemap that says what is
 * behind each door is a thing somebody reads.
 *
 * ## Where the lists come from
 *
 * The blog posts and the open roles are read from `blog.js` and `careers.js` —
 * the same two files `react-router.config.js` reads to decide what to
 * prerender, and the same two `sitemap.xml` is generated from. So one post
 * lands in three places from one edit, and the failure their live site has —
 * 12 posts published, 9 in the sitemap, no overlap — cannot happen here.
 *
 * Both decks are English-only by design: a post's title is its title. The
 * German page shows the same titles under a German heading, which is what the
 * German blog index does too.
 *
 * ## Cost
 *
 * Importing those two decks pulls ~19KB of copy into a lazy chunk shared with
 * `/blog` and `/careers`, which already download it. Two new routes cost the
 * eager route table ~2.6KB — measured and paid for before building, see the
 * ceiling note in `scripts/check-budget.mjs`.
 */
const OVERLAYS = { de: germanSitemap.SITEMAP };

export default function SitemapPage() {
  const SITEMAP = usePageContent(EN_SITEMAP, OVERLAYS);
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const localise = (href) => pathForLanguage(href, language);

  /* What the page lists, counted rather than typed: a total somebody wrote
     down is the first sentence to go stale.

     It counts what is on this page, which is one short of what sitemap.xml
     holds — the directory does not list itself, because a link to the page you
     are already on is a dead click. The copy says "listed" for that reason. */
  const pageCount =
    SITEMAP.groups.reduce((total, group) => total + group.links.length, 0) +
    BLOG.posts.length +
    CAREERS.openRoles.roles.length;

  /* Which link each nested list hangs off. Hanging them off the last link in
     the group put the open roles under "Affiliate terms". */
  const CHILD_ANCHOR = { posts: '/blog', roles: '/careers' };

  const childrenFor = (kind) => {
    if (kind === 'posts') {
      return {
        label: SITEMAP.postsLabel,
        items: BLOG.posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
      };
    }
    if (kind === 'roles') {
      return {
        label: SITEMAP.rolesLabel,
        items: CAREERS.openRoles.roles.map((role) => ({
          label: role.title,
          href: `/careers/${role.slug}`,
        })),
      };
    }
    return null;
  };

  const ref = useRevealOnScroll();

  return (
    <section
      ref={ref}
      /* Its own padding rather than `section-band`: a band is shorter than the
         floating header, so its first line lands underneath it. Contact,
         Playbook and the auth pages all set their own for the same reason. */
      className="brand-ground relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-24"
    >
      <HeroDots />

      <div className="site-shell">
        <p className="section-eyebrow" data-reveal data-reveal-group="sitemap-head">
          {SITEMAP.eyebrow}
        </p>

        <h1
          className="mt-5 max-w-[16ch] text-[length:var(--text-hero)] leading-[0.98]"
          data-reveal
          data-reveal-group="sitemap-head"
        >
          {SITEMAP.headline}
        </h1>

        <p
          className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="sitemap-head"
        >
          {SITEMAP.lead}
        </p>

        {/* The count, and the file a machine wants. Both are one line and they
            belong together: this is the page saying what it is. */}
        <p
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-6 text-sm text-muted"
          data-reveal
          data-reveal-group="sitemap-head"
        >
          <span className="font-display text-base font-extrabold text-ink">
            {SITEMAP.countLabel.replace('{n}', pageCount)}
          </span>
          <span className="flex items-center gap-2">
            {SITEMAP.crawler.text}{' '}
            <a
              href={SITEMAP.crawler.cta.href}
              className="font-semibold text-ink underline underline-offset-4"
            >
              {SITEMAP.crawler.cta.label}
            </a>
          </span>
        </p>

        <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {SITEMAP.groups.map((group, index) => {
            /* The tone and the icon are structural, so they come from the
               English deck: the German overlay carries words, and merging an
               array by position keeps everything it does not mention. */
            const source = EN_SITEMAP.groups[index];
            const tone = toneOf(source.tone);
            const children = childrenFor(source.children);

            return (
              <section
                key={group.title}
                data-reveal
                data-reveal-group="sitemap-groups"
                aria-labelledby={`sitemap-group-${index}`}
              >
                {/* The tone lives in the tile and in the rule under the
                    heading, never in the type: four coloured headings on one
                    quiet page would be four things shouting. */}
                <h2
                  id={`sitemap-group-${index}`}
                  className="flex items-center gap-3 pb-4 font-display text-lg font-extrabold tracking-tight text-ink"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-lg ${tone.tile}`}
                  >
                    <Icon name={source.icon} className="size-4" />
                  </span>
                  {group.title}
                </h2>

                <span aria-hidden="true" className={`block h-0.5 w-full ${tone.rule}`} />

                <ul className="mt-2 divide-y divide-hairline">
                  {group.links.map((link, linkIndex) => {
                    const href = source.links[linkIndex].href;

                    return (
                      <li key={href}>
                        {/* Two columns, both ranged left, the note starting
                            at the same x down the whole group. It was the
                            label left and the note right-aligned against the
                            far edge, which on a two-line note left a ragged
                            inner edge and made the rows read as unrelated
                            fragments rather than as an index. A directory is
                            scanned down a column, so the columns have to hold
                            still. */}
                        <Link
                          to={localise(href)}
                          className="group grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-baseline"
                        >
                          <span className="font-display text-base font-extrabold text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-300 group-hover:decoration-ink">
                            {link.label}
                          </span>
                          <span className="text-sm leading-relaxed text-muted">{link.note}</span>
                        </Link>

                        {/* The posts and the roles, under the page they belong
                            to rather than as a fifth group. */}
                        {children && href === CHILD_ANCHOR[source.children] ? (
                          <div className="pb-5 sm:pl-[calc(11rem+1.5rem)]">
                            <p className={`micro-label ${tone.text}`}>{children.label}</p>
                            <ul className="mt-3 grid gap-2">
                              {children.items.map((item) => (
                                <li key={item.href} className="flex gap-2.5">
                                  <span
                                    aria-hidden="true"
                                    className={`mt-2 size-1.5 shrink-0 rounded-full ${tone.dot}`}
                                  />
                                  <Link
                                    to={localise(item.href)}
                                    className="text-sm leading-relaxed text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <p
          className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-hairline pt-8 text-sm text-muted"
          data-reveal
          data-reveal-group="sitemap-groups"
        >
          {SITEMAP.language.text}{' '}
          <Link
            to={SITEMAP.language.cta.href}
            className="font-semibold text-ink underline underline-offset-4"
          >
            {SITEMAP.language.cta.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
