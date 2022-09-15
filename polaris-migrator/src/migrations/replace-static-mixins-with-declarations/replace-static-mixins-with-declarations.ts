import {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';

/** Mapping of static mixins to replacement declarations */
const staticMixins = {
  // Note: The below mixins do accept arguments, but that logic has
  // since been removed from the mixins.
  'text-emphasis-subdued': {
    color: 'var(--p-text-subdued)',
  },
  'text-emphasis-strong': {
    'font-weight': 'var(--p-font-weight-semibold)',
  },
  'text-emphasis-normal': {
    color: 'var(--p-text)',
    'font-weight': 'var(--p-font-weight-regular)',
  },
};

const isStaticMixin = (
  mixinName: unknown,
): mixinName is keyof typeof staticMixins =>
  Object.keys(staticMixins).includes(mixinName as string);

const plugin = (): Plugin => ({
  postcssPlugin: 'ReplaceStaticMixinsWithDeclarations',
  AtRule(atRule) {
    if (atRule.name !== 'include') return;

    // Extract mixin name e.g. name from `@include name;` or `@include name();`
    const mixinName = atRule.params.match(/^([a-zA-Z0-9_-]+)/)?.[1];

    if (!isStaticMixin(mixinName)) return;

    atRule.replaceWith(
      ...Object.entries(staticMixins[mixinName]).map(([prop, value]) =>
        postcss.decl({
          prop,
          value,
        }),
      ),
    );
  },
});

export default function replaceStaticMixinsWithDeclarations(
  fileInfo: FileInfo,
) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
