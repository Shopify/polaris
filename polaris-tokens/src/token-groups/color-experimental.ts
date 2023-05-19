import type {MetadataProperties} from '../types';
import * as colors from '../colors-experimental';

export type ExperimentalColorBackgroundAlias =
  | 'admin-bg'
  | 'admin-surface'
  | 'primary-fill';

export type ExperimentalColorTokenName =
  `color-${ExperimentalColorBackgroundAlias}`;

export const experimentalColor: {
  [TokenName in ExperimentalColorTokenName]: MetadataProperties;
} = {
  'color-admin-bg': {
    value: colors.gray[6],
    valueExperimental: colors.gray[6],
    description: '',
  },
  'color-admin-surface': {
    value: colors.gray[1],
    valueExperimental: colors.gray[1],
    description: '',
  },
  'color-primary-fill': {
    value: colors.gray[16],
    valueExperimental: colors.gray[16],
    description: '',
  },
};
