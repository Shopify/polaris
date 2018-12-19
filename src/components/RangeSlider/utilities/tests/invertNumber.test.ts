import {invertNumber} from '../index';

describe('invertNumber', () => {
  it('returns a negative number when the argument is positive', () => {
    const negative = invertNumber(10);
    expect(negative).toBe(-10);
  });

  it('returns a positive number when the argument is negative', () => {
    const negative = invertNumber(-10);
    expect(negative).toBe(10);
  });

  it('returns 0 when the argument is 0', () => {
    const negative = invertNumber(0);
    expect(negative).toBe(0);
  });
});
