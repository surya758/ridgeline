import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Ship,
  Sparkles,
  Truck,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { brandMarks } from '@/components/brand-marks';
import BoatCard from '@/components/boat-card';
import HeroShowcase from '@/components/hero-showcase';
import Testimonials from '@/components/testimonials';
import { getFeaturedBoats } from '@/lib/inventory';

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
  phone: 'tel:+18636380537',
  email: 'mailto:contact@ridgelineboating.com',
} as const;

const services = [
  {
    icon: Wrench,
    title: 'Certified Mechanics',
    desc: 'Certified on-staff mechanics, and a certified dealer for Yamaha, Mercury, and Suzuki.',
  },
  {
    icon: Truck,
    title: 'On-Site Service',
    desc: 'On-site service calls, pick-up and delivery. We come to your dock.',
  },
  {
    icon: Sparkles,
    title: 'Power Pole & Trolling Motors',
    desc: 'Power pole and trolling motor sales and installation.',
  },
  {
    icon: Ship,
    title: 'Storage & Trailers',
    desc: 'Boat storage and trailer availability.',
  },
];

const dockProducts = [
  {
    name: 'Hewitt Roll A Dock',
    desc: 'Configurable, movable docks that adjust to fluctuating water levels.',
    image: '/images/hewitt-products.avif',
    href: LINKS.hewitt,
  },
  {
    name: 'Hi Lifter Boat Lifts',
    desc: 'Direct vertical-rise boat lifts — 1,100 to 10,000 lbs across twelve models.',
    image: '/images/boat-lifts.avif',
    href: LINKS.hewitt,
  },
  {
    name: 'Wave Armor Floating Docks',
    desc: 'Modular floating dock systems for residential and commercial waterfronts.',
    image: '/images/wave-armor.avif',
    href: LINKS.waveArmor,
  },
];

const stats = [
  { value: '20+', label: 'Years on Florida lakes' },
  { value: '100%', label: 'CSI score' },
  { value: '8', label: 'Brands we carry' },
];

export default async function Home() {
  const featuredBoats = await getFeaturedBoats(6);

  return (
    <>
      {/* ========== HERO — FEATURED BOAT SHOWCASE ========== */}
      <HeroShowcase boats={featuredBoats} />

      {/* ========== BRAND PARTNERS — MARQUEE OF LOGOS ========== */}
      <section className='py-14 rl-section-fog'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <p className='rl-eyebrow text-center mb-8'>Brands We Carry</p>
        </div>
        <div className='rl-partners-marquee'>
          <div className='rl-partners-track'>
            {[...brandMarks, ...brandMarks].map(({ name, Component }, i) => (
              <div
                key={`${name}-${i}`}
                aria-label={name}
                className='rl-partner-mark'
              >
                <Component />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED INVENTORY ========== */}
      <section id='new-boats' className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
            <div className='max-w-xl'>
              <p className='rl-eyebrow mb-3'>Featured Inventory</p>
              <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
                Not sure where to start? Look here.
              </h2>
            </div>
            <Link href='/inventory' className='rl-btn-outline'>
              See All Inventory <Plus className='w-3.5 h-3.5' />
            </Link>
          </div>

          <div id='pre-owned' className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {featuredBoats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <Testimonials />

      {/* ========== SELL OR TRADE BANNER ========== */}
      <section className='py-12'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='rl-section-deep p-10 md:p-14 grid md:grid-cols-12 gap-8 items-center'>
            <div className='md:col-span-7'>
              <p className='rl-eyebrow-light mb-3'>Sell Your Boat</p>
              <h2 className='rl-slab text-3xl md:text-4xl text-white'>
                Selling a boat yourself is a headache.
              </h2>
              <p className='mt-4 text-white/80 max-w-xl leading-relaxed'>
                Consign with Ridgeline: a fixed net amount to you, in-house
                reconditioning, and professional listings that reach thousands
                of buyers.
              </p>
              <div className='mt-6 flex flex-wrap gap-3'>
                <Link href='/sell-your-boat' className='rl-btn-light'>
                  Sell Your Boat <Plus className='w-4 h-4' />
                </Link>
                <Link href='/inventory?condition=used' className='rl-btn-light'>
                  Browse Pre-Owned
                </Link>
              </div>
            </div>
            <ul className='md:col-span-5 grid gap-3 text-sm'>
              {[
                'Fixed net amount to seller',
                'In-house reconditioning and detailing',
                'Safe, no-cost storage while in the sales process',
                'Professional listings reaching thousands of buyers',
              ].map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-white/85 border-b border-white/10 pb-3'
                >
                  <CheckCircle2 className='w-5 h-5 text-[var(--rl-sky)] mt-0.5 shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id='about' className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='grid md:grid-cols-12 gap-10 items-center'>
            <div className='md:col-span-6 rl-img-frame relative aspect-[5/4]'>
              <Image
                src='/images/visit-us.avif'
                alt='Ridgeline showroom in Lake Wales, FL'
                fill
                className='object-cover'
              />
            </div>
            <div className='md:col-span-6'>
              <p className='rl-eyebrow mb-3'>Who We Are</p>
              <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
                Buying a boat is easier with people on your side.
              </h2>
              <p className='mt-5 text-base leading-relaxed text-[var(--rl-ink-soft)]'>
                Ridgeline Boating Center is a family-owned and operated marine
                sales and service business in central Florida. We&apos;ve spent
                twenty years putting families on the water — and earned a perfect
                customer-satisfaction index doing it.
              </p>
              <p className='mt-3 text-base leading-relaxed text-[var(--rl-ink-soft)]'>
                From your first boat to a new dock, every customer gets the same
                service-oriented approach.
              </p>

              <dl className='mt-8 grid grid-cols-3 gap-6'>
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className='rl-slab text-3xl text-[var(--rl-deep)]'>{s.value}</dt>
                    <dd className='mt-1 text-xs text-[var(--rl-ink-mute)]'>{s.label}</dd>
                  </div>
                ))}
              </dl>

              <Link href='/about' className='rl-link mt-7'>
                Read More <Plus className='w-3.5 h-3.5' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICE ========== */}
      <section id='service' className='py-20 rl-section-fog'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-2xl mb-12'>
            <p className='rl-eyebrow mb-3'>Marine Service &amp; Repair</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Something not running right?
            </h2>
            <p className='mt-4 text-base text-[var(--rl-ink-soft)] leading-relaxed'>
              Two decades of central Florida marine service — a certified dealer
              for Yamaha, Mercury, and Suzuki.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {services.map(({ icon: Icon, title, desc }) => (
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

      {/* ========== DOCKS & LIFTS ========== */}
      <section id='docks' className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-2xl mb-10'>
            <p className='rl-eyebrow mb-3'>Waterfront</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Getting your boat in and out shouldn&apos;t be a chore.
            </h2>
            <p className='mt-4 text-base text-[var(--rl-ink-soft)] leading-relaxed'>
              Hewitt and Wave Armor systems for waterfronts of every size.
              Certified installation available.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-5'>
            {dockProducts.map((dock) => (
              <article key={dock.name} className='rl-card flex flex-col group'>
                <div className='relative aspect-[4/3] rl-img-frame'>
                  <Image
                    src={dock.image}
                    alt={dock.name}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                </div>
                <div className='p-5 flex flex-col flex-1'>
                  <h3 className='rl-slab text-xl text-[var(--rl-deep)]'>{dock.name}</h3>
                  <p className='mt-2 text-sm text-[var(--rl-ink-soft)] leading-relaxed flex-1'>
                    {dock.desc}
                  </p>
                  <a
                    href={dock.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='rl-link mt-4 self-start'
                  >
                    Learn More <Plus className='w-3.5 h-3.5' />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINANCING ========== */}
      <section id='financing' className='py-14 rl-section-fog'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='bg-white border border-[var(--rl-line)] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
            <div className='max-w-2xl'>
              <p className='rl-eyebrow mb-2'>Financing</p>
              <h3 className='rl-slab text-2xl md:text-3xl text-[var(--rl-deep)]'>
                Worried about the price? Let&apos;s make it work.
              </h3>
              <p className='mt-3 text-[var(--rl-ink-soft)]'>
                Through our partnership with Marathon Xpress, we provide
                solutions catered to your needs.
              </p>
            </div>
            <a
              href={LINKS.financing}
              target='_blank'
              rel='noopener noreferrer'
              className='rl-btn whitespace-nowrap shrink-0'
            >
              Apply Now <Plus className='w-4 h-4' />
            </a>
          </div>
        </div>
      </section>

      {/* ========== VISIT ========== */}
      <section id='visit' className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-2xl mb-10'>
            <p className='rl-eyebrow mb-3'>Visit Us</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Come see us in Lake Wales.
            </h2>
            <p className='mt-4 text-base text-[var(--rl-ink-soft)] leading-relaxed'>
              Stop by the showroom, give us a call, or send a quick email.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {[
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
                href: LINKS.phone,
              },
              {
                icon: Mail,
                label: 'Email',
                primary: 'contact@',
                secondary: 'ridgelineboating.com',
                href: LINKS.email,
              },
              {
                icon: Clock,
                label: 'Hours · Nov – Apr',
                primary: 'Tue – Fri 8:30 – 4:30',
                secondary: 'Sat 9 – 2 · Sun & Mon closed',
              },
            ].map(({ icon: Icon, label, primary, secondary, href, external }) => {
              const inner = (
                <>
                  <Icon className='w-6 h-6 text-[var(--rl-brand)] mb-4' />
                  <p
                    className='text-[11px] uppercase font-bold text-[var(--rl-brand)]'
                    style={{ letterSpacing: '0.18em' }}
                  >
                    {label}
                  </p>
                  <p className='mt-2 rl-slab text-lg text-[var(--rl-deep)]'>{primary}</p>
                  <p className='mt-1 text-sm text-[var(--rl-ink-soft)]'>{secondary}</p>
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
            })}
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
