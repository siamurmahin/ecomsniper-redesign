import AffiliatePage from '../pages/AffiliatePage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('affiliate', location.pathname, '/affiliate');

export default AffiliatePage;
