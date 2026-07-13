import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpDown, Mail, Plus } from 'lucide-react';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Docks & Lifts — Ridgeline Boating Center',
  description:
    'Ridgeline modular docks, lifts & more — Hewitt boat lifts and Roll-A-Dock, Wave Armor floating docks, and Sea-Legs onboard lifts. Certified installation available.',
};

const LINKS = {
  hewitt: 'https://www.hewittrad.com/',
  waveArmor: 'https://www.wavearmor.com/',
  specialist: 'mailto:matt@ridgelineboating.com',
};

// Product cards — production copy only.
const products = [
  {
    name: 'Hewitt Modular Docks and Boat Lifts',
    desc: 'An economical, direct vertical rise lift ideally suited for deeper water applications or sites where water levels may fluctuate. Pair the Hi-Lifter with the Roll-A-Dock for easy access to your water toys.',
    image: '/images/boat-lifts.avif',
    href: LINKS.hewitt,
    cta: 'Learn More About Hewitt Products',
  },
  {
    name: 'Wave Armor',
    desc: 'Floating docks, ports, rafts, and accessories.',
    image: '/images/wave-armor.avif',
    href: LINKS.waveArmor,
    cta: 'Learn More About Wave Armor',
  },
  {
    name: 'Onboard Lifts by Sea-Legs & Hewitt',
    desc: 'A simpler life. Raise your Sea-Legs™ and go, lower your Sea-Legs and park.',
    image: '/images/hewitt-products.avif',
    href: LINKS.hewitt,
    cta: 'Learn More About What Sea-Legs Offers',
  },
];

export default function DocksLiftsPage() {
  return (
    <>
      <PageHero
        title='Keep your boat high and dry.'
        crumbs={[{ name: 'Docks & Lifts', href: '/docks-lifts' }]}
      />

      {/* ========== PRODUCTS ========== */}
      <section className='pt-12 pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-2xl mb-10'>
            <p className='rl-eyebrow mb-3'>Certified Installation Available</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Find the right setup for your waterfront.
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-5'>
            {products.map((p) => (
              <article key={p.name} className='rl-card flex flex-col group'>
                <div className='relative aspect-[4/3] rl-img-frame'>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                </div>
                <div className='p-5 flex flex-col flex-1'>
                  <h3 className='rl-slab text-xl text-[var(--rl-deep)]'>
                    {p.name}
                  </h3>
                  <p className='mt-2 text-sm text-[var(--rl-ink-soft)] leading-relaxed flex-1'>
                    {p.desc}
                  </p>
                  <a
                    href={p.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='rl-link mt-4 self-start'
                  >
                    {p.cta} <Plus className='w-3.5 h-3.5' />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HEWITT HI-LIFT DETAIL (production copy) ========== */}
      <section className='py-20 rl-section-fog'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='grid md:grid-cols-12 gap-10 items-center'>
            <div className='md:col-span-6'>
              <p className='rl-eyebrow mb-3'>Hewitt Modular Docks and Boat Lifts</p>
              <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
                Straight Up, Straight Down
              </h2>
              <p className='mt-2 rl-slab-light text-lg text-[var(--rl-brand)]'>
                A lift for deep or changing water levels.
              </p>
              <p className='mt-5 text-base leading-relaxed text-[var(--rl-ink-soft)]'>
                An economical, direct vertical rise lift ideally suited for
                deeper water applications or sites where water levels may
                fluctuate.
              </p>
              <ul className='mt-7 grid gap-3 text-sm'>
                {[
                  'Side bars provide easier boat access and greater stability',
                  'Capacities from 1,100 to 10,000 lbs across twelve models',
                  'Pair the Hi-Lifter with the Roll-A-Dock for the versatility and ability to move with fluctuating water levels',
                ].map((f) => (
                  <li
                    key={f}
                    className='flex items-start gap-3 text-[var(--rl-ink-soft)] border-b border-[var(--rl-line)] pb-3'
                  >
                    <ArrowUpDown className='w-4 h-4 text-[var(--rl-brand)] mt-0.5 shrink-0' />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={LINKS.hewitt}
                target='_blank'
                rel='noopener noreferrer'
                className='rl-btn mt-8'
              >
                Learn More About Hewitt Products <Plus className='w-4 h-4' />
              </a>
            </div>
            <div className='md:col-span-6 rl-img-frame relative aspect-[5/4]'>
              <Image
                src='/images/boat-lifts.avif'
                alt='Hewitt Hi-Lift boat lift'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== HEWITT LEGACY + SPECIALIST CTA (production copy) ========== */}
      <section className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='rl-section-deep p-10 md:p-14 grid md:grid-cols-12 gap-8 items-center'>
            <div className='md:col-span-7'>
              <p className='rl-eyebrow-light mb-3'>
                Hewitt Docks, Boat Lifts &amp; Pontoon Legs
              </p>
              <h2 className='rl-slab text-3xl md:text-4xl text-white'>
                Over 50 years of trusted manufacturing.
              </h2>
              <p className='mt-4 text-white/80 max-w-xl leading-relaxed'>
                A 50+ year reputation for quality, manufactured in Minnesota for
                U.S. and Canadian markets — and installed right here by
                Ridgeline.
              </p>
            </div>
            <div className='md:col-span-5'>
              <div className='border border-white/15 p-7'>
                <p className='rl-eyebrow-light mb-2'>Certified Installation Available</p>
                <h3 className='rl-slab text-2xl text-white'>
                  Contact Ridgeline Dock &amp; Lift Specialist.
                </h3>
                <a href={LINKS.specialist} className='rl-btn-light mt-6 w-full'>
                  <Mail className='w-4 h-4' /> matt@ridgelineboating.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
