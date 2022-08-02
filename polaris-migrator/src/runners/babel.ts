import path from 'node:path';

import babelCore, {PluginItem, TransformOptions} from '@babel/core';

const root = path.resolve(__dirname, '../../');

export const babel = (plugin: PluginItem) => {
  return {
    ...babelCore,
    transform(fileContent: string, options: TransformOptions = {}) {
      return babelCore.transform(fileContent, {
        plugins: [plugin],
        babelrc: true,
        root,
        ...options,
      })?.code;
    },
  };
};
