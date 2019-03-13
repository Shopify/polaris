import {isObject} from '../isObject';

describe('isObject', () => {
  it('returns false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('returns false for primative values', () => {
    expect(isObject(4)).toBe(false);
  });

  it('returns true for objects', () => {
    expect(isObject({})).toBe(true);
  });

  it('returns true for functions', () => {
    expect(isObject(() => {})).toBe(true);
  });
});
