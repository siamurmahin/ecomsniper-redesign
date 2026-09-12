import { useCallback, useEffect, useState } from 'react';
import Icon from '../ui/Icon';
import { useContent } from '../../hooks/useContent';
/* The module rather than the barrel: `third-party/index` is eager — the
   consent banner is in the main bundle and imports `applyConsent` from it —
   and reaching the loader through it would pull this one into that bundle
   too, which is the opposite of the point. */
import { openWebsyChat } from '../../third-party/websychat';
import { isConfigured, vendorNamed } from '../../config/vendors';
import { isSupportHost } from '../../config/site';

/**
 * The button that opens the chatbot, on every page.
 *
 * It exists so the widget does not. The embed weighs 61.9KB parsed, opens two
 * more origins, injects a Google Fonts stylesheet and holds an `EventSource`
 * open; this is a button. Nothing third-party is fetched until it is pressed —
 * see `third-party/websychat`.
 *
 * It hands the corner over the moment the embed lands: the widget renders its
 * own launcher there, at a `z-index` nothing on this site can reach, and two
 * buttons in one corner is worse than either alone.
 */

/** Baked in at build time, so it is the same answer everywhere. */
const HAS_CHAT = isConfigured(vendorNamed('websychat'));

export default function ChatLauncher() {
  const { A11Y } = useContent();

  /*
   * The button appears only once the browser has confirmed the chat can
   * actually open here, and never renders on the server.
   *
   * It used to render from the prerendered HTML and remove itself when a click
   * found nothing to load, which is exactly what a visitor on a non-staffed
   * hostname saw: a chat button that vanished under their finger. The hostname
   * is a runtime fact and the prerender cannot know it, so the honest shape is
   * to render nothing until it does — matching the server's own nothing, so
   * there is no hydration mismatch either.
   */
  const [isOffered, setIsOffered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (HAS_CHAT && isSupportHost()) setIsOffered(true);
  }, []);

  const open = useCallback(async () => {
    /* A second click while the embed is in flight would append nothing — the
       loader is idempotent — but it would toggle shut the panel the first
       click opened. */
    if (isLoading) return;

    setIsLoading(true);
    const opened = await openWebsyChat();

    /* Hand the corner over: the embed has drawn its own launcher there. A
       false here is the embed being blocked, which leaves the button in place
       to be tried again. */
    if (opened) setIsOffered(false);
    else setIsLoading(false);
  }, [isLoading]);

  if (!isOffered) return null;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={A11Y.openChat}
      aria-busy={isLoading || undefined}
      /* Deliberately the embed's own geometry — 58px, 18px radius, 20px from
         the right, 22px from the bottom — so the handover is a repaint rather
         than a jump. `BackToTop` clears the sticky bar and therefore sits
         above this, which is where it sits once the widget's launcher has
         taken over too. */
      className="group fixed bottom-[22px] right-5 z-50 grid size-[58px] place-items-center rounded-[18px] border border-ink-line bg-ink text-paper shadow-float transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent hover:bg-accent"
    >
      <Icon name="chat" className="size-6" />
    </button>
  );
}
