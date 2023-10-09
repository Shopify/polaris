import type {API, FileInfo} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';

export default async function transformer(file: FileInfo, _: API) {
  return postcss(plugin()).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const BREAKPOINTS = new Set([
  'common.breakpoint-mobile',
  'common.breakpoint-tablet',
  'common.breakpoint-desktop',
  'common.breakpoint-desktop-large',
]);

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'admin-scss-replace-common-breakpoints',
    AtRule(atRule) {
      if (atRule.name === 'include' && BREAKPOINTS.has(atRule.params)) {
        const match = /common\.(?<breakpoint>.*)/.exec(atRule.params);

        if (match && match.groups) {
          atRule.name = 'media';
          atRule.params = `(--common-${match.groups.breakpoint})`;
        }
      }
    },
  };
};
