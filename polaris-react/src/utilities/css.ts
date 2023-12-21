import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import {breakpointsAliases} from '@shopify/polaris-tokens';

import {isObject} from './is-object';

type Falsy = boolean | undefined | null | 0;

export type ResponsivePropObject<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

type ResponsivePropConfig<T = string> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;

export type ResponsiveValue<T = string> = undefined | ResponsiveProp<T>;

type ResponsiveVariables<T> = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: T;
};

export type PolarisCSSCustomPropertyName = `${`--p-` | `--pc-`}${string}`;
export type PolarisCSSVar = `var(${PolarisCSSCustomPropertyName})`;

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
 * Given params like so:
 * (
 *   'button',
 *   'padding',
 *   'spacing',
 *   {
 *     sm: "4",
 *     lg: "6"
 *   }
 * )
 * Converts it to an object like so:
 * {
 *   '--pc-button-padding-sm': 'var(--p-spacing-4)',
 *   '--pc-button-padding-lg': 'var(--p-spacing-6)'
 * }
 *
 */
export function getResponsiveProps<T = string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveVariables<T> {
  if (!responsiveProp) return {};

  let result: ResponsivePropConfig;

  if (!isObject(responsiveProp)) {
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

  // Prefix each responsive key with the correct token name
  return Object.fromEntries(
    Object.entries(result).map(([breakpointAlias, value]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      value,
    ]),
  ) as unknown as ResponsiveVariables<T>;
}

export function getResponsiveValue<T = string>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveValue<T>,
): ResponsiveVariables<T> {
  if (!responsiveProp) return {};

  if (!isObject(responsiveProp)) {
    return {
      [`--pc-${componentName}-${componentProp}-${breakpointsAliases[0]}`]:
        responsiveProp,
    } as ResponsiveVariables<T>;
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ]),
  );
}

export function isCSSVar(token: string | number | undefined): boolean {
  return typeof token === 'string' && token.startsWith('var(');
}

export function createPolarisCSSVar<
  T extends string | number | undefined = string,
>(tokenSubgroup: string | null, tokenValue: T): PolarisCSSVar {
  // `Grid`'s `gap` prop used to allow passing fully formed var() functions as
  // the value. This is no longer supported in v12+.
  if (isCSSVar(tokenValue)) {
    throw new Error(
      `"${tokenValue}" is not from the ${tokenSubgroup} token group.`,
    );
  }

  // NOTE: All our token values today are either strings or numbers, so
  // stringifying them here works. But if we ever have anything more complex
  // (such as an object) this may generate invalid token names.
  return `var(--p-${tokenSubgroup ? `${tokenSubgroup}-` : ''}${tokenValue})`;
}
