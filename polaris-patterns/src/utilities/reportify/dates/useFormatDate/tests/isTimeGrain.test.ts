import {isTimeGrain} from '../types';

describe('isTimeGrain', () => {
  it('returns true for a value that is a time grain', () => {
    expect(isTimeGrain('quarter')).toBe(true);
  });

  it('returns false for a value that is not a time grain', () => {
    expect(isTimeGrain('weekend')).toBe(false);
  });
});
