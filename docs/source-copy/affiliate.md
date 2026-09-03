# Affiliate — `/affiliate/join`

Captured 3 Sep 2026.

## What this page actually is

Not a dashboard and not a signup form — it is the **affiliate programme's
terms and conditions**, a public legal document. No form fields, no redirect
to login.

It was raised as a possible access-control problem, reachable without signing
in. It is not one: affiliate terms are meant to be readable before anyone
applies, and there is nothing behind it that authentication would protect.

The genuine oddity is the reverse. Their footer links **"Affiliate" to
`/login`**, so this page is unlinked from the site while a login screen sits
where the programme should be. A reader who wants to know the terms cannot
reach them, and a reader who clicks Affiliate gets a password prompt.

## Opening copy

**Heading:** Affiliate Program — Terms & Conditions

Thank you for your interest in becoming an affiliate partner of EcomSniper.
Our affiliate program is designed to reward individuals and businesses for
promoting EcomSniper and helping grow our community. By applying to or
participating in the affiliate program, you agree to the following terms and
conditions.

**1. Enrollment**

- To participate in the EcomSniper Affiliate Program, you must complete and
  submit the official affiliate application.
- EcomSniper reserves the right to approve or reject any application at its
  sole discretion.
- Applicants must be at least 18 years old or the legal age in their
  jurisdiction.

## Captured in full, 4 Sep

All 11 clauses read off the rendered page after `readyState === 'complete'` —
6,720 characters. Now in `src/content/en/affiliate.js` verbatim, so this file
does not duplicate them.

The clause list, for reference:

1. Enrollment · 2. Affiliate conduct and community standards ·
2. Brand protection and reputation · 4. Referral ownership ·
3. Promotion guidelines · 6. Accountability for referrals ·
4. Commission structure · 8. Payment terms · 9. Compliance ·
5. Termination · 11. Modifications, then a Final agreement.

Facts worth knowing without reading the whole thing:

- Affiliates must **hold an active paid subscription** to stay eligible.
- Payouts are **quarterly**, **PayPal only**, **$100 USD minimum**, and the
  affiliate pays all fees.
- Clause 8 asks affiliates **not to raise payment delays publicly**.
- The **commission percentage is never stated** — "communicated separately".

## Decided 4 Sep

**Built as the terms document it is** (shape 1 of the three below), at
`/affiliate`, linked from the footer. Their own page has no form, so nothing
was removed to get here.

Shape 2 — a programme landing page in front of the terms — is still open and
is in `docs/TODO.md` under Future. It is what a footer labelled "Affiliate"
usually promises, and it is a different page rather than a change to this one.
