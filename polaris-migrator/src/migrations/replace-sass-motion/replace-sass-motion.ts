import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin, Declaration, Helpers} from 'postcss';
import valueParser, {ParsedValue, Node} from 'postcss-value-parser';

import {
  NamespaceOptions,
  namespace,
  isSassFunction,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

const processed = Symbol('processed');
const DEFAULT_DURATION = 'base';

const durationMap = {
  // TODO
  none: '--p-duration-0',
};

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
    //decl: ParsedValueDeclaration,
  ): void {
    if (isSassFunction(durationFunc, node)) {
      const duration = node.nodes[0]?.value ?? DEFAULT_DURATION;
      if (!isKeyOf(durationMap, duration)) {
        // TODO: Insert a comment that this function invocation has an invalid
        // parameter
      }
    } else if (true /* isConstantValue */) {
      // TODO
    } else if (true /* isExpression */) {
      // TODO
    }
  }

  //function mutateTransitionDelayValue(decl, node: unknown): void {}

  return {
    postcssPlugin: 'replace-sass-motion',
    Declaration: {
      'transition-duration': withParsedValue((decl) => {
        console.log('transition-duration');
        decl.parsedValue.walk((node) => {
          mutateTransitionDurationValue(node, decl);
        });
      }),
      'transition-delay': withParsedValue((decl) => {
        console.log('transition-delay');
      }),
      transition: withParsedValue((decl) => {
        console.log('transition');
      }),
    },
  };
};

export default function replaceSassMotion(fileInfo: FileInfo) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
