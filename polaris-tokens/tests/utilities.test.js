import {tokens} from '../src/tokens';
import {
  createVar,
  getCustomPropertyNames,
  getKeyframeNames,
  tokensToRems,
} from '../src/utilities';

describe('createVar', () => {
  it('converts the token into a polaris css variable name', () => {
    const token = 'foo';
    const result = createVar(token);

    expect(result).toBe(`--p-${token}`);
  });
});

describe('getCustomPropertyNames', () => {
  it('extracts the token names', () => {
    expect(getCustomPropertyNames(tokens)).toHaveLength(271);
  });
});

describe('getKeyframeNames', () => {
  it('extracts the keyframe tokens from the motion', () => {
    expect(getKeyframeNames(tokens.motion)).toHaveLength(4);
  });
});

describe('tokensToRems', () => {
  it("converts a token group's value from px to rems", () => {
    const tokenGroup = {foo: {value: '12px'}, bar: {value: '16px'}};
    const result = tokensToRems(tokenGroup);

    expect(result.foo.value).toBe('0.75rem');
    expect(result.bar.value).toBe('1rem');
  });
});
