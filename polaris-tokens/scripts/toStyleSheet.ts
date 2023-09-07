import fs from 'fs';
import path from 'path';

import type {MetaThemeShape, MetaTokenGroupShape} from '../src/themes/types';
import {metaThemeVariantPartials, metaThemeDefault} from '../src/themes';
import {themeNameDefault} from '../src/themes/constants';
import {createThemeSelector} from '../src/themes/utils';
import {createVar} from '../src/utilities';
import type {Entries} from '../src/types';

const cssOutputDir = path.join(__dirname, '../dist/css');
const scssOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'styles.css');
const scssOutputPath = path.join(scssOutputDir, 'styles.scss');

/** Creates CSS declarations from a base or variant partial theme. */
export function getMetaThemeDecls(metaTheme: MetaThemeShape) {
  return Object.values(metaTheme)
    .map((metaTokenGroup) => getMetaTokenGroupDecls(metaTokenGroup))
    .join('');
}

/** Creates CSS declarations from a token group. */
export function getMetaTokenGroupDecls(metaTokenGroup: MetaTokenGroupShape) {
  return Object.entries(metaTokenGroup)
    .map(([tokenName, {value}]) =>
      tokenName.startsWith('motion-keyframes')
        ? `${createVar(tokenName)}:p-${tokenName};`
        : `${createVar(tokenName)}:${value};`,
    )
    .join('');
}

/** Creates `@keyframes` rules for `motion-keyframes-*` tokens. */
export function getKeyframes(motion: MetaTokenGroupShape) {
  return Object.entries(motion)
    .filter(([tokenName]) => tokenName.startsWith('motion-keyframes'))
    .map(([tokenName, {value}]) => `@keyframes p-${tokenName}${value}`)
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

  const metaThemeVariantPartialsEntries = Object.entries(
    metaThemeVariantPartials,
  ).filter(([themeName]) => themeName !== themeNameDefault) as Entries<
    Omit<typeof metaThemeVariantPartials, typeof themeNameDefault>
  >;

  const styles = [
    `:root{color-scheme:light;${getMetaThemeDecls(metaThemeDefault)}}`,
    metaThemeVariantPartialsEntries.map(
      ([themeName, metaThemeVariantPartial]) =>
        `${createThemeSelector(themeName)}{${getMetaThemeDecls(
          metaThemeVariantPartial,
        )}}`,
    ),
    getKeyframes(metaThemeDefault.motion),
    // Newline terminator
    '',
  ]
    .flat()
    .join('\n');

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(scssOutputPath, styles);
}
