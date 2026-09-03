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

_Remaining sections not yet captured — this file covers what was read while
confirming the page's nature. Full capture when the page is built._

## Before building

Decide what this page is for. Three shapes, and they are different pages:

1. **Terms only**, as it is now — a legal document, linked from the footer
   like the other legal pages.
2. **A programme landing page** — what the affiliate earns, how it works, with
   the terms linked from it. This is what "Affiliate" in a footer usually
   promises.
3. **Leave it to login**, as their footer does today, and build nothing.

Their own site does 1 and 3 at once, which is why neither works.
