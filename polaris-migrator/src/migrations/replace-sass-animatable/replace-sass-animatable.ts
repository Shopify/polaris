import {Declaration} from 'postcss';
import valueParser, {
  ParsedValue,
  Node,
  FunctionNode,
} from 'postcss-value-parser';
import falsey from 'falsey';

import {
  namespace,
  isSassFunction,
  isSassVariable,
  hasNumericOperator,
  isTransformableDuration,
  isPolarisVar,
  createSassMigrator,
  PolarisMigrator,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

const DEFAULT_DURATION = 'base';
const DEFAULT_FUNCTION = 'base';

const durationFuncMap = {
  none: '--p-duration-0',
  fast: '--p-duration-100',
  base: '--p-duration-200',
  slow: '--p-duration-300',
  slower: '--p-duration-400',
  slowest: '--p-duration-500',
};

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

const easingFuncMap = {
  base: '--p-ease',
  in: '--p-ease-in',
  out: '--p-ease-out',
};

const easingFuncConstantsMap = {
  linear: '--p-linear',
  ease: '--p-ease',
  'ease-in': '--p-ease-in',
  'ease-out': '--p-ease-out',
  'ease-in-out': '--p-ease-in-out',
};

const deprecatedEasingFuncs = ['anticipate', 'excite', 'overshoot'];

// Per the spec for easing functions:
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

function normaliseStringifiedNumber(number: string): string {
  return Number(number).toString();
}

function setNodeValue(node: Node, value: string): void {
  const {sourceIndex} = node;
  const parsedValue = valueParser(value).nodes[0];
  Object.assign(node, parsedValue);
  // The node we're replacing might be mid-way through a higher-level value
  // string. Eg; 'border: 1px solid', the 'solid' node is 5 characters into the
  // higher-level value, so we need to correct the index here.
  node.sourceIndex += sourceIndex;
  node.sourceEndIndex += sourceIndex;
}

interface Options {
  namespace?: string;
  // later cooerced by falsey()
  withTransition?: string;
  // later cooerced by falsey()
  withAnimation?: string;
}

export default createSassMigrator(
  'replace-sass-animatable',
  (
    _,
    {
      methods,
      options,
    }: {
      methods: Parameters<PolarisMigrator>[1]['methods'];
      options: Options;
    },
    context,
  ) => {
    const durationFunc = namespace('duration', options);
    const withTransition =
      typeof options.withTransition === 'undefined'
        ? true
        : !falsey(options.withTransition);
    const withAnimation =
      typeof options.withAnimation === 'undefined'
        ? true
        : !falsey(options.withAnimation);

    function migrateLegacySassEasingFunction(
      node: FunctionNode,
      decl: Declaration,
    ) {
      const easingFunc = node.nodes[0]?.value ?? DEFAULT_FUNCTION;

      if (!isKeyOf(easingFuncMap, easingFunc)) {
        const comment = deprecatedEasingFuncs.includes(easingFunc)
          ? `The ${easingFunc} easing function is no longer available in Polaris. See https://polaris.shopify.com/tokens/motion for possible values.`
          : `Unexpected easing function '${easingFunc}'.`;

        methods.report({
          severity: 'warning',
          node: decl,
          message: comment,
        });

        return;
      }

      const easingCustomProperty = easingFuncMap[easingFunc];
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
    }

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
          message: `Cannot statically analyse SASS variable ${node.value}.`,
        });
        return;
      }

      if (isSassFunction(durationFunc, node)) {
        const duration = node.nodes[0]?.value ?? DEFAULT_DURATION;

        if (!isKeyOf(durationFuncMap, duration)) {
          methods.report({
            severity: 'warning',
            node: decl,
            message: `Unknown duration key '${duration}'.`,
          });
          return;
        }

        const durationCustomProperty = durationFuncMap[duration];
        const targetValue = `var(${durationCustomProperty})`;

        if (context.fix) {
          setNodeValue(node, targetValue);
        } else {
          methods.report({
            severity: 'error',
            node: decl,
            message: `Replace duration with token: ${targetValue}`,
          });
        }

        return;
      }

      const unit = valueParser.unit(node.value);
      if (unit) {
        const constantDuration = `${normaliseStringifiedNumber(unit.number)}${
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

    function mutateTimingFunctionValue(
      node: Node,
      decl: Declaration,
      {ignoreUnknownFunctions}: {ignoreUnknownFunctions: boolean},
    ): void {
      if (isPolarisVar(node)) {
        return;
      }

      if (isSassVariable(node)) {
        methods.report({
          severity: 'warning',
          node: decl,
          message: `Cannot statically analyse SASS variable ${node.value}.`,
        });
        return;
      }

      if (node.type === 'function') {
        if (node.value === namespace('easing', options)) {
          migrateLegacySassEasingFunction(node, decl);
          return;
        }

        if (ignoreUnknownFunctions) {
          const easingFuncHandlers = {
            [namespace('easing', options)]: migrateLegacySassEasingFunction,
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
        } else {
          insertUnexpectedEasingFunctionComment(node, decl);
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

        if (
          !ignoreUnknownFunctions ||
          cssEasingBuiltinFuncs.includes(node.value)
        ) {
          insertUnexpectedEasingFunctionComment(node, decl);
        }
      }
    }

    function mutateDelayValue(node: Node, decl: Declaration): void {
      // For now, we treat delays like durations
      return mutateDurationValue(node, decl);
    }

    function mutateAnimatableShorthandValue(
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
        // transition-duration/animation-duration, and the second value that can
        // be parsed as a time is assigned to transition-delay/animation-delay.
        // https://w3c.github.io/csswg-drafts/css-transitions-1/#transition-shorthand-property
        //
        // That sounds like an array to me! [0] is duration, [1] is delay.
        const timings: Node[] = [];

        nodes.forEach((node) => {
          const unit = valueParser.unit(node.value);
          if (
            isTransformableDuration(unit) ||
            isSassFunction(durationFunc, node)
          ) {
            timings.push(node);
          } else {
            // This node could be either the property to animate, or an easing
            // function. We try mutate the easing function, but if not we assume
            // it's the property to animate and therefore do not leave a comment.
            mutateTimingFunctionValue(node, decl, {
              ignoreUnknownFunctions: true,
            });
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
          ...(withTransition && {
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
                mutateTimingFunctionValue(node, decl, {
                  ignoreUnknownFunctions: false,
                });
              });
            },
            transition: () => {
              mutateAnimatableShorthandValue(decl, parsedValue);
            },
          }),
          ...(withAnimation && {
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
                mutateTimingFunctionValue(node, decl, {
                  ignoreUnknownFunctions: false,
                });
              });
            },
            animation: () => {
              mutateAnimatableShorthandValue(decl, parsedValue);
            },
          }),
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
