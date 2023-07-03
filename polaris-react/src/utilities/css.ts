import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import {breakpointsAliases} from '@shopify/polaris-tokens';

type Falsy = boolean | undefined | null | 0;

type ResponsivePropConfig<T = string> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;

export type ResponsiveValue = undefined | ResponsiveProp<string>;

export function classNames(...classes: (string | Falsy)[]) {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function sanitizeCustomProperties(
  styles: React.CSSProperties,
): React.CSSProperties | undefined {
  const nonNullValues = Object.entries(styles).filter(
    ([_, value]) => value != null,
  );

  return nonNullValues.length ? Object.fromEntries(nonNullValues) : undefined;
}

/**
 * Given an object like so:
 * {
 *   sm: 4,
 *   lg: 6
 * }
 * Fill in the blanks starting at >= sm (because it's the first one set):
 * {
 *   sm: 4,
 *   md: 4,
 *   lg: 6
 *   xl: 6
 * }
 *
 */
function makeResponsivePropsContiguous<T>(
  responsiveProp: ResponsivePropConfig<T>,
): ResponsivePropConfig<T> {
  const result: ResponsivePropConfig<T> = {};

  let prev: T | undefined;

  breakpointsAliases.forEach((breakpointAlias) => {
    if (typeof responsiveProp[breakpointAlias] !== 'undefined') {
      result[breakpointAlias] = responsiveProp[breakpointAlias];
      prev = responsiveProp[breakpointAlias];
    } else if (prev) {
      result[breakpointAlias] = prev;
    }
  });

  return result;
}

export function getResponsiveProps(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<string | number>,
): {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: string;
} {
  if (!responsiveProp) return {};

  let result: ResponsivePropConfig;

  if (typeof responsiveProp === 'string') {
    result = {
      [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`,
    };
  } else {
    result = Object.fromEntries(
      Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
        breakpointAlias,
        `var(--p-${tokenSubgroup}-${aliasOrScale})`,
      ]),
    );
  }

  result = makeResponsivePropsContiguous(result);

  // Prefix each responsive key with the correct token name
  return Object.fromEntries(
    Object.entries(result).map(([breakpointAlias, value]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      value,
    ]),
  );
}

export function getResponsiveValue(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveValue,
) {
  if (!responsiveProp) return {};

  if (typeof responsiveProp === 'string') {
    return {
      [`--pc-${componentName}-${componentProp}-xs`]: responsiveProp,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ]),
  );
}
