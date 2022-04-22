const fs = require('fs');
const path = require('path');

const {osColorSchemes, tokens} = require('../dist/index');

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
export function getColorSchemeRules(tokenHash, colorSchemes) {
  return Object.keys(tokenHash.colorSchemes)
    .map((key) => {
      const colorScheme = key;
      const selector = `[p-color-scheme="${colorScheme}"]`;
      const colorCustomProperties = getColorSchemeDeclarations(
        colorScheme,
        tokenHash,
        colorSchemes,
      );

      return `${selector}{${colorCustomProperties}${getStaticCustomProperties(
        tokenHash,
      )}}`;
    })
    .join('');
}

/**
 * Creates static CSS custom properties.
 * Note: These values don't vary by color-scheme.
 */
export function getStaticCustomProperties(tokenHash) {
  return Object.entries(tokenHash)
    .filter(([tokenGroup]) => tokenGroup !== 'colorSchemes')
    .map(([, filteredTokens]) => getCustomProperties(filteredTokens))
    .join('');
}

/**
 * Creates CSS declarations for a given color-scheme.
 */
export function getColorSchemeDeclarations(
  colorScheme,
  tokenHash,
  colorSchemes,
) {
  return [
    `color-scheme:${colorSchemes[colorScheme]};`,
    getCustomProperties(tokenHash.colorSchemes[colorScheme]),
  ].join('');
}

/**
 * Creates CSS custom properties for a given tokens object.
 */
export function getCustomProperties(tokenHash) {
  return Object.entries(tokenHash)
    .map(([token, {value}]) =>
      token.startsWith('keyframes')
        ? `--p-${token}:p-${token};`
        : `--p-${token}:${value};`,
    )
    .join('');
}

/**
 * Concatenates the `keyframes` token-group into a single string.
 */
export function getKeyframes(motion) {
  return Object.entries(motion)
    .filter(([token]) => token.startsWith('keyframes'))
    .map(([token, {value}]) => `@keyframes p-${token}${value}`)
    .join('');
}

const styles = `
  :root{${defaultDeclarations}}
  ${getColorSchemeRules(tokens, osColorSchemes)}
  ${getKeyframes(tokens.motion)}
`;

const fileName = 'styles.css';
const filePath = path.join(__dirname, '../dist', fileName);

fs.writeFileSync(filePath, styles);
