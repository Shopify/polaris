import type {FileInfo, API} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node} from 'postcss-value-parser';

import {isKeyOf} from '../../utilities/type-guards';
import {
  getFunctionArgs,
  isPolarisVar,
  isSassFunction,
} from '../../utilities/sass';

export default function scssReplaceZeroValues(
  fileInfo: FileInfo,
  _: API,
  methods: any,
) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'styles-replace-deprecated-custom-properties',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let needsFix = false;
      const parsedValue = valueParser(decl.value);

      parsedValue.walk((node: Node) => {
        if (isSassFunction('var', node)) {
          const args = getFunctionArgs(node);

          if (args.length !== 1) {
            // methods.report({
            //   node: decl,
            //   severity: 'error',
            //   message: `More than 1 argument, got ${args.length}`,
            // });
            return;
          }

          if (
            isPolarisVar(node) &&
            (isKeyOf(deprecatedValuesMap, node.nodes?.[0]?.value) ||
              isKeyOf(deprecatedTokenMap, node.nodes?.[0]?.value))
          ) {
            needsFix = true;

            if (isKeyOf(deprecatedTokenMap, node.nodes?.[0]?.value)) {
              node.nodes = [
                {
                  type: 'word',
                  value: deprecatedTokenMap[node.nodes?.[0]?.value],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex:
                    deprecatedTokenMap[node.nodes?.[0]?.value].length,
                },
              ];
            }

            if (isKeyOf(deprecatedValuesMap, node.nodes?.[0]?.value)) {
              // @ts-expect-error - Reassign the type to word
              node.type = 'word';
              node.value = deprecatedValuesMap[node.nodes?.[0]?.value];
            }
          }
        }
      });

      if (needsFix) {
        decl.value = parsedValue.toString();
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

const deprecatedValuesMap = {
  '--p-text-field-focus-ring-border-radius': '7px',
  '--p-badge-mix-blend-mode': 'luminosity',
  '--p-override-transparent': 'transparent',
  '--p-non-null-content': '""',
  '--p-duration-0': '0',
  '--p-shadow-from-ambient-light': 'rgba(23, 24, 24, 0.05)',
  '--p-shadow-from-dim-light': 'rgba(0, 0, 0, 0.2)',
  '--p-shadow-from-direct-light': 'rgba(0, 0, 0, 0.15)',
  '--p-shadow-transparent': '0 0 0 0 transparent',
  '--p-range-slider-thumb-scale': '1.5',
  '--p-frame-offset': '0',
  '--p-space-0': '0',
  '--p-override-none': 'none',
  '--p-override-one': '1',
  '--p-override-visible': 'visible',
  '--p-override-zero': '0',
};

const deprecatedTokenMap = {
  '--p-border-radius-base': '--p-border-radius-1',
  '--p-border-radius-full': '--p-border-radius-half',
  '--p-border-radius-slim': '--p-border-radius-05',
  '--p-border-radius-wide': '--p-border-radius-2',
  '--p-badge-font-weight': '--p-font-weight-regular',
  '--p-button-font-weight': '--p-font-weight-medium',
  '--p-z-1': '--p-z-index-1',
  '--p-z-2': '--p-z-index-2',
  '--p-z-3': '--p-z-index-3',
  '--p-z-4': '--p-z-index-4',
  '--p-z-5': '--p-z-index-5',
  '--p-z-6': '--p-z-index-6',
  '--p-z-7': '--p-z-index-7',
  '--p-z-8': '--p-z-index-8',
  '--p-z-9': '--p-z-index-9',
  '--p-z-10': '--p-z-index-10',
  '--p-z-11': '--p-z-index-11',
  '--p-z-12': '--p-z-index-12',
  '--p-duration-1-0-0': '--p-duration-100',
  '--p-duration-1-5-0': '--p-duration-150',
  '--p-button-drop-shadow': '--p-shadow-button',
  '--p-button-inner-shadow': '--p-shadows-inset-button',
  '--p-button-pressed-inner-shadow': '--p-shadows-inset-button-pressed',
  '--p-card-shadow': '--p-shadow-card',
  '--p-modal-shadow': '--p-shadow-modal',
  '--p-popover-shadow': '--p-shadow-popover',
  '--p-top-bar-shadow': '--p-shadow-top-bar',
  '--p-icon-size': '--p-icon-size-small',
};
