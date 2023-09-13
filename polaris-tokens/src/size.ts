export const size = {
  '0': '0px',
  '0165': '0.66px',
  '025': '1px',
  '050': '2px',
  '100': '4px',
  '150': '6px',
  '200': '8px',
  '275': '11px',
  '300': '12px',
  '325': '13px',
  '350': '14px',
  '400': '16px',
  '500': '20px',
  '600': '24px',
  '700': '28px',
  '750': '30px',
  '800': '32px',
  '900': '36px',
  '1000': '40px',
  '1200': '48px',
  '1600': '64px',
  '2000': '80px',
  '2400': '96px',
  '2800': '112px',
  '3200': '128px',
} as const;

export type Size = typeof size;

export type SizeScale = keyof Size;
