import type {API, FileInfo} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';

export default async function transformer(file: FileInfo, _: API) {
  return postcss(plugin()).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'admin-replace-breakpoint-after',
    AtRule(atRule) {
      if (atRule.name === 'include') {
        const normalizedParams = atRule.params
          .split('\n')
          .map((line) => line.trim())
          .join('');

        const match =
          /legacy-polaris-v8.breakpoint-after\((?<params>.*)\)/.exec(
            normalizedParams,
          );

        if (match && match.groups) {
          const [breakpoint, inclusive] = postcss.list.comma(
            match.groups.params,
          );

          const condition = inclusive ? `width >` : `min-width:`;
          const breakpointValue = /[.+()]/.test(breakpoint)
            ? `#{${breakpoint}}`
            : breakpoint;

          atRule.name = 'media';
          atRule.params = `(${condition} ${breakpointValue})`;
        }
      }
    },
  };
};
