import type {Node} from '../analyze-custom-properties';

const mockStart = {cursor: 6810, line: 270, column: 15};
const mockNext = {cursor: 6841, line: 270, column: 46};

export const mockVarNode: Node = {
  type: 'function',
  value: [
    {type: 'identifier', value: 'var', start: mockStart, next: mockNext},
    {
      type: 'arguments',
      value: [
        {
          type: 'identifier',
          value: 'var',
          start: mockStart,
          next: mockNext,
        },
        {
          type: 'arguments',
          value: [
            {
              type: 'operator',
              value: '-',
              start: mockStart,
              next: mockNext,
            },
            {
              type: 'operator',
              value: '-',
              start: mockStart,
              next: mockNext,
            },
            {
              type: 'identifier',
              value: 'p-critical-link-disabled',
              start: mockStart,
              next: mockNext,
            },
          ],
          start: mockStart,
          next: mockNext,
        },
      ],
      start: mockStart,
      next: mockNext,
    },
  ],
  start: mockStart,
  next: mockNext,
};

export const mockPunctuation: Node = {
  type: 'punctuation',
  value: ':',
  start: mockStart,
  next: mockNext,
};

export const mockArguments: Node = {
  type: 'arguments',
  value: [
    {
      type: 'string_single',
      value: 'orange',
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'punctuation',
      value: ',',
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'space',
      value: ' ',
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'string_single',
      value: 'text',
      start: mockStart,
      next: mockNext,
    },
  ],
  start: mockStart,
  next: mockNext,
};

export const mockStringSingle = {
  type: 'string_single',
  value: '',
  start: mockStart,
  next: mockNext,
};

export const mockCustomPropertyDeclaration = {
  type: 'declaration',
  value: [
    {
      type: 'property',
      value: [
        {
          type: 'operator',
          value: '-',
          start: mockStart,
          next: mockNext,
        },
        {
          type: 'identifier',
          value: 'moz-osx-font-smoothing',
          start: mockStart,
          next: mockNext,
        },
      ],
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'punctuation',
      value: ':',
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'value',
      value: [
        {
          type: 'space',
          value: ' ',
          start: mockStart,
          next: mockNext,
        },
        {
          type: 'identifier',
          value: 'grayscale',
          start: mockStart,
          next: mockNext,
        },
      ],
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'punctuation',
      value: ';',
      start: mockStart,
      next: mockNext,
    },
  ],
  start: mockStart,
};

export const mockPropertyDeclaration = {
  type: 'declaration',
  value: [
    {
      type: 'property',
      value: [
        {
          type: 'identifier',
          value: 'font-size',
          start: mockStart,
          next: mockNext,
        },
      ],
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'punctuation',
      value: ':',
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'value',
      value: [
        {
          type: 'space',
          value: ' ',
          start: mockStart,
          next: mockNext,
        },
        {
          type: 'function',
          value: [
            {
              type: 'identifier',
              value: 'font-size',
              start: mockStart,
              next: mockNext,
            },
            {
              type: 'arguments',
              value: [
                {
                  type: 'identifier',
                  value: 'display-medium',
                  start: mockStart,
                  next: mockNext,
                },
              ],
              start: mockStart,
              next: mockNext,
            },
          ],
          start: mockStart,
          next: mockNext,
        },
      ],
      start: mockStart,
      next: mockNext,
    },
    {
      type: 'punctuation',
      value: ';',
      start: mockStart,
      next: mockNext,
    },
  ],
  start: mockStart,
};

export const mockCustomPropertyErrors = {
  '--p-border-radius-base': {
    declaration: false,
    usedFromDeclaration: false,
    count: 1,
    locations: [
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/ActionList/ActionList.scss',
      },
    ],
  },
};

export const mockCustomProperties = {
  '--Polaris-RangeSlider-progress-lower': {
    declaration: false,
    usedFromDeclaration: false,
    count: 4,
    locations: [
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
    ],
  },
  '--Polaris-RangeSlider-progress-upper': {
    declaration: false,
    usedFromDeclaration: false,
    count: 4,
    locations: [
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file: 'src/components/RangeSlider/components/DualThumb/DualThumb.scss',
      },
    ],
  },
  '--progress-lower': {
    declaration: true,
    usedFromDeclaration: false,
    count: 4,
    locations: [
      {
        start: mockStart,
        end: mockNext,
        file:
          'src/components/RangeSlider/components/SingleThumb/SingleThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file:
          'src/components/RangeSlider/components/SingleThumb/SingleThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file:
          'src/components/RangeSlider/components/SingleThumb/SingleThumb.scss',
      },
      {
        start: mockStart,
        end: mockNext,
        file:
          'src/components/RangeSlider/components/SingleThumb/SingleThumb.scss',
      },
    ],
  },
};
