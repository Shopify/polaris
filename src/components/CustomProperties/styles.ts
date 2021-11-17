import {
  ColorScheme,
  designTokens,
  osColorSchemes,
  Tokens,
} from './designTokens';

/** Default light color-scheme declarations. */
const lightDeclarations = getColorSchemeDeclarations('light', ' '.repeat(2));

/** Default dark color-scheme declarations.  */
const darkDeclarations = getColorSchemeDeclarations('dark', ' '.repeat(4));

/**
 * CSS Rules for each color-scheme.
 * @example:
 * [color-scheme="light"] {...}
 * [color-scheme="dark"] {...}
 * [color-scheme="dim"] {...}
 */
const colorSchemeRules = Object.keys(designTokens.colorSchemes)
  .map((key) => {
    const colorScheme = key as ColorScheme;

    const selector = `[color-scheme="${colorScheme}"]`;
    const properties = getColorSchemeDeclarations(colorScheme, ' '.repeat(2));

    return `${selector} {\n${properties}\n}`;
  })
  .join('\n');

/**
 * Static CSS custom properties.
 * Note: These values don't vary by color-scheme.
 */
const staticCustomProperties = Object.entries(designTokens)
  .map(([key, tokens]) =>
    key === 'colorSchemes' ? '' : getCustomProperties(tokens, ' '.repeat(2)),
  )
  .join('\n');

/**
 * Retrieves CSS declarations for a given color-scheme.
 */
function getColorSchemeDeclarations(colorScheme: ColorScheme, pad = '') {
  return [
    `${pad}color-scheme: ${osColorSchemes[colorScheme]};`,
    getCustomProperties(designTokens.colorSchemes[colorScheme], pad),
  ].join('\n');
}

/**
 * Creates CSS custom properties for a given tokens object.
 */
function getCustomProperties(tokens: Tokens, pad = '') {
  return Object.entries(tokens)
    .map(([name, value]) => `${pad}--p-${name}: ${value};`)
    .join('\n');
}

/**
 * Adapted from: https://github.com/argyleink/gui-challenges/blob/main/color-schemes/style.css
 */
export const styles = /* css */ `
:root {
${lightDeclarations}
${staticCustomProperties}
}

@media (prefers-color-scheme: dark) {
  :root {\n${darkDeclarations}\n\t}
}

${colorSchemeRules}
`;
