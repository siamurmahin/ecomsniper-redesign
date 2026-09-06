/**
 * Careers.
 *
 * Their copy from ecomsniper.io/careers, captured 3 Sep 2026 — see
 * `docs/source-copy/careers.md`.
 *
 * ## The role descriptions below are OUR DRAFT, not the client's
 *
 * Their live listing reads "This is a one liner description" — placeholder
 * text that reached production. We declined to invent a replacement on 3 Sep,
 * because a job advert is a promise about work and pay, and it stayed `null`
 * until a role page needed a body.
 *
 * That decision was overridden deliberately on 6 Sep: build it with useful
 * copy now, the client replaces it later. Everything under `summary`, `about`,
 * `responsibilities`, `requirements` and `niceToHave` is therefore **written by
 * us and unapproved**. It is plausible for the job's real facts and it is not
 * a commitment anyone at EcomSniper has made.
 *
 * **This must be replaced or signed off before launch.** It is on the Blocked
 * list in `docs/TODO.md` for exactly the reason their own placeholder shipped:
 * draft copy that nobody is chasing becomes production copy.
 *
 * The facts around it — title, department, location, type, pay — are real and
 * came from their listing.
 *
 * ## Shape
 *
 * A role owns a `slug`, which is its page at `/careers/<slug>` and, prefixed,
 * at `/de/careers/<slug>`. `react-router.config.js` and `scripts/` read the
 * slugs from this file, so adding a role here prerenders its page and lists it
 * in the sitemap without a second list to keep in step.
 *
 * Every prose field is optional. A section with nothing in it does not render,
 * so the client cutting our draft down to two lines leaves a page that still
 * reads as finished.
 */
export const CAREERS = {
  eyebrow: 'Careers',
  /* The marked run is the site's device — see `components/ui/MarkedHeadline`.
     `headline` is the same sentence as plain text, for the places that need
     text rather than markup. Keep the two in step. */
  headlineParts: [{ text: 'Do the best work of your career, ' }, { text: 'with us.', mark: true }],
  headline: 'Do the best work of your career, with us.',
  lead: 'A focused team building tools used by thousands of eBay sellers. Bring your craft. We will bring the runway.',

  openRoles: {
    eyebrow: 'Open roles',
    /* Their page says "1 open role". Written as a count so it stays honest
       when the list changes. */
    headline: 'One role open right now.',
    /* Shown in place of the list if every role is ever removed, so the section
       degrades to a sentence rather than to an empty heading. */
    empty: 'Nothing open at the moment. The door below is still the way in.',
    viewLabel: 'View role',
    roles: [
      {
        slug: 'video-editor',
        title: 'Video Editor',
        department: 'Marketing',
        location: 'Remote',
        type: 'Full time',
        salary: 'BDT 15,000 – 25,000 / month',

        /* DRAFT — see the file header. Not client-approved. */
        summary:
          'Cut the short-form video that introduces EcomSniper to people who have never heard of it.',
        about:
          'Most people meet EcomSniper through a thirty second clip before they ever reach the site. You would own those clips: the ads, the YouTube cut-downs, the walkthroughs that show the software actually doing the thing. You will not be handed a shot list. You will be handed raw screen recordings, founder footage and a rough idea, and asked to find the version of it that holds attention.',
        responsibilities: [
          'Edit short-form video for YouTube, TikTok, Instagram and paid ads.',
          'Turn long screen recordings of the software into clips that make one point each.',
          'Cut founder and customer footage into stories that do not read as testimonials.',
          'Keep a consistent look across everything — titles, pacing, captions, sound.',
          'Work from a brief and come back with more than the brief asked for.',
        ],
        requirements: [
          'A reel. It matters far more to us than a CV.',
          'Fluent in your editor of choice — Premiere, Final Cut, DaVinci, we do not mind which.',
          'A feel for pacing in the first three seconds, because that is where the audience is decided.',
          'Comfortable working remotely and asynchronously with a small team.',
        ],
        niceToHave: [
          'Motion graphics, or the appetite to learn them.',
          'You have edited for ecommerce, software or a creator before.',
          'You understand why a screen recording is boring and know what to do about it.',
        ],
      },
    ],
  },

  /* The job page's own furniture. Kept beside the roles rather than in a
     separate deck, because a page owns its copy. */
  role: {
    backLabel: 'All open roles',
    applyCta: 'Apply for this role',
    aboutHeading: 'About the role',
    responsibilitiesHeading: 'What you would do',
    requirementsHeading: 'What we are looking for',
    niceToHaveHeading: 'Nice to have',
    factLabels: {
      department: 'Department',
      location: 'Location',
      type: 'Type',
      salary: 'Pay',
    },
  },

  /* The application form. Fields are links rather than an upload: no endpoint
     is configured yet, so this hands off to the applicant's mail client, and a
     `mailto:` cannot carry an attachment. For a video editor a reel link is
     the more useful thing anyway. See `docs/TODO.md` for the upload. */
  apply: {
    eyebrow: 'The application',
    headline: 'Apply for this role',
    lead: 'A person reads every application. Expect a reply by email either way.',
    fields: {
      name: { label: 'Your name', placeholder: 'Alex Fischer' },
      email: { label: 'Email', placeholder: 'you@example.com' },
      location: { label: 'Where you are based', placeholder: 'Dhaka, Bangladesh' },
      portfolio: { label: 'Portfolio or showreel', placeholder: 'A link we can watch' },
      profile: { label: 'LinkedIn or other profile', placeholder: 'Optional' },
      message: {
        label: 'Why this role',
        placeholder: 'What you have made, and what you want to work on next.',
      },
    },
    submit: 'Send application',
    /* Appended to the mail-client hand-off, because the form cannot attach a
       file and the applicant's own mail client can. */
    attachNote: 'Attach your CV to this email if you have one.',
    sending: 'Sending…',
    sent: 'Thank you — your application is in. We reply either way.',
    failed: 'That did not send. Email us instead and we will pick it up.',
  },

  speculative: {
    eyebrow: 'Nothing that fits',
    headline: 'Tell us what you do anyway.',
    body: 'We would rather hear from someone good with no matching role than miss them. Send what you have made and what you want to work on.',
    email: 'management@ecomsniper.io',
    cta: 'Email us',
  },
};

/** Every role's slug, for the prerender list and the sitemap. */
export const ROLE_SLUGS = CAREERS.openRoles.roles.map((role) => role.slug);
