import type {API, FileInfo} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';

export default async function transformer(file: FileInfo, _: API) {
  return postcss(plugin()).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const BREAKPOINTS = new Set([
  'mixins.admin-app-recommendations-tile-breakpoint',
]);

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'admin-scss-replace-app-recommendations-title-breakpoints',
    AtRule(atRule) {
      console.log(atRule.params);
      if (atRule.name === 'include' && BREAKPOINTS.has(atRule.params)) {
        const match = /mixins\.(?<breakpoint>.*)-breakpoint/.exec(atRule.params);

        if (match && match.groups) {
          atRule.name = 'media';
          atRule.params = `(--${match.groups.breakpoint})`;
        }
      }
    },
  };
};
