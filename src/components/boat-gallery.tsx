'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BoatImage } from '@/lib/inventory';

export default function BoatGallery({ images }: { images: BoatImage[] }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div>
      <div className='relative aspect-[4/3] rl-img-frame'>
        <Image
          src={main.src}
          alt={main.alt}
          fill
          priority
          className='object-cover'
          sizes='(max-width: 1024px) 100vw, 50vw'
        />
      </div>

      {images.length > 1 && (
        <div className='mt-3 grid grid-cols-4 gap-3'>
          {images.map((img, i) => (
            <button
              key={img.src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[4/3] rl-img-frame transition-opacity ${
                i === active
                  ? 'ring-2 ring-[var(--rl-brand)]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className='object-cover' sizes='25vw' />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
