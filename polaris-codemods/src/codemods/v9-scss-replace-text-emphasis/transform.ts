import type {FileInfo, API, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';

import type {NamespaceOptions} from '../../utilities/sass';
import {getNamespacePattern} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/types';
import {scss} from '../../utilities/constants';

export const extensions = scss.extensions;
export const options = {
  ...scss.options,
};

export default function transformer(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacePattern = getNamespacePattern(options);

  const namespacedMixinRegExp = new RegExp(
    String.raw`^${namespacePattern}([\w-]+)`,
  );

  return {
    postcssPlugin: 'v9-scss-replace-text-emphasis',
    AtRule(atRule) {
      if (atRule.name !== 'include') return;

      // Extract mixin name e.g. name from `@include name;` or `@include name();`
      const mixinName = atRule.params.match(namespacedMixinRegExp)?.[1];

      if (!isKeyOf(staticMixins, mixinName)) return;

      atRule.replaceWith(
        ...Object.entries(staticMixins[mixinName]).map(([prop, value]) =>
          postcss.decl({
            prop,
            value,
          }),
        ),
      );
    },
  };
};

/** Mapping of static mixins to replacement declarations */
const staticMixins = {
  // Note: The below mixins do accept arguments, but the logic has
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
