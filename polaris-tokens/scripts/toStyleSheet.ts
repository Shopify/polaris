import fs from 'fs';
import path from 'path';

import {Tokens, ColorScheme, TokenGroup, OSColorSchemes} from '../src';

const cssOutputDir = path.join(__dirname, '../dist/css');
const sassOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'styles.css');
const sassOutputPath = path.join(sassOutputDir, 'styles.scss');

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
    .filter(([tokenGroupName]) => tokenGroupName !== 'colorSchemes')
    .map(([_, tokenGroup]) => getCustomProperties(tokenGroup))
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
export function getCustomProperties(tokenGroup: TokenGroup) {
  return Object.entries(tokenGroup)
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
export function getKeyframes(motion: TokenGroup) {
  return Object.entries(motion)
    .filter(([token]) => token.startsWith('keyframes'))
    .map(([token, {value}]) => `@keyframes p-${token}${value}`)
    .join('');
}

export async function toStyleSheet(
  tokens: Tokens,
  osColorSchemes: OSColorSchemes,
) {
  if (!fs.existsSync(cssOutputDir)) {
    await fs.promises.mkdir(cssOutputDir, {recursive: true});
  }
  if (!fs.existsSync(sassOutputDir)) {
    await fs.promises.mkdir(sassOutputDir, {recursive: true});
  }

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

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(sassOutputPath, styles);
}
