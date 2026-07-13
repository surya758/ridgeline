'use client';

import { Bot } from 'lucide-react';

/* Ask Rusty — AI agent CTA.
   Default: compact (header desktop).
   fullWidth: edge-to-edge (mobile fixed bottom bar). */
export default function AskRusty({
  fullWidth = false,
}: {
  fullWidth?: boolean;
} = {}) {
  return (
    <a
      href='sms:+15615566310'
      aria-label='Ask Rusty — AI agent'
      className={
        fullWidth
          ? 'flex w-full items-center justify-center gap-2.5 px-6 py-2.5 text-white transition-all'
          : 'inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1 text-white transition-all hover:translate-y-[-1px]'
      }
      style={{
        background: 'var(--rl-sky)',
        boxShadow: fullWidth
          ? '0 -10px 28px -12px rgba(53, 149, 209, 0.45)'
          : '0 8px 18px -10px rgba(53, 149, 209, 0.55)',
      }}
    >
      <span
        className={`flex items-center justify-center bg-white/15 ${
          fullWidth ? 'w-8 h-8' : 'w-7 h-7'
        }`}
      >
        <Bot className={fullWidth ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      </span>
      <span
        className={`uppercase whitespace-nowrap ${
          fullWidth ? 'text-sm' : 'text-xs'
        }`}
        style={{
          fontFamily: 'var(--font-archivo), "Archivo", sans-serif',
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}
      >
        Ask Rusty
      </span>
    </a>
  );
}
