/* ============================================================
   MOCK TESTIMONIALS — placeholder reviews until real ones are collected.
   ⚠️ Replace with genuine, attributed customer reviews before launch.
   ============================================================ */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1–5
  quote: string;
  /** Optional context, e.g. the boat they bought. */
  context?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Dave & Karen M.',
    location: 'Lake Wales, FL',
    rating: 5,
    quote:
      'We bought our first pontoon here and the whole family was treated like, well, family. They walked us through everything and even delivered it to our dock.',
    context: 'Bennington 22 SX owner',
  },
  {
    id: 't-2',
    name: 'Ronnie T.',
    location: 'Winter Haven, FL',
    rating: 5,
    quote:
      'Their service team is the real deal. They picked up my boat, fixed it right the first time, and had it back before the weekend. No trailer needed.',
    context: 'Service customer',
  },
  {
    id: 't-3',
    name: 'The Alvarez Family',
    location: 'Lakeland, FL',
    rating: 5,
    quote:
      'Consigned our old boat and they handled everything — detailing, photos, the listing. Got us a fair price and we never had to lift a finger.',
    context: 'Sold on consignment',
  },
  {
    id: 't-4',
    name: 'Mike P.',
    location: 'Sebring, FL',
    rating: 5,
    quote:
      'Honest people who actually answer the phone. They helped me find the right fishing rig for our lakes and stood behind it after the sale.',
    context: 'Smoker Craft owner',
  },
  {
    id: 't-5',
    name: 'Cheryl B.',
    location: 'Haines City, FL',
    rating: 5,
    quote:
      'From the dock build to the boat lift install, the team was professional and on time. Twenty years in business shows — they know what they’re doing.',
    context: 'Docks & lifts customer',
  },
  {
    id: 't-6',
    name: 'Greg & Sue R.',
    location: 'Frostproof, FL',
    rating: 5,
    quote:
      'Financing was painless and they explained every option. We were on the water in our new tritoon within a week. Couldn’t be happier.',
    context: 'Bennington tritoon owners',
  },
];
