import { Link, useLocation } from 'react-router';
import { BLOG as EN_BLOG } from '../content/en/blog';
import { overlay as germanBlog } from '../content/de/blog';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { formatPostDate } from '../lib/postDate';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import HeroSurface from '../components/hero/HeroSurface';

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanBlog.BLOG };

/**
 * The blog index.
 *
 * Their page puts a search field and six category filters above twelve posts.
 * Neither is here, for the reason the careers page has no filter either: a
 * control that cannot meaningfully change what you see is furniture pretending
 * to be a feature. The category stays on the card, because that is a label.
 * When there are forty posts this earns filters, and it earns a CMS first.
 *
 * The newest post leads at full width and the rest follow in a grid. That is
 * their "Featured" idea without their execution of it — theirs marks a card
 * Featured and then hides its date, so the one post given the most weight is
 * the only one you cannot place in time.
 */
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
 * The same hover as the careers role card, and for the same reason: a rule
 * grows down the leading edge and a corner wash lifts in, rather than the
 * card's own colour changing. The whole card is the link.
 */
function PostCard({ post, blog, language, lead = false }) {
  return (
    <li data-reveal data-reveal-group={lead ? 'blog-lead' : 'blog-grid'}>
      <Link
        to={pathForLanguage(`/blog/${post.slug}`, language)}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper p-6 outline-none transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift focus-visible:-translate-y-0.5 focus-visible:border-ink/20 focus-visible:shadow-lift sm:p-7 ${
          lead ? 'lg:p-9' : ''
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-accent/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-4 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />

        <span className="relative flex h-full flex-col">
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

export default function BlogPage() {
  const BLOG = usePageContent(EN_BLOG, OVERLAYS);
  const language = languageFromPath(useLocation().pathname);

  /* Newest first, and the lead is whichever post is marked featured — falling
     back to the newest, so removing the flag cannot leave the page without
     one. Sorted rather than trusted: a hand-ordered array is one paste away
     from putting last year's post at the top. */
  const posts = [...BLOG.posts].sort((a, b) => b.date.localeCompare(a.date));
  const leadIndex = Math.max(
    0,
    posts.findIndex((post) => post.featured),
  );
  const lead = posts[leadIndex];
  const rest = posts.filter((post) => post !== lead);

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
          <MarkedHeadline parts={BLOG.headlineParts} />
        </h1>

        <p
          className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="blog-hero"
        >
          {BLOG.lead}
        </p>
      </HeroSurface>

      <Band className="defer-render [--defer-h:1600px] lg:[--defer-h:1100px]">
        {!lead ? (
          <p
            data-reveal
            data-reveal-group="blog-grid"
            className="max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          >
            {BLOG.empty}
          </p>
        ) : (
          <>
            <ul className="grid gap-5">
              <PostCard post={lead} blog={BLOG} language={language} lead />
            </ul>

            {rest.length > 0 && (
              <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
