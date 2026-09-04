# Privacy Policy — `/privacy-policy`

Captured 4 Sep 2026 after `readyState === 'complete'` and a full scroll.
**3,349 characters**, eleven sections. Supplied by the client in the same
session and checked against the live page; the two agree.

This file did not exist until now, and its absence is why the divergence below
went unrecorded for a day: the privacy page was rebuilt on 3 Sep from a reading
that was never written down, so there was nothing to diff against.

**Their page carries no "Last Updated" line**, while its own Policy Updates
section promises "we will revise the Date". Ours is dated.

## What the rebuild changed, and why

Seven of their eleven sections are carried across essentially verbatim:
Information We Collect, How We Use Your Information, Data Sharing and Third
Parties, Data Security, Your Rights and Choices, Children's Privacy, Policy
Updates and Contact Us. Spellings are Canadian in ours (`behaviour`,
`analyse`, `recognise`), which is where the business is.

The 3 Sep rebuild dropped everything about Microsoft Clarity, on the reasoning
that a policy must not name a vendor the site does not load. **That was
reversed on 4 Sep:** the client confirmed Clarity comes back alongside GTM, so
the site changed to match the policy rather than the policy being cut to match
the site.

1. **Site Disclosure.** Names Microsoft Clarity and GTM, and keeps their
   "improve our product experience and advertising". One sentence of theirs is
   still not here: _"By using our site, you consent to this data being collected
   and used."_ That is implied consent, not valid under GDPR, and it contradicts
   a banner that asks. **It is the only remaining divergence from their
   document.**
2. **Privacy Policy Disclosures** — **restored verbatim.** Microsoft Clarity,
   Microsoft Advertising, heatmaps, session recordings, click tracking, the
   first- and third-party cookies, and the Microsoft Privacy Statement linked.
   German mirrors it at the same array index and links the German statement.
3. **Cookies & Tracking Technologies.** Theirs says non-essential cookies can be
   accepted or rejected. Ours says the same and adds where to change the choice
   and that the cookie policy lists each one.

Clarity is declared in `src/config/vendors.js` behind the **marketing**
category — it syncs with Microsoft Advertising and sets `MUID`, and a session
recorder is the most invasive thing this site can load — and it loads from
`src/third-party/clarity.js`, consent-gated and **inert until
`VITE_CLARITY_ID` is set**. Until that id arrives, the policy names a vendor
the build does not yet load; that is the same position GTM has been in since
3 Sep, and it is recorded as `../ISSUES.md` 11.

Their Microsoft link resolves to `https://privacy.microsoft.com/en-US/privacystatement`.

---

## Captured text

Privacy Policy

Site Disclosure:

We use Microsoft Clarity to understand how users interact with our website so we can improve our product experience and advertising. By using our site, you consent to this data being collected and used. See our full privacy details below.

Privacy Policy Disclosures:

At EcomSniper, we partner with Microsoft Clarity and Microsoft Advertising to analyze how visitors interact with our website. We use behavioral data such as heatmaps, session recordings, and click tracking to improve our services. Data is collected via first- and third-party cookies and may be used for advertising, fraud prevention, and site optimization. For more, see the Microsoft Privacy Statement.

Information We Collect:

We collect the following types of data:

Personal Information: Including name, email address, billing/shipping address, and payment details when you create an account.

Order Information: Product purchases, order history, and transactions.

Website Usage Information: IP address, browser type, device ID, and browsing behavior on our site.

Cookies & Tracking Technologies:

We use cookies and similar technologies to recognize repeat visits, remember your preferences, and analyze site traffic. You can choose to accept or reject non-essential cookies. Essential cookies are required for the operation of our website.

How We Use Your Information:

To deliver, maintain, and improve the EcomSniper service.

To process payments and send transactional emails.

To provide customer support and respond to inquiries.

To comply with legal obligations and resolve disputes.

Data Sharing and Third Parties:

We work with third-party service providers for payment processing, analytics, and customer support. These providers only access your data as necessary and are contractually obligated to protect it.

We may share data to comply with legal obligations or to protect EcomSniper's rights or user safety.

In the case of a merger or acquisition, user data may be transferred to new ownership.

Data Security:

We follow industry best practices to protect your data, including encryption and access control. However, no method of transmission over the internet is 100% secure. Use our services at your discretion.

Your Rights and Choices:

Access or update your personal information through your account dashboard.

Opt out of promotional communications using the unsubscribe link in emails.

Request data deletion, subject to applicable legal and financial obligations.

If you're in the EU or California, you have additional rights under GDPR or CCPA.

Children's Privacy:

EcomSniper is not intended for children under 18, and we do not knowingly collect personal information from minors.

Policy Updates:

We may update this privacy policy from time to time. When we do, we will revise the Date and post the latest version on this page.

Contact Us:

If you have any questions or concerns about this policy or how we handle your data, email us at sammy@ecomsniper.io.
