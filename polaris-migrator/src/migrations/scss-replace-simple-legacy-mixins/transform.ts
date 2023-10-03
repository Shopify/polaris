import type {API, FileInfo, Options} from 'jscodeshift';
import type {AtRule, Plugin} from 'postcss';
import postcss from 'postcss';
import stylelint from 'stylelint';

const SUPPORTED_MIXINS = [
  'legacy-polaris-v8.no-focus-ring',
  'legacy-polaris-v8.visually-hidden',
  'legacy-polaris-v8.base-button-disabled',
  'legacy-polaris-v8.unstyled-button',
  'legacy-polaris-v8.unstyled-link',
  'legacy-polaris-v8.unstyled-list',
  'legacy-polaris-v8.text-breakword',
  'legacy-polaris-v8.truncate',
  'legacy-polaris-v8.skeleton-shimmer',
  'legacy-polaris-v8.skeleton-content',
];

const plugin = (): Plugin => {
  const atUses: AtRule[] = [];
  const mixins: AtRule[] = [];

  return {
    postcssPlugin: 'scss-replace-simple-legacy-mixins',
    AtRule(atRule) {
      if (atRule.name === 'include') {
        mixins.push(atRule);
      }

      if (atRule.name === 'use') {
        atUses.push(atRule);
      }
    },
    RootExit() {
      if (
        atUses.length !== 1 ||
        atUses[0].params !== "'global-styles/legacy-polaris-v8'"
      ) {
        return;
      }

      if (mixins.some((mixin) => !SUPPORTED_MIXINS.includes(mixin.params))) {
        return;
      }

      mixins.forEach((mixin) => {
        const prevNode = mixin.prev();

        if (
          prevNode &&
          prevNode.type === 'comment' &&
          prevNode.text.startsWith('stylelint-disable-next-line')
        ) {
          prevNode.remove();
        }

        const declaration = new postcss.Declaration({
          prop: 'composes',
          value: `${mixin.params.replace(
            'legacy-polaris-v8.',
            '',
          )} from 'legacy-polaris-v8.css'`,
        });

        mixin.replaceWith(declaration);
      });

      atUses[0].remove();
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
