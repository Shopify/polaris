import type {MetadataProperties, Experimental} from '../types';

type ControlHeightExperimental = Experimental<'control-height'>;

export type SizeTokenName = `size-${ControlHeightExperimental}`;

export type SizeTokenGroup = {
  [TokenName in SizeTokenName]: string;
};

export const size: {
  [TokenName in SizeTokenName]: MetadataProperties;
} = {
  'size-control-height-experimental': {
    value: '32px',
    valueExperimental: {xs: '34px', sm: '32px'},
  },
};
