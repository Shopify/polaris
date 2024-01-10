import {isObjectishOrFunction, isObject} from '../is-object';

describe('isObjectishOrFunction', () => {
  it('returns false for nullish', () => {
    expect(isObjectishOrFunction(null)).toBe(false);
    expect(isObjectishOrFunction(undefined)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isObjectishOrFunction(4)).toBe(false);
  });

  it('returns true for objects', () => {
    expect(isObjectishOrFunction({})).toBe(true);
  });

  it('returns true for functions', () => {
    expect(isObjectishOrFunction(() => {})).toBe(true);
  });

  it('returns true for arrays', () => {
    expect(isObjectishOrFunction([])).toBe(true);
  });
});

describe('isObject', () => {
  it('returns false for nullish', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isObject(4)).toBe(false);
  });

  it('returns true for objects', () => {
    expect(isObject({})).toBe(true);
  });

  it('returns false for functions', () => {
    expect(isObject(() => {})).toBe(false);
  });

  it('returns false for arrays', () => {
    expect(isObject([])).toBe(false);
  });
});
