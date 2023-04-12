import {
  createVar,
  getCustomPropertyNames,
  getKeyframeNames,
  tokensToRems,
  toPx,
  toEm,
  toRem,
  getUnit,
  getMediaConditions,
} from '../src/utilities';

const mockTokenGroup = {
  'design-token-1': {
    value: 'valueA',
  },
  'design-token-2': {
    value: 'valueB',
  },
};

const mockMotionTokenGroup = {
  ...mockTokenGroup,
  'keyframes-token-1': {
    value: 'valueA',
  },
  'keyframes-token-2': {
    value: 'valueB',
  },
};

const mockTokens = {
  colors: mockTokenGroup,
  border: {},
  // Note: We don't need to assign mock values to the remaining static tokens.
  depth: {},
  motion: {},
  legacyTokens: {},
  shape: {},
  spacing: {},
  typography: {},
  zIndex: {},
};

describe('createVar', () => {
  it('converts the token into a polaris css variable name', () => {
    const token = 'foo';
    const result = createVar(token);

    expect(result).toBe(`--p-${token}`);
  });
});

describe('getCustomPropertyNames', () => {
  it('extracts the token names', () => {
    expect(getCustomPropertyNames(mockTokens)).toStrictEqual([
      '--p-design-token-1',
      '--p-design-token-2',
    ]);
  });
});

describe('getKeyframeNames', () => {
  it('extracts the keyframe tokens from the motion', () => {
    expect(getKeyframeNames(mockMotionTokenGroup)).toStrictEqual([
      'p-keyframes-token-1',
      'p-keyframes-token-2',
    ]);
  });
});

describe('tokensToRems', () => {
  it("converts a token group's value from px to rems", () => {
    const tokenGroup = {
      foo: {value: '12px'},
      bar: {value: '16px'},
      baz: {value: '16px 32px'},
    };

    const result = tokensToRems(tokenGroup);

    expect(result.foo.value).toBe('0.75rem');
    expect(result.bar.value).toBe('1rem');
    expect(result.baz.value).toBe('1rem 2rem');
  });
});

describe('getUnit', () => {
  it('retrieves a supported length unit from a value', () => {
    expect(getUnit('1px')).toBe('px');
    expect(getUnit('1em')).toBe('em');
    expect(getUnit('1rem')).toBe('rem');
    expect(getUnit('-1rem')).toBe('rem');
    expect(getUnit('1.5rem')).toBe('rem');
    expect(getUnit('-1.5rem')).toBe('rem');
    expect(getUnit('1')).toBeNull();
    expect(getUnit('px')).toBeNull();
    expect(getUnit('1vw')).toBeNull();
    expect(getUnit(undefined)).toBeNull();
  });
});

describe('toPx', () => {
  it('converts a supported length unit to px', () => {
    expect(toPx('1px')).toBe('1px');
    expect(toPx('1em')).toBe('16px');
    expect(toPx('1rem')).toBe('16px');
    expect(toPx('-1rem')).toBe('-16px');
    expect(toPx('1.5rem')).toBe('24px');
    expect(toPx('-1.5rem')).toBe('-24px');
    expect(toPx('1vw')).toBe('1vw');
    expect(toPx('1')).toBe('1');
    expect(toPx('px')).toBe('px');
    expect(toPx(undefined)).toBe('');
  });
});

describe('toEm', () => {
  it('converts a supported length unit to em', () => {
    expect(toEm('1px')).toBe('0.0625em');
    expect(toEm('1em')).toBe('1em');
    expect(toEm('1rem')).toBe('1em');
    expect(toEm('-1rem')).toBe('-1em');
    expect(toEm('1.5rem')).toBe('1.5em');
    expect(toEm('-1.5rem')).toBe('-1.5em');
    expect(toEm('1vw')).toBe('1vw');
    expect(toEm('1')).toBe('1');
    expect(toEm('px')).toBe('px');
    expect(toEm(undefined)).toBe('');
  });

  it('converts a supported length unit to em with a custom font size', () => {
    expect(toEm('1px', 8)).toBe('0.125em');
    expect(toEm('1em', 8)).toBe('1em');
    expect(toEm('1rem', 8)).toBe('2em');
  });
});

describe('toRem', () => {
  it('converts a supported length unit to rem', () => {
    expect(toRem('1px')).toBe('0.0625rem');
    expect(toRem('1em')).toBe('1rem');
    expect(toRem('1rem')).toBe('1rem');
    expect(toRem('-1rem')).toBe('-1rem');
    expect(toRem('1.5rem')).toBe('1.5rem');
    expect(toRem('-1.5rem')).toBe('-1.5rem');
    expect(toRem('1vw')).toBe('1vw');
    expect(toRem('1')).toBe('1');
    expect(toRem('px')).toBe('px');
    expect(toRem(undefined)).toBe('');
  });
});

describe('getMediaConditions', () => {
  it('transforms breakpoints tokens into directional media conditions', () => {
    /** @type {TokenGroup} */
    const breakpoints = {
      breakpoint1: '16px',
      breakpoint2: '32px',
    };

    expect(getMediaConditions(breakpoints)).toStrictEqual({
      breakpoint1: {
        // Up: sizeInPx / 16
        up: '(min-width: 1em)',
        // Down: (sizeInPx - 0.04) / 16
        down: '(max-width: 0.9975em)',
        // Only: (nextBreakpointSizeInPx - 0.04) / 16
        only: '(min-width: 1em) and (max-width: 1.9975em)',
      },
      breakpoint2: {
        // Up: sizeInPx / 16
        up: '(min-width: 2em)',
        // Down: (sizeInPx - 0.04) / 16
        down: '(max-width: 1.9975em)',
        // Only: Same as the up condition as there is no next breakpoint
        only: '(min-width: 2em)',
      },
    });
  });
});
