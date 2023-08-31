import {
  getMetaThemeDecls,
  getMetaTokenGroupDecls,
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

describe('getMetaTokenGroupDecls', () => {
  it('creates a string of CSS declarations', () => {
    const tokenGroupDecls = getMetaTokenGroupDecls(mockTokenGroup);

    expect(tokenGroupDecls).toBe(expectedThemeDecls);
  });

  it('creates a string of CSS declarations and keyframes at-rules from motion tokens', () => {
    const tokenGroupDecls = getMetaTokenGroupDecls(mockMotionTokenGroup);

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

describe('getMetaThemeDecls', () => {
  it('creates a string of CSS declarations', () => {
    const themeDecls = getMetaThemeDecls(mockTheme);

    expect(themeDecls).toBe(expectedThemeDecls);
  });
});
