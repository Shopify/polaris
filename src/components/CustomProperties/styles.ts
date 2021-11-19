import {
  ColorScheme,
  designTokens,
  DesignTokens,
  osColorSchemes,
  OSColorSchemes,
  Tokens,
} from '../../designTokens';

/** Default light color-scheme declarations. */
const lightDeclarations = getColorSchemeDeclarations(
  'light',
  designTokens,
  osColorSchemes,
);

/** Default dark color-scheme declarations.  */
const darkDeclarations = getColorSchemeDeclarations(
  'dark',
  designTokens,
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
  designTokens: DesignTokens,
  osColorSchemes: OSColorSchemes,
) {
  return Object.keys(designTokens.colorSchemes)
    .map((key) => {
      const colorScheme = key as ColorScheme;

      const selector = `[color-scheme="${colorScheme}"]`;
      const properties = getColorSchemeDeclarations(
        colorScheme,
        designTokens,
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
export function getStaticCustomProperties(designTokens: DesignTokens) {
  return Object.entries(designTokens)
    .filter(([tokenGroup]) => tokenGroup !== 'colorSchemes')
    .map(([_, tokens]) => getCustomProperties(tokens))
    .join('');
}

/**
 * Creates CSS declarations for a given color-scheme.
 */
export function getColorSchemeDeclarations(
  colorScheme: ColorScheme,
  designTokens: DesignTokens,
  osColorSchemes: OSColorSchemes,
) {
  return [
    `color-scheme:${osColorSchemes[colorScheme]};`,
    getCustomProperties(designTokens.colorSchemes[colorScheme]),
  ].join('');
}

/**
 * Creates CSS custom properties for a given tokens object.
 */
export function getCustomProperties(tokens: Tokens) {
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
  ${getStaticCustomProperties(designTokens)}
}

@media (prefers-color-scheme: dark) {
  :root {
    ${darkDeclarations}
  }
}

${getColorSchemeRules(designTokens, osColorSchemes)}
`;
