'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import type { BoatSort, InventoryFacets } from '@/lib/inventory';

const SORTS: { value: BoatSort; label: string }[] = [
  { value: 'year-desc', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'year-asc', label: 'Oldest first' },
];

const selectClass =
  'w-full appearance-none border border-[var(--rl-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--rl-ink)] focus:border-[var(--rl-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--rl-brand)] transition-colors';
const labelClass =
  'block text-[11px] uppercase font-bold text-[var(--rl-deep)] mb-1.5 tracking-[0.16em]';

export default function InventoryFilters({
  facets,
  active,
}: {
  facets: InventoryFacets;
  active: { condition?: string; brand?: string; type?: string; sort?: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const hasFilters = Boolean(active.condition || active.brand || active.type);

  return (
    <div className='rl-card bg-white p-5 md:p-6'>
      <div className='flex items-center gap-2 mb-4'>
        <SlidersHorizontal className='w-4 h-4 text-[var(--rl-brand)]' />
        <p className='rl-eyebrow'>Filter & Sort</p>
        {hasFilters && (
          <button
            onClick={() => router.push(pathname, { scroll: false })}
            className='ml-auto inline-flex items-center gap-1 text-xs text-[var(--rl-ink-mute)] hover:text-[var(--rl-brand)] transition-colors'
          >
            <X className='w-3.5 h-3.5' /> Clear all
          </button>
        )}
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div>
          <label className={labelClass} htmlFor='f-condition'>
            Condition
          </label>
          <select
            id='f-condition'
            className={selectClass}
            value={active.condition ?? ''}
            onChange={(e) => setParam('condition', e.target.value)}
          >
            <option value=''>All</option>
            {facets.conditions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label} ({c.count})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor='f-brand'>
            Brand
          </label>
          <select
            id='f-brand'
            className={selectClass}
            value={active.brand ?? ''}
            onChange={(e) => setParam('brand', e.target.value)}
          >
            <option value=''>All brands</option>
            {facets.brands.map((b) => (
              <option key={b.value} value={b.value}>
                {b.value} ({b.count})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor='f-type'>
            Type
          </label>
          <select
            id='f-type'
            className={selectClass}
            value={active.type ?? ''}
            onChange={(e) => setParam('type', e.target.value)}
          >
            <option value=''>All types</option>
            {facets.types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.value} ({t.count})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor='f-sort'>
            Sort
          </label>
          <select
            id='f-sort'
            className={selectClass}
            value={active.sort ?? 'year-desc'}
            onChange={(e) => setParam('sort', e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
