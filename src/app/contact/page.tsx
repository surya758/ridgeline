import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/page-hero';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us — Ridgeline Boating Center',
  description:
    'Float on over. Visit Ridgeline Boating Center in Lake Wales, FL, call (863) 638-0537, or send us a message — we answer the phone and call back the same day.',
};

const details = [
  {
    icon: MapPin,
    label: 'Address',
    primary: '15520 U.S. 27',
    secondary: 'Lake Wales, FL',
    href: 'https://www.google.com/maps/dir/?api=1&destination=15520+US-27+Lake+Wales+FL',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    primary: '(863) 638-0537',
    secondary: 'Give us a call',
    href: 'tel:+18636380537',
  },
  {
    icon: Mail,
    label: 'Email',
    primary: 'contact@',
    secondary: 'ridgelineboating.com',
    href: 'mailto:contact@ridgelineboating.com',
  },
  {
    icon: Clock,
    label: 'Hours · Nov – Apr',
    primary: 'Tue – Fri 8:30 – 4:30',
    secondary: 'Sat 9 – 2 · Sun & Mon closed',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's get you on the water."
        crumbs={[{ name: 'Contact', href: '/contact' }]}
      />

      {/* ========== DETAILS + FORM ========== */}
      <section className='pt-12 pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='grid lg:grid-cols-12 gap-12'>
            {/* Details */}
            <div className='lg:col-span-5'>
              <p className='rl-eyebrow mb-3'>Get in Touch</p>
              <h2 className='rl-slab text-3xl text-[var(--rl-deep)]'>
                We&apos;d love to hear from you.
              </h2>
              <p className='mt-4 text-[var(--rl-ink-soft)] leading-relaxed'>
                Questions about a boat, a dock build, or service? Reach out
                however works best for you.
              </p>

              <div className='mt-8 grid sm:grid-cols-2 gap-4'>
                {details.map(
                  ({ icon: Icon, label, primary, secondary, href, external }) => {
                    const inner = (
                      <>
                        <Icon className='w-6 h-6 text-[var(--rl-brand)] mb-4' />
                        <p
                          className='text-[11px] uppercase font-bold text-[var(--rl-brand)]'
                          style={{ letterSpacing: '0.18em' }}
                        >
                          {label}
                        </p>
                        <p className='mt-2 rl-slab text-lg text-[var(--rl-deep)]'>
                          {primary}
                        </p>
                        <p className='mt-1 text-sm text-[var(--rl-ink-soft)]'>
                          {secondary}
                        </p>
                      </>
                    );
                    return href ? (
                      <a
                        key={label}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className='rl-card p-6 block bg-white'
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={label} className='rl-card p-6 bg-white'>
                        {inner}
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Form */}
            <div className='lg:col-span-7'>
              <p className='rl-eyebrow mb-3'>Send a Message</p>
              <h2 className='rl-slab text-3xl text-[var(--rl-deep)] mb-6'>
                Drop us a line.
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ========== MAP ========== */}
      <section className='relative bg-[var(--rl-abyss)]'>
        <div className='relative h-[440px] md:h-[500px] w-full overflow-hidden'>
          <iframe
            title='Ridgeline Boating Center · 15520 U.S. 27, Lake Wales, FL'
            src='https://www.google.com/maps?q=15520+US-27+Lake+Wales+FL&output=embed'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            allowFullScreen
            className='absolute inset-0 w-full h-full grayscale-[0.1]'
          />
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--rl-abyss)]' />
        </div>
      </section>
    </>
  );
}
