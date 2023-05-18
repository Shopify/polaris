import type {MetadataProperties} from '../types';
import * as colors from '../colors-uplift';

export type ColorBackgroundAlias =
  | 'admin-bg'
  | 'admin-surface'
  | 'primary-fill';

export type ColorTokenName = `color-${ColorBackgroundAlias}`;

export const color: {
  [TokenName in ColorTokenName]: MetadataProperties;
} = {
  'color-admin-bg': {
    value: colors.gray['06'],
    description: '',
  },
  'color-admin-surface': {
    value: colors.gray['01'],
    description: '',
  },
  'color-primary-fill': {
    value: colors.gray['16'],
    description: '',
  },
};
