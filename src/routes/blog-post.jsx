import BlogPostPage from '../pages/BlogPostPage';
import { BLOG } from '../content/en/blog';
import { metaForContent, noindexMetaFor } from '../lib/meta';

/**
 * One post.
 *
 * Title and description come from the post itself rather than from a key in
 * the SEO deck — one entry per post would be a second list to keep in step,
 * and the copy would be written twice.
 *
 * The JSON-LD is `BlogPosting`, which is what puts a date and an author beside
 * the result rather than a bare blue link. `datePublished` is the deck's ISO
 * string, which is already the format Schema.org asks for.
 */
export const meta = ({ location, params }) => {
  const post = BLOG.posts.find((entry) => entry.slug === params.slug);
  if (!post) return noindexMetaFor('notFound', location.pathname);

  return metaForContent(
    { title: `${post.title} — EcomSniper`, description: post.excerpt },
    location.pathname,
    `/blog/${post.slug}`,
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Organization', name: BLOG.author },
      publisher: { '@type': 'Organization', name: 'EcomSniper' },
      keywords: post.tags?.join(', '),
    },
  );
};

export default BlogPostPage;
