import {needsNumericStyle} from '../needs-numeric-style';

describe('needs-numeric-style', () => {
  it('returns true for a numeric type and a field that is not hour_of_day', () => {
    expect(needsNumericStyle('number', 'foobar')).toBe(true);
  });

  it('returns false for a non-numeric type and a field that is not hour_of_day', () => {
    expect(needsNumericStyle('string', 'foobar')).toBe(false);
  });

  it('returns false for a numeric type and the hour_of_day field', () => {
    expect(needsNumericStyle('number', 'hour_of_day')).toBe(false);
  });
});
