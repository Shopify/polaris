import {
  getMetaThemeDecls,
  getMetaTokenGroupDecls,
  getKeyframes,
} from '../scripts/toStyleSheet';

const mockTokenGroup = {
  'token-name-1': {
    value: 'valueA',
  },
  'token-name-2': {
    value: 'valueB',
  },
};

const mockMotionTokenGroup = {
  'motion-token-1': {
    value: 'valueA',
  },
  'motion-token-2': {
    value: 'valueB',
  },
  'motion-keyframes-token-1': {
    value: 'valueC',
  },
  'motion-keyframes-token-2': {
    value: 'valueD',
  },
};

const mockColorTokenGroup = {
  'color-scheme': {
    value: 'light',
  },
  'color-token-1': {
    value: 'valueA',
  },
  'color-token-2': {
    value: 'valueB',
  },
};

const mockTheme = {
  tokenGroupName: mockTokenGroup,
  color: mockColorTokenGroup,
  motion: mockMotionTokenGroup,
};

const expectedTokenGroupDecls =
  '--p-token-name-1:valueA;--p-token-name-2:valueB;';

const expectedMotionTokenGroupDecls =
  '--p-motion-token-1:valueA;--p-motion-token-2:valueB;--p-motion-keyframes-token-1:p-motion-keyframes-token-1;--p-motion-keyframes-token-2:p-motion-keyframes-token-2;';

const expectedColorTokenGroupDecls =
  'color-scheme:light;--p-color-token-1:valueA;--p-color-token-2:valueB;';

const expectedThemeDecls = `${expectedTokenGroupDecls}${expectedColorTokenGroupDecls}${expectedMotionTokenGroupDecls}`;

const expectedMotionKeyframes =
  '@keyframes p-motion-keyframes-token-1valueC@keyframes p-motion-keyframes-token-2valueD';

describe('getMetaTokenGroupDecls', () => {
  it('creates a string of CSS declarations', () => {
    const tokenGroupDecls = getMetaTokenGroupDecls(mockTokenGroup);

    expect(tokenGroupDecls).toBe(expectedTokenGroupDecls);
  });

  it('creates a string of CSS declarations and keyframes at-rules from motion tokens', () => {
    const tokenGroupDecls = getMetaTokenGroupDecls(mockMotionTokenGroup);

    expect(tokenGroupDecls).toBe(expectedMotionTokenGroupDecls);
  });

  it('creates a string of CSS declarations from color tokens', () => {
    const tokenGroupDecls = getMetaTokenGroupDecls(mockColorTokenGroup);

    expect(tokenGroupDecls).toBe(expectedColorTokenGroupDecls);
  });
});

describe('getKeyframes', () => {
  it('creates a string of keyframes at-rules', () => {
    const keyframes = getKeyframes(mockMotionTokenGroup);

    expect(keyframes).toBe(expectedMotionKeyframes);
  });
});

describe('getMetaThemeDecls', () => {
  it('creates a string of CSS declarations', () => {
    const themeDecls = getMetaThemeDecls(mockTheme);

    expect(themeDecls).toBe(expectedThemeDecls);
  });
});
