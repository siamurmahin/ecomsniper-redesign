import BlogPage from '../pages/BlogPage';
import { BLOG } from '../content/en/blog';
import { metaForContent } from '../lib/meta';

/**
 * The index's title and description come from the blog's own deck rather than
 * from `content/en/seo.js`. That deck is eager — the header and footer read it
 * on every route — so a key added there is bytes every visitor downloads for a
 * page most of them will not open. See the note in `content/en/blog.js`.
 */
export const meta = ({ location }) => metaForContent(BLOG.meta, location.pathname, '/blog');

export default BlogPage;
