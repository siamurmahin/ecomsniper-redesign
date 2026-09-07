import { useState } from 'react';
import Icon from '../ui/Icon';

/**
 * One labelled input, with its hint and its error.
 *
 * Both pages use it, so a field behaves the same whichever form it is in —
 * which is the part of an auth flow people notice when it is wrong.
 *
 * **The error is wired, not just printed.** `aria-invalid` marks the field and
 * `aria-describedby` points at the message, so a screen reader hears what is
 * wrong when it lands on the input rather than finding red text three lines
 * below it. The message is rendered in the same place whether or not there is
 * an error — `empty:hidden` collapses it — so a form does not jump as messages
 * appear.
 *
 * **`noValidate` on the form, validation here.** The browser's own bubbles
 * cannot be styled, disappear on the next keypress, and only ever show one at
 * a time. This validates on submit and then re-validates as the field is
 * edited, which is the pattern people expect: no errors while you are still
 * typing your first answer, corrections acknowledged immediately after.
 *
 * `autoComplete` is passed in rather than guessed: `current-password` and
 * `new-password` mean different things to a password manager, and getting them
 * the wrong way round is how a manager offers to save a login it should be
 * filling.
 *
 * **A password field gets a reveal.** Typing a long password blind is the
 * reason people pick short ones, and the reveal is what makes the eight-
 * character minimum on the registration page reasonable to ask for. Details
 * that matter:
 *
 * - It is a real `<button type="button">`, so it is reachable by keyboard and
 *   cannot submit the form by being pressed. A `<span>` with an onClick is the
 *   usual version of this control and it is invisible to a keyboard.
 * - The state is per field, so revealing one password never reveals another.
 * - `aria-pressed` carries the on/off state and the label says what pressing
 *   it will do next, which is what a screen reader needs to announce.
 * - It never renders on a field that is not a password, and the input keeps
 *   its `autoComplete` when the type flips, so a password manager does not
 *   lose track of the field mid-edit.
 */
export default function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
  hint,
  error,
  required = true,
  reveal,
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isPassword = type === 'password';
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && isRevealed ? 'text' : type}
          required={required}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={`mt-2 w-full rounded-xl border bg-white/80 py-3.5 pl-4 text-base text-ink transition-colors placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isPassword ? 'pr-12' : 'pr-4'
          } ${
            error
              ? 'border-signal-red focus-visible:border-signal-red'
              : 'border-hairline hover:border-ink/20 focus-visible:border-accent'
          }`}
        />

        {isPassword && reveal ? (
          <button
            type="button"
            onClick={() => setIsRevealed((shown) => !shown)}
            aria-pressed={isRevealed}
            aria-controls={id}
            aria-label={isRevealed ? reveal.hide : reveal.show}
            title={isRevealed ? reveal.hide : reveal.show}
            className="absolute top-2 right-1 grid h-[calc(100%-0.5rem)] w-11 place-items-center rounded-r-xl text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name={isRevealed ? 'eyeOff' : 'eye'} className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {hint ? (
        <p id={hintId} className="mt-2 text-[0.8rem] leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}

      <p
        id={errorId}
        className="mt-2 text-[0.8rem] leading-relaxed font-semibold text-signal-red-deep empty:hidden"
      >
        {error}
      </p>
    </div>
  );
}
