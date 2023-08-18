import fs from 'fs';
import path from 'path';

import type {
  Themes,
  ThemeShape,
  ThemesPartials,
  TokenGroupShape,
} from '../src/themes/types';
import {createThemeSelector} from '../src/themes/utils';
import {createVar} from '../src/utilities';

const cssOutputDir = path.join(__dirname, '../dist/css');
const sassOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'styles.css');
const sassOutputPath = path.join(sassOutputDir, 'styles.scss');

/** Creates CSS declarations from a base or variant partial theme. */
export function getThemeDecls(theme: ThemeShape) {
  return Object.values(theme)
    .map((tokenGroup) => getTokenGroupDecls(tokenGroup))
    .join('');
}

/** Creates CSS declarations from a token group. */
export function getTokenGroupDecls(tokenGroup: TokenGroupShape) {
  return Object.entries(tokenGroup)
    .map(([token, {value}]) =>
      token.startsWith('motion-keyframes')
        ? `${createVar(token)}:p-${token};`
        : `${createVar(token)}:${value};`,
    )
    .join('');
}

/** Creates `@keyframes` rules for `motion-keyframes-*` tokens. */
export function getKeyframes(motion: TokenGroupShape) {
  return Object.entries(motion)
    .filter(([token]) => token.startsWith('motion-keyframes'))
    .map(([token, {value}]) => `@keyframes p-${token}${value}`)
    .join('');
}

export async function toStyleSheet(
  themes: Themes,
  themesPartials: ThemesPartials,
) {
  if (!fs.existsSync(cssOutputDir)) {
    await fs.promises.mkdir(cssOutputDir, {recursive: true});
  }
  if (!fs.existsSync(sassOutputDir)) {
    await fs.promises.mkdir(sassOutputDir, {recursive: true});
  }

  const styles = [
    `:root{color-scheme:light;${getThemeDecls(themes.light)}}`,
    Object.entries(themesPartials).map(
      ([themeName, themePartial]) =>
        `${createThemeSelector(themeName)}{${getThemeDecls(themePartial)}}`,
    ),
    getKeyframes(themes.light.motion),
  ]
    .flat()
    .join('\n');

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(sassOutputPath, styles);
}
