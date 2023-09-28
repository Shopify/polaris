import type {API, FileInfo, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';
import stylelint from 'stylelint';

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'styles-replace-inline-comments',
    Comment(comment) {
      comment.raws.inline = false;
      comment.raws.right = ' ';
      comment.raws.left = ' ';
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
