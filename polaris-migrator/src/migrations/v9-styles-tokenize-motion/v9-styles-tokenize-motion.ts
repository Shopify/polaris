import {Declaration} from 'postcss';
import valueParser, {ParsedValue, Node} from 'postcss-value-parser';

import {
  isSassVariable,
  hasNumericOperator,
  isTransformableDuration,
  isPolarisVar,
  createSassMigrator as v9StylesTokenizeMotion,
  setNodeValue,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

const durationConstantsMap = {
  '0': '--p-duration-0',
  '0s': '--p-duration-0',
  '0ms': '--p-duration-0',
  '50ms': '--p-duration-50',
  '0.05s': '--p-duration-50',
  '100ms': '--p-duration-100',
  '0.1s': '--p-duration-100',
  '150ms': '--p-duration-150',
  '0.15s': '--p-duration-150',
  '200ms': '--p-duration-200',
  '0.2s': '--p-duration-200',
  '250ms': '--p-duration-250',
  '0.25s': '--p-duration-250',
  '300ms': '--p-duration-300',
  '0.3s': '--p-duration-300',
  '350ms': '--p-duration-350',
  '0.35s': '--p-duration-350',
  '400ms': '--p-duration-400',
  '0.4s': '--p-duration-400',
  '450ms': '--p-duration-450',
  '0.45s': '--p-duration-450',
  '500ms': '--p-duration-500',
  '0.5s': '--p-duration-500',
  '5s': '--p-duration-5000',
};

const easingFuncConstantsMap = {
  linear: '--p-linear',
  ease: '--p-ease',
  'ease-in': '--p-ease-in',
  'ease-out': '--p-ease-out',
  'ease-in-out': '--p-ease-in-out',
};

// Per the spec for transition easing functions:
// https://w3c.github.io/csswg-drafts/css-easing/#easing-functions
const cssEasingBuiltinFuncs = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'cubic-bezier',
  'step-start',
  'step-end',
  'steps',
];

function normalizeStringifiedNumber(number: string): string {
  return Number(number).toString();
}

export default v9StylesTokenizeMotion(
  'v9-replace-sass-transition',
  (_, {methods}, context) => {
    function insertUnexpectedEasingFunctionComment(
      node: Node,
      decl: Declaration,
    ) {
      methods.report({
        severity: 'warning',
        node: decl,
        message: `Unexpected easing function '${node.value}'. See https://polaris.shopify.com/tokens/motion for possible values.`,
      });
    }

    function mutateDurationValue(node: Node, decl: Declaration): void {
      if (isPolarisVar(node)) {
        return;
      }

      if (isSassVariable(node)) {
        methods.report({
          severity: 'warning',
          node: decl,
          message: `Cannot statically analyze SCSS variable ${node.value}.`,
        });
        return;
      }

      const unit = valueParser.unit(node.value);
      if (unit) {
        const constantDuration = `${normalizeStringifiedNumber(unit.number)}${
          unit.unit
        }`;

        if (!isKeyOf(durationConstantsMap, constantDuration)) {
          methods.report({
            severity: 'warning',
            node: decl,
            message: `No matching duration token for '${constantDuration}'.`,
          });

          return;
        }

        const durationCustomProperty = durationConstantsMap[constantDuration];
        const targetValue = `var(${durationCustomProperty})`;

        if (context.fix) {
          setNodeValue(node, targetValue);
        } else {
          methods.report({
            severity: 'error',
            node: decl,
            message: `Replace duration value with token: ${targetValue}`,
          });
        }
      }
    }

    function mutateFunctionValue(node: Node, decl: Declaration): void {
      if (isPolarisVar(node)) {
        return;
      }

      if (isSassVariable(node)) {
        methods.report({
          severity: 'warning',
          node: decl,
          message: `Cannot statically analyze SCSS variable ${node.value}.`,
        });
        return;
      }

      if (node.type === 'function') {
        const easingFuncHandlers = {
          // Per the spec, these can all be functions:
          // https://w3c.github.io/csswg-drafts/css-easing/#easing-functions
          linear: insertUnexpectedEasingFunctionComment,
          'cubic-bezier': insertUnexpectedEasingFunctionComment,
          steps: insertUnexpectedEasingFunctionComment,
        };

        if (isKeyOf(easingFuncHandlers, node.value)) {
          easingFuncHandlers[node.value](node, decl);
          return;
        }
      }

      if (node.type === 'word') {
        if (isKeyOf(easingFuncConstantsMap, node.value)) {
          const targetValue = `var(${easingFuncConstantsMap[node.value]})`;

          if (context.fix) {
            setNodeValue(node, targetValue);
          } else {
            methods.report({
              severity: 'error',
              node: decl,
              message: `Replace easing function with token: ${targetValue}`,
            });
          }

          return;
        }

        if (cssEasingBuiltinFuncs.includes(node.value)) {
          insertUnexpectedEasingFunctionComment(node, decl);
        }
      }
    }

    function mutateDelayValue(node: Node, decl: Declaration): void {
      // For now, we treat delays like durations
      return mutateDurationValue(node, decl);
    }

    function mutateShorthandValue(
      decl: Declaration,
      parsedValue: ParsedValue,
    ): void {
      const splitValues: Node[][] = [[]];

      // Gathering up references of nodes into groups. Important to note that
      // we're dealing with mutable structures here, so we are purposefully
      // NOT making copies.
      parsedValue.nodes.forEach((node) => {
        if (node.type === 'div') {
          splitValues.push([]);
        } else {
          splitValues[splitValues.length - 1].push(node);
        }
      });

      splitValues.forEach((nodes) => {
        // From the spec:
        //
        // Note that order is important within the items in this property: the
        // first value that can be parsed as a time is assigned to the
        // transition-duration, and the second value that can be parsed as a
        // time is assigned to transition-delay.
        // https://w3c.github.io/csswg-drafts/css-transitions-1/#transition-shorthand-property
        //
        // That sounds like an array to me! [0] is duration, [1] is delay.
        const timings: Node[] = [];

        nodes.forEach((node) => {
          const unit = valueParser.unit(node.value);
          if (isTransformableDuration(unit)) {
            timings.push(node);
          } else {
            // This node could be either the property to animate, or an easing
            // function. We try mutate the easing function, but if not we assume
            // it's the property to animate and therefore do not leave a comment.
            mutateFunctionValue(node, decl);
          }
        });

        if (timings[0]) {
          mutateDurationValue(timings[0], decl);
        }

        if (timings[1]) {
          mutateDelayValue(timings[1], decl);
        }
      });
    }

    return (root) => {
      methods.walkDecls(root, (decl) => {
        const handlers: {[key: string]: () => void} = {
          'transition-duration': () => {
            parsedValue.nodes.forEach((node) => {
              mutateDurationValue(node, decl);
            });
          },
          'transition-delay': () => {
            parsedValue.nodes.forEach((node) => {
              mutateDelayValue(node, decl);
            });
          },
          'transition-timing-function': () => {
            parsedValue.nodes.forEach((node) => {
              mutateFunctionValue(node, decl);
            });
          },
          transition: () => {
            mutateShorthandValue(decl, parsedValue);
          },
          'animation-duration': () => {
            parsedValue.nodes.forEach((node) => {
              mutateDurationValue(node, decl);
            });
          },
          'animation-delay': () => {
            parsedValue.nodes.forEach((node) => {
              mutateDelayValue(node, decl);
            });
          },
          'animation-timing-function': () => {
            parsedValue.nodes.forEach((node) => {
              mutateFunctionValue(node, decl);
            });
          },
          animation: () => {
            mutateShorthandValue(decl, parsedValue);
          },
        };

        if (!handlers[decl.prop]) {
          return;
        }

        const parsedValue = valueParser(decl.value);

        if (hasNumericOperator(parsedValue)) {
          methods.report({
            node: decl,
            severity: 'warning',
            message: 'Numeric operator detected.',
          });
        }

        handlers[decl.prop]();

        if (context.fix) {
          decl.value = parsedValue.toString();
        }
      });
    };
  },
);
