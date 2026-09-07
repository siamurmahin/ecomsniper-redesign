# Source copy — `/login` and `/register`

Captured 8 September 2026 from `https://ecomsniper.io/login` and
`https://ecomsniper.io/register`, read out of the live DOM after
`readyState === 'complete'` — their site is a slow-hydrating SPA and a plain
fetch returns the shell with nothing in it, which is why `WebFetch` reported an
empty page first.

Both pages are Material UI. Neither is in their sitemap; both are linked from
their header and from each other.

---

## `/login`

Title: **EcomSniper - Login**
Heading: `H2: Login`

| Field    | Type       | Label        | Required |
| -------- | ---------- | ------------ | -------- |
| Email    | `email`    | `Email *`    | yes      |
| Password | `password` | `Password *` | yes      |

Buttons: **Login**, **FORGOT PASSWORD?**
Foot: “Don’t have an account?” → **Sign Up** (`/register`)

Full visible text:

```
Login
Email *
Password *
Login
FORGOT PASSWORD?
Don’t have an account?
Sign Up
```

Nothing else is on the page — no social sign-in, no “remember me”, no product
copy, no illustration, no footer.

---

## `/register`

Title: **EcomSniper - Register**
Headline above the form: **99% of People Who Use EcomSniper for 3 Months Make
1-3k/month**
Panel heading: `H2: Your Subscription`

It is not a registration page. It is **step one of a two-step checkout**, with
the order summary beside it:

```
Step One  — Create Account
Step Two  — Payment Details
```

| Field         | Type       | Label                 | Placeholder   | Required |
| ------------- | ---------- | --------------------- | ------------- | -------- |
| Email         | `email`    | Email Address         | Email         | yes      |
| Confirm email | `email`    | Confirm Email Address | Confirm Email | yes      |
| Password      | `password` | Password              | Password      | yes      |
| Consent       | `checkbox` | —                     | —             | yes      |

Helper under the password: **“Must be 6 characters”**
Consent line: “I agree to EcomSniper's Terms & Conditions and Privacy Policy.”
(both linked)
Button: **Proceed to Secure Payment**
Foot: “Already a member?” → **Login** (`/login`)

The subscription panel, verbatim:

```
Your Subscription
Dropship Mastery & EcomSniper AI
List 3k Products Per Month
EcomSniper Ai
AI-powered Title, Description, and Item Specifics Generator
Add your own store brand or watermark to items.
Access high-level, expert content to accelerate your success.
Total Due Today
$97 USD
30-Day Money-Back Guarantee
Starting next month, you'll be billed $199/month for the Sniper Package
subscription unless you cancel. You can cancel anytime.
```

---

## What cannot be carried across, and why

**The headline is the one claim this repository has banned since the start.**
`CLAUDE.md` names it explicitly: _“no ‘99% make 1-3k’”_. It is on their
registration page as the first thing a reader sees, and it is the same class of
claim as the four held out of the course page. It is not reproduced. Flagged
for the client in `TODO.md` under Blocked.

**“Must be 6 characters” is not a rule to copy.** A six-character minimum is
below every current guideline, and a rebuild that reproduces it ships a known
weakness on the one page where it matters. Their live system will still accept
what it accepts — that is their server, not ours — but a design that _asks_ for
six characters is telling people six is enough.

**Step Two is checkout**, and checkout is outside the scope line in
`TODO.md` → Decided. What the design covers is step one; where step two would
begin, the page says so rather than pretending to take a card.
