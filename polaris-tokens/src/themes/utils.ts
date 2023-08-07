import type {Entry, Exact} from '../types';

import type {
  ThemeBaseShape,
  ThemePartialShape,
  ThemeVariantShape,
  TokenGroupShape,
} from './types';

/**
 * Identity function creator that simply returns the provided theme,
 * but additionally validates the input matches the type exactly
 * and infers all members.
 *
 * TODO: Replace all instances with `satisfies` when we upgrade
 * to TypeScript >=4.9
 *
 * @example
 * ```
 * type ExampleShape = { [key: string]: string }
 * const createExample = createExact<ExampleShape>()
 *
 * const example = createExample({
 *  foo: 'bar',
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ foo: string }`
 */
function createExact<T extends object>() {
  return <U extends Exact<T, U>>(theme: U) => theme;
}

export const createThemeBase = createExact<ThemeBaseShape>();

export const createThemeVariant = createExact<ThemeVariantShape>();

export const createThemePartial = createExact<ThemePartialShape>();

export function withValueExperimental(
  tokenGroup: TokenGroupShape,
): TokenGroupShape {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(
      ([tokenName, tokenProperties]): Entry<TokenGroupShape> => [
        tokenName,
        {
          value: tokenProperties.valueExperimental ?? tokenProperties.value,
        },
      ],
    ),
  );
}
