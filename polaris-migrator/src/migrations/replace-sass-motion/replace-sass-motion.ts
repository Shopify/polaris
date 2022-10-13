import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin, Declaration, Helpers} from 'postcss';
import valueParser from 'postcss-value-parser';

const processed = Symbol('processed');

/*
function mutateTransitionDurationProp(decl): void {}
function mutateTransitionDelayProp(decl): void {}
function mutateTransitionProp(decl): void {}

function mutateTransitionDurationValue(decl, node: unknown): void {}
function mutateTransitionDelayValue(decl, node: unknown): void {}
*/
interface ParsedValueDeclaration extends Declaration {
  [processed]?: boolean;
  parsedValue: valueParser.ParsedValue;
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

const plugin = (): Plugin => ({
  postcssPlugin: 'replace-sass-motion',
  Declaration: {
    'transition-duration': withParsedValue((decl) => {
      console.log('transition-duration');
      // decl.parsedValue.walk((node) => {
      //   console.log(JSON.stringify(node, null, 2));
      // });
    }),
    'transition-delay': withParsedValue((decl) => {
      console.log('transition-delay');
    }),
    transition: withParsedValue((decl) => {
      console.log('transition');
    }),
  },
});

export default function replaceSassMotion(fileInfo: FileInfo) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
