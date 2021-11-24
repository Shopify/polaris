import {
  tokens,
  osColorSchemes,
  Tokens,
  ColorScheme,
  TokenGroup,
  OSColorSchemes,
} from '../../tokens';

/** Default light color-scheme declarations. */
const lightDeclarations = getColorSchemeDeclarations(
  'light',
  tokens,
  osColorSchemes,
);

/** Default dark color-scheme declarations.  */
const darkDeclarations = getColorSchemeDeclarations(
  'dark',
  tokens,
  osColorSchemes,
);

/**
 * Creates CSS Rules for each color-scheme.
 * @example:
 * [color-scheme="light"] {...}
 * [color-scheme="dark"] {...}
 * [color-scheme="dim"] {...}
 */
export function getColorSchemeRules(
  tokens: Tokens,
  osColorSchemes: OSColorSchemes,
) {
  return Object.keys(tokens.colorSchemes)
    .map((key) => {
      const colorScheme = key as ColorScheme;

      const selector = `[color-scheme="${colorScheme}"]`;
      const properties = getColorSchemeDeclarations(
        colorScheme,
        tokens,
        osColorSchemes,
      );

      return `${selector}{${properties}}`;
    })
    .join('');
}

/**
 * Creates static CSS custom properties.
 * Note: These values don't vary by color-scheme.
 */
export function getStaticCustomProperties(tokens: Tokens) {
  return Object.entries(tokens)
    .filter(([tokenGroup]) => tokenGroup !== 'colorSchemes')
    .map(([_, tokens]) => getCustomProperties(tokens))
    .join('');
}

/**
 * Creates CSS declarations for a given color-scheme.
 */
export function getColorSchemeDeclarations(
  colorScheme: ColorScheme,
  tokens: Tokens,
  osColorSchemes: OSColorSchemes,
) {
  return [
    `color-scheme:${osColorSchemes[colorScheme]};`,
    getCustomProperties(tokens.colorSchemes[colorScheme]),
  ].join('');
}

/**
 * Creates CSS custom properties for a given tokens object.
 */
export function getCustomProperties(tokens: TokenGroup) {
  return Object.entries(tokens)
    .map(([name, value]) => `--p-${name}:${value};`)
    .join('');
}

/**
 * Adapted from: https://github.com/argyleink/gui-challenges/blob/main/color-schemes/style.css
 */
export const styles = /* css */ `
:root {
  ${lightDeclarations}
  ${getStaticCustomProperties(tokens)}
}

@media (prefers-color-scheme: dark) {
  :root {
    ${darkDeclarations}
  }
}

${getColorSchemeRules(tokens, osColorSchemes)}
`;
