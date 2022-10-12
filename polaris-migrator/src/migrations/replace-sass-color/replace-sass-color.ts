import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';
import {colors as tokenColors} from '@shopify/polaris-tokens';

import {
  NamespaceOptions,
  namespace,
  isSassFunction,
  hasSassFunction,
} from '../../utilities/sass';

import {backgroundColorMap, borderColorMap, colorMap} from './color-maps';

const tokenColorsKeys = Object.keys(tokenColors);
const maps = {
  colorMap,
  backgroundColorMap,
  borderColorMap,
};
const propertyMap: {[key: string]: keyof typeof maps} = {
  color: 'colorMap',
  background: 'backgroundColorMap',
  'background-color': 'backgroundColorMap',
  border: 'borderColorMap',
  'border-color': 'borderColorMap',
};

export default function replaceSassColors(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');
const polarisCustomPropertyRegEx = new RegExp(
  String.raw`--p-(${tokenColorsKeys.join('|')})`,
);

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedColor = namespace('color', options);

  return {
    postcssPlugin: 'replace-sass-color',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const parsed = valueParser(decl.value);

      if (!hasSassFunction(namespacedColor, parsed)) return;

      parsed.walk((node) => {
        // 1. Remove color() fallbacks
        if (isSassFunction('var', node)) {
          const {nodes} = node;
          const polarisCustomPropertyIndex = nodes.findIndex(
            (node) =>
              node.type === 'word' &&
              polarisCustomPropertyRegEx.test(node.value),
          );
          const colorFnFallbackIndex = nodes.findIndex((node) =>
            isSassFunction(namespacedColor, node),
          );

          if (polarisCustomPropertyIndex < colorFnFallbackIndex) {
            node.nodes = [nodes[0]];
          }
        }

        if (!isKeyof(propertyMap, decl.prop)) return;
        const propertyMapKey = propertyMap[decl.prop];
        const replacementMap = maps[propertyMapKey];

        // 2. Replace `color()` with variable
        if (!isSassFunction(namespacedColor, node)) return;
        const colorFnArgs = node.nodes.filter((node) => node.type !== 'div');
        const hue = colorFnArgs[0]?.value ?? '';
        const value = colorFnArgs[1]?.value ?? 'base';
        const forBackground = colorFnArgs[2];

        // Skip color() with for-background argument
        if (forBackground) return;

        // Skip if we don't have a color for the hue and value
        if (
          !(isKeyof(replacementMap, hue) && isKeyof(replacementMap[hue], value))
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
      });

      decl.value = parsed.toString();

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

export function isKeyof<T extends {[key: string]: any}>(
  obj: T,
  key: PropertyKey | undefined,
): key is keyof T {
  return Object.keys(obj).includes(key as string);
}
