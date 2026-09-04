import AiListerPage from '../pages/AiListerPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('aiLister', location.pathname, '/ai-powered-lister');

export default AiListerPage;
