import {isNumeric} from '../is-numeric';

describe('is-numeric', () => {
  it('returns true for number type', () => {
    expect(isNumeric('number')).toBe(true);
  });

  it('returns true for price type', () => {
    expect(isNumeric('price')).toBe(true);
  });

  it('returns true for duration type', () => {
    expect(isNumeric('duration')).toBe(true);
  });

  it('returns true for percent type', () => {
    expect(isNumeric('percent')).toBe(true);
  });

  it('returns true for float type', () => {
    expect(isNumeric('float')).toBe(true);
  });

  it('returns false for invalid type', () => {
    expect(isNumeric('foobar')).toBe(false);
  });
});
