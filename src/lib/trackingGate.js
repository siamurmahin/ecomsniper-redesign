/**
 * The domain gate, and the chat widget behind it.
 *
 * Gated on the hostname exactly as the live site gates it, so localhost, every
 * preview build and every staging URL stay out of the real support queue. The
 * port is not part of `location.hostname`, so no dev port needs listing.
 *
 * A string because it has to run before React does — same reason as
 * `preloaderShell`. When the consent banner lands, this is the code it will
 * govern: nothing here may load until a visitor has said yes.
 */

export const TRACKING_GATE = `      window.__ECOM_TRACKING_OK__ = /(^|\\.)ecomsniper\\.io$/i.test(location.hostname);

      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
      if (window.__ECOM_TRACKING_OK__) {
        (function () {
          var s1 = document.createElement('script'),
            s0 = document.getElementsByTagName('script')[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/6760d1e1af5bfec1dbdd3f59/1if937n1d';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      }`;
