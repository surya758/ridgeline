'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { formatPrice, type Boat } from '@/lib/inventory';

const INTERVAL = 6000;

/* Product-forward hero: a rotating "poster" per featured boat — model,
   highlighted features, and price front and center. The focus is the boats
   themselves, not the storefront. */
export default function HeroShowcase({ boats }: { boats: Boat[] }) {
  const slides = boats.slice(0, 5);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setActive((next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className='relative min-h-[86vh] flex items-end overflow-hidden bg-[var(--rl-abyss)]'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription='carousel'
      aria-label='Featured boats'
    >
      {/* SEO/a11y: stable page heading, visually subordinate to the posters. */}
      <h1 className='sr-only'>
        New and pre-owned boats for sale at Ridgeline Boating Center, central Florida
      </h1>

      {/* Slides */}
      {slides.map((boat, i) => {
        const isActive = i === active;
        const img = boat.images[0];
        return (
          <div
            key={boat.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              className={`object-cover transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              sizes='100vw'
            />
            <div className='absolute inset-0 rl-hero-overlay' />
          </div>
        );
      })}

      {/* Active slide content */}
      <div className='relative w-full'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24 pt-32'>
          {slides.map((boat, i) => {
            if (i !== active) return null;
            return (
              <div key={boat.id} className='max-w-2xl'>
                <p
                  className='rl-eyebrow-light mb-4'
                  style={{ animation: 'rl-reveal 0.7s ease forwards' }}
                >
                  {boat.condition === 'new' ? 'New' : 'Pre-Owned'} · {boat.year} · {boat.brand}
                </p>
                <h2
                  className='rl-slab uppercase text-white text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]'
                  style={{ animation: 'rl-reveal 0.8s ease forwards' }}
                >
                  {boat.model}
                </h2>

                <ul className='mt-6 flex flex-wrap gap-2.5'>
                  {boat.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className='border border-white/25 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 text-xs text-white/90'
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-4'>
                  <span className='rl-slab text-3xl md:text-4xl text-white'>
                    {formatPrice(boat.price)}
                  </span>
                  <div className='flex flex-wrap gap-3'>
                    <Link href={`/inventory/${boat.slug}`} className='rl-btn-solid'>
                      View This Boat <Plus className='w-4 h-4' />
                    </Link>
                    <Link href='/inventory' className='rl-btn-light'>
                      Browse All Boats
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Controls */}
          {slides.length > 1 && (
            <div className='mt-10 flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                {slides.map((boat, i) => (
                  <button
                    key={boat.id}
                    onClick={() => go(i)}
                    aria-label={`Show ${boat.brand} ${boat.model}`}
                    aria-current={i === active}
                    className={`h-1 rounded-full transition-all ${
                      i === active ? 'w-10 bg-[var(--rl-sky)]' : 'w-5 bg-white/35 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              <div className='flex items-center gap-2 ml-2'>
                <button
                  onClick={() => go(active - 1)}
                  aria-label='Previous boat'
                  className='inline-flex items-center justify-center w-9 h-9 border border-white/25 text-white/80 hover:bg-white/10 transition-colors'
                >
                  <ChevronLeft className='w-4 h-4' />
                </button>
                <button
                  onClick={() => go(active + 1)}
                  aria-label='Next boat'
                  className='inline-flex items-center justify-center w-9 h-9 border border-white/25 text-white/80 hover:bg-white/10 transition-colors'
                >
                  <ChevronRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
