import AboutPage from '../pages/AboutPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('about', location.pathname, '/about');

export default AboutPage;
