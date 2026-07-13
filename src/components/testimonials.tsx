import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/testimonials';

/* "Happy boaters" social-proof section — leans on the 100% CSI story.
   Server component; static content. */
export default function Testimonials() {
  return (
    <section className='py-20 rl-section-fog'>
      <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
          <div className='max-w-xl'>
            <p className='rl-eyebrow mb-3'>Happy Boaters</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Don&apos;t just take our word for it.
            </h2>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className='w-5 h-5 fill-[var(--rl-sky)] text-[var(--rl-sky)]' />
              ))}
            </div>
            <p className='text-sm text-[var(--rl-ink-soft)]'>
              <strong className='text-[var(--rl-deep)]'>100%</strong> customer
              satisfaction score
            </p>
          </div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {TESTIMONIALS.map((t) => (
            <figure key={t.id} className='rl-card bg-white p-6 flex flex-col'>
              <Quote className='w-7 h-7 text-[var(--rl-sky)]' />
              <div className='flex mt-3' aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-[var(--rl-sky)] text-[var(--rl-sky)]' />
                ))}
              </div>
              <blockquote className='mt-3 text-sm text-[var(--rl-ink-soft)] leading-relaxed flex-1'>
                “{t.quote}”
              </blockquote>
              <figcaption className='mt-5 pt-4 border-t border-[var(--rl-line)]'>
                <p className='rl-slab text-base text-[var(--rl-deep)]'>{t.name}</p>
                <p className='text-xs text-[var(--rl-ink-mute)] mt-0.5'>
                  {t.location}
                  {t.context ? ` · ${t.context}` : ''}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
