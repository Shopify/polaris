import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

const processed = Symbol('processed');

const plugin = (): Plugin => ({
  postcssPlugin: 'replace-sass-border',
  Declaration(decl) {
    // @ts-expect-error - Skip if processed so we don't process it again
    if (decl[processed]) return;

    // const prop = decl.prop;
    const parsedValue = valueParser(decl.value);

    parsedValue.walk((node) => {
      if (!(node.type === 'function' && node.value === 'hello')) return;

      node.value = 'world';
    });

    decl.value = parsedValue.toString();

    // @ts-expect-error - Mark the declaration as processed
    decl[processed] = true;
  },
});

export default function replaceSassBorder(fileInfo: FileInfo) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
