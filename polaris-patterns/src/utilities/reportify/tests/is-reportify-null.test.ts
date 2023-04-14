import {isReportifyNull} from '../is-reportify-null';

describe('isReportifyNull', () => {
  it('returns true for null', () => {
    expect(isReportifyNull(null)).toBeTrue();
  });

  it('returns true for "NULL"', () => {
    expect(isReportifyNull('NULL')).toBeTrue();
  });

  it('returns true for empty strings', () => {
    expect(isReportifyNull('')).toBeTrue();
  });

  it('returns false for other values', () => {
    expect(isReportifyNull('hi')).toBeFalse();
  });
});
