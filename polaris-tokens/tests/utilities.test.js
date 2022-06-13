import {tokens} from '../src/tokens';
import {
  createVar,
  getCustomPropertyNames,
  getKeyframeNames,
  tokensToRems,
  toPx,
  toEm,
  toRem,
  getUnit,
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
    expect(getCustomPropertyNames(tokens)).toHaveLength(273);
  });
});

describe('getKeyframeNames', () => {
  it('extracts the keyframe tokens from the motion', () => {
    expect(getKeyframeNames(tokens.motion)).toHaveLength(4);
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
