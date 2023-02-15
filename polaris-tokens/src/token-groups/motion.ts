import type {MetadataProperties} from '../types';

export type MotionDurationScale =
  | '0'
  | '50'
  | '100'
  | '150'
  | '200'
  | '250'
  | '300'
  | '350'
  | '400'
  | '450'
  | '500'
  | '5000';

export type MotionKeyframesAlias = 'bounce' | 'fade-in' | 'pulse' | 'spin';

type MotionTimingFunctionAlias =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear';

export type MotionTokenName =
  | `duration-${MotionDurationScale}`
  | `keyframes-${MotionKeyframesAlias}`
  | MotionTimingFunctionAlias;

export type MotionTokenGroup = {
  [TokenName in MotionTokenName]: string;
};

export const motion: {
  [TokenName in MotionTokenName]: MetadataProperties;
} = {
  'duration-0': {
    value: '0ms',
  },
  'duration-50': {
    value: '50ms',
  },
  'duration-100': {
    value: '100ms',
  },
  'duration-150': {
    value: '150ms',
  },
  'duration-200': {
    value: '200ms',
  },
  'duration-250': {
    value: '250ms',
  },
  'duration-300': {
    value: '300ms',
  },
  'duration-350': {
    value: '350ms',
  },
  'duration-400': {
    value: '400ms',
  },
  'duration-450': {
    value: '450ms',
  },
  'duration-500': {
    value: '500ms',
  },
  'duration-5000': {
    value: '5000ms',
  },
  ease: {
    value: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    description:
      'Responds quickly and finishes with control. A great default for any user interaction.',
  },
  'ease-in': {
    value: 'cubic-bezier(0.42, 0, 1, 1)',
    description: 'Starts slowly and finishes at top speed. Use sparingly.',
  },
  'ease-out': {
    value: 'cubic-bezier(0, 0, 0.58, 1)',
    description: 'Starts at top speed and finishes slowly. Use sparingly.',
  },
  'ease-in-out': {
    value: 'cubic-bezier(0.42, 0, 0.58, 1)',
    description:
      'Starts and finishes with equal speed. A good default for transitions triggered by the system.',
  },
  linear: {
    value: 'cubic-bezier(0, 0, 1, 1)',
    description:
      'Moves with constant speed. Use for continuous and mechanical animations, such as rotating spinners.',
  },
  'keyframes-bounce': {
    value:
      '{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }',
  },
  'keyframes-fade-in': {
    value: '{ to { opacity: 1 } }',
  },
  'keyframes-pulse': {
    value:
      '{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }',
  },
  'keyframes-spin': {
    value: '{ to { transform: rotate(1turn) } }',
  },
};
