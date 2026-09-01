import { PRICING } from '../../data/siteContent';

/**
 * The three plans in the order the client's own pricing page puts them: the
 * plan most people take in the middle and raised, the two edge cases either
 * side. The data lists the featured plan first because other shapes read
 * `plans[0]`, so the display order is derived rather than stored.
 */
export function orderedPlans() {
  const featured = PRICING.plans.find((plan) => plan.featured);
  const rest = PRICING.plans.filter((plan) => !plan.featured);
  return [rest[0], featured, rest[1]].filter(Boolean);
}
