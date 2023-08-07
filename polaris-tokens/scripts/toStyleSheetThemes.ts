import fs from 'fs';
import path from 'path';

import type {ThemeShape, TokenGroupShape} from '../src/themes/types';
import type {Entry} from '../src/types';
import {themeLight} from '../src/themes/light';
import {themeLightUpliftPartial} from '../src/themes/light-uplift';
import {metadata as legacyMetadata} from '../src/metadata';

const cssOutputDir = path.join(__dirname, '../dist/css');
const sassOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'themes.css');
const sassOutputPath = path.join(sassOutputDir, 'themes.scss');

/** Creates CSS custom properties from a base, variant, or partial theme. */
export function getThemeVars(theme: Partial<ThemeShape>) {
  return Object.values(theme)
    .map((tokenGroup) => getTokenGroupVars(tokenGroup || {}))
    .join('');
}

/** Creates CSS custom properties from a token group. */
export function getTokenGroupVars(tokenGroup: TokenGroupShape) {
  return Object.entries(tokenGroup)
    .map(([token, {value}]) =>
      token.startsWith('motion-keyframes') || token.startsWith('keyframes')
        ? `--p-${token}:p-${token};`
        : `--p-${token}:${value};`,
    )
    .join('');
}

/** Creates `@keyframes` rules for `motion-keyframes-*` tokens. */
export function getKeyframes(motion: TokenGroupShape) {
  return Object.entries(motion)
    .filter(
      ([token]) =>
        token.startsWith('motion-keyframes') || token.startsWith('keyframes'),
    )
    .map(([token, {value}]) => `@keyframes p-${token}${value}`)
    .join('');
}

export async function toStyleSheetThemes() {
  if (!fs.existsSync(cssOutputDir)) {
    await fs.promises.mkdir(cssOutputDir, {recursive: true});
  }
  if (!fs.existsSync(sassOutputDir)) {
    await fs.promises.mkdir(sassOutputDir, {recursive: true});
  }

  const styles = `
  :root{color-scheme:light;${getThemeVars(themeLight)}}
  html.Polaris-Summer-Editions-2023{${getThemeVars(themeLightUpliftPartial)}}

  ${getKeyframes(legacyMetadata.motion)}
`;
  // TODO: Add support for multi-theme keyframes

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(sassOutputPath, styles);
}
