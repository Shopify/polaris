import valueParser from 'postcss-value-parser';

import {
  namespace,
  isSassFunction,
  isNumericOperator,
  createSassMigrator as v9ScssReplaceEasing,
  setNodeValue,
  StopWalkingFunctionNodes,
  hasSassFunction,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/types';
import {scss} from '../../utilities/constants';

export const extensions = scss.extensions;
export const options = {
  ...scss.options,
};

export default v9ScssReplaceEasing(
  'v9-scss-replace-easing',
  (_, {methods, options}, context) => {
    const namespacedEasing = namespace('easing', options);

    return (root) => {
      methods.walkDecls(root, (decl) => {
        const parsedValue = valueParser(decl.value);

        if (!hasSassFunction(namespacedEasing, parsedValue)) return;

        parsedValue.walk((node) => {
          if (isNumericOperator(node)) {
            methods.report({
              node: decl,
              severity: 'warning',
              message: 'Numeric operator detected.',
            });
            return;
          }

          if (isSassFunction(namespacedEasing, node)) {
            const easing = node.nodes[0]?.value ?? DEFAULT_EASING;

            if (!isKeyOf(easingMap, easing)) {
              const comment = deprecatedEasingFuncs.includes(easing)
                ? `The ${easing} easing function is no longer available in Polaris. See https://polaris.shopify.com/tokens/motion for possible values.`
                : `Unexpected easing function '${easing}'.`;

              methods.report({
                severity: 'warning',
                node: decl,
                message: comment,
              });

              return StopWalkingFunctionNodes;
            }

            const easingCustomProperty = easingMap[easing];
            const targetValue = `var(${easingCustomProperty})`;

            if (context.fix) {
              setNodeValue(node, targetValue);
            } else {
              methods.report({
                severity: 'error',
                node: decl,
                message: `Replace easing function with token: ${targetValue}`,
              });
            }

            return StopWalkingFunctionNodes;
          }
        });

        if (context.fix) {
          decl.value = parsedValue.toString();
        }
      });
    };
  },
);

const DEFAULT_EASING = 'base';

const easingMap = {
  base: '--p-ease',
  in: '--p-ease-in',
  out: '--p-ease-out',
};

const deprecatedEasingFuncs = ['anticipate', 'excite', 'overshoot'];
