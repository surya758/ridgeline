'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Finds every <section> under <main> (except the first, which is the hero
   and already has its own intro animations), tags them with .rd-reveal,
   then uses IntersectionObserver to add .rd-reveal-visible as each scrolls
   into view. Pairs with .rd-reveal* rules in globals.css.

   Re-runs on every route change: the layout (and this component) persists
   across client-side navigations, so without the pathname dependency the
   effect would only ever tag the first page that loaded. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section')
    );
    if (sections.length <= 1) return;

    const targets = sections.slice(1);
    targets.forEach((s) => s.classList.add('rd-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rd-reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      targets.forEach((s) =>
        s.classList.remove('rd-reveal', 'rd-reveal-visible')
      );
    };
  }, [pathname]);

  return null;
}
