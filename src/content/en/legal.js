/**
 * The privacy and cookie policies.
 *
 * The privacy text is the client's own, captured from
 * https://ecomsniper.io/privacy-policy on 3 Sep 2026 and kept close to
 * verbatim. Two things were changed, both because the live text describes a
 * site that no longer matches this one:
 *
 * 1. "By using our site, you consent to this data being collected" is
 *    implied consent. It is not valid under GDPR and it contradicts the
 *    banner, which asks. Replaced with what the banner actually does.
 * 2. Microsoft Clarity and Microsoft Advertising are named throughout the
 *    live copy. This build loads neither — one GTM container carries GA4,
 *    Meta and TikTok. The disclosure names what actually loads.
 *
 * BOTH CHANGES NEED A HUMAN TO SIGN THEM OFF. This is legal text, not
 * marketing copy, and the client's lawyer has not seen this version. It is
 * tracked in docs/TODO.md under Blocked.
 *
 * The cookie policy is new — the live site has no such page — and its table
 * of cookies is not written here. It is generated from `config/vendors.js`,
 * so a vendor added without a cookie declaration shows up as a gap in the
 * policy rather than as a policy that quietly lies.
 */

export const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated 3 September 2026',

    sections: [
      {
        heading: 'Site disclosure',
        body: [
          'We use Google Analytics, delivered through Google Tag Manager, to understand how visitors use this site so we can improve it. None of it runs until you allow it — analytics and marketing cookies are off by default, and the cookie banner is where you choose.',
        ],
      },
      {
        heading: 'What we collect',
        body: ['We collect the following types of data:'],
        list: [
          'Personal information: name, email address, billing and shipping address, and payment details when you create an account.',
          'Order information: product purchases, order history and transactions.',
          'Website usage information: IP address, browser type, device ID and browsing behaviour on our site.',
        ],
      },
      {
        heading: 'Cookies and tracking technologies',
        body: [
          'We use cookies and similar technologies to recognise repeat visits, remember your preferences and analyse site traffic. Essential cookies are required for the site to work and cannot be turned off. Everything else is off until you accept it, and you can change your mind at any time from the cookie choices link in the footer.',
          'The full list of what each cookie does is in the cookie policy.',
        ],
      },
      {
        heading: 'How we use your information',
        list: [
          'To deliver, maintain and improve the EcomSniper service.',
          'To process payments and send transactional emails.',
          'To provide customer support and respond to enquiries.',
          'To comply with legal obligations and resolve disputes.',
        ],
      },
      {
        heading: 'Data sharing and third parties',
        list: [
          'We work with third-party service providers for payment processing, analytics and customer support. These providers only access your data as necessary and are contractually obligated to protect it.',
          'We may share data to comply with legal obligations or to protect EcomSniper’s rights or user safety.',
          'In the case of a merger or acquisition, user data may be transferred to new ownership.',
        ],
      },
      {
        heading: 'Data security',
        body: [
          'We follow industry best practices to protect your data, including encryption and access control. However, no method of transmission over the internet is 100% secure. Use our services at your discretion.',
        ],
      },
      {
        heading: 'Your rights and choices',
        list: [
          'Access or update your personal information through your account dashboard.',
          'Opt out of promotional communications using the unsubscribe link in emails.',
          'Request data deletion, subject to applicable legal and financial obligations.',
          'If you are in the EU or California, you have additional rights under GDPR or CCPA.',
        ],
      },
      {
        heading: 'Children’s privacy',
        body: [
          'EcomSniper is not intended for children under 18, and we do not knowingly collect personal information from minors.',
        ],
      },
      {
        heading: 'Policy updates',
        body: [
          'We may update this privacy policy from time to time. When we do, we will revise the date at the top of this page and post the latest version here.',
        ],
      },
      {
        heading: 'Contact us',
        body: [
          'If you have any questions or concerns about this policy or how we handle your data, email us at sammy@ecomsniper.io.',
        ],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    updated: 'Last updated 3 September 2026',

    intro: [
      'A cookie is a small file a site stores in your browser. This page lists every cookie this site can set, what it is for and how long it lasts.',
      'Essential cookies are required for the site to work. Everything else is off until you accept it. You can change your choices at any time from the cookie choices link in the footer.',
    ],

    categoriesHeading: 'What each category covers',
    tableHeading: 'The cookies themselves',

    /* Column headings for the generated table. The rows come from
       `config/vendors.js` — see the note at the top of this file. */
    columns: {
      name: 'Cookie',
      vendor: 'Set by',
      purpose: 'Category',
      retention: 'Expires after',
    },

    /* Shown when no optional vendor is configured in this build, which is the
       case until the client provides a GTM container. Saying so is better
       than an empty table that looks like a rendering bug. */
    emptyTable:
      'This build currently loads no optional third-party services, so only essential cookies are set.',

    contact: 'Questions about cookies or anything else on this page: sammy@ecomsniper.io.',
  },
};
