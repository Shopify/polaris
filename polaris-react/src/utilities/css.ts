import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import {breakpointAliases} from '@shopify/polaris-tokens';

type Falsy = boolean | undefined | null | 0;

export type ResponsiveProp<T> =
  | T
  | {
      [Breakpoint in BreakpointsAlias]?: T;
    };

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
function makeResponsivePropsContiguous(responsiveProp: {
  [Breakpoint in BreakpointsAlias]?: string;
}): {
  [Breakpoint in BreakpointsAlias]?: string;
} {
  const result: {
    [Breakpoint in BreakpointsAlias]?: string;
  } = {};

  let prev: string | undefined;

  breakpointAliases.forEach((breakpointAlias) => {
    if (typeof responsiveProp[breakpointAlias] === 'undefined') {
      // Don't set values until we've seen at least one
      if (typeof prev !== 'undefined') {
        result[breakpointAlias] = prev;
      }
    } else {
      prev = responsiveProp[breakpointAlias];
      result[breakpointAlias] = prev;
    }
  });

  return result;
}

export function getResponsiveProps(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?:
    | string
    | {
        [Breakpoint in BreakpointsAlias]?: string;
      },
  forceContiguous = true,
): {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: string;
} {
  if (!responsiveProp) return {};

  let result: {
    [Breakpoint in BreakpointsAlias]?: string;
  };

  if (typeof responsiveProp === 'string') {
    result = {
      [breakpointAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`,
    };
  } else {
    result = Object.fromEntries(
      Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
        breakpointAlias,
        `var(--p-${tokenSubgroup}-${aliasOrScale})`,
      ]),
    );
  }

  if (forceContiguous) {
    result = makeResponsivePropsContiguous(result);
  }

  // Prefix each responsive key with the correct token name
  return Object.fromEntries(
    Object.entries(result).map(([breakpointAlias, value]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      value,
    ]),
  );
}

export type ResponsiveValue =
  | undefined
  | string
  | {
      [Breakpoint in BreakpointsAlias]?: string;
    };

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
