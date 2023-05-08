import {
  //   breakpoints,
  color as colorTokens,
  spacing as spacingTokens,
} from '@shopify/polaris-tokens';
import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
} from '@vanilla-extract/sprinkles';
import type {ConditionalValue} from '@vanilla-extract/sprinkles';

const colors = Object.fromEntries(
  Object.entries(colorTokens).map(([key, value]) => [key, value]),
);

const spacing = Object.fromEntries(
  Object.entries(spacingTokens).map(([key, value]) => [key, value]),
);

const colorProperties = defineProperties({
  properties: {
    color: colors,
    background: colors,
  },
});

const responsiveProperties = defineProperties({
  conditions: {
    // ...Object.fromEntries(
    //   Object.entries(breakpoints).map(([key, value]) => [
    //     key.split('-')[1],
    //     {'@media': `screen and (min-width: ${value})`},
    //   ]),
    // ),
    xs: {},
    sm: {'@media': 'screen and (min-width: 490px)'},
    md: {'@media': 'screen and (min-width: 768px)'},
    lg: {'@media': 'screen and (min-width: 1040px)'},
    xl: {'@media': 'screen and (min-width: 1440px)'},
  },
  defaultCondition: 'xs',
  responsiveArray: ['xs', 'sm', 'md', 'lg', 'xl'],
  properties: {
    padding: spacing,
    paddingTop: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingInline: spacing,
    paddingBlock: spacing,
    paddingBlockStart: spacing,
    paddingBlockEnd: spacing,
    paddingInlineStart: spacing,
    paddingInlineEnd: spacing,
  },
});

export const atoms = createSprinkles(colorProperties, responsiveProperties);
export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export type Atoms = Parameters<typeof atoms>[0];
export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;
