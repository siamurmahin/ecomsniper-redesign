import NotFoundPage from '../pages/NotFoundPage';
import { noindexMetaFor } from '../lib/meta';

/* Out of the index on purpose: a 404 that invites crawling is a 404 that ends
   up in results. */
export const meta = ({ location }) => noindexMetaFor('notFound', location.pathname);

export default NotFoundPage;
