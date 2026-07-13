'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

const LINKS = {
  boatsAll:
    'https://www.boattrader.com/boats/dealer-ridgeline-boating-center-524228/',
  boatsNew:
    'https://www.boattrader.com/boats/dealer-ridgeline-boating-center-524228/condition-new/',
  boatsUsed:
    'https://www.boattrader.com/boats/dealer-ridgeline-boating-center-524228/condition-used/',
  hewitt: 'https://www.hewittrad.com/',
  waveArmor: 'https://www.wavearmor.com/',
  financing: 'https://marathonxpress.com/financing/',
  facebook: 'https://www.facebook.com/RidgelineBoating',
  phone: 'tel:+18636380537',
  email: 'mailto:contact@ridgelineboating.com',
} as const;

type FooterLink = { name: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Inventory',
    links: [
      { name: 'All Boats', href: '/inventory' },
      { name: 'New Boats', href: '/inventory?condition=new' },
      { name: 'Pre-Owned Boats', href: '/inventory?condition=used' },
      { name: 'On BoatTrader', href: LINKS.boatsAll, external: true },
    ],
  },
  {
    title: 'Service',
    links: [
      { name: 'Service & Parts', href: '/service' },
      { name: 'Docks & Lifts', href: '/docks-lifts' },
      { name: 'Financing', href: '/financing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Sell Your Boat', href: '/sell-your-boat' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const Social = ({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: string;
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    className='inline-flex items-center justify-center w-9 h-9 border border-white/25 text-white/80 hover:bg-[var(--rl-brand)] hover:border-[var(--rl-brand)] hover:text-white transition-colors'
  >
    <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4'>
      <path d={path} />
    </svg>
  </a>
);

export default function Footer() {
  return (
    <footer className='rl-section-abyss'>
      <div className='max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pb-8'>
        <div className='grid lg:grid-cols-12 gap-10 pb-10 border-b border-white/12'>
          {/* Brand + contact */}
          <div className='lg:col-span-5'>
            <Link href='/' className='inline-flex items-center gap-3 mb-5'>
              <span className='flex items-center justify-center w-12 h-12 bg-white overflow-hidden'>
                <Image
                  src='/images/ridgeline-logo.avif'
                  alt='Ridgeline Boating Center'
                  width={48}
                  height={48}
                  className='w-full h-full object-contain p-0.5'
                />
              </span>
              <span className='flex flex-col leading-tight'>
                <span className='rl-slab text-2xl text-white'>Ridgeline</span>
                <span
                  className='text-[10px] text-[var(--rl-sky)] uppercase font-bold'
                  style={{ letterSpacing: '0.22em' }}
                >
                  Boating Center
                </span>
              </span>
            </Link>
            <p className='text-sm text-white/75 leading-relaxed max-w-md'>
              Family owned and operated marine sales and service in central
              Florida. New &amp; pre-owned boats, motors, docks, and certified
              service.
            </p>

            <ul className='mt-6 space-y-2 text-sm'>
              <li className='flex items-start gap-3'>
                <MapPin className='w-4 h-4 mt-0.5 text-[var(--rl-sky)] shrink-0' />
                <a
                  href='https://www.google.com/maps/dir/?api=1&destination=15520+US-27+Lake+Wales+FL'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/80 hover:text-white'
                >
                  15520 U.S. 27, Lake Wales, FL
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='w-4 h-4 text-[var(--rl-sky)] shrink-0' />
                <a href={LINKS.phone} className='text-white/80 hover:text-white'>
                  (863) 638-0537
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='w-4 h-4 text-[var(--rl-sky)] shrink-0' />
                <a
                  href={LINKS.email}
                  className='text-white/80 hover:text-white break-all'
                >
                  contact@ridgelineboating.com
                </a>
              </li>
            </ul>

            <div className='mt-6 flex items-center gap-2'>
              <Social
                href={LINKS.facebook}
                label='Facebook'
                path='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z'
              />
            </div>
          </div>

          {/* Hours */}
          <div className='lg:col-span-3'>
            <p
              className='text-[11px] text-[var(--rl-sky)] uppercase font-bold mb-4'
              style={{ letterSpacing: '0.22em' }}
            >
              Hours · Nov – Apr
            </p>
            <dl className='space-y-2 text-sm text-white/80'>
              <div className='flex justify-between'>
                <dt>Tues – Fri</dt>
                <dd>8:30 – 4:30</dd>
              </div>
              <div className='flex justify-between'>
                <dt>Saturday</dt>
                <dd>9:00 – 2:00</dd>
              </div>
              <div className='flex justify-between text-white/45'>
                <dt>Sun &amp; Mon</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>

          {/* Link cols */}
          <div className='lg:col-span-4 grid grid-cols-3 gap-6'>
            {columns.map((col) => (
              <div key={col.title}>
                <p
                  className='text-[11px] text-[var(--rl-sky)] uppercase font-bold mb-4'
                  style={{ letterSpacing: '0.22em' }}
                >
                  {col.title}
                </p>
                <ul className='space-y-2'>
                  {col.links.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm text-white/80 hover:text-white'
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className='text-sm text-white/80 hover:text-white'
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50'>
          <p>© {new Date().getFullYear()} Ridgeline Boating Center · All rights reserved</p>
          <p className='flex items-center gap-5'>
            <a href='#' className='hover:text-white'>Privacy</a>
            <a href='#' className='hover:text-white'>Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
