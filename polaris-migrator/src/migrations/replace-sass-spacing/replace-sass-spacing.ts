import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node} from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

const defaultVariant = 'defaultVariant';

/** Mapping of spacing variants to new custom properties */
const spacingVariantMap = {
  none: '--p-space-0',
  'extra-tight': '--p-space-1',
  tight: '--p-space-2',
  'base-tight': '--p-space-3',
  [defaultVariant]: '--p-space-4',
  base: '--p-space-4',
  loose: '--p-space-5',
  'extra-loose': '--p-space-8',
};

const isSpacingVariant = (
  variant: unknown,
): variant is keyof typeof spacingVariantMap =>
  Object.keys(spacingVariantMap).includes(variant as string);

// https://sass-lang.com/documentation/operators/numeric
function isNumericOperator(node: Node): boolean {
  return (
    node.value === '+' ||
    node.value === '-' ||
    node.value === '*' ||
    node.value === '/' ||
    node.value === '%'
  );
}

const plugin = (): Plugin => ({
  postcssPlugin: 'ReplaceSassSpacing',
  Declaration(decl) {
    const parsed = valueParser(decl.value);

    if (parsed.nodes.some(isNumericOperator)) {
      // Insert comment if the value contains calculations
      decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
      return;
    }

    parsed.walk((node) => {
      if (!(node.type === 'function' && node.value === 'spacing')) return;

      const spacingVariant = node.nodes[0]?.value ?? defaultVariant;

      if (!isSpacingVariant(spacingVariant)) return;

      const spacingCustomProperty = spacingVariantMap[spacingVariant];

      node.value = 'var';
      node.nodes = [
        {
          type: 'word',
          value: spacingCustomProperty,
          sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
          sourceEndIndex: spacingCustomProperty.length,
        },
        ...node.nodes.slice(1),
      ];
    });

    decl.value = parsed.toString();
  },
});

export default function replaceSassSpacing(file: FileInfo) {
  return postcss(plugin()).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}
