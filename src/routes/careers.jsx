import CareersPage from '../pages/CareersPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('careers', location.pathname, '/careers');

export default CareersPage;
