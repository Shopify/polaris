import type {API, FileInfo, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';
import stylelint from 'stylelint';

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'v8-scss-replace-breakpoint-before-mixin',
    AtRule(atRule) {
      if (atRule.name === 'include') {
        const normalizedParams = atRule.params.split('\n').map(line => line.trim()).join('');

        const match = /legacy-polaris-v8.breakpoint-before\((?<params>.*)\)/.exec(normalizedParams);

        if (match && match.groups) {
          const [breakpoint, inclusive] = postcss.list.comma(match.groups.params)

          atRule.name = 'media';
          atRule.params = `(max-width: #{legacy-polaris-v8.em(${breakpoint})${inclusive === 'false' ? ' - 0.01em' : ''}})`
        }
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
