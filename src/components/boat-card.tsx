import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { formatPrice, type Boat } from '@/lib/inventory';

/* Shared inventory card — used by the homepage Featured rail and the
   /inventory grid so both stay visually identical. */
export default function BoatCard({ boat }: { boat: Boat }) {
  const { slug, condition, year, brand, model, shortBlurb, price, images } = boat;
  const img = images[0];

  return (
    <article className='rl-card flex flex-col'>
      <Link href={`/inventory/${slug}`} className='relative aspect-[4/3] rl-img-frame block'>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className='object-cover transition-transform duration-500 hover:scale-[1.03]'
        />
        <span
          className={`absolute top-3 left-3 rl-badge ${
            condition === 'new' ? 'rl-badge-new' : 'rl-badge-used'
          }`}
        >
          {condition === 'new' ? 'New' : 'Pre-Owned'}
        </span>
      </Link>
      <div className='p-5 flex flex-col flex-1'>
        <p className='text-xs text-[var(--rl-ink-mute)]'>
          {year} · {brand}
        </p>
        <h3 className='rl-slab text-2xl mt-1.5 text-[var(--rl-deep)]'>
          <Link href={`/inventory/${slug}`} className='hover:text-[var(--rl-brand)] transition-colors'>
            {model}
          </Link>
        </h3>
        <p className='mt-2 text-sm leading-relaxed text-[var(--rl-ink-soft)] flex-1'>
          {shortBlurb}
        </p>
        <div className='mt-4 flex items-center justify-between'>
          <span className='rl-slab text-lg text-[var(--rl-brand)]'>{formatPrice(price)}</span>
          <Link href={`/inventory/${slug}`} className='rl-link'>
            View Details <Plus className='w-3.5 h-3.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}
