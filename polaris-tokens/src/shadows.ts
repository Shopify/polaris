export const shadows = {
  100: '0px 1px 0px 0px rgba(26, 26, 26, 0.07)',
  200: '0px 3px 1px -1px rgba(26, 26, 26, 0.07)',
  300: '0px 4px 6px -2px rgba(26, 26, 26, 0.20)',
  400: '0px 8px 16px -4px rgba(26, 26, 26, 0.22)',
  500: '0px 12px 20px -8px rgba(26, 26, 26, 0.24)',
  600: '0px 20px 20px -8px rgba(26, 26, 26, 0.28)',
  bevel: '0px 1px 0px 0px rgba(194, 194, 194, 1)',
} as const;

export type Shadows = typeof shadows;
