import fs from 'fs';
import path from 'path';

import type {ThemeShape, TokenGroupShape} from '../src/themes/types';
import {themePartials, themeDefault} from '../src/themes';
import {themeNameDefault} from '../src/themes/constants';
import {createThemeSelector} from '../src/themes/utils';
import {createVar} from '../src/utilities';

const cssOutputDir = path.join(__dirname, '../dist/css');
const scssOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'styles.css');
const scssOutputPath = path.join(scssOutputDir, 'styles.scss');

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

export async function toStyleSheet() {
  await fs.promises.mkdir(cssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  await fs.promises.mkdir(scssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const themePartialsEntries = Object.entries(themePartials).filter(
    ([themeName]) => themeName !== themeNameDefault,
  );

  const styles = [
    `:root{color-scheme:light;${getThemeDecls(themeDefault)}}`,
    themePartialsEntries.map(
      ([themeName, themePartial]) =>
        `${createThemeSelector(themeName)}{${getThemeDecls(themePartial)}}`,
    ),
    getKeyframes(themeDefault.motion),
    // Newline terminator
    '',
  ]
    .flat()
    .join('\n');

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(scssOutputPath, styles);
}
