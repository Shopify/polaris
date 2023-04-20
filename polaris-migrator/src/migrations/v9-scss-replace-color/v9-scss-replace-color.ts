import type {FileInfo, API, Options} from 'jscodeshift';
import postcss from 'postcss';
import type {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';
import {createVar} from '@shopify/polaris-tokens';

import {
  namespace,
  getFunctionArgs,
  stripQuotes,
  StopWalkingFunctionNodes,
} from '../../utilities/sass';
import type {NamespaceOptions} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

import {colors as tokenColors} from './v9-legacy-colors';

export default function scssReplaceColor(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedColor = namespace('color', options);

  return {
    postcssPlugin: 'v9-scss-replace-color',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      if (!isKeyOf(propertyMaps, decl.prop)) return;
      const replacementMap = propertyMaps[decl.prop];
      const parsed = valueParser(decl.value);

      parsed.walk((node) => {
        if (node.type !== 'function') return;

        if (node.value === 'rgba') {
          return StopWalkingFunctionNodes;
        }

        // 1. Remove color() fallbacks
        if (node.value === 'var') {
          const args = getFunctionArgs(node);
          const polarisCustomPropertyIndex = args.findIndex((arg) =>
            polarisCustomPropertyRegEx.test(arg),
          );
          const colorFnFallbackIndex = args.findIndex((arg) =>
            arg.startsWith(namespacedColor),
          );

          if (polarisCustomPropertyIndex < colorFnFallbackIndex) {
            node.nodes = [node.nodes[0]];
          }

          return StopWalkingFunctionNodes;
        }

        // 2. Replace `color()` with variable
        if (node.value === namespacedColor) {
          const colorFnArgs = getFunctionArgs(node).map(stripQuotes);
          const hue = colorFnArgs[0] ?? '';
          const value = colorFnArgs[1] ?? 'base';
          const forBackground = colorFnArgs[2];

          // Skip color() with for-background argument
          if (forBackground) return;

          // Skip if we don't have a color for the hue and value
          if (
            !(
              isKeyOf(replacementMap, hue) &&
              isKeyOf(replacementMap[hue], value)
            )
          )
            return;

          const colorCustomProperty: string = replacementMap[hue][value];

          node.value = 'var';
          node.nodes = [
            {
              type: 'word',
              value: colorCustomProperty,
              sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
              sourceEndIndex: colorCustomProperty.length,
            },
          ];
        }
      });

      decl.value = parsed.toString();

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

/*
 * See the legacy Sass API file for the original color palette
 * documentation/guides/legacy-polaris-v8-public-api.scss
 */

const colorMap = {
  blue: {
    dark: '--p-interactive-hovered',
    base: '--p-interactive',
  },
  green: {
    dark: '--p-text-success',
    base: '--p-text-success',
  },
  yellow: {
    dark: '--p-text-warning',
    base: '--p-text-warning',
  },
  red: {
    dark: '--p-text-critical',
    base: '--p-text-critical',
  },
  ink: {
    base: '--p-text',
    light: '--p-text-subdued',
    lighter: '--p-text-subdued',
    lightest: '--p-text-subdued',
  },
  sky: {
    dark: '--p-text-subdued-on-dark',
    base: '--p-text-on-dark',
    light: '--p-text-on-dark',
    lighter: '--p-text-on-dark',
  },
  black: {
    base: '--p-text',
  },
  white: {
    base: '--p-text-on-dark',
  },
};

const backgroundColorMap = {
  green: {
    light: '--p-surface-success',
    lighter: '--p-surface-success-subdued',
  },
  yellow: {
    light: '--p-surface-warning',
    lighter: '--p-surface-warning-subdued',
  },
  red: {
    light: '--p-surface-critical',
    lighter: '--p-surface-critical-subdued',
  },
  ink: {
    dark: '--p-surface-dark',
    base: '--p-surface-neutral-subdued-dark',
  },
  sky: {
    base: '--p-surface-neutral',
    light: '--p-surface-neutral-subdued',
    lighter: '--p-surface-subdued',
  },
  black: {
    base: '--p-surface-dark',
  },
  white: {
    base: '--p-surface',
  },
};

const borderColorMap = {
  green: {
    dark: '--p-border-success',
    base: '--p-border-success',
    light: '--p-border-success-subdued',
    lighter: '--p-border-success-subdued',
  },
  yellow: {
    dark: '--p-border-warning',
    base: '--p-border-warning',
    light: '--p-border-warning-disabled',
    lighter: '--p-border-warning-subdued',
  },
  red: {
    dark: '--p-border-critical',
    base: '--p-border-critical',
    light: '--p-border-critical-subdued',
    lighter: '--p-border-critical-subdued',
  },
  ink: {
    lightest: '--p-border',
  },
  sky: {
    light: '--p-border-subdued',
  },
};

const fillColorMap = {
  green: {
    dark: '--p-icon-success',
    base: '--p-icon-success',
  },
  yellow: {
    dark: '--p-icon-warning',
    base: '--p-icon-warning',
  },
  red: {
    dark: '--p-icon-critical',
    base: '--p-icon-critical',
  },
  ink: {
    base: '--p-icon',
    light: '--p-icon',
    lighter: '--p-icon-subdued',
    lightest: '--p-icon-disabled',
  },
  black: {
    base: '--p-icon',
  },
  white: {
    base: '--p-icon-on-dark',
  },
};

const propertyMaps = {
  color: colorMap,
  background: backgroundColorMap,
  'background-color': backgroundColorMap,
  border: borderColorMap,
  'border-color': borderColorMap,
  fill: fillColorMap,
};

const polarisCustomPropertyRegEx = new RegExp(
  Object.keys(tokenColors).map(createVar).join('|'),
);
