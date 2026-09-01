import { COMPARISON } from '../../data/siteContent';

/**
 * Which of the three groups a row belongs to, worked out from the row's own
 * values rather than stored beside them: a row we do not have is a loss, a row
 * they do not have is a win, and everything else is shared.
 *
 * Derived rather than declared so the grouping cannot drift out of step with
 * the table it is describing — change a value and the row moves itself.
 */
export const groupOf = (row) => {
  if (row.us === false) return 'theirs';
  if (row.them === false) return 'ours';
  return 'both';
};

/** The rows in reading order: what both do, what only we do, what they win. */
export const GROUP_ORDER = ['both', 'ours', 'theirs'];

export const groupedRows = () =>
  GROUP_ORDER.map((key) => ({
    key,
    label: COMPARISON.groupLabels[key],
    rows: COMPARISON.rows.filter((row) => groupOf(row) === key),
  }));
