import {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';

import {NamespaceOptions, identRegExp} from '../../utilities/sass';

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

const isStaticMixin = (
  mixinName: unknown,
): mixinName is keyof typeof staticMixins =>
  Object.keys(staticMixins).includes(mixinName as string);

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespaceRegExp = new RegExp(
    options.namespace ? String.raw`(?:${options.namespace}\.)` : '',
  );

  const namespacedMixinRegExp = new RegExp(
    String.raw`^${namespaceRegExp.source}(${identRegExp.source})`,
  );

  return {
    postcssPlugin: 'replace-static-mixins-with-declarations',
    AtRule(atRule) {
      if (atRule.name !== 'include') return;

      // Extract mixin name e.g. name from `@include name;` or `@include name();`
      const mixinName = atRule.params.match(namespacedMixinRegExp)?.[1];

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
  };
};

export default function replaceStaticMixinsWithDeclarations(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
