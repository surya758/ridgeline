import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Ship } from 'lucide-react';
import PageHero from '@/components/page-hero';
import BoatCard from '@/components/boat-card';
import InventoryFilters from '@/components/inventory-filters';
import {
  getBoats,
  getFacets,
  type BoatCondition,
  type BoatSort,
  type BoatType,
  type InventoryFilters as Filters,
} from '@/lib/inventory';

export const metadata: Metadata = {
  title: 'Boats For Sale — Ridgeline Boating Center',
  description:
    'Browse new and pre-owned boats for sale at Ridgeline Boating Center in Lake Wales, FL — Bennington, Smoker Craft, and Evotti pontoons, tritoons, and fishing boats.',
};

const BOATTRADER_ALL =
  'https://www.boattrader.com/boats/dealer-ridgeline-boating-center-524228/';

const CONDITIONS: BoatCondition[] = ['new', 'used'];
const TYPES: BoatType[] = ['Pontoon', 'Tritoon', 'Fishing', 'Deck Boat'];
const SORTS: BoatSort[] = ['price-asc', 'price-desc', 'year-asc', 'year-desc'];

type SearchParams = { [key: string]: string | string[] | undefined };

function one(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const conditionRaw = one(searchParams.condition);
  const typeRaw = one(searchParams.type);
  const sortRaw = one(searchParams.sort);
  const brand = one(searchParams.brand);

  const filters: Filters = {
    condition: CONDITIONS.includes(conditionRaw as BoatCondition)
      ? (conditionRaw as BoatCondition)
      : undefined,
    type: TYPES.includes(typeRaw as BoatType) ? (typeRaw as BoatType) : undefined,
    sort: SORTS.includes(sortRaw as BoatSort) ? (sortRaw as BoatSort) : undefined,
    brand: brand || undefined,
  };

  const [boats, facets] = await Promise.all([getBoats(filters), getFacets()]);

  return (
    <>
      <PageHero
        title='Find your next boat.'
        crumbs={[{ name: 'Inventory', href: '/inventory' }]}
      />

      <section className='pt-10 pb-16 md:pb-20'>
        <div className='max-w-[1400px] mx-auto px-6 lg:px-10'>
          <InventoryFilters
            facets={facets}
            active={{
              condition: filters.condition,
              brand: filters.brand,
              type: filters.type,
              sort: filters.sort,
            }}
          />

          <div className='mt-8 flex items-baseline justify-between gap-4'>
            <p className='text-sm text-[var(--rl-ink-mute)]'>
              {boats.length} {boats.length === 1 ? 'boat' : 'boats'} available
            </p>
            <a
              href={BOATTRADER_ALL}
              target='_blank'
              rel='noopener noreferrer'
              className='rl-link'
            >
              See everything on BoatTrader <Plus className='w-3.5 h-3.5' />
            </a>
          </div>

          {boats.length > 0 ? (
            <div className='mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              {boats.map((boat) => (
                <BoatCard key={boat.id} boat={boat} />
              ))}
            </div>
          ) : (
            <div className='mt-6 rl-card bg-white p-12 flex flex-col items-center text-center'>
              <Ship className='w-12 h-12 text-[var(--rl-brand)]' />
              <h2 className='rl-slab text-2xl text-[var(--rl-deep)] mt-4'>
                No boats match those filters.
              </h2>
              <p className='mt-2 text-sm text-[var(--rl-ink-soft)] max-w-sm'>
                Try clearing a filter, or reach out — we get new inventory in
                regularly and may have what you&apos;re looking for.
              </p>
              <Link href='/inventory' className='rl-btn mt-6'>
                Clear filters <Plus className='w-4 h-4' />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
