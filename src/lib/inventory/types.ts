/* ============================================================
   Inventory domain types — the CONTRACT the future live API must match.
   Pages/components depend only on these types, never on the mock source.
   When the real API lands, map its response into `Boat` and everything
   downstream keeps working unchanged.
   ============================================================ */

export type BoatCondition = 'new' | 'used';

/**
 * Boat category — drives filtering and the category browse experience.
 * The live API may return categories beyond the common four; filters and
 * facets are derived from the data, so unknown values render fine.
 */
export type BoatType = 'Pontoon' | 'Tritoon' | 'Fishing' | 'Deck Boat' | (string & {});

export interface BoatImage {
  src: string;
  alt: string;
}

export interface Boat {
  /** Stable unique id (API primary key). */
  id: string;
  /** URL-safe slug used for /inventory/[slug]. Must be unique. */
  slug: string;
  condition: BoatCondition;
  year: number;
  brand: string;
  model: string;
  type: BoatType;
  /** Price in USD. `null` renders as "Call for Price". */
  price: number | null;
  /** Engine hours (typically used boats). `null` when N/A. */
  hours: number | null;
  /** Length overall, in feet. `null` when the listing doesn't state it. */
  lengthFt: number | null;
  /** Power package, e.g. "Yamaha F250 V6". `null` when unknown. */
  engine: string | null;
  /** Where the boat physically sits — single location today. */
  location: string;
  /** First image is the card/hero image. */
  images: BoatImage[];
  /** One-line teaser used on cards. */
  shortBlurb: string;
  /** Full marketing description for the detail page. */
  description: string;
  /** Bulleted highlights for the detail page. */
  features: string[];
  /** Show on the homepage "Featured Inventory" rail. */
  featured: boolean;
  sold: boolean;
  /** Optional deep link to this listing on BoatTrader. */
  boatTraderUrl?: string;
}

export type BoatSort = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';

/** Query shape accepted by getBoats(). All fields optional. */
export interface InventoryFilters {
  condition?: BoatCondition;
  brand?: string;
  type?: BoatType;
  sort?: BoatSort;
  /** Free-text search across brand/model. */
  q?: string;
}

/** Available filter values + counts, derived from the current inventory. */
export interface InventoryFacets {
  conditions: { value: BoatCondition; label: string; count: number }[];
  brands: { value: string; count: number }[];
  types: { value: BoatType; count: number }[];
  total: number;
}
