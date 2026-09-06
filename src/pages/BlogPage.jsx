import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { BLOG as EN_BLOG } from '../content/en/blog';
import { overlay as germanBlog } from '../content/de/blog';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { formatPostDate } from '../lib/postDate';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import HeroSurface from '../components/hero/HeroSurface';
import Icon from '../components/ui/Icon';
import CoverFallback from '../components/blog/CoverFallback';

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanBlog.BLOG };

/*
 * Cover art, resolved from the post's slug.
 *
 * The file being there is what gives a post a cover — the same arrangement as
 * the flags in `CountryTicker` and the portraits on the playbook page. A deck
 * field would have to be kept in step with the folder, and the folder is the
 * thing that actually decides.
 *
 * A post with no file renders without one, which is not a failure case: their
 * founder's letter has no cover on their own site either.
 *
 * These are the client's own covers, fetched from their live blog and
 * re-encoded — cropped to the 16:9 the cards render at rather than left square
 * and cropped in CSS, because `object-fit` still downloads the rows it throws
 * away. The margins cover was a 1.8MB PNG and is now 55KB.
 */
const COVERS = import.meta.glob('../assets/blog/*.webp', { eager: true, import: 'default' });
const coverFor = (slug) => COVERS[`../assets/blog/${slug}.webp`];

function Band({ className = '', children }) {
  const ref = useRevealOnScroll();
  return (
    <section ref={ref} className={`section-band ${className}`.trim()}>
      <div className="site-shell">{children}</div>
    </section>
  );
}

/** Category and reading time, the two facts that sit above every title. */
function CardMeta({ post, blog, language }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-[0.68rem] uppercase tracking-[0.12em] text-muted">
      <span className="text-accent">{post.category}</span>
      <span aria-hidden="true">·</span>
      <span>
        {post.readTime} {blog.readTimeSuffix}
      </span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatPostDate(post.date, language)}</time>
    </span>
  );
}

/**
 * One post, as a card.
 *
 * The hover is the careers card's: a rule down the leading edge and a corner
 * wash, rather than the card's own colour changing. The cover gets a slow
 * scale on top of it, which is the one place on this site where a hover moves
 * an image — a cover is a photograph of the subject, and lifting it slightly
 * is how a card says it is a door rather than a poster.
 *
 * `alt` is empty on purpose. The cover repeats the title, which is the next
 * thing in the reading order, and a screen reader announcing both reads the
 * headline twice.
 */
function PostCard({ post, blog, language, lead = false }) {
  const cover = coverFor(post.slug);

  return (
    <li data-reveal data-reveal-group={lead ? 'blog-lead' : 'blog-grid'}>
      <Link
        to={pathForLanguage(`/blog/${post.slug}`, language)}
        className={`group relative flex h-full overflow-hidden rounded-2xl border border-hairline bg-paper outline-none transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift focus-visible:-translate-y-0.5 focus-visible:border-ink/20 focus-visible:shadow-lift ${
          lead ? 'flex-col lg:flex-row lg:items-stretch' : 'flex-col'
        }`}
      >
        {/* The lead runs the cover beside the copy rather than above it. Stacked,
            a 16:9 cover at the full width of the shell is 600px of image before
            a word of the post, and the card then has to be as tall again to
            balance it. Beside it, the same image is the reason the card is that
            height at all. */}
        {/* Every card gets a cover. A post without art gets the drawn one
            rather than a hole where the other cards have an image — see
            `components/blog/CoverFallback`. */}
        <span
          className={`relative block shrink-0 overflow-hidden bg-paper-sunk ${
            lead ? 'aspect-[16/9] lg:aspect-auto lg:w-[52%]' : 'aspect-[16/9]'
          }`}
        >
          {cover ? (
            <img
              src={cover}
              alt=""
              width={1200}
              height={675}
              /* The lead cover is in the first screen on a laptop, so it is not
                 lazy — a lazy image there is a hole where the page's largest
                 element should be. Everything below it is. */
              loading={lead ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          ) : (
            <CoverFallback label={post.category} />
          )}
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-accent/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-4 left-0 z-10 w-0.5 origin-top scale-y-0 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />

        <span
          className={`relative flex flex-col p-6 sm:p-7 ${
            lead ? 'flex-1 justify-center lg:p-9' : 'h-full'
          }`}
        >
          {lead && (
            <span className="mb-3 inline-flex w-fit rounded-full bg-ink px-2.5 py-1 font-label text-[0.62rem] uppercase tracking-[0.14em] text-paper">
              {blog.featuredLabel}
            </span>
          )}

          <CardMeta post={post} blog={blog} language={language} />

          <span
            className={`mt-3 block font-bold tracking-[-0.02em] ${
              lead ? 'text-2xl lg:text-[2rem] lg:leading-[1.1]' : 'text-xl'
            }`}
          >
            {post.title}
          </span>

          {post.excerpt && (
            <span
              className={`mt-3 block leading-relaxed text-muted ${
                lead ? 'max-w-2xl text-[length:var(--text-lead)]' : 'text-[0.95rem]'
              }`}
            >
              {post.excerpt}
            </span>
          )}

          <span className="mt-6 flex items-center gap-1.5 font-label text-[0.7rem] uppercase tracking-[0.14em] text-accent">
            {blog.readMore}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        </span>
      </Link>
    </li>
  );
}

/**
 * Search and the category tabs.
 *
 * Both filter as you type or click — there is no Search button, because a
 * button that submits a filter the page could have applied on the keystroke is
 * a step the reader has to discover. Theirs has one.
 *
 * The whole block is hidden without JavaScript, in `lib/noScriptStyles`: the
 * prerendered page lists every post already, and a search field that cannot
 * search is worse than no search field.
 *
 * Categories come from the posts rather than a declared list, so a category
 * exists exactly while something is filed under it — the same rule the careers
 * page groups departments by.
 */
function Controls({ blog, categories, query, setQuery, active, setActive, resultCount }) {
  return (
    <div data-blog-controls className="mt-10" data-reveal data-reveal-group="blog-controls">
      <div className="relative max-w-xl">
        <label htmlFor="blog-search" className="sr-only">
          {blog.searchLabel}
        </label>
        <Icon
          name="magnifier"
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={blog.searchPlaceholder}
          className="w-full rounded-full border border-hairline bg-white/80 py-3.5 pl-12 pr-5 text-base text-ink transition-colors placeholder:text-muted hover:border-ink/20 focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === active;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 font-label text-[0.7rem] uppercase tracking-[0.12em] outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive
                  ? 'border-transparent bg-ink text-paper'
                  : 'border-hairline text-muted hover:border-ink/25 hover:text-ink'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* One live region, so a reader who cannot see the grid change hears how
          many posts are left rather than nothing at all. */}
      <p aria-live="polite" className="sr-only">
        {blog.resultCount.replace('{n}', resultCount)}
      </p>
    </div>
  );
}

export default function BlogPage() {
  const BLOG = usePageContent(EN_BLOG, OVERLAYS);
  const language = languageFromPath(useLocation().pathname);

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);

  /* Newest first. Sorted rather than trusted: a hand-ordered array is one
     paste away from putting last year's post at the top. */
  const posts = useMemo(
    () => [...BLOG.posts].sort((a, b) => b.date.localeCompare(a.date)),
    [BLOG.posts],
  );

  const allLabel = BLOG.allLabel;
  const categories = useMemo(
    () => [allLabel, ...[...new Set(posts.map((post) => post.category))].sort()],
    [posts, allLabel],
  );
  const activeCategory = active ?? allLabel;

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (activeCategory !== allLabel && post.category !== activeCategory) return false;
      if (!needle) return true;

      /* Title, excerpt, category and tags. Not the body: a hit three thousand
         words in is a match the reader cannot see on this page, and it makes
         the grid look wrong rather than helpful. */
      return [post.title, post.excerpt, post.category, ...(post.tags ?? [])]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(needle));
    });
  }, [posts, query, activeCategory, allLabel]);

  /* The lead card is only the lead of an unfiltered list. Once a reader has
     searched, every result is equal and one of them wearing a Featured badge
     at double size is the page arguing with the filter. */
  const isFiltered = query.trim() !== '' || activeCategory !== allLabel;
  const featured = matches.find((post) => post.featured) ?? matches[0];
  const lead = isFiltered ? null : featured;
  const rest = lead ? matches.filter((post) => post !== lead) : matches;

  return (
    <>
      <HeroSurface>
        <p className="section-eyebrow" data-reveal data-reveal-group="blog-hero">
          {BLOG.eyebrow}
        </p>

        <h1
          className="mt-4 max-w-3xl text-[length:var(--text-display)] leading-[0.98]"
          data-reveal
          data-reveal-group="blog-hero"
        >
          <MarkedHeadline parts={BLOG.headlineParts} tone="brand" />
        </h1>

        <p
          className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="blog-hero"
        >
          {BLOG.lead}
        </p>

        <Controls
          blog={BLOG}
          categories={categories}
          query={query}
          setQuery={setQuery}
          active={activeCategory}
          setActive={setActive}
          resultCount={matches.length}
        />
      </HeroSurface>

      <Band className="defer-render [--defer-h:1900px] lg:[--defer-h:1400px]">
        {matches.length === 0 ? (
          <p
            data-reveal
            data-reveal-group="blog-grid"
            className="max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          >
            {posts.length === 0 ? BLOG.empty : BLOG.noMatches}
          </p>
        ) : (
          <>
            {lead && (
              <ul className="grid gap-5">
                <PostCard post={lead} blog={BLOG} language={language} lead />
              </ul>
            )}

            {rest.length > 0 && (
              <ul className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${lead ? 'mt-5' : ''}`}>
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} blog={BLOG} language={language} />
                ))}
              </ul>
            )}
          </>
        )}
      </Band>
    </>
  );
}
