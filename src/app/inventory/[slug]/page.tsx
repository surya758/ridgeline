import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Anchor,
  Calendar,
  CheckCircle2,
  Gauge,
  MapPin,
  Plus,
  Ruler,
  Ship,
} from 'lucide-react';
import PageHero from '@/components/page-hero';
import BoatCard from '@/components/boat-card';
import BoatGallery from '@/components/boat-gallery';
import {
  formatPrice,
  getAllSlugs,
  getBoatBySlug,
  getSimilarBoats,
} from '@/lib/inventory';

const SMS = 'sms:+15615566310';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const boat = await getBoatBySlug(params.slug);
  if (!boat) return { title: 'Boat Not Found — Ridgeline Boating Center' };

  const title = `${boat.year} ${boat.brand} ${boat.model} — Ridgeline Boating Center`;
  const ogImage = boat.images[0]?.src ?? '/images/hero.avif';
  return {
    title,
    description: boat.shortBlurb,
    openGraph: { title, description: boat.shortBlurb, images: [ogImage] },
  };
}

export default async function BoatDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const boat = await getBoatBySlug(params.slug);
  if (!boat) notFound();

  const similar = await getSimilarBoats(boat);

  const specs = [
    { icon: Calendar, label: 'Year', value: String(boat.year) },
    { icon: Ship, label: 'Type', value: boat.type },
    { icon: Ruler, label: 'Length', value: boat.lengthFt !== null ? `${boat.lengthFt} ft` : '—' },
    { icon: Anchor, label: 'Engine', value: boat.engine ?? '—' },
    {
      icon: Gauge,
      label: 'Hours',
      value: boat.hours !== null ? `${boat.hours} hrs` : '—',
    },
    { icon: MapPin, label: 'Location', value: boat.location },
  ];

  return (
    <>
      <PageHero
        title={`${boat.year} ${boat.brand} ${boat.model}`}
        image={boat.images[0]?.src ?? '/images/hero.avif'}
        crumbs={[
          { name: 'Inventory', href: '/inventory' },
          { name: boat.model, href: `/inventory/${boat.slug}` },
        ]}
      />

      <section className='pt-10 pb-16 md:pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='grid lg:grid-cols-12 gap-10'>
            {/* Gallery */}
            <div className='lg:col-span-7'>
              <BoatGallery images={boat.images} />
            </div>

            {/* Summary + CTAs */}
            <div className='lg:col-span-5'>
              <span
                className={`rl-badge ${
                  boat.condition === 'new' ? 'rl-badge-new' : 'rl-badge-used'
                }`}
              >
                {boat.condition === 'new' ? 'New' : 'Pre-Owned'}
              </span>
              <h2 className='rl-slab text-3xl text-[var(--rl-deep)] mt-3'>
                {boat.year} {boat.brand} {boat.model}
              </h2>
              <p className='rl-slab text-2xl text-[var(--rl-brand)] mt-3'>
                {formatPrice(boat.price)}
              </p>
              <p className='mt-4 text-base text-[var(--rl-ink-soft)] leading-relaxed'>
                {boat.shortBlurb}
              </p>

              <dl className='mt-7 grid grid-cols-2 gap-px bg-[var(--rl-line)] border border-[var(--rl-line)]'>
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className='bg-white p-4'>
                    <dt className='flex items-center gap-2 text-[11px] uppercase font-bold text-[var(--rl-ink-mute)] tracking-[0.14em]'>
                      <Icon className='w-3.5 h-3.5 text-[var(--rl-brand)]' />
                      {label}
                    </dt>
                    <dd className='mt-1 rl-slab text-base text-[var(--rl-deep)]'>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className='mt-7 flex flex-col gap-3'>
                <a href={SMS} className='rl-btn-solid w-full'>
                  Ask Rusty About This Boat <Plus className='w-4 h-4' />
                </a>
                <Link href='/contact' className='rl-btn w-full'>
                  Contact a Salesperson
                </Link>
                {boat.boatTraderUrl && (
                  <a
                    href={boat.boatTraderUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='rl-link self-center mt-1'
                  >
                    View on BoatTrader <Plus className='w-3.5 h-3.5' />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Description + features */}
          <div className='mt-16 grid lg:grid-cols-12 gap-10'>
            <div className='lg:col-span-7'>
              <p className='rl-eyebrow mb-3'>Overview</p>
              <h3 className='rl-slab text-2xl md:text-3xl text-[var(--rl-deep)]'>
                About this boat.
              </h3>
              <p className='mt-5 text-base text-[var(--rl-ink-soft)] leading-relaxed'>
                {boat.description}
              </p>
            </div>
            <div className='lg:col-span-5'>
              <p className='rl-eyebrow mb-3'>Highlights</p>
              <ul className='grid gap-3 text-sm'>
                {boat.features.map((f) => (
                  <li
                    key={f}
                    className='flex items-start gap-3 text-[var(--rl-ink-soft)] border-b border-[var(--rl-line)] pb-3'
                  >
                    <CheckCircle2 className='w-5 h-5 text-[var(--rl-brand)] mt-0.5 shrink-0' />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar boats */}
      {similar.length > 0 && (
        <section className='py-16 rl-section-fog'>
          <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
            <div className='flex items-end justify-between gap-4 mb-8'>
              <div>
                <p className='rl-eyebrow mb-3'>You Might Also Like</p>
                <h2 className='rl-slab text-3xl text-[var(--rl-deep)]'>Similar boats.</h2>
              </div>
              <Link href='/inventory' className='rl-btn-outline rl-btn-sm'>
                All Inventory <Plus className='w-3.5 h-3.5' />
              </Link>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              {similar.map((b) => (
                <BoatCard key={b.id} boat={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
