/* Stylized SVG wordmarks for Ridgeline's brand partners.
   Each is drawn to evoke the real brand's letterform character
   without using the actual trademarked logos. All use currentColor
   so they tint together in the partner strip and shift to brand
   blue on hover. */

const W = 200;
const H = 60;

export const Yamaha = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <g fill='currentColor'>
      <rect x='86' y='10' width='2' height='10' />
      <rect x='99' y='10' width='2' height='10' />
      <rect x='112' y='10' width='2' height='10' />
      <rect x='84' y='18' width='32' height='2' />
    </g>
    <text
      x={W / 2}
      y='44'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='22'
      fontWeight='900'
      letterSpacing='3'
      textAnchor='middle'
      fill='currentColor'
    >
      YAMAHA
    </text>
  </svg>
);

export const Mercury = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <g fill='currentColor' transform='translate(36 18) skewX(-14)'>
      <path d='M0 24 L0 0 L6 0 L12 14 L18 0 L24 0 L24 24 L19 24 L19 8 L13 22 L11 22 L5 8 L5 24 Z' />
    </g>
    <text
      x='118'
      y='40'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='26'
      fontWeight='700'
      fontStyle='italic'
      letterSpacing='0.5'
      textAnchor='middle'
      fill='currentColor'
    >
      Mercury
    </text>
  </svg>
);

export const Suzuki = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <text
      x='42'
      y='44'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='40'
      fontWeight='900'
      fontStyle='italic'
      letterSpacing='-1'
      textAnchor='middle'
      fill='currentColor'
    >
      S
    </text>
    <text
      x='126'
      y='40'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='22'
      fontWeight='800'
      letterSpacing='4'
      textAnchor='middle'
      fill='currentColor'
    >
      SUZUKI
    </text>
  </svg>
);

export const Bennington = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <text
      x={W / 2}
      y='38'
      fontFamily='"Roboto Slab", Georgia, "Times New Roman", serif'
      fontSize='20'
      fontWeight='400'
      letterSpacing='3.5'
      textAnchor='middle'
      fill='currentColor'
    >
      BENNINGTON
    </text>
    <rect x='40' y='46' width='120' height='0.75' fill='currentColor' />
  </svg>
);

export const SmokerCraft = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <text
      x={W / 2}
      y='28'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='20'
      fontWeight='800'
      letterSpacing='2.5'
      textAnchor='middle'
      fill='currentColor'
    >
      SMOKER
    </text>
    <text
      x={W / 2}
      y='48'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='13'
      fontWeight='400'
      letterSpacing='6'
      textAnchor='middle'
      fill='currentColor'
    >
      CRAFT
    </text>
  </svg>
);

export const Evotti = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <text
      x={W / 2}
      y='40'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='30'
      fontWeight='300'
      letterSpacing='8'
      textAnchor='middle'
      fill='currentColor'
    >
      EVOTTI
    </text>
  </svg>
);

export const Hewitt = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <g fill='currentColor'>
      <rect x='30' y='22' width='4' height='16' />
      <rect x='166' y='22' width='4' height='16' />
    </g>
    <text
      x={W / 2}
      y='38'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='24'
      fontWeight='800'
      letterSpacing='4'
      textAnchor='middle'
      fill='currentColor'
    >
      HEWITT
    </text>
  </svg>
);

export const WaveArmor = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className='block w-full h-full'>
    <text
      x={W / 2}
      y='32'
      fontFamily='Roboto, "Helvetica Neue", Arial, sans-serif'
      fontSize='22'
      fontWeight='800'
      letterSpacing='3'
      textAnchor='middle'
      fill='currentColor'
    >
      WAVE ARMOR
    </text>
    <path
      d='M40 44 Q60 38 80 44 T120 44 T160 44'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
);

export type BrandMark = {
  name: string;
  Component: React.ComponentType;
};

export const brandMarks: BrandMark[] = [
  { name: 'Yamaha', Component: Yamaha },
  { name: 'Mercury', Component: Mercury },
  { name: 'Suzuki', Component: Suzuki },
  { name: 'Bennington', Component: Bennington },
  { name: 'Smoker Craft', Component: SmokerCraft },
  { name: 'Evotti', Component: Evotti },
  { name: 'Hewitt', Component: Hewitt },
  { name: 'Wave Armor', Component: WaveArmor },
];
