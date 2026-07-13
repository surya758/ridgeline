import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Plus } from 'lucide-react';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'About Us — Ridgeline Boating Center',
  description:
    'Ridgeline Boating Center is a family owned and operated marine sales and service company located in central Florida.',
};

// Production copy: "certified dealer for Yamaha and Mercury motors, Bennington pontoon boats."
const certifications = [
  'Yamaha Motors',
  'Mercury Motors',
  'Bennington Pontoon Boats',
];

// Production copy: "a wide range of support including..."
const support = [
  'On-site service calls',
  'Trailer availability',
  'Pick-up and delivery',
  'Boat storage',
  'Power pole sales and installation',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title='Your local marine family.'
        crumbs={[{ name: 'About Us', href: '/about' }]}
      />

      {/* ========== STORY (production copy) ========== */}
      <section className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='grid md:grid-cols-12 gap-10 items-center'>
            <div className='md:col-span-6 rl-img-frame relative aspect-[5/4]'>
              <Image
                src='/images/visit-us.avif'
                alt='Ridgeline Boating Center in central Florida'
                fill
                className='object-cover'
              />
            </div>
            <div className='md:col-span-6'>
              <p className='rl-eyebrow mb-3'>About Us</p>
              <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
                Family owned and operated.
              </h2>
              <p className='mt-5 text-base leading-relaxed text-[var(--rl-ink-soft)]'>
                Ridgeline Boating Center is a family owned and operated marine
                sales and service company located in central Florida.
              </p>
              <p className='mt-3 text-base leading-relaxed text-[var(--rl-ink-soft)]'>
                We understand the needs and expectations of our customers. Our
                service-oriented, one-on-one approach has helped build an
                excellent reputation and enabled us to maintain high customer
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CERTIFIED DEALER / PRODUCT LINES (production copy) ========== */}
      <section className='py-20 rl-section-fog'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-3xl'>
            <p className='rl-eyebrow mb-3'>A Certified Dealer</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Everything you need, in one place.
            </h2>
            <p className='mt-5 text-base leading-relaxed text-[var(--rl-ink-soft)]'>
              Ridgeline Boating is a certified dealer for Yamaha and Mercury
              motors, Bennington pontoon boats. Our product lines also include
              Hewitt boat lifts, dock systems, electronics, and a full
              complement of marine supplies — in addition to certified on-staff
              mechanics.
            </p>

            <div className='mt-8 flex flex-wrap gap-2.5'>
              {certifications.map((c) => (
                <span
                  key={c}
                  className='inline-flex items-center gap-2 border border-[var(--rl-line)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--rl-deep)]'
                >
                  <Award className='w-4 h-4 text-[var(--rl-brand)]' />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SUPPORT SERVICES (production copy) ========== */}
      <section className='py-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='rl-section-deep p-10 md:p-14 grid md:grid-cols-12 gap-8 items-center'>
            <div className='md:col-span-6'>
              <p className='rl-eyebrow-light mb-3'>Support Services</p>
              <h2 className='rl-slab text-3xl md:text-4xl text-white'>
                A wide range of support.
              </h2>
              <p className='mt-4 text-white/80 max-w-xl leading-relaxed'>
                Ridgeline Boating Center offers a wide range of support to keep
                you on the water.
              </p>
              <Link href='/contact' className='rl-btn-light mt-7'>
                Get in Touch <Plus className='w-4 h-4' />
              </Link>
            </div>
            <ul className='md:col-span-6 grid sm:grid-cols-2 gap-3 text-sm'>
              {support.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-white/85 border-b border-white/10 pb-3'
                >
                  <Plus className='w-4 h-4 text-[var(--rl-sky)] mt-0.5 shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
