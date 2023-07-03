import type {MetadataProperties} from '../types';

// NOTE: Order is important here: smallest -> largest
// Exporting as const means it will be typed as a Tuple instead of string[]
export const breakpointAliases = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

// Convert the Tuple to a union
export type BreakpointsAlias = typeof breakpointAliases[number];

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
