import {spacing as spacingTokens} from '@shopify/polaris-tokens';
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

const spacing = Object.fromEntries(
  Object.entries(spacingTokens).map(([key, value]) => [key, value]),
);

const colorProperties = defineProperties({
  properties: {
    color: colors,
    background: colors,
    padding: spacing,
  },
});

export const atoms = createSprinkles(colorProperties);

export type Atoms = Parameters<typeof atoms>[0];
