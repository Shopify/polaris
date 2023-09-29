import type {API, FileInfo, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';
import stylelint from 'stylelint';

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'scss-replace-media-query-interpolation',
    AtRule(atRule) {
      if (atRule.name === 'media' || atRule.name === 'container') {
        atRule.params = atRule.params.replace(
          /#\{media-queries\.\$(?<breakpoint>[^}]*)}/g,
          '(env(--$1))',
        );
      }

      if (
        atRule.name === 'use' &&
        atRule.params === "'global-styles/media-queries'"
      ) {
        atRule.remove();
      }
    },
  };
};

export default async function transformer(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss([
    stylelint({
      config: {
        extends: [options.config ?? '@shopify/stylelint-polaris'],
      },
    }) as Plugin,
    plugin(),
  ])
    .process(file.source, {
      from: file.path,
      syntax: require('postcss-scss'),
    })
    .then((result) => {
      return result.css;
    });
}
