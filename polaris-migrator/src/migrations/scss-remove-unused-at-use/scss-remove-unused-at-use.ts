import type {FileInfo, API, Options} from 'jscodeshift';
import postcss from 'postcss';
import type {Plugin} from 'postcss';

import {createInlineComment} from '../../utilities/sass';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {matchesStringOrRegExp} from '../../utilities/matchesStringOrRegExp';

interface PluginOptions extends Options {
  url?: string;
}

const plugin = (options: PluginOptions = {}): Plugin => {
  const {url} = options;

  if (!url) {
    throw new Error('Missing required options: url');
  }

  return {
    postcssPlugin: 'scss-remove-unused-at-use',
    Once(root) {
      root.walkAtRules('use', (atRule) => {
        const atUseParams = atRule.params.replace(/(\s|\n|\r\n?)+/g, ' ');
        const atUseURL = atUseParams.match(/(['"])(.+?)\1/)?.[2] ?? '';
        const atUseAsNamespace = atUseParams
          .match(/\sas\s+(.+?)(\s|$)/)?.[1]
          ?.trim();

        // Didn't find the target import in file
        if (!atUseURL || !matchesStringOrRegExp(atUseURL, url)) {
          return;
        }

        // const namespace = atUseParams.match(/as\s*((?:[^\s;])+)/)?.[1];
        const atUseURLNamespace = atUseURL.split('/').pop();
        const atUseNamespace = atUseAsNamespace || atUseURLNamespace;

        // Comment if the namespace is using an alias
        if (atUseNamespace === '*') {
          atRule.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
          return;
        }

        // Remove target import
        if (!root.source?.input.css.includes(`${atUseNamespace}.`)) {
          atRule.remove();
        }
      });
    },
  };
};

export default function scssRemoveUnusedImport(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}
