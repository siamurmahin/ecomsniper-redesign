import { useMemo, useState } from 'react';
import { CONTACT as EN_CONTACT } from '../content/en/contact';
import { overlay as germanContact } from '../content/de/contact';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * Contact.
 *
 * Their page, rebuilt, with the one thing it is missing: somewhere for the
 * message to go. Theirs has no `action` attribute on the form at all —
 * confirmed on the live page, not inferred — so a visitor who types a message
 * and presses send has no idea it went nowhere.
 *
 * This one never claims a delivery it did not make. There are two paths and
 * the visitor is told which one happened:
 *
 * 1. `VITE_CONTACT_ENDPOINT` set — the message is POSTed, and success is
 *    reported only when the response says so.
 * 2. Unset — the form does NOT fake success the way the playbook form does.
 *    It hands the message to the visitor's own mail client, pre-filled, and
 *    says so plainly. A contact form that silently drops messages is worse
 *    than no contact form; the address is right there beside it.
 *
 * The day the endpoint exists it starts posting, with no change here.
 *
 * Without JavaScript the form cannot submit, which is why the email address
 * and phone number are page content beside it rather than being hidden behind
 * the form — a no-JS visitor still has two working ways to reach a person.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanContact.CONTACT };

/** Everything the mail client needs, encoded once. */
function mailtoHref({ to, name, email, message }) {
  const subject = `Website enquiry from ${name || 'a visitor'}`;
  const body = [message, '', '—', name, email].filter(Boolean).join('\n');

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, type = 'text', placeholder, value, onChange, rows }) {
  const shared = {
    id,
    name: id,
    required: true,
    placeholder,
    value,
    onChange: (event) => onChange(event.target.value),
    className:
      'mt-2 w-full rounded-xl border border-hairline bg-paper px-4 py-3 text-ink ' +
      'placeholder:text-muted focus-visible:outline focus-visible:outline-2 ' +
      'focus-visible:outline-offset-2 focus-visible:outline-accent',
  };

  return (
    <p>
      <label htmlFor={id} className="font-label text-sm text-ink">
        {label}
      </label>
      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} />}
    </p>
  );
}

export default function ContactPage() {
  const CONTACT = usePageContent(EN_CONTACT, OVERLAYS);
  const ref = useRevealOnScroll();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  /* 'idle' | 'submitting' | 'posted' | 'handoff' | 'error' */
  const [status, setStatus] = useState('idle');
  /* A hidden field no human fills in. A bot that fills everything gets a
     silent no-op rather than a message in the inbox. */
  const [trap, setTrap] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  const emailAddress = useMemo(
    () => CONTACT.methods.find((m) => m.href?.startsWith('mailto:'))?.value,
    [CONTACT.methods],
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    if (trap) return;

    if (!endpoint) {
      /* No endpoint: hand the message to their mail client and say so. This
         is deliberately not a fake success — see the header. */
      window.location.href = mailtoHref({ to: emailAddress, name, email, message });
      setStatus('handoff');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, source: 'contact' }),
      });
      setStatus(response.ok ? 'posted' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const { form } = CONTACT;

  return (
    <section ref={ref} className="section-band">
      <div className="site-shell">
        <p className="section-eyebrow" data-reveal data-reveal-group="contact">
          {CONTACT.eyebrow}
        </p>

        <h1
          className="mt-5 text-[length:var(--text-hero)] leading-[0.95]"
          data-reveal
          data-reveal-group="contact"
        >
          {CONTACT.headline}
        </h1>

        <p
          className="mt-5 max-w-2xl font-serif text-2xl leading-relaxed italic text-muted"
          data-reveal
          data-reveal-group="contact"
        >
          {CONTACT.lead}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* The ways to reach a person that do not depend on this form
              working, or on JavaScript running at all. */}
          <div data-reveal data-reveal-group="contact-methods">
            <p className="text-[length:var(--text-lead)] leading-relaxed text-ink">
              {CONTACT.intro}
            </p>

            <dl className="mt-8 grid gap-px border border-hairline bg-hairline">
              {CONTACT.methods.map((method) => (
                <div key={method.label} className="bg-paper px-6 py-5">
                  <dt className="font-label text-xs tracking-[0.16em] text-muted uppercase">
                    {method.label}
                  </dt>
                  <dd className="mt-2 text-lg text-ink">
                    {method.href ? (
                      <a href={method.href} className="underline underline-offset-2">
                        {method.value}
                      </a>
                    ) : (
                      method.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-label text-base text-ink">{CONTACT.hours}</p>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-5"
            data-reveal
            data-reveal-group="contact-form"
          >
            <Field
              id="name"
              label={form.name.label}
              placeholder={form.name.placeholder}
              value={name}
              onChange={setName}
            />
            <Field
              id="email"
              type="email"
              label={form.email.label}
              placeholder={form.email.placeholder}
              value={email}
              onChange={setEmail}
            />
            <Field
              id="message"
              label={form.message.label}
              placeholder={form.message.placeholder}
              value={message}
              onChange={setMessage}
              rows={6}
            />

            {/* The trap. Off-screen rather than display:none, because some
                bots skip hidden inputs, and never announced or focusable. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(event) => setTrap(event.target.value)}
              className="absolute left-[-9999px] size-px opacity-0"
            />

            <div>
              <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? form.sending : form.submit}
              </button>
            </div>

            {/* One live region, so a screen reader hears the outcome without
                the message moving focus. */}
            <p aria-live="polite" className="text-base leading-relaxed text-muted">
              {status === 'handoff' && (
                <>
                  {form.handoff} <span className="block">{form.handoffFallback}</span>
                </>
              )}
              {status === 'posted' && form.done}
              {status === 'error' && form.error}
            </p>
          </form>
        </div>

        <p
          className="mt-16 max-w-3xl border-t border-hairline pt-8 font-serif text-xl leading-relaxed italic text-muted"
          data-reveal
          data-reveal-group="contact"
        >
          {CONTACT.closing}
        </p>
      </div>
    </section>
  );
}
