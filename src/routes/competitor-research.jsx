import CompetitorResearchPage from '../pages/CompetitorResearchPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) =>
  metaFor('competitorResearch', location.pathname, '/competitor-research');

export default CompetitorResearchPage;
