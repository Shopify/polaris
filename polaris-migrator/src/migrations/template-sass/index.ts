/* eslint-disable @typescript-eslint/ban-ts-comment */
import postcss, {Plugin} from 'postcss';

import type {MigrationFn} from '../../types';

const plugin = (): Plugin => {
  const processed = Symbol('processed');
  return {
    postcssPlugin: 'ReversePropExample',
    Declaration: (decl) => {
      // @ts-expect-error
      if (decl[processed]) return;

      // Reverses the names of CSS declarations
      decl.prop = decl.prop.split('').reverse().join('');

      // @ts-expect-error
      decl[processed] = true;
    },
  };
};

plugin.postcss = true;

export const migration: MigrationFn = (fileContent: string) => {
  return postcss(plugin()).process(fileContent, {
    parser: require('postcss-scss'),
  }).css;
};

migration.extensions = ['.scss'];
