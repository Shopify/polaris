import {createVar, tokensToRems} from '../src/utilities';

describe('createVar', () => {
  it('converts the token into a polaris css variable name', () => {
    const token = 'foo';
    const result = createVar(token);

    expect(result).toBe(`--p-${token}`);
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
