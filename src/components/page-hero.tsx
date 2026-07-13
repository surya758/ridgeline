import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { name: string; href: string };

/* Boat/vibe image pool — a random one sits behind each page header to keep
   the homepage energy going, while the header stays minimal. */
const HEADER_IMAGES = [
  '/images/hero.avif',
  '/images/wave-armor.avif',
  '/images/boat-lifts.avif',
  '/images/hewitt-products.avif',
  '/images/visit-us.avif',
];

/* Minimal page header — one title line over a random boat backdrop, with a
   small breadcrumb. No eyebrow, no description: products/services lead.
   Pass `image` to pin a backdrop; otherwise one is chosen at random. */
export default function PageHero({
  title,
  image,
  crumbs,
}: {
  title: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  const bg =
    image ?? HEADER_IMAGES[Math.floor(Math.random() * HEADER_IMAGES.length)];

  return (
    <section className='relative overflow-hidden bg-[var(--rl-abyss)] border-b border-white/10'>
      <Image src={bg} alt='' fill priority className='object-cover' sizes='100vw' />
      <div className='absolute inset-0 rl-hero-overlay' />

      <div className='relative max-w-[1400px] mx-auto px-6 lg:px-10 py-5 md:py-7'>
        {crumbs && (
          <nav className='flex items-center gap-2 text-[11px] md:text-xs text-white/70 mb-2'>
            <Link href='/' className='hover:text-white transition-colors'>
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.href} className='flex items-center gap-2'>
                <ChevronRight className='w-3 h-3 text-white/40' />
                <Link href={c.href} className='hover:text-white transition-colors'>
                  {c.name}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <h1 className='rl-slab uppercase text-white text-[clamp(1.5rem,3vw,2.25rem)]'>
          {title}
        </h1>
      </div>
    </section>
  );
}
