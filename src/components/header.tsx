'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import AskRusty from './ask-rusty';

type NavChild = { name: string; href: string; external?: boolean };
type NavItem = {
  name: string;
  href: string;
  external?: boolean;
  children?: NavChild[];
};

const BOATTRADER =
  'https://www.boattrader.com/boats/dealer-ridgeline-boating-center-524228';

const navItems: NavItem[] = [
  {
    name: 'Inventory',
    href: '/inventory',
    children: [
      { name: 'All Boats For Sale', href: '/inventory' },
      { name: 'New Boats', href: '/inventory?condition=new' },
      { name: 'Pre-Owned Boats', href: '/inventory?condition=used' },
      { name: 'Sell Your Boat', href: '/sell-your-boat' },
      { name: 'Search on BoatTrader', href: `${BOATTRADER}/`, external: true },
    ],
  },
  { name: 'Docks & Lifts', href: '/docks-lifts' },
  { name: 'Service & Parts', href: '/service' },
  { name: 'Financing', href: '/financing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className='sticky top-0 z-50 bg-[var(--rl-deep)] border-b border-white/10'>
      <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
        <div className='flex items-center justify-between h-24'>
          {/* Logo (left) */}
          <Link href='/' className='inline-flex items-center gap-3 shrink-0'>
            <span className='flex items-center justify-center w-12 h-12 overflow-hidden'>
              <Image
                src='/images/ridgeline-logo.avif'
                alt='Ridgeline Boating Center'
                width={48}
                height={48}
                priority
                className='w-full h-full object-contain'
              />
            </span>
            <span className='flex flex-col leading-tight'>
              <span className='rl-slab text-2xl text-white'>Ridgeline</span>
              <span
                className='text-[10px] uppercase font-bold text-[var(--rl-sky)]'
                style={{ letterSpacing: '0.22em' }}
              >
                Boating Center
              </span>
            </span>
          </Link>

          {/* Nav (right) */}
          <nav className='hidden lg:flex items-stretch'>
            {navItems.map((item, i) => (
              <div
                key={item.name}
                className='relative flex items-stretch'
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                <Link
                  href={item.href}
                  className='inline-flex items-center gap-1 px-5 text-sm text-white/85 hover:text-white transition-colors relative'
                >
                  {item.name}
                  {item.children && <ChevronDown className='w-3.5 h-3.5' />}
                  <span
                    className={`absolute left-5 right-5 bottom-0 h-[2px] bg-[var(--rl-sky)] transition-opacity ${
                      hoverIdx === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
                {item.children && hoverIdx === i && (
                  <div className='absolute left-0 top-full z-50 pt-2'>
                    <div className='min-w-[260px] bg-[var(--rl-deep)] border border-white/10 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] py-3'>
                      {item.children.map((child) =>
                        child.external ? (
                          <a
                            key={child.name}
                            href={child.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='block px-6 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-[var(--rl-sky)] transition-colors'
                          >
                            {child.name}
                          </a>
                        ) : (
                          <Link
                            key={child.name}
                            href={child.href}
                            className='block px-6 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-[var(--rl-sky)] transition-colors'
                          >
                            {child.name}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right-side: Ask Rusty (top-right CTA) */}
          <div className='hidden lg:flex items-center'>
            <AskRusty />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className='lg:hidden p-2 text-white'
            aria-label='Toggle menu'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className='lg:hidden bg-[var(--rl-deep)] border-t border-white/10 max-h-[calc(100vh-6rem)] overflow-y-auto'>
          <div className='max-w-[1400px] mx-auto px-6 py-4 flex flex-col'>
            {navItems.map((item) => (
              <div key={item.name} className='border-b border-white/10'>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileOpen(mobileOpen === item.name ? null : item.name)
                      }
                      className='w-full flex items-center justify-between py-4 text-sm text-white'
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileOpen === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileOpen === item.name && (
                      <div className='pb-3 pl-3'>
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.name}
                              href={child.href}
                              target='_blank'
                              rel='noopener noreferrer'
                              onClick={() => setOpen(false)}
                              className='block py-2 text-sm text-white/80'
                            >
                              {child.name}
                            </a>
                          ) : (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className='block py-2 text-sm text-white/80'
                            >
                              {child.name}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className='block py-4 text-sm text-white'
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
