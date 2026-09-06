import AffiliateTermsPage from '../pages/AffiliateTermsPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) =>
  metaFor('affiliateTerms', location.pathname, '/affiliate/terms');

export default AffiliateTermsPage;
