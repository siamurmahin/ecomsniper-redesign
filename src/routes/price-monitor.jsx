import PriceMonitorPage from '../pages/PriceMonitorPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('priceMonitor', location.pathname, '/price-monitor');

export default PriceMonitorPage;
