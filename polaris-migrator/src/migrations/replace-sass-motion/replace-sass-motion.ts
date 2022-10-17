import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin, Declaration, Helpers} from 'postcss';
import valueParser, {ParsedValue, Node} from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  NamespaceOptions,
  namespace,
  isSassFunction,
  hasNumericOperator,
  isTransformableDuration,
  isPolarisVar,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

const processed = Symbol('processed');
const DEFAULT_DURATION = 'base';

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

interface ParsedValueDeclaration extends Declaration {
  [processed]?: boolean;
  parsedValue: ParsedValue;
}

// postcss doesn't export this, so had to extract it to here
type DeclarationProcessor = (
  decl: Declaration,
  helper: Helpers,
) => Promise<void> | void;

// Inject the parsed values into the AST for processing
function withParsedValue(
  fn: (decl: ParsedValueDeclaration, helper: Helpers) => void,
) {
  return ((decl: ParsedValueDeclaration, helper: Helpers) => {
    // Skip if processed so we don't process it again
    if (decl[processed]) return;

    decl.parsedValue = valueParser(decl.value);

    const result = fn(decl, helper);

    decl.value = decl.parsedValue.toString();

    // Mark the declaration as processed
    decl[processed] = true;

    return result;
  }) as DeclarationProcessor;
}

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const durationFunc = namespace('duration', options);

  function mutateTransitionDurationValue(
    node: Node,
    decl: ParsedValueDeclaration,
  ): boolean {
    if (isPolarisVar(node)) {
      return true;
    }

    if (isSassFunction(durationFunc, node)) {
      const duration = node.nodes[0]?.value ?? DEFAULT_DURATION;

      if (isKeyOf(durationFuncMap, duration)) {
        const durationCustomProperty = durationFuncMap[duration];
        setNodeValue(node, `var(${durationCustomProperty})`);
      } else {
        decl.before(
          postcss.comment({
            text: `${POLARIS_MIGRATOR_COMMENT} Unknown duration key '${duration}'.`,
          }),
        );
      }

      return true;
    }

    const unit = valueParser.unit(node.value);
    if (unit) {
      const constantDuration = `${normaliseStringifiedNumber(unit.number)}${
        unit.unit
      }`;

      if (isKeyOf(durationConstantsMap, constantDuration)) {
        const durationCustomProperty = durationConstantsMap[constantDuration];

        setNodeValue(node, `var(${durationCustomProperty})`);
      } else {
        decl.before(
          postcss.comment({
            text: `${POLARIS_MIGRATOR_COMMENT} No matching duration token for '${constantDuration}'.`,
          }),
        );
      }

      return true;
    }

    return false;
  }

  function mutateTransitionDelayValue(
    node: Node,
    decl: ParsedValueDeclaration,
  ): boolean {
    // For now, we treat delays like durations
    return mutateTransitionDurationValue(node, decl);
  }

  function mutateTransitionShorthandValue(decl: ParsedValueDeclaration): void {
    const splitValues: Node[][] = [[]];

    // Gathering up references of nodes into groups. Important to note that
    // we're dealing with mutable structures here, so we are purposefully
    // NOT making copies.
    decl.parsedValue.nodes.forEach((node) => {
      if (node.type === 'div') {
        splitValues.push([]);
      } else {
        splitValues.at(-1)!.push(node);
      }
    });

    splitValues.forEach((nodes) => {
      mutateSingleTransitionShorthandValue(nodes, decl);
    });
  }

  function mutateSingleTransitionShorthandValue(
    nodes: Node[],
    decl: ParsedValueDeclaration,
  ): void {
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
      if (isTransformableDuration(unit) || isSassFunction(durationFunc, node)) {
        timings.push(node);
      } else {
        // TODO: Try process it as an easing function
      }
    });

    if (timings[0]) {
      if (!mutateTransitionDurationValue(timings[0], decl)) {
        decl.before(
          postcss.comment({
            text: POLARIS_MIGRATOR_COMMENT,
          }),
        );
      }
    }

    if (timings[1]) {
      if (!mutateTransitionDelayValue(timings[1], decl)) {
        decl.before(
          postcss.comment({
            text: POLARIS_MIGRATOR_COMMENT,
          }),
        );
      }
    }
  }

  return {
    postcssPlugin: 'replace-sass-motion',
    Declaration: {
      'transition-duration': withParsedValue((decl) => {
        if (hasNumericOperator(decl.parsedValue)) {
          decl.before(
            postcss.comment({
              text: POLARIS_MIGRATOR_COMMENT,
            }),
          );
          return;
        }

        decl.parsedValue.nodes.forEach((node) => {
          if (!mutateTransitionDurationValue(node, decl)) {
            decl.before(
              postcss.comment({
                text: POLARIS_MIGRATOR_COMMENT,
              }),
            );
          }
        });
      }),

      'transition-delay': withParsedValue((decl) => {
        if (hasNumericOperator(decl.parsedValue)) {
          decl.before(
            postcss.comment({
              text: POLARIS_MIGRATOR_COMMENT,
            }),
          );
          return;
        }

        decl.parsedValue.nodes.forEach((node) => {
          if (!mutateTransitionDelayValue(node, decl)) {
            decl.before(
              postcss.comment({
                text: POLARIS_MIGRATOR_COMMENT,
              }),
            );
          }
        });
      }),

      transition: withParsedValue((decl) => {
        if (hasNumericOperator(decl.parsedValue)) {
          decl.before(
            postcss.comment({
              text: POLARIS_MIGRATOR_COMMENT,
            }),
          );
          return;
        }

        mutateTransitionShorthandValue(decl);
      }),
    },
  };
};

export default function replaceSassMotion(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
