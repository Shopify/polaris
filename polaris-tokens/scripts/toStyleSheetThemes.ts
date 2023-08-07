import fs from 'fs';
import path from 'path';

import type {
  MetadataThemeVariantShape,
  MetadataTokenGroupShape,
} from '../src/themes/types';
import type {Entry} from '../src/types';
import {metadataThemeBase} from '../src/themes/base';
import {metadataThemePartialLight} from '../src/themes/light';
import {metadataThemePartialHighContrast} from '../src/themes/high-contrast';
import {metadata as legacyMetadata} from '../src/metadata';

const cssOutputDir = path.join(__dirname, '../dist/css');
const sassOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'themes.css');
const sassOutputPath = path.join(sassOutputDir, 'themes.scss');

/** Creates CSS custom properties from a base, variant, or partial theme. */
export function getMetadataThemeVars(
  metadataTheme: Partial<MetadataThemeVariantShape>,
) {
  return Object.entries(metadataTheme)
    .map(([_, tokenGroup]) => getMetadataTokenGroupVars(tokenGroup))
    .join('');
}

/**
 * Creates CSS custom properties from a variant theme
 * replacing `value` with `valueExperimental`.
 */
export function getMetadataThemeVariantVarsExperimental(
  metadataTheme: MetadataThemeVariantShape,
) {
  return Object.entries(metadataTheme)
    .map((entry) => {
      const [_, metadataTokenGroup] = entry as Entry<MetadataThemeVariantShape>;

      const metadataTokenGroupExperimental = Object.fromEntries(
        Object.entries(metadataTokenGroup)
          // Only include tokens with `valueExperimental` prop
          .filter(([_, metadataTokenProperties]) =>
            Boolean(metadataTokenProperties.valueExperimental),
          )
          // Move `valueExperimental` to `value` position
          .map(
            ([
              tokenName,
              metadataTokenProperties,
            ]): Entry<MetadataTokenGroupShape> => [
              tokenName,
              {value: metadataTokenProperties.valueExperimental!},
            ],
          ),
      );

      return getMetadataTokenGroupVars(metadataTokenGroupExperimental);
    })
    .join('');
}

/** Creates CSS custom properties from a token group. */
export function getMetadataTokenGroupVars(
  metadataTokenGroup: MetadataTokenGroupShape,
) {
  return Object.entries(metadataTokenGroup)
    .map(([token, {value}]) =>
      token.startsWith('motion-keyframes') || token.startsWith('keyframes')
        ? `--p-${token}:p-${token};`
        : `--p-${token}:${value};`,
    )
    .join('');
}

/** Creates `@keyframes` rules for `motion-keyframes-*` tokens. */
export function getKeyframes(motion: MetadataTokenGroupShape) {
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
  :root{color-scheme:light;${getMetadataThemeVars(metadataThemeBase)}}
  html.Polaris-Summer-Editions-2023{${getMetadataThemeVariantVarsExperimental(
    legacyMetadata,
  )}}
  html.p-theme-light{${getMetadataThemeVars(metadataThemePartialLight)}}
  html.p-theme-light-high-contrast{${getMetadataThemeVars(
    metadataThemePartialHighContrast,
  )}}

  ${getKeyframes(legacyMetadata.motion)}
`;
  // TODO: Add support for multi-theme keyframes

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(sassOutputPath, styles);
}
