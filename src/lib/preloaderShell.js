/**
 * The preloader, as strings.
 *
 * It used to be markup in `index.html`. The router's framework mode renders
 * the document from `root.jsx`, so these moved here rather than being retyped
 * into JSX — the styles are literal values copied from the design tokens,
 * and rewriting them by hand is how copies drift apart.
 *
 * Why it exists at all: the bundle has to download, parse and execute before
 * React can render anything, and the document paints long before that. That
 * gap was a blank page. This fills it, and it can only do that if it costs no
 * request of its own — so it is inline, so it is a string.
 *
 * Generated once from index.html when the document moved; edit here now.
 */

export const PRELOADER_STYLES = `      /* Every value here is literal. This renders before the bundle's
         stylesheet exists, so there are no design tokens to reach for — these
         are copied from \`--color-paper\`, \`--color-ink\`, \`--color-brand-red\`,
         \`--color-brand-violet\` and \`--color-accent\`. If those change, change
         these. */
      #preloader {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        place-items: center;
        /* The hero's own floor: red behind the copy, blue behind the panel.
           The preloader dissolves into the page it is covering rather than
           cutting to it from a flat white card. */
        background:
          radial-gradient(48rem 36rem at 12% 14%, rgba(208, 33, 42, 0.06), transparent 68%),
          radial-gradient(52rem 40rem at 88% 28%, rgba(0, 100, 210, 0.09), transparent 70%), #fbfbfa;
        transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #preloader.is-done {
        opacity: 0;
        pointer-events: none;
      }
      #preloader .preloader-stack {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        animation: preloader-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      #preloader .reticle-spin {
        width: 62px;
        height: 62px;
      }
      /* The whole mark turns. The drawn version kept its centre dot still
         and rolled the rings around it, which a single flat image cannot do —
         and at 62px, spinning it whole reads the same. */
      #preloader .reticle-spin {
        transform-origin: 50% 50%;
        animation: preloader-spin 1.15s linear infinite;
      }
      /* The wordmark itself, not type set to look like it. It used to be the
         name in the display face with a system fallback, which meant the
         first frame showed one shape and the frame after the webfont landed
         showed another. 12.5KB, and it is the black-lettering artwork
         because this sits on paper. */
      #preloader .preloader-word {
        width: 124px;
        height: auto;
      }
      /* An indeterminate sweep, not a progress bar. Nothing here knows how far
         through the load it is, and a bar that pretends to is lying. */
      #preloader .preloader-track {
        position: relative;
        width: 132px;
        height: 2px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(30, 31, 35, 0.08);
      }
      #preloader .preloader-track::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(135deg, #d0212a 0%, #8e2a86 48%, #0064d2 100%);
        animation: preloader-sweep 1.15s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      }
      @keyframes preloader-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes preloader-in {
        from {
          opacity: 0;
          transform: translate3d(0, 8px, 0);
        }
      }
      @keyframes preloader-sweep {
        0% {
          transform: translate3d(-100%, 0, 0);
        }
        100% {
          transform: translate3d(100%, 0, 0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #preloader .reticle-spin,
        #preloader .preloader-stack,
        #preloader .preloader-track::after {
          animation: none;
        }
        /* With no sweep the track would read as an empty slot, so fill it. */
        #preloader .preloader-track::after {
          transform: none;
        }
      }`;

export const PRELOADER_MARKUP = `      <div class="preloader-stack">
        <!-- The real mark, not a redrawing of it. The hand-built SVG that
             stood here was close but not the artwork: its ring weights and
             spike lengths were guesses, and it was the one place on the site
             showing a logo nobody had approved. 19KB, fetched in parallel
             with the bundle it is covering for. -->
        <img
          src="/logo-reticle.png"
          alt=""
          aria-hidden="true"
          width="335"
          height="333"
          class="reticle-spin"
        />

        <!-- aria-hidden: the wrapper's label already says this, and a screen
             reader should not hear the name twice. -->
        <img
          src="/logo-preloader.png"
          alt=""
          aria-hidden="true"
          width="359"
          height="107"
          class="preloader-word"
        />
        <span class="preloader-track" aria-hidden="true"></span>
      </div>`;

export const PRELOADER_BACKSTOP = `      /* Backstop. The app removes this as soon as it has painted; this is
         only here so a bundle that never executes cannot leave a visitor
         staring at a spinner forever. */
      setTimeout(function () {
        var el = document.getElementById('preloader');
        if (el) el.remove();
      }, 6000);`;
