/**
 * The affiliate programme terms.
 *
 * Captured in full from ecomsniper.io/affiliate/join on 4 Sep 2026 — 11
 * sections, 6,720 characters. See `docs/source-copy/affiliate.md`.
 *
 * **This page is a legal document, not a landing page.** Their page has no
 * form and no signup — it is the programme's terms, readable before anyone
 * applies, which is what affiliate terms are for. It is reproduced as that
 * and nothing more.
 *
 * Their own footer links "Affiliate" to `/login`, so today this page is
 * unlinked while a password prompt sits where the programme should be. Ours
 * links to the page. Whether the client also wants a programme landing page
 * in front of it — what the affiliate earns, how it works — is a separate
 * page and a separate decision, recorded in `docs/TODO.md`.
 *
 * Wording is kept close to verbatim because it is a contract. Two things were
 * deliberately not carried over: the "NEW" and "UPDATED" badges on sections 2,
 * 3, 4, 6 and 8, which date from their edit and mean nothing to a first-time
 * reader; and the commission percentage, which their terms decline to state
 * ("communicated separately") and which is therefore not ours to supply.
 */
export const AFFILIATE = {
  eyebrow: 'Affiliate programme',
  headline: 'Terms and conditions',
  intro:
    'Thank you for your interest in becoming an affiliate partner of EcomSniper. Our affiliate program is designed to reward individuals and businesses for promoting EcomSniper and helping grow our community. By applying to or participating in the affiliate program, you agree to the following terms and conditions.',

  /* Numbered because their document is numbered and a contract is referred to
     by clause number. The numbers are content here, not decoration. */
  sections: [
    {
      title: 'Enrollment',
      items: [
        'To participate in the EcomSniper Affiliate Program, you must complete and submit the official affiliate application.',
        'EcomSniper reserves the right to approve or reject any application at its sole discretion.',
        'Applicants must be at least 18 years old or the legal age in their country of residence.',
        'To remain eligible as an affiliate, you must maintain an active paid EcomSniper subscription. If your subscription becomes inactive or cancelled, your affiliate status may also be suspended or removed.',
      ],
    },
    {
      title: 'Affiliate conduct and community standards',
      lead: 'Affiliates represent the EcomSniper brand and community. Professional conduct is required at all times. By participating in the program, affiliates agree to:',
      items: [
        'Respect all other affiliates, staff members, and community members.',
        'Avoid drama, harassment, toxic behavior, or public conflicts.',
        "Not engage in infighting, competition abuse, or attempts to damage another affiliate's reputation or business.",
        'Maintain professionalism when speaking about EcomSniper publicly or privately.',
      ],
      closer:
        'Failure to follow these standards may result in removal from the affiliate program and community.',
    },
    {
      title: 'Brand protection and reputation',
      lead: 'Affiliates may not damage, misrepresent, or harm the EcomSniper brand in any way. The following actions are strictly prohibited:',
      items: [
        'False claims or misleading marketing',
        'Public attacks against EcomSniper, its staff, users, or affiliates',
        'Creating unnecessary public disputes regarding payments, policies, or internal operations',
        'Sharing confidential company information',
        'Any behavior that may negatively impact the reputation of EcomSniper',
      ],
      closerLead: 'If an affiliate violates this section, EcomSniper reserves the right to:',
      closerItems: [
        'Immediately terminate affiliate access',
        'Remove community access',
        'Remove company or staff positions',
        'Cancel pending commissions or affiliate payments',
        'Permanently ban the individual from all EcomSniper platforms and services',
      ],
    },
    {
      title: 'Referral ownership',
      items: [
        'Affiliate ownership is determined by the final convincing interaction that led the customer to join EcomSniper.',
        'If multiple affiliates interacted with the same potential customer, the affiliate who ultimately convinced or closed the user into becoming a paying customer will receive the referral credit.',
        'EcomSniper reserves the right to make the final decision in any referral dispute.',
      ],
    },
    {
      title: 'Promotion guidelines',
      items: [
        'Affiliates will receive unique referral links or coupon codes for promotion.',
        'Affiliates are responsible for promoting EcomSniper ethically and professionally.',
      ],
      closerLead: 'The following promotion methods are prohibited:',
      closerItems: [
        'Spam marketing',
        'Fake testimonials',
        'Misleading income claims',
        'Blackhat marketing methods',
        'Harassment or forced promotion',
        'Creating fake urgency or false promises',
      ],
      closer:
        'Affiliates must always comply with platform rules, local laws, and advertising regulations.',
    },
    {
      title: 'Accountability for referrals',
      lead: 'Affiliates are expected to maintain accountability for the users they refer into the EcomSniper ecosystem. This includes:',
      items: [
        'Properly explaining the service before referring users',
        'Avoiding misleading expectations',
        'Assisting referred users when reasonably possible',
        'Helping maintain a positive experience within the community',
      ],
      closer:
        'Affiliates who repeatedly bring harmful, fraudulent, abusive, or problematic users into the platform may face affiliate review or removal.',
    },
    {
      title: 'Commission structure',
      items: [
        'Affiliates earn commissions on qualifying sales generated through their approved referral links or coupon codes.',
        'Commission percentages and structures may vary and will be communicated separately.',
      ],
      closerLead: 'Commissions may be adjusted, delayed, withheld, or reversed in cases involving:',
      closerItems: [
        'Refunds',
        'Chargebacks',
        'Fraudulent transactions',
        'Abuse of the affiliate system',
        'Violation of company policies',
      ],
    },
    {
      title: 'Payment terms',
      /* The only section with labelled clauses on their page. Kept as pairs so
         the label stays attached to what it governs. */
      definitions: [
        {
          term: 'Payment schedule',
          body: 'Affiliate commissions are processed quarterly (every three months) and are generally paid between the 1st and 10th day of the payout month.',
        },
        {
          term: 'Payout request requirement',
          body: 'Affiliates must submit a payout request through the affiliate dashboard before commissions can be processed.',
        },
        {
          term: 'Processing delays',
          body: 'While EcomSniper aims to process all payments within the standard payout window, occasional delays may occur due to verification, operational, or processing reasons. Affiliates agree not to publicly create drama, disputes, or reputational harm regarding delayed payments. Any concerns regarding payouts must be handled privately with the EcomSniper team.',
        },
        {
          term: 'Payment method',
          body: 'All affiliate payments are sent exclusively through PayPal.',
        },
        {
          term: 'Minimum payout',
          body: 'A minimum balance of $100 USD is required before requesting a payout.',
        },
        {
          term: 'Payment fees',
          body: 'Affiliates are responsible for all PayPal fees, currency conversion fees, transaction fees, or local taxes associated with receiving payments.',
        },
        {
          term: 'Payment confirmation',
          body: 'Affiliates will receive confirmation once payments have been processed.',
        },
      ],
    },
    {
      title: 'Compliance',
      items: [
        'Affiliates must comply with all applicable laws, regulations, platform policies, and industry standards.',
        'Affiliates may not infringe on intellectual property rights.',
        'Affiliates may not misrepresent EcomSniper products or services.',
        'Affiliates may not use deceptive sales practices.',
        'Affiliates may not engage in unethical marketing behavior.',
      ],
    },
    {
      title: 'Termination',
      items: [
        'Either party may terminate the affiliate relationship at any time.',
        'EcomSniper reserves the right to immediately suspend or terminate affiliates for violations of these terms without prior warning.',
      ],
      closerLead: 'Upon termination:',
      closerItems: [
        'Affiliate access may be revoked immediately',
        'Community access may be removed',
        'Future commissions may be cancelled',
        'Pending commissions may be withheld during investigation if fraud or misconduct is suspected',
      ],
    },
    {
      title: 'Modifications',
      items: [
        'EcomSniper reserves the right to modify, update, or change these terms at any time without prior notice.',
        'Continued participation in the affiliate program after updates constitutes acceptance of the revised terms.',
        "It is the affiliate's responsibility to regularly review and stay updated on the latest affiliate policies.",
      ],
    },
  ],

  final: {
    title: 'Final agreement',
    body: [
      'By joining the EcomSniper Affiliate Program, you acknowledge that you have read, understood, and agreed to all terms and conditions listed above.',
      'You also acknowledge that failure to comply with these terms may result in removal from the affiliate program, loss of commissions, or permanent restriction from EcomSniper services and communities.',
    ],
    contact: 'For any questions about the affiliate programme, contact the EcomSniper team.',
    /* Points at the live site until our own /contact ships — the same
       arrangement the footer's Contact link is under. Flip both together. */
    cta: { label: 'Contact us', href: 'https://ecomsniper.io/contact' },
  },
};
