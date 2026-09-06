import { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { BLOG as EN_BLOG } from '../content/en/blog';
import { overlay as germanBlog } from '../content/de/blog';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { formatPostDate } from '../lib/postDate';
import { MarkedLastWord } from '../components/ui/MarkedHeadline';
import HeroSurface from '../components/hero/HeroSurface';
import NotFoundPage from './NotFoundPage';

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanBlog.BLOG };

function Band({ className = '', children }) {
  const ref = useRevealOnScroll();
  return (
    <section ref={ref} className={`section-band ${className}`.trim()}>
      <div className="site-shell">{children}</div>
    </section>
  );
}

/**
 * The article body.
 *
 * Blocks rather than HTML — see the deck's header. Rendering a string of
 * markup would mean sanitising it, and would carry whatever markup the source
 * happened to use into a design that has its own opinions about type.
 *
 * An unknown block type renders nothing rather than crashing the page. When a
 * CMS starts sending a type this does not know, a missing paragraph is a
 * defect; a blank page is an outage.
 */
function Block({ block }) {
  if (block.type === 'h2') {
    return <h2 className="mt-12 text-2xl font-bold tracking-[-0.02em] first:mt-0">{block.text}</h2>;
  }

  if (block.type === 'ul') {
    return (
      <ul className="mt-5 grid gap-2.5">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'p') {
    return <p className="mt-5 leading-relaxed text-muted first:mt-0">{block.text}</p>;
  }

  return null;
}

/**
 * One post, at `/blog/<slug>`.
 *
 * The title is rendered **once**. Their post pages carry two `<h1>`s with
 * identical text — once as the page heading and again as the article's first
 * line — which is the same class of defect the accessibility pass fixed on the
 * homepage. See `docs/source-copy/blog.md`.
 *
 * The measure is capped at `max-w-2xl` rather than running the full shell.
 * Long-form prose at the width of a marketing section is unreadable, and this
 * is the one page on the site that is genuinely long-form.
 */
export default function BlogPostPage() {
  const BLOG = usePageContent(EN_BLOG, OVERLAYS);
  const { slug } = useParams();
  const language = languageFromPath(useLocation().pathname);

  const post = useMemo(() => BLOG.posts.find((entry) => entry.slug === slug), [BLOG.posts, slug]);

  if (!post) return <NotFoundPage />;

  /* What to read after this one: the next newest post, wrapping to the newest
     if this is the oldest, so the end of an article is never a dead end. */
  const ordered = [...BLOG.posts].sort((a, b) => b.date.localeCompare(a.date));
  const next = ordered[(ordered.findIndex((entry) => entry.slug === slug) + 1) % ordered.length];

  return (
    <>
      <HeroSurface>
        <Link
          to={pathForLanguage('/blog', language)}
          className="inline-flex items-center gap-2 font-label text-[0.7rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          data-reveal
          data-reveal-group="post-hero"
        >
          <span aria-hidden="true">&larr;</span>
          {BLOG.post.backLabel}
        </Link>

        <p
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-[0.68rem] uppercase tracking-[0.12em] text-muted"
          data-reveal
          data-reveal-group="post-hero"
        >
          <span className="text-accent">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>
            {post.readTime} {BLOG.readTimeSuffix}
          </span>
        </p>

        <h1
          className="mt-4 max-w-4xl text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]"
          data-reveal
          data-reveal-group="post-hero"
        >
          <MarkedLastWord text={post.title} />
        </h1>

        <p
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9rem] text-muted"
          data-reveal
          data-reveal-group="post-hero"
        >
          <span>
            {BLOG.post.byLabel} {BLOG.author}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatPostDate(post.date, language)}</time>
        </p>
      </HeroSurface>

      <Band className="defer-render [--defer-h:1800px] lg:[--defer-h:1400px]">
        <article
          className="max-w-2xl text-[length:var(--text-lead)]"
          data-reveal
          data-reveal-group="post-body"
        >
          {post.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </article>

        {post.tags?.length > 0 && (
          <ul
            className="mt-12 flex max-w-2xl flex-wrap gap-2"
            data-reveal
            data-reveal-group="post-body"
          >
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-hairline px-3 py-1 font-label text-[0.68rem] uppercase tracking-[0.12em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Band>

      {next && next.slug !== post.slug && (
        <Band className="defer-render bg-paper-sunk [--defer-h:420px] lg:[--defer-h:320px]">
          <p className="section-eyebrow" data-reveal data-reveal-group="post-next">
            {BLOG.post.nextLabel}
          </p>

          <Link
            to={pathForLanguage(`/blog/${next.slug}`, language)}
            className="group relative mt-6 flex flex-col overflow-hidden rounded-2xl border border-hairline bg-paper p-6 outline-none transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift focus-visible:-translate-y-0.5 focus-visible:border-ink/20 focus-visible:shadow-lift sm:p-7"
            data-reveal
            data-reveal-group="post-next"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-accent/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-4 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
            />

            <span className="relative">
              <span className="font-label text-[0.68rem] uppercase tracking-[0.12em] text-accent">
                {next.category}
              </span>
              <span className="mt-2 block text-xl font-bold tracking-[-0.02em]">{next.title}</span>
            </span>
          </Link>
        </Band>
      )}
    </>
  );
}
