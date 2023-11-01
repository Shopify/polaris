import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import {breakpointsAliases} from '@shopify/polaris-tokens';
import type {Entries} from 'type-fest';

import {isObject} from './is-object';

type Falsy = boolean | undefined | null | 0;

export type ResponsivePropObject<T = string> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T = string> = T | ResponsivePropObject<T>;

export type PolarisCSSCustomPropertyName = `${`--p-` | `--pc-`}${string}`;
export type PolarisCSSVar = `var(${PolarisCSSCustomPropertyName})`;

type ResponsiveCSSCustomProperties = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: PolarisCSSVar;
};

type ResponsiveValues<T> = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: T;
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

export function createPolarisCSSVar<T extends string | number = string>(
  tokenSubgroup: string,
  tokenValue: T,
): PolarisCSSVar {
  // `Grid`'s `gap` prop used to allow passing fully formed var() functions as
  // the value. This is no longer supported in v12+.
  if (typeof tokenValue === 'string' && tokenValue.startsWith('var(')) {
    throw new Error(
      `"${tokenValue}" is not from the ${tokenSubgroup} token group.`,
    );
  }

  // NOTE: All our token values today are either strings or numbers, so
  // stringifying them here works. But if we ever have anything more complex
  // (such as an object) this may generate invalid token names.
  return `var(--p-${tokenSubgroup}-${tokenValue})`;
}

export function createPolarisCSSCustomProperty(
  componentName: string,
  componentProp: string,
  breakpointAlias?: BreakpointsAlias,
): PolarisCSSCustomPropertyName {
  return `--pc-${componentName}-${componentProp}${
    breakpointAlias ? `-${breakpointAlias}` : ''
  }`;
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
 * NOTE: Also supports legacy / deprecated values which are a complete CSS
 * variable declaration (primarily for `Grid`):
 * (
 *   'grid',
 *   'gap',
 *   'spacing',
 *   {
 *     sm: "var(--p-spacing-4)",
 *     lg: "var(--p-spacing-6)"
 *   }
 * )
 *
 */
export function getResponsiveProps<T extends string | number = string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveCSSCustomProperties {
  // "falsey" values are valid except `null` or `undefined`
  if (responsiveProp == null) return {};

  if (isObject(responsiveProp)) {
    return Object.fromEntries(
      (
        Object.entries(responsiveProp).filter(
          ([, aliasOrScale]) => aliasOrScale != null,
          // Use 'Required' here because .filter() doesn't type narrow
        ) as Entries<Required<typeof responsiveProp>>
      ).map(([breakpointAlias, aliasOrScale]) => [
        createPolarisCSSCustomProperty(
          componentName,
          componentProp,
          breakpointAlias,
        ),
        createPolarisCSSVar(tokenSubgroup, aliasOrScale),
      ]),
    );
  }

  return {
    [createPolarisCSSCustomProperty(
      componentName,
      componentProp,
      breakpointsAliases[0],
    )]: createPolarisCSSVar(tokenSubgroup, responsiveProp as T),
  };
}

export function getResponsiveValue<T extends string | number = string>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveValues<T> {
  // "falsey" values are valid except `null` or `undefined`
  if (responsiveProp == null) return {};

  if (isObject(responsiveProp)) {
    return Object.fromEntries(
      (
        Object.entries(responsiveProp).filter(
          ([, responsiveValue]) => responsiveValue != null,
          // Use 'Required' here because .filter() doesn't type narrow
        ) as Entries<Required<typeof responsiveProp>>
      ).map(([breakpointAlias, responsiveValue]) => [
        createPolarisCSSCustomProperty(
          componentName,
          componentProp,
          breakpointAlias,
        ),
        responsiveValue,
      ]),
    );
  }

  return {
    [createPolarisCSSCustomProperty(
      componentName,
      componentProp,
      breakpointsAliases[0],
    )]: responsiveProp as T,
  };
}

export function mapResponsivePropValues<Input, Output>(
  responsiveProp: ResponsiveProp<Input> | undefined,
  fn: (value?: Input) => Output | undefined,
): ResponsiveProp<Output> | undefined {
  if (isObject(responsiveProp)) {
    return Object.fromEntries(
      (Object.entries(responsiveProp) as Entries<typeof responsiveProp>).map(
        ([breakpointAlias, value]) => [breakpointAlias, fn(value)],
      ),
    );
  }

  return fn(responsiveProp as Input);
}
