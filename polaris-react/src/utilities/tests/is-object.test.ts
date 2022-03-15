import {isObject} from '../is-object';

describe('isObject', () => {
  it('returns false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isObject(4)).toBe(false);
  });

  it('returns true for objects', () => {
    expect(isObject({})).toBe(true);
  });

  it('returns true for functions', () => {
    expect(isObject(() => {})).toBe(true);
  });
});
