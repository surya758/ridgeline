import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeDollarSign,
  ClipboardCheck,
  Megaphone,
  Plus,
  Sparkles,
  Warehouse,
  Wallet,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Sell Your Boat — Ridgeline Boating Center',
  description:
    'Ridgeline Boating Center is the premier choice to consign your boat for sale: fixed net amount to seller, in-house reconditioning, no-cost storage, and professional listings.',
};

const BOATTRADER_USED = '/inventory?condition=used';

// Production copy: the seven reasons, verbatim.
const reasons = [
  {
    icon: BadgeDollarSign,
    title: 'Fixed Net Amount',
    desc: 'Fixed net amount to seller.',
  },
  {
    icon: ClipboardCheck,
    title: 'Vetted Quality',
    desc: 'Inspected, lake tested, quality inventory that we vet for you.',
  },
  {
    icon: Wallet,
    title: 'Financing Resources',
    desc: 'Financing resources available.',
  },
  {
    icon: Sparkles,
    title: 'In-House Reconditioning',
    desc: 'In-house reconditioning and detailing, getting you most $$$.',
  },
  {
    icon: Warehouse,
    title: 'No-Cost Storage',
    desc: 'Safe, no cost storage while your boat is in the sales process.',
  },
  {
    icon: Megaphone,
    title: 'Professional Listings',
    desc: 'Professional listings reaching thousands of buyers in market.',
  },
];

export default function SellYourBoatPage() {
  return (
    <>
      <PageHero
        title='Sell your boat, hassle-free.'
        crumbs={[{ name: 'Sell Your Boat', href: '/sell-your-boat' }]}
      />

      {/* ========== REASONS (production copy) ========== */}
      <section className='pt-12 pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-3xl mb-12'>
            <p className='rl-eyebrow mb-3'>Why Consign With Us</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Ridgeline Boating Center is the premier choice to consign your
              boat for sale. Here&apos;s why&hellip;
            </h2>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {reasons.map(({ icon: Icon, title, desc }) => (
              <article key={title} className='rl-card p-6 flex flex-col bg-white'>
                <Icon className='w-7 h-7 text-[var(--rl-brand)] mb-4' />
                <h3 className='rl-slab text-lg text-[var(--rl-deep)]'>{title}</h3>
                <p className='mt-2 text-sm text-[var(--rl-ink-soft)] leading-relaxed'>
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STANDARDS (production copy: reason #7) ========== */}
      <section className='py-20 rl-section-fog'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='rl-card bg-white p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start'>
            <ShieldCheck className='w-12 h-12 text-[var(--rl-brand)] shrink-0' />
            <div>
              <p className='rl-eyebrow mb-3'>Our Standards</p>
              <h2 className='rl-slab text-2xl md:text-3xl text-[var(--rl-deep)]'>
                Stringent criteria, every time.
              </h2>
              <p className='mt-4 text-base text-[var(--rl-ink-soft)] leading-relaxed max-w-2xl'>
                Stringent criteria for condition, mechanical integrity, and year
                of boat (
                <strong className='text-[var(--rl-deep)]'>
                  2005 newer models
                </strong>
                ).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='rl-section-deep p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
            <div className='max-w-2xl'>
              <h2 className='rl-slab text-3xl md:text-4xl text-white'>
                Ready to sell your boat?
              </h2>
              <p className='mt-4 text-white/80 leading-relaxed'>
                Reach out to start a consignment conversation, or browse the
                pre-owned boats we&apos;re selling for owners.
              </p>
            </div>
            <div className='flex flex-wrap gap-3 shrink-0'>
              <Link href='/contact' className='rl-btn-light'>
                Contact Us <Plus className='w-4 h-4' />
              </Link>
              <Link href={BOATTRADER_USED} className='rl-btn-light'>
                Browse Pre-Owned
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
