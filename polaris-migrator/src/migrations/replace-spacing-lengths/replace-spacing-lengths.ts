import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  createInlineComment,
  getFunctionArgs,
  isNumericOperator,
  isSassFunction,
  isTransformableLength,
  namespace,
  NamespaceOptions,
  toTransformablePx,
  StopWalkingFunctionNodes,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function replaceSpacingLengths(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedRem = namespace('rem', options);

  return {
    postcssPlugin: 'replace-sass-space',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      if (!spaceProps.has(decl.prop)) return;

      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */
      const targets: {replaced: boolean}[] = [];
      let hasNumericOperator = false;
      const parsedValue = valueParser(decl.value);

      handleSpaceProps();

      if (targets.some(({replaced}) => !replaced || hasNumericOperator)) {
        decl.before(
          createInlineComment(POLARIS_MIGRATOR_COMMENT, {prose: true}),
        );
        decl.before(
          createInlineComment(`${decl.prop}: ${parsedValue.toString()};`),
        );
      } else {
        decl.value = parsedValue.toString();
      }

      //
      // Handlers
      //

      function handleSpaceProps() {
        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }

            const dimension = valueParser.unit(node.value);

            if (!isTransformableLength(dimension)) return;

            targets.push({replaced: false});

            const valueInPx = toTransformablePx(node.value);

            if (!isKeyOf(spaceMap, valueInPx)) return;

            targets.pop()!.replaced = true;

            node.value = `var(${spaceMap[valueInPx]})`;
            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const valueInPx = toTransformablePx(args[0]);

              if (!isKeyOf(spaceMap, valueInPx)) return;

              targets.pop()!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: spaceMap[valueInPx],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: spaceMap[valueInPx].length,
                },
              ];
            }

            return StopWalkingFunctionNodes;
          }
        });
      }
    },
  };
};

const globalValues = new Set(['inherit', 'initial', 'unset']);

const spaceProps = new Set([
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-inline',
  'padding-inline-start',
  'padding-inline-end',
  'padding-block',
  'padding-block-start',
  'padding-block-end',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',
  'margin-block',
  'margin-block-start',
  'margin-block-end',
  'gap',
  'grid-gap',
  'row-gap',
  'grid-row-gap',
  'column-gap',
  'grid-column-gap',
]);

const spaceMap = {
  '1px': '--p-space-025',
  '2px': '--p-space-05',
  '4px': '--p-space-1',
  '8px': '--p-space-2',
  '12px': '--p-space-3',
  '16px': '--p-space-4',
  '20px': '--p-space-5',
  '24px': '--p-space-6',
  '32px': '--p-space-8',
  '40px': '--p-space-10',
  '48px': '--p-space-12',
  '64px': '--p-space-16',
  '80px': '--p-space-20',
  '96px': '--p-space-24',
  '112px': '--p-space-28',
  '128px': '--p-space-32',
} as const;
