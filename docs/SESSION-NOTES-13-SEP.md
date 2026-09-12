# 13 September 2026

Continues from `SESSION-NOTES-08-SEP.md`. One piece of work: the client's
chatbot goes in, and Tawk.to comes out.

## WebsyChat arrived as an eager embed, and did not go in that way

It was handed over as a component to drop into `App.tsx` — a `useEffect` that
appends `apps.websychat.com/embed.js` to `document.body` on every page, with
the site key written into the source.

Three things were wrong with that here before any question of speed: it
creates a `<script>` outside `src/third-party/`, which is the one directory
allowed to; it hardcodes an id that belongs in `config/vendors.js` behind a
`VITE_` var; and it has no hostname gate, so localhost and every deploy
preview would open real conversations in the client's support queue.

Then the speed gate. The embed was fetched and read rather than guessed at —
`curl` gets a 403 from that host without a `Referer`, which is worth knowing
before concluding the file is unreachable:

| Cost of loading it on every page | Measured                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `embed.js`                        | 13.3KB brotli, **61.9KB parsed**                                             |
| Origins                           | `apps.websychat.com`, then `api.websychat.com` for the boot config           |
| Google Fonts                      | it injects a `fonts.googleapis.com` stylesheet — Fraunces + Manrope          |
| Runtime                           | `setInterval` every 8s, plus an `EventSource` held open                      |
| Storage                           | `localStorage` visitor id, session id, last eight transcripts                |
| First screen                      | a fixed launcher at `z-index: 2147483000`                                    |

Put to the user with those numbers before anything was built. Decision: it
replaces Tawk, and it loads on click from a launcher this repo owns —
`ChatLauncher` in `SiteChrome`, so it is on every page and costs no
third-party byte until someone presses it. Confirmed in the build: the loader
is in `SiteChrome-*.js` and nowhere in the eager graph. Eager JS 597KB / 600KB.

### The Google Fonts injection is suppressed by claiming an id

The embed only injects its stylesheet `if (!document.getElementById("websychat-fonts"))`.
The loader appends a `<style id="websychat-fonts">` of its own first, so the
branch never runs: two origins and a render-blocking sheet gone, on a site
that self-hosts its typefaces precisely to avoid them.

That style is also where the widget is handed Montserrat. It needs
`!important` — the embed writes `font-family` to its root as an inline style
once its config arrives, and an author `!important` is what outranks a
non-important inline declaration. Verified in the browser: the widget's root
computes to `Montserrat, "Montserrat Fallback", system-ui…` and zero
`fonts.googleapis.com` links are in the document.

### The embed has no API, so the handover is a click

`setOpen` lives in a closure; there is no `window.WebsyChat`. But the script
appends its own launcher to the body while it runs, so it exists by `onload`
and `openWebsyChat()` clicks it. Our button then removes itself and the
embed's takes the corner — same 58px, same 18px radius, same 20/22px offsets,
so the handover is a repaint rather than a jump.

## The button vanished under a click, and the gate was why

Reported while the work was in progress, and reproduced immediately:
`isProductionHost()` matches `ecomsniper.io` only, so on localhost — and on
the Netlify site the client actually reviews — the loader returned false and
the launcher removed itself.

Two things came out of it.

**The chat got its own hostname rule.** `isSupportHost()` in `config/site.js`
is `isProductionHost()` plus `ecomsniper.netlify.app` exactly. Widening
`PRODUCTION_HOSTNAME` instead would have been one character cheaper and wrong:
that constant also gates GTM and Clarity, so it would have started session
recording and advertising tags on a domain nobody consented to. A staffed
support widget is not that. Deploy previews still fail the match — their
hostnames carry a `branch--` or `deploy-preview-N--` prefix — so no branch
build can put a visitor in the real queue. The vendor's own config agrees with
the choice: it records `"siteUrl":"http://ecomsniper.netlify.app"`.

**The button no longer renders before it knows.** It was prerendered and
removed itself on a click that found nothing — which is exactly the vanishing
the user saw. It now renders `null` until an effect confirms the chat can open
here. That matches the server's own nothing, so there is no hydration
mismatch, and there is no state in which a chat button does nothing.

## The widget cannot reach its own API — `ISSUES.md` 22

Found by opening it. The panel opens and then says **"Failed to fetch"**.

`GET https://api.websychat.com/api/v1/embed/<key>` returns a 200 with the
right body and **no `Access-Control-Allow-Origin` header at all**. Checked
from `https://ecomsniper.io`, `https://ecomsniper.netlify.app` and
`http://localhost:4180` — identical headers, none of them CORS; the `OPTIONS`
preflight 404s.

So it is not an allowlist missing our domain. That endpoint is only ever
called cross-origin, from whatever site embeds the widget, and every `fetch`
in `embed.js` goes to it — config, transcript, poll, send, lead form,
escalation. Nothing here can fix it; the header belongs at
`api.websychat.com`. Filed as 22 with what the vendor has to change.

This is why `VITE_WEBSYCHAT_ID` is left unset: with no key the launcher
renders nothing, which is better than a button that opens a panel showing an
error.

## Traps worth keeping

- **`curl` on `apps.websychat.com` 403s without a browser `Referer`.** The
  first fetch of the embed looked like a dead URL and was not.
- **A 200 is not proof a browser can read the response.** Every origin got a
  200 from the chat API and every browser call still failed; the missing
  header is the whole story and it is invisible if you only read status codes.
- **`lhci` failed all three runs** with the documented `EPERM` at cleanup —
  twice before any run finished, and once after runs 1 and 2 had passed, which
  made lhci discard the batch. No new report was written to `.lighthouseci/`,
  so the gate is unverified rather than passed. Unchanged from what
  `CLAUDE.md` already says about it; no new fix attempted, per that note.

## Gates

`format:check`, `lint` (0 errors, 41 pre-existing warnings), `build` and
`budget` (597KB / 600KB eager JS) all pass. `lhci` did not complete — above.

## The launcher was invisible, because it was switched off twice over

Asked where the chatbot was. Two gates, both doing what they were built to do:
`VITE_WEBSYCHAT_ID` was unset, so `HAS_CHAT` was false and the component
returned `null`; and `isSupportHost()` excluded localhost, so it would not
have appeared on the dev server even with the key.

The second is now lifted for `import.meta.env.DEV` only — there was otherwise
no hostname a developer could look at the widget from. Checked in the built
bundle rather than assumed: the branch is compiled out entirely, leaving

```js
function Kt(){return typeof location>"u"?!1:Ne()||Ke.test(location.hostname)}
```

so a production build, a deploy preview and a branch deploy are unchanged.
The key went into a local `.env`, which is gitignored; it is not a secret
either way, since the embed carries it in its own script URL.

Opened on the dev server and used: our launcher appeared, the click handed the
corner to the embed's own, the panel opened, a typed message rendered, no
`fonts.googleapis.com` request was made and `#websychat-fonts` was our style
element. Then "Failed to fetch" — issue 22, and the only thing left between
this and a working bot.
