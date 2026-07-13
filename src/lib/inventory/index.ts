import type {
  Boat,
  BoatType,
  InventoryFacets,
  InventoryFilters,
} from './types';

export type {
  Boat,
  BoatCondition,
  BoatType,
  BoatImage,
  BoatSort,
  InventoryFilters,
  InventoryFacets,
} from './types';

/* ============================================================
   INVENTORY DATA ACCESS — every page/component reads boats through
   these async functions, backed by the live inventory API.
   ============================================================ */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.phoenixrisingai.com';
// The API authenticates public-website requests by matching the Origin/Referer
// domain against the org's registered domains. These fetches run server-side
// (build/ISR), where no Origin is sent automatically, so we set it explicitly.
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://www.ridgelineboating.com';

const DEFAULT_LOCATION = 'Lake Wales, FL';
const FALLBACK_IMAGE = { src: '/images/hero.avif', alt: 'Boat photo coming soon' };

/** Shape returned by GET /api/v1/dealership-website-widget/inventory. */
interface ApiBoat {
  id: string;
  slug: string;
  condition: string;
  year: number | null;
  brand: string;
  model: string;
  type: string;
  price: number | null;
  hours: number | null;
  lengthFt: number | null;
  engine: string | null;
  location: string | null;
  images: { src: string; alt: string }[];
  shortBlurb: string;
  description: string;
  features: string[];
  featured: boolean;
  sold: boolean;
  boatTraderUrl: string | null;
}

function mapApiBoat(b: ApiBoat): Boat {
  return {
    id: b.id,
    slug: b.slug,
    condition: b.condition === 'new' ? 'new' : 'used',
    year: b.year ?? 0,
    brand: b.brand,
    model: b.model,
    type: b.type as Boat['type'],
    price: b.price,
    hours: b.hours,
    lengthFt: b.lengthFt,
    engine: b.engine,
    location: b.location ?? DEFAULT_LOCATION,
    images: b.images.length > 0 ? b.images : [FALLBACK_IMAGE],
    shortBlurb: b.shortBlurb,
    description: b.description,
    features: b.features ?? [],
    featured: b.featured,
    sold: b.sold,
    boatTraderUrl: b.boatTraderUrl ?? undefined,
  };
}

/** Internal: returns the full source set from the live API. */
async function source(): Promise<Boat[]> {
  const res = await fetch(`${API_URL}/api/v1/dealership-website-widget/inventory`, {
    headers: { Origin: SITE_ORIGIN },
    // ISR: pages re-fetch at most every 5 minutes, so new/sold boats
    // appear on the site shortly after the nightly inventory sync.
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Inventory API request failed with status ${res.status}`);
  }
  const data = (await res.json()) as ApiBoat[];
  return data.map(mapApiBoat);
}

/** Boats that should appear in inventory listings (hides sold). */
function visible(boats: Boat[]): Boat[] {
  return boats.filter((b) => !b.sold);
}

/** List boats, optionally filtered and sorted. */
export async function getBoats(filters: InventoryFilters = {}): Promise<Boat[]> {
  let boats = visible(await source());

  if (filters.condition) {
    boats = boats.filter((b) => b.condition === filters.condition);
  }
  if (filters.brand) {
    boats = boats.filter((b) => b.brand === filters.brand);
  }
  if (filters.type) {
    boats = boats.filter((b) => b.type === filters.type);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase().trim();
    boats = boats.filter((b) =>
      `${b.year} ${b.brand} ${b.model} ${b.type}`.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case 'price-asc':
      boats = [...boats].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      break;
    case 'price-desc':
      boats = [...boats].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      break;
    case 'year-asc':
      boats = [...boats].sort((a, b) => a.year - b.year);
      break;
    case 'year-desc':
    default:
      // Newest first by default, new condition ahead of used on ties.
      boats = [...boats].sort(
        (a, b) => b.year - a.year || (a.condition === b.condition ? 0 : a.condition === 'new' ? -1 : 1)
      );
      break;
  }

  return boats;
}

/** Fetch a single boat by slug, or null if not found / sold. */
export async function getBoatBySlug(slug: string): Promise<Boat | null> {
  const boats = await source();
  return boats.find((b) => b.slug === slug) ?? null;
}

/** All slugs for static generation (includes sold so old URLs still resolve). */
export async function getAllSlugs(): Promise<string[]> {
  const boats = await source();
  return boats.map((b) => b.slug);
}

/** Featured boats for the homepage rail (defaults to 6). */
export async function getFeaturedBoats(limit = 6): Promise<Boat[]> {
  const boats = visible(await source()).filter((b) => b.featured);
  const pool = boats.length >= limit ? boats : visible(await source());
  return pool.slice(0, limit);
}

/** Boats similar to the given one (same type, then same brand). */
export async function getSimilarBoats(boat: Boat, limit = 3): Promise<Boat[]> {
  const boats = visible(await source()).filter((b) => b.slug !== boat.slug);
  const ranked = [...boats].sort((a, b) => {
    const score = (x: Boat) =>
      (x.type === boat.type ? 2 : 0) + (x.brand === boat.brand ? 1 : 0);
    return score(b) - score(a);
  });
  return ranked.slice(0, limit);
}

/** Available filter values + counts derived from current inventory. */
export async function getFacets(): Promise<InventoryFacets> {
  const boats = visible(await source());
  const count = <T>(arr: T[], key: T) => arr.filter((v) => v === key).length;

  const brands = Array.from(new Set(boats.map((b) => b.brand))).sort();
  const types = Array.from(new Set(boats.map((b) => b.type))) as BoatType[];

  return {
    conditions: [
      { value: 'new', label: 'New', count: count(boats.map((b) => b.condition), 'new') },
      { value: 'used', label: 'Pre-Owned', count: count(boats.map((b) => b.condition), 'used') },
    ],
    brands: brands.map((value) => ({ value, count: count(boats.map((b) => b.brand), value) })),
    types: types.map((value) => ({ value, count: count(boats.map((b) => b.type), value) })),
    total: boats.length,
  };
}

/** Format a price for display. */
export function formatPrice(price: number | null): string {
  if (price === null) return 'Call for Price';
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
