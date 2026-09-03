/**
 * German copy.
 *
 * Only the keys that differ from English go here. Anything missing falls back
 * to the English deck, so a half-finished translation shows English rather
 * than a blank — and a new English string never breaks the German site.
 *
 * The shape mirrors `../en` exactly, file for file. If a key does not exist
 * there, it does nothing here.
 *
 * TWO RULES CARRY OVER, and they matter more in translation than anywhere:
 *
 * 1. No income claims. The client's own German page says
 *    "1.000€–3.000€/Monat" — that is the same class of claim this rebuild
 *    removed from the English site, and it is not repeated here.
 * 2. The guarantee always names the plan: "im Monatsplan". The credits bundle
 *    and Enterprise are final sale, so the unqualified version is a promise
 *    the pricing page contradicts.
 *
 * Prices stay in dollars because that is what the client charges.
 */

import { overlay as site } from './site';
import { overlay as a11y } from './a11y';
import { overlay as seo } from './seo';
import { overlay as footer } from './footer';
import { overlay as furniture } from './furniture';
import { overlay as consent } from './consent';
import { overlay as legal } from './legal';
import { overlay as homeHero } from './home/hero';
import { overlay as homeProof } from './home/proof';
import { overlay as homeAudience } from './home/audience';
import { overlay as homePillars } from './home/pillars';
import { overlay as homeFeatures } from './home/features';
import { overlay as homeCommunity } from './home/community';
import { overlay as homeTraining } from './home/training';
import { overlay as homeFounders } from './home/founders';
import { overlay as homeComparison } from './home/comparison';
import { overlay as homeAssurance } from './home/assurance';
import { overlay as pricing } from './pricing';
import { overlay as faq } from './faq';
import { overlay as playbook } from './playbook';
import { overlay as notFound } from './not-found';

/* One object, assembled from the files beside this one. Each contributes its
   own top-level keys, so nothing here can overwrite anything else. */
export const de = {
  ...site,
  ...a11y,
  ...seo,
  ...footer,
  ...furniture,
  ...consent,
  ...legal,
  ...homeHero,
  ...homeProof,
  ...homeAudience,
  ...homePillars,
  ...homeFeatures,
  ...homeCommunity,
  ...homeTraining,
  ...homeFounders,
  ...homeComparison,
  ...homeAssurance,
  ...pricing,
  ...faq,
  ...playbook,
  ...notFound,
};
