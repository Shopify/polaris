import type {BreakpointsAlias, MetadataProperties} from '../types';

export type BreakpointsTokenName = `breakpoints-${BreakpointsAlias}`;

export type BreakpointsTokenGroup = {
  [TokenName in BreakpointsTokenName]: string;
};

export const breakpoints: {
  [TokenName in BreakpointsTokenName]: MetadataProperties;
} = {
  'breakpoints-xs': {
    value: '0px',
    description:
      'Commonly used for sizing containers (e.g. max-width). See below for media query usage.',
  },
  'breakpoints-sm': {
    value: '490px',
    description:
      'Commonly used for sizing containers (e.g. max-width). See below for media query usage.',
  },
  'breakpoints-md': {
    value: '768px',
    description:
      'Commonly used for sizing containers (e.g. max-width). See below for media query usage.',
  },
  'breakpoints-lg': {
    value: '1040px',
    description:
      'Commonly used for sizing containers (e.g. max-width). See below for media query usage.',
  },
  'breakpoints-xl': {
    value: '1440px',
    description:
      'Commonly used for sizing containers (e.g. max-width). See below for media query usage.',
  },
};
