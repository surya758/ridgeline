import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Plus } from 'lucide-react';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Financing — Ridgeline Boating Center',
  description:
    'Stress free buying experience. Ridgeline Boating Center, partnering with Marathon Xpress, provides personalized financing solutions catered to your needs.',
};

const FINANCING = 'https://marathonxpress.com/financing/';

export default function FinancingPage() {
  return (
    <>
      <PageHero
        title="Worried about the price? Let's make it work."
        crumbs={[{ name: 'Financing', href: '/financing' }]}
      />

      {/* ========== INTRO (production copy) ========== */}
      <section className='pt-12 pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-3xl'>
            <p className='rl-eyebrow mb-3'>Personalized Financing Options</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              We&apos;ll guide you every step of the way.
            </h2>
            <p className='mt-5 text-lg text-[var(--rl-ink-soft)] leading-relaxed'>
              Interested in learning more about our financing options? Ridgeline
              Boating Center partnering with Marathon Xpress provides solutions
              catered to your needs, while guiding you along every step of the
              purchasing process.
            </p>
            <p className='mt-3 text-lg text-[var(--rl-ink-soft)] leading-relaxed'>
              Consult with one of our team members about your personalized
              financial options, and make buying the boat of your dreams come
              true.
            </p>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className='pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='rl-section-deep p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
            <div className='max-w-2xl'>
              <BadgeCheck className='w-8 h-8 text-[var(--rl-sky)] mb-4' />
              <h2 className='rl-slab text-3xl md:text-4xl text-white'>
                Ready to apply?
              </h2>
              <p className='mt-4 text-white/80 leading-relaxed'>
                Start your application with Marathon Xpress, or reach out and
                we&apos;ll help you find the right fit.
              </p>
            </div>
            <div className='flex flex-wrap gap-3 shrink-0'>
              <a
                href={FINANCING}
                target='_blank'
                rel='noopener noreferrer'
                className='rl-btn-light'
              >
                Apply Now <Plus className='w-4 h-4' />
              </a>
              <Link href='/contact' className='rl-btn-light'>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
