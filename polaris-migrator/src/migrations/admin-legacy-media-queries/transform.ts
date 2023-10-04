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
    postcssPlugin: 'admin-legacy-media-queries',
    AtRule(atRule) {
      if (atRule.name === 'media' || atRule.name === 'container') {
        atRule.params = atRule.params.replace(
          /#\{media-queries\.\$(?<breakpoint>[^}]*)}/g,
          '(--$1)',
        );
      }
    },
  };
};
