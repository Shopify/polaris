import {
  tokens,
  osColorSchemes,
  Tokens,
  ColorScheme,
  TokenGroup,
  OSColorSchemes,
} from '../../tokens';

const staticCustomProperties = getStaticCustomProperties(tokens);
const colorSchemeDeclarations = getColorSchemeDeclarations(
  'light',
  tokens,
  osColorSchemes,
);

const defaultDeclarations = `${colorSchemeDeclarations}${staticCustomProperties}`;

/**
 * Creates CSS Rules for each color-scheme.
 * @example:
 * [p-color-scheme="light"] {...}
 * [p-color-scheme="dark"] {...}
 * [p-color-scheme="dim"] {...}
 */
export function getColorSchemeRules(
  tokens: Tokens,
  osColorSchemes: OSColorSchemes,
) {
  return Object.keys(tokens.colorSchemes)
    .map((key) => {
      const colorScheme = key as ColorScheme;

      const selector = `[p-color-scheme="${colorScheme}"]`;
      const colorCustomProperties = getColorSchemeDeclarations(
        colorScheme,
        tokens,
        osColorSchemes,
      );

      return `${selector}{${colorCustomProperties}${getStaticCustomProperties(
        tokens,
      )}}`;
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
    .map(([token, value]) =>
      token.startsWith('keyframes')
        ? `--p-${token}:p-${token};`
        : `--p-${token}:${value};`,
    )
    .join('');
}

/**
 * Concatenates the `keyframes` token-group into a single string.
 */
export function getKeyframes(motion: TokenGroup) {
  return Object.entries(motion)
    .filter(([token]) => token.startsWith('keyframes'))
    .map(([token, value]) => `@keyframes p-${token}${value}`)
    .join('');
}

/**
 * Adapted from: https://github.com/argyleink/gui-challenges/blob/main/color-schemes/style.css
 */
export const styles = `
  :root{${defaultDeclarations}}
  ${getColorSchemeRules(tokens, osColorSchemes)}
  ${getKeyframes(tokens.motion)}
`;
