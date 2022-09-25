import type {MetadataGroup} from '../types'

export const breakpoints = {
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
} satisfies MetadataGroup;

export type BreakpointsTokenGroup = typeof breakpoints;
export type BreakpointsTokenName = keyof BreakpointsTokenGroup;

// e.g. "xs" | "sm" | "md" | "lg" | "xl"
export type BreakpointsTokenAlias = Extract<
  BreakpointsTokenName,
  `breakpoints-${string}`
> extends `breakpoints-${infer Alias}` ? Alias : never;
