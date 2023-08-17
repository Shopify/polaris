import {
  getThemeDecls,
  getTokenGroupDecls,
  getKeyframes,
} from '../scripts/toStyleSheet';

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
  'motion-keyframes-token-1': {
    value: 'valueA',
  },
  'motion-keyframes-token-2': {
    value: 'valueB',
  },
};

const mockTheme = {
  border: {},
  color: {},
  font: {},
  motion: {},
  // Note: We don't need to assign mock values to the remaining static tokens.
  shadow: mockTokenGroup,
  space: {},
  zIndex: {},
};

const expectedThemeDecls =
  '--p-design-token-1:valueA;--p-design-token-2:valueB;';

const expectedKeyframes =
  '@keyframes p-motion-keyframes-token-1valueA@keyframes p-motion-keyframes-token-2valueB';

const expectedKeyframesCustomProperties =
  '--p-motion-keyframes-token-1:p-motion-keyframes-token-1;--p-motion-keyframes-token-2:p-motion-keyframes-token-2;';

describe('getTokenGroupDecls', () => {
  it('creates a string of CSS declarations', () => {
    const tokenGroupDecls = getTokenGroupDecls(mockTokenGroup);

    expect(tokenGroupDecls).toBe(expectedThemeDecls);
  });

  it('creates a string of CSS declarations and keyframes at-rules from motion tokens', () => {
    const tokenGroupDecls = getTokenGroupDecls(mockMotionTokenGroup);

    expect(tokenGroupDecls).toBe(
      `${expectedThemeDecls}${expectedKeyframesCustomProperties}`,
    );
  });
});

describe('getKeyframes', () => {
  it('creates a string of keyframes at-rules', () => {
    const keyframes = getKeyframes(mockMotionTokenGroup);

    expect(keyframes).toBe(expectedKeyframes);
  });
});

describe('getThemeDecls', () => {
  it('creates a string of CSS declarations', () => {
    const themeDecls = getThemeDecls(mockTheme);

    expect(themeDecls).toBe(expectedThemeDecls);
  });
});
