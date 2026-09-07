import { useState } from 'react';
import { AUTH as EN_AUTH } from '../content/en/auth';
import { overlay as germanAuth } from '../content/de/auth';
import { usePageContent } from '../hooks/usePageContent';
import AuthLayout, { AuthSwitch } from '../components/auth/AuthLayout';
import AuthField from '../components/auth/AuthField';
import Icon from '../components/ui/Icon';
import { toneOf } from '../lib/signalTones';

/**
 * Log in.
 *
 * Their page is a Material card centred on white: an `H2` reading "Login", two
 * fields, a button, "FORGOT PASSWORD?" and a link to register. Captured in
 * `docs/source-copy/auth.md`. The fields and the words are theirs; the page
 * around them is this site's.
 *
 * **Nothing here authenticates anybody.** `ssr: false` — there is no server on
 * this site — so the form validates, says what is wrong, and then says plainly
 * that it is not connected. It never posts, never stores and never logs. The
 * contact form already refuses to fake a delivery; this refuses to fake a
 * session, which matters more.
 *
 * The one security decision worth naming: `autoComplete="current-password"` on
 * the password field. A password manager reads it to decide whether to *fill*
 * or to *offer to save*, and the wrong value here is how a manager starts
 * offering to save a login it should have been filling.
 */
const OVERLAYS = { de: germanAuth.AUTH };

export default function LoginPage() {
  const AUTH = usePageContent(EN_AUTH, OVERLAYS);
  const { login } = AUTH;
  const { form, aside } = login;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* 'idle' | 'blocked' — there is no third state, because there is nothing to
     submit to. A 'submitting' state here would be theatre. */
  const [status, setStatus] = useState('idle');

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus('blocked');
  };

  /* The aside's tones come from the English deck: the German overlay carries
     labels, and merging an array by position keeps the icon and tone that
     belong to each row. */
  const asideItems = aside.items.map((item, index) => ({
    ...EN_AUTH.login.aside.items[index],
    ...item,
  }));

  return (
    <AuthLayout
      notConnected={form.notConnected}
      aside={
        <div className="rounded-3xl border border-hairline bg-paper p-8 shadow-lift">
          <p className="font-display text-xl font-extrabold tracking-tight text-ink">
            {aside.headline}
          </p>

          <ul className="mt-6 flex flex-col gap-4">
            {asideItems.map((item) => {
              const tone = toneOf(item.tone);

              return (
                <li key={item.label} className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className={`grid size-9 shrink-0 place-items-center rounded-lg ${tone.tile}`}
                  >
                    <Icon name={item.icon} className="size-4" />
                  </span>
                  <span className="text-[0.92rem] leading-relaxed text-ink">{item.label}</span>
                </li>
              );
            })}
          </ul>

          <p className="mt-7 flex items-start gap-2 border-t border-hairline pt-6 text-[0.85rem] leading-relaxed text-muted">
            <Icon name="headset" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {aside.support}
          </p>
        </div>
      }
    >
      <p className="section-eyebrow" data-reveal data-reveal-group="auth">
        {login.eyebrow}
      </p>

      <h1
        className="mt-5 text-[length:var(--text-hero)] leading-[0.98]"
        data-reveal
        data-reveal-group="auth"
      >
        {login.headline}
      </h1>

      <p
        className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted"
        data-reveal
        data-reveal-group="auth"
      >
        {login.lead}
      </p>

      {/* The brand ramp runs in this panel's border and nowhere else on the
          page — the same rule the contact form follows. The surface asking for
          something is the one that earns the emphasis. */}
      <form
        noValidate
        onSubmit={onSubmit}
        className="panel-brand-outline mt-10 grid max-w-xl gap-5 rounded-2xl p-6 shadow-lift sm:p-8"
        data-reveal
        data-reveal-group="auth-form"
      >
        <p className="font-display text-xl font-extrabold tracking-tight">{form.panelTitle}</p>

        <AuthField
          id="email"
          type="email"
          label={form.email.label}
          placeholder={form.email.placeholder}
          value={email}
          onChange={setEmail}
          autoComplete="username"
        />

        <AuthField
          id="password"
          type="password"
          label={form.password.label}
          placeholder={form.password.placeholder}
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          reveal={form.reveal}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button type="submit" className="btn-primary">
            {form.submit}
          </button>

          {/* Not a link: there is no reset flow to send anybody to, and a link
              to a page that does not exist is worse than a line of text. It
              becomes an anchor the day the flow is built. */}
          <span className="text-sm text-muted">{form.forgot}</span>
        </div>

        <p
          aria-live="polite"
          className="text-sm leading-relaxed font-semibold text-ink empty:hidden"
        >
          {status === 'blocked' && form.notConnected}
        </p>
      </form>

      <AuthSwitch prompt={form.switchPrompt} cta={form.switchCta} />
    </AuthLayout>
  );
}
