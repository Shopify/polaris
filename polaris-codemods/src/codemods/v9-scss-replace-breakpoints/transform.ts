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
    postcssPlugin: 'v9-scss-replace-breakpoints',
    AtRule(atRule) {
      if (atRule.name !== 'include') return;

      // Extract mixin name e.g. name from `@include name;` or `@include name();`
      const mixinName = atRule.params.match(namespacedMixinRegExp)?.[1];

      if (!isKeyOf(staticBreakpointMixins, mixinName)) return;

      atRule.assign({
        name: 'media',
        params: staticBreakpointMixins[mixinName],
      });
    },
  };
};

/** Mapping of static breakpoint mixins from old to new */
const staticBreakpointMixins = {
  'page-content-when-partially-condensed': '#{$p-breakpoints-lg-down}',
  'page-content-when-not-partially-condensed': '#{$p-breakpoints-md-up}',
  'page-content-when-fully-condensed': '#{$p-breakpoints-sm-down}',
  'page-content-when-not-fully-condensed': '#{$p-breakpoints-sm-up}',
  'page-content-when-layout-stacked': '#{$p-breakpoints-lg-down}',
  'page-content-when-layout-not-stacked': '#{$p-breakpoints-md-up}',
  'page-before-resource-list-small': '#{$p-breakpoints-sm-down}',
  'page-after-resource-list-small': '#{$p-breakpoints-sm-up}',
  'page-when-not-max-width': '#{$p-breakpoints-lg-down}',
  'when-typography-condensed': '#{$p-breakpoints-md-down}',
  'when-typography-not-condensed': '#{$p-breakpoints-md-up}',
  'frame-when-nav-hidden': '#{$p-breakpoints-md-down}',
  'frame-when-nav-displayed': '#{$p-breakpoints-md-up}',
  'frame-with-nav-when-not-max-width': '#{$p-breakpoints-lg-down}',
  'after-topbar-sheet': '#{$p-breakpoints-sm-up}',
};
