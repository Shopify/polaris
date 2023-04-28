// import {spacing} from '@shopify/polaris-tokens';
import {defineProperties, createSprinkles} from '@vanilla-extract/sprinkles';

const colors = {
  'blue-50': '#eff6ff',
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
  // etc.
};

// const gaps = Object.fromEntries(
//   Object.entries(spacing).map(([key, value]) => [key, value]),
// );

const gaps = {
  none: 0,
  small: '4px',
  medium: '8px',
  large: '16px',
};

const colorProperties = defineProperties({
  properties: {
    color: colors,
    background: colors,
    gap: gaps,
  },
});

export const atoms = createSprinkles(colorProperties);

export type Atoms = Parameters<typeof atoms>[0];
