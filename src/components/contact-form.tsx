'use client';

import { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.phoenixrisingai.com';

const fieldClass =
  'w-full border border-[var(--rl-line)] bg-white px-4 py-3 text-sm text-[var(--rl-ink)] placeholder:text-[var(--rl-ink-mute)] focus:border-[var(--rl-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--rl-brand)] transition-colors';

const labelClass =
  'block text-[11px] uppercase font-bold text-[var(--rl-deep)] mb-2 tracking-[0.16em]';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: (data.get('name') as string)?.trim(),
      phone: (data.get('phone') as string)?.trim() || undefined,
      email: (data.get('email') as string)?.trim(),
      subject: (data.get('subject') as string)?.trim(),
      message: (data.get('message') as string)?.trim() || undefined,
      website: (data.get('website') as string) || undefined, // honeypot
    };

    try {
      const res = await fetch(`${API_URL}/api/v1/dealership-website-widget/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again, or call us at (863) 638-0537."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className='rl-card bg-white p-10 flex flex-col items-center text-center'>
        <CheckCircle2 className='w-12 h-12 text-[var(--rl-brand)]' />
        <h3 className='rl-slab text-2xl text-[var(--rl-deep)] mt-4'>
          Thanks for submitting!
        </h3>
        <p className='mt-2 text-sm text-[var(--rl-ink-soft)] max-w-sm'>
          We&apos;ve got your message and will be in touch shortly — usually the
          same day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rl-card bg-white p-8 md:p-10 grid gap-5'
    >
      <div className='grid sm:grid-cols-2 gap-5'>
        <div>
          <label htmlFor='name' className={labelClass}>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            required
            placeholder='Your name'
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor='phone' className={labelClass}>
            Phone
          </label>
          <input
            id='phone'
            name='phone'
            type='tel'
            placeholder='(863) 000-0000'
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor='email' className={labelClass}>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          placeholder='you@example.com'
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor='subject' className={labelClass}>
          Subject
        </label>
        <input
          id='subject'
          name='subject'
          type='text'
          required
          placeholder='How can we help?'
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor='message' className={labelClass}>
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={5}
          placeholder='Tell us what you’re looking for…'
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from real users; bots that fill it are dropped server-side. */}
      <div className='hidden' aria-hidden='true'>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          name='website'
          type='text'
          tabIndex={-1}
          autoComplete='off'
        />
      </div>

      {error && (
        <p className='text-sm text-red-600' role='alert'>
          {error}
        </p>
      )}

      <button
        type='submit'
        disabled={submitting}
        className='rl-btn-solid self-start disabled:opacity-60 disabled:cursor-not-allowed'
      >
        {submitting ? 'Sending…' : 'Submit'} <Plus className='w-4 h-4' />
      </button>
    </form>
  );
}
