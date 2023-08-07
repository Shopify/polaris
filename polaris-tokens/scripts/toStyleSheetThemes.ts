import fs from 'fs';
import path from 'path';

import type {ThemeShape, TokenGroupShape} from '../src/themes/types';
import type {Entry} from '../src/types';
import {themeLight} from '../src/themes/light';
import {themeLightHighContrastPartial} from '../src/themes/high-contrast';
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

/**
 * Creates CSS custom properties from a variant theme
 * replacing `value` with `valueExperimental`.
 */
export function getThemeVariantVarsExperimental(theme: ThemeShape) {
  return Object.entries(theme)
    .map((entry) => {
      const [_, tokenGroup] = entry as Entry<ThemeShape>;

      const tokenGroupExperimental = Object.fromEntries(
        Object.entries(tokenGroup)
          // Only include tokens with `valueExperimental` prop
          .filter(([_, tokenProperties]) =>
            Boolean(tokenProperties.valueExperimental),
          )
          // Move `valueExperimental` to `value` position
          .map(
            ([tokenName, tokenProperties]): Entry<TokenGroupShape> => [
              tokenName,
              {value: tokenProperties.valueExperimental!},
            ],
          ),
      );

      return getTokenGroupVars(tokenGroupExperimental);
    })
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
  html.Polaris-Summer-Editions-2023{${getThemeVariantVarsExperimental(
    legacyMetadata,
  )}}
  html.p-theme-light-high-contrast{${getThemeVars(
    themeLightHighContrastPartial,
  )}}

  ${getKeyframes(legacyMetadata.motion)}
`;
  // TODO: Add support for multi-theme keyframes

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(sassOutputPath, styles);
}
