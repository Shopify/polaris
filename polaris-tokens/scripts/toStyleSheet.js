const fs = require('fs');
const path = require('path');

/**
 * Creates CSS Rules for each color-scheme.
 * @example:
 * [p-color-scheme="light"] {...}
 * [p-color-scheme="dark"] {...}
 * [p-color-scheme="dim"] {...}
 */
function getColorSchemeRules(tokenHash, colorSchemes) {
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
function getStaticCustomProperties(tokenHash) {
  return Object.entries(tokenHash)
    .filter(([tokenGroup]) => tokenGroup !== 'colorSchemes')
    .map(([, filteredTokens]) => getCustomProperties(filteredTokens))
    .join('');
}

/**
 * Creates CSS declarations for a given color-scheme.
 */
function getColorSchemeDeclarations(colorScheme, tokenHash, colorSchemes) {
  return [
    `color-scheme:${colorSchemes[colorScheme]};`,
    getCustomProperties(tokenHash.colorSchemes[colorScheme]),
  ].join('');
}

/**
 * Creates CSS custom properties for a given tokens object.
 */
function getCustomProperties(tokenHash) {
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
function getKeyframes(motion) {
  return Object.entries(motion)
    .filter(([token]) => token.startsWith('keyframes'))
    .map(([token, {value}]) => `@keyframes p-${token}${value}`)
    .join('');
}

async function toStyleSheet(tokens, osColorSchemes) {
  const staticCustomProperties = getStaticCustomProperties(tokens);
  const colorSchemeDeclarations = getColorSchemeDeclarations(
    'light',
    tokens,
    osColorSchemes,
  );
  const defaultDeclarations = `${colorSchemeDeclarations}${staticCustomProperties}`;
  const styles = `
  :root{${defaultDeclarations}}
  ${getColorSchemeRules(tokens, osColorSchemes)}
  ${getKeyframes(tokens.motion)}
`;

  const fileName = 'styles.css';
  const filePath = path.join(__dirname, '../dist', fileName);

  await fs.promises.writeFile(filePath, styles);
}

module.exports = {toStyleSheet};
