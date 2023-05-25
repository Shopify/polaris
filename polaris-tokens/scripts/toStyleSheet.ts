import fs from 'fs';
import path from 'path';

import type {Metadata, MetadataGroup} from '../src';
import type {MetadataBase} from '../src/types';

const cssOutputDir = path.join(__dirname, '../dist/css');
const sassOutputDir = path.join(__dirname, '../dist/scss');
const cssOutputPath = path.join(cssOutputDir, 'styles.css');
const sassOutputPath = path.join(sassOutputDir, 'styles.scss');

/**
 * Creates static CSS custom properties.
 * Note: These values don't vary by color-scheme.
 */
export function getStaticCustomProperties(metadata: Metadata) {
  return Object.entries(metadata)
    .map(([_, tokenGroup]) => getCustomProperties(tokenGroup))
    .join('');
}

/**
 * Creates static CSS custom properties overrides.
 * Note: These values don't vary by color-scheme.
 */
export function getStaticCustomPropertiesExperimental(metadata: MetadataBase) {
  return Object.entries(metadata)
    .map(([_, tokenGroup]) =>
      getCustomProperties(
        Object.fromEntries(
          Object.entries(tokenGroup)
            // Only include tokens with `valueExperimental` prop
            .filter(([_, metadataProperties]) =>
              Boolean(metadataProperties.valueExperimental),
            )
            // Move `valueExperimental` to `value` position
            .map(([tokenName, metadataProperties]) => [
              tokenName,
              {value: metadataProperties.valueExperimental!},
            ]),
        ),
      ),
    )
    .join('');
}

/**
 * Creates CSS custom properties for a given metadata object.
 */
export function getCustomProperties(tokenGroup: MetadataGroup) {
  return Object.entries(tokenGroup)
    .map(([token, {value}]) =>
      token.startsWith('motion-keyframes') || token.startsWith('keyframes')
        ? `--p-${token}:p-${token};`
        : `--p-${token}:${value};`,
    )
    .join('');
}

/**
 * Concatenates the `keyframes` token-group into a single string.
 */
export function getKeyframes(motion: MetadataGroup) {
  return Object.entries(motion)
    .filter(
      ([token]) =>
        token.startsWith('motion-keyframes') || token.startsWith('keyframes'),
    )
    .map(([token, {value}]) => `@keyframes p-${token}${value}`)
    .join('');
}

export async function toStyleSheet(metadata: Metadata) {
  if (!fs.existsSync(cssOutputDir)) {
    await fs.promises.mkdir(cssOutputDir, {recursive: true});
  }
  if (!fs.existsSync(sassOutputDir)) {
    await fs.promises.mkdir(sassOutputDir, {recursive: true});
  }

  const styles = `
  :root{color-scheme:light;${getStaticCustomProperties(metadata)}}
  :root:where(.Polaris-Summer-Editions-2023){${getStaticCustomPropertiesExperimental(
    metadata,
  )}}
  ${getKeyframes(metadata.motion)}
`;

  await fs.promises.writeFile(cssOutputPath, styles);
  await fs.promises.writeFile(sassOutputPath, styles);
}
