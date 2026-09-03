/**
 * TEMPORARY DIAGNOSTIC. Delete this file and its four lines in `root.jsx`
 * once the late-reveal question on mobile is answered.
 *
 * The question: text sections are reported appearing late on a phone — already
 * inside the viewport, still invisible, showing up only after scrolling
 * further. That could not be reproduced here. A desktop window cannot be
 * shrunk to a phone viewport while it is maximised, and the browser that can
 * emulate one throttles requestAnimationFrame to a couple of frames a second,
 * which distorts the exact animation timing being measured. So this measures
 * on the real device instead.
 *
 * For every `[data-reveal]` element it records two scroll positions: the one
 * where the element's top crossed into the viewport, and the one where it
 * actually became visible. The distance between them is how far you scrolled
 * while looking at nothing. That number, per element, is the whole answer.
 *
 * Loaded only for `?probe=reveal`, dynamically, so it is absent from every
 * normal page load and from the bundle a visitor fetches.
 */

/** Below this, an element counts as not yet shown. */
const VISIBLE_AT = 0.9;

/** Scrolled past this far while still hidden and in view, and it is a finding. */
const LATE_PX = 40;

/** Opacity of the element itself and of everything above it. */
function opacities(el) {
  const own = Number(getComputedStyle(el).opacity);
  let effective = own;
  let node = el.parentElement;

  while (node && node !== document.documentElement) {
    const o = Number(getComputedStyle(node).opacity);
    if (o < 1) effective *= o;
    node = node.parentElement;
  }

  return { own, effective };
}

/** A name a human can act on: the nearest section, plus the element's own text. */
function label(el) {
  const section = el.closest('section');
  const heading = section?.querySelector('h1, h2, h3')?.textContent?.trim().slice(0, 34);
  const own = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28);
  return { section: heading || section?.className?.slice(0, 30) || '(none)', text: own };
}

export function startRevealProbe() {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  const state = new Map();
  targets.forEach((el, i) => state.set(el, { i, enteredAt: null, shownAt: null, maxHiddenPx: 0 }));

  const panel = document.createElement('div');
  panel.style.cssText = [
    'position:fixed',
    'left:0',
    'right:0',
    'bottom:0',
    'z-index:2147483647',
    'max-height:42vh',
    'overflow:auto',
    'background:#101114',
    'color:#eaeaea',
    'font:11px/1.45 ui-monospace,Menlo,Consolas,monospace',
    'padding:8px 10px',
    'border-top:2px solid #e53238',
    '-webkit-user-select:text',
    'user-select:text',
  ].join(';');
  document.body.appendChild(panel);

  const sample = () => {
    const vh = innerHeight;
    const y = Math.round(scrollY);

    for (const el of targets) {
      const s = state.get(el);
      const box = el.getBoundingClientRect();
      // Any part of it inside the viewport.
      const inView = box.top < vh && box.bottom > 0;
      if (!inView) continue;

      if (s.enteredAt === null) s.enteredAt = y;

      const { own, effective } = opacities(el);
      if (s.shownAt === null) {
        if (own >= VISIBLE_AT) {
          s.shownAt = y;
          s.hiddenFor = y - s.enteredAt;
        } else {
          s.maxHiddenPx = Math.max(s.maxHiddenPx, y - s.enteredAt);
          s.ownOpacity = Number(own.toFixed(2));
          s.byAncestor = effective < own - 0.01;
        }
      }
    }

    render();
  };

  const findings = () =>
    [...state.entries()]
      .map(([el, s]) => ({ el, s }))
      .filter(({ s }) => (s.hiddenFor ?? s.maxHiddenPx) > LATE_PX)
      .sort((a, b) => (b.s.hiddenFor ?? b.s.maxHiddenPx) - (a.s.hiddenFor ?? a.s.maxHiddenPx));

  function report() {
    return {
      viewport: `${innerWidth}x${innerHeight}`,
      dpr: devicePixelRatio,
      docHeight: document.documentElement.scrollHeight,
      scrolledTo: Math.round(scrollY),
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      jsMotion: document.documentElement.classList.contains('js-motion'),
      revealTotal: targets.length,
      revealShown: [...state.values()].filter((s) => s.shownAt !== null).length,
      stillHidden: [...state.values()].filter((s) => s.shownAt === null && s.enteredAt !== null)
        .length,
      late: findings()
        .slice(0, 14)
        .map(({ el, s }) => {
          const l = label(el);
          return {
            px: s.hiddenFor ?? s.maxHiddenPx,
            resolved: s.shownAt !== null,
            byAncestor: s.byAncestor ?? false,
            opacity: s.ownOpacity,
            section: l.section,
            text: l.text,
          };
        }),
      ua: navigator.userAgent,
    };
  }

  function render() {
    const r = report();
    const rows = r.late
      .map(
        (f) =>
          `${String(f.px).padStart(5)}px ${f.resolved ? '  ' : ' !'} ${f.byAncestor ? 'anc ' : '    '}${f.section} — ${f.text}`,
      )
      .join('\n');

    panel.textContent =
      `REVEAL PROBE  ${r.viewport} dpr${r.dpr}  doc ${r.docHeight}  y=${r.scrolledTo}\n` +
      `reveals ${r.revealShown}/${r.revealTotal} shown, ${r.stillHidden} hidden in view` +
      `${r.reducedMotion ? '  [reduced-motion ON]' : ''}${r.jsMotion ? '' : '  [js-motion OFF]'}\n` +
      `scrolled while hidden and on screen (! = still hidden, anc = ancestor):\n` +
      (rows || '  nothing late yet — keep scrolling');

    panel.appendChild(button);
  }

  const button = document.createElement('button');
  button.textContent = 'COPY REPORT';
  button.style.cssText =
    'display:block;margin:8px 0 2px;padding:9px 14px;font:600 12px sans-serif;background:#e53238;color:#fff;border:0;border-radius:6px';
  button.onclick = async () => {
    const text = JSON.stringify(report(), null, 1);
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'COPIED — paste it back';
    } catch {
      /* Clipboard needs a secure context; fall back to selecting it. */
      const box = document.createElement('textarea');
      box.value = text;
      box.style.cssText = 'width:100%;height:32vh;font:10px monospace';
      panel.appendChild(box);
      box.select();
      button.textContent = 'SELECT THE TEXT ABOVE AND COPY';
    }
  };

  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sample();
    });
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  /* Reveals finish on their own clock, so keep looking after scrolling stops. */
  setInterval(sample, 500);
  sample();
}
