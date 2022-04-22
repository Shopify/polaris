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
function getColorSchemeRules(tokens, osColorSchemes) {
  return Object.keys(tokens.colorSchemes)
    .map((key) => {
      const colorScheme = key;
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
function getStaticCustomProperties(tokens) {
  return Object.entries(tokens)
    .filter(([tokenGroup]) => tokenGroup !== 'colorSchemes')
    .map(([_, tokens]) => getCustomProperties(tokens))
    .join('');
}

/**
 * Creates CSS declarations for a given color-scheme.
 */
function getColorSchemeDeclarations(colorScheme, tokens, osColorSchemes) {
  return [
    `color-scheme:${osColorSchemes[colorScheme]};`,
    getCustomProperties(tokens.colorSchemes[colorScheme]),
  ].join('');
}

/**
 * Creates CSS custom properties for a given tokens object.
 */
function getCustomProperties(tokens) {
  return Object.entries(tokens)
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
function getKeyframes(motion) {
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
