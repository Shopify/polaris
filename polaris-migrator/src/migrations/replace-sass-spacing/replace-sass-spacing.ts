import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node} from 'postcss-value-parser';

// import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  NamespaceOptions,
  namespace,
  isSassFunction,
  isNumericOperator,
} from '../../utilities/sass';

const spacingMap = {
  none: '--p-space-0',
  'extra-tight': '--p-space-1',
  tight: '--p-space-2',
  'base-tight': '--p-space-3',
  '': '--p-space-4',
  base: '--p-space-4',
  loose: '--p-space-5',
  'extra-loose': '--p-space-8',
};

const isSpacing = (spacing: unknown): spacing is keyof typeof spacingMap =>
  Object.keys(spacingMap).includes(spacing as string);

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedSpacing = namespace('spacing', options);

  return {
    postcssPlugin: 'ReplaceSassSpacing',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const parsedValue = valueParser(decl.value);
      const contains = {
        spacingFn: false,
        operator: false,
        mathModule: false,
        calcFn: false,
      };

      // Replace spacing functions with custom properties
      parsedValue.walk((node) => {
        if (isNumericOperator(node)) contains.operator = true;
        if (isSassFunction('math.div', node)) contains.mathModule = true;
        if (isSassFunction('calc', node)) contains.calcFn = true;
        if (isSassFunction(namespacedSpacing, node)) {
          contains.spacingFn = true;
          const spacing = node.nodes[0]?.value ?? '';

          if (!isSpacing(spacing)) return;
          const spacingCustomProperty = spacingMap[spacing];

          node.value = 'var';
          node.nodes = [
            {
              type: 'word',
              value: spacingCustomProperty,
              sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
              sourceEndIndex: spacingCustomProperty.length,
            },
          ];
        }
      });

      parsedValue.walk((node, i, nodes) => {
        // Ignore if there is already a calc()
        if (!node || contains.calcFn) return false;

        // Only process multiplication operators
        if (!(node.type === 'word' && node.value === '*')) return;
        const isWordOrFunction = (node: Node) =>
          node.type === 'word' || node.type === 'function';
        const operatorIndex = i;
        const leftOperandIndex = nodes.findIndex(
          (node, i) => i < operatorIndex && isWordOrFunction(node),
        );
        const rightOperandIndex = nodes.findIndex(
          (node, i) => i > operatorIndex && isWordOrFunction(node),
        );

        // Extract modified operands
        const calcNodes = nodes.slice(leftOperandIndex, rightOperandIndex + 1);

        // Replace expression nodes with a new calc node
        nodes.splice(
          leftOperandIndex,
          rightOperandIndex - leftOperandIndex + 1,
          {
            after: '',
            before: '',
            nodes: calcNodes,
            type: 'function',
            value: 'calc',
          },
        );
      });

      // if (contains.calcFn) {
      //   // Insert comment if the declaration value contains calculations
      //   decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
      //   decl.before(
      //     postcss.comment({text: `${decl.prop}: ${parsedValue.toString()};`}),
      //   );
      // } else {
      //   decl.value = parsedValue.toString();
      // }

      decl.value = parsedValue.toString();

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

export default function replaceSassSpacing(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}
