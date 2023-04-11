import type {TransformInfo} from './types';

export const POLARIS_MIGRATOR_COMMENT =
  'polaris-migrator: Unable to migrate the following expression. Please upgrade manually.';

export const scss: TransformInfo = {
  extensions: ['css', 'scss'],
  options: {
    namespace: {
      name: 'namespace',
      type: 'string',
      description: 'Provide an optional SCSS module namespace to target.',
    },
  },
};

export const typescript: TransformInfo = {
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  options: {
    relative: {
      name: 'relative',
      type: 'boolean',
      description: 'Are you targeting relative imports?',
    },
  },
};
