import fs from 'fs';
import path from 'path';

import type {
  MetaThemeShape,
  MetaTokenGroupShape,
  TokenName,
} from '../src/themes/types';
import {metaThemePartials, metaThemeDefault} from '../src/themes';
import {themeNameDefault} from '../src/themes/constants';
import {createThemeSelector} from '../src/themes/utils';
import {createVarName} from '../src/utils';
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
    .map((entry) => {
      const [tokenName, {value}] = entry as [
        TokenName,
        MetaTokenGroupShape[string],
      ];

      if (tokenName.startsWith('color-scheme')) {
        return `color-scheme:${value};`;
      }

      if (tokenName.startsWith('motion-keyframes')) {
        return `${createVarName(tokenName)}:p-${tokenName};`;
      }

      return `${createVarName(tokenName)}:${value};`;
    })
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

  const metaThemePartialsEntries = Object.entries(metaThemePartials).filter(
    ([themeName]) => themeName !== themeNameDefault,
  ) as Entries<Omit<typeof metaThemePartials, typeof themeNameDefault>>;

  const styles = [
    [
      `:root,${createThemeSelector(themeNameDefault)}`,
      `{${getMetaThemeDecls(metaThemeDefault)}}`,
    ].join(''),
    metaThemePartialsEntries.map(
      ([themeName, metaThemePartial]) =>
        `${createThemeSelector(themeName)}{${getMetaThemeDecls(
          metaThemePartial,
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
