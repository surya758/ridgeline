import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Droplets, Plus, Truck, Wrench } from 'lucide-react';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Service & Parts — Ridgeline Boating Center',
  description:
    'Our parts and services — top of the line. Service pickup, drop off and dockside repairs; detailing, waxing, buffing and ceramic coatings; maintenance and service.',
};

// Production copy only: three service categories with their headlines.
const servicesList = [
  {
    icon: Truck,
    title: 'Service Pickup / Drop Off / Dockside Repairs',
    tagline: 'No trailer, no time, no problem. We have you taken care of.',
    image: '/images/service-pickup.jpg',
    alt: 'Truck towing a pontoon boat in for service',
  },
  {
    icon: Droplets,
    title: 'Boat Detailing, Waxing, Buffing, Ceramic Coatings & More',
    tagline: 'Exterior to interior we can make your boat feel like new again.',
    image: '/images/service-detailing.jpg',
    alt: 'Freshly detailed pontoon boat interior',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Service',
    tagline: 'Boating is about care free fun. Let us help keep it that way!',
    image: '/images/service-maintenance.jpg',
    alt: 'Family with their freshly serviced boat',
  },
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        title='Keep your boat on the water.'
        crumbs={[{ name: 'Service & Parts', href: '/service' }]}
      />

      {/* ========== SERVICE CARDS (production copy) ========== */}
      <section className='pt-12 pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <div className='max-w-2xl mb-12'>
            <p className='rl-eyebrow mb-3'>Our Parts and Services</p>
            <h2 className='rl-slab text-3xl md:text-4xl text-[var(--rl-deep)]'>
              Top of the Line
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-5'>
            {servicesList.map(({ icon: Icon, title, tagline, image, alt }) => (
              <article key={title} className='rl-card bg-white flex flex-col group'>
                <div className='relative aspect-[4/3] rl-img-frame'>
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                  <span className='absolute top-3 left-3 flex items-center justify-center w-10 h-10 bg-[var(--rl-deep)]/90 text-white'>
                    <Icon className='w-5 h-5' />
                  </span>
                </div>
                <div className='p-6 flex flex-col flex-1'>
                  <h3 className='rl-slab text-lg text-[var(--rl-deep)]'>{title}</h3>
                  <p className='mt-2 rl-slab-light text-base text-[var(--rl-brand)] flex-1'>
                    {tagline}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className='mt-12'>
            <Link href='/contact' className='rl-btn'>
              Contact Us <Plus className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
