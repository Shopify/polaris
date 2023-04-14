import {getEndOf} from '../get-end-of';
import {TimeUnit} from '../types';

describe('getEndOf()', () => {
  describe('UTC timezone', () => {
    it('returns the end of the day', () => {
      const date = new Date('2015-04-20T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Day, 'UTC');
      const expected = new Date('2015-04-20T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the week', () => {
      const date = new Date('2015-04-20T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Week, 'UTC');
      const expected = new Date('2015-04-26T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the month', () => {
      const date = new Date('2015-04-20T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Month, 'UTC');
      const expected = new Date('2015-04-30T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the quarter', () => {
      const date = new Date('2015-04-20T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Quarter, 'UTC');
      const expected = new Date('2015-06-30T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the year', () => {
      const date = new Date('2015-04-20T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Year, 'UTC');
      const expected = new Date('2015-12-31T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('handles end of day for february 28 on a regular year', () => {
      const date = new Date('2015-02-28T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Day, 'UTC');
      const expected = new Date('2015-02-28T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('handles end of month for february 28 on a leap year', () => {
      const date = new Date('2016-02-28T11:22:33+00:00');
      const actual = getEndOf(date, TimeUnit.Month, 'UTC');
      const expected = new Date('2016-02-29T23:59:59.999+00:00');

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('not UTC timezone', () => {
    it('returns the end of the day', () => {
      const date = new Date('2015-04-20T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Day, 'Australia/Perth');
      const expected = new Date('2015-04-20T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the week', () => {
      const date = new Date('2015-04-20T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Week, 'Australia/Perth');
      const expected = new Date('2015-04-26T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the month', () => {
      const date = new Date('2015-04-20T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Month, 'Australia/Perth');
      const expected = new Date('2015-04-30T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the quarter', () => {
      const date = new Date('2015-04-20T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Quarter, 'Australia/Perth');
      const expected = new Date('2015-06-30T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the end of the year', () => {
      const date = new Date('2015-04-20T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Year, 'Australia/Perth');
      const expected = new Date('2015-12-31T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('handles end of day for february 28 on a regular year', () => {
      const date = new Date('2015-02-28T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Day, 'Australia/Perth');
      const expected = new Date('2015-02-28T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('handles end of month for february 28 on a leap year', () => {
      const date = new Date('2016-02-28T11:22:33+08:00');
      const actual = getEndOf(date, TimeUnit.Month, 'Australia/Perth');
      const expected = new Date('2016-02-29T23:59:59.999+08:00');

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('Daylight Saving Time', () => {
    it('handles DST spring forward', () => {
      const date = new Date('2017-10-01T00:00:00+10:00');
      const actual = getEndOf(date, TimeUnit.Day, 'Australia/Sydney');
      const expected = new Date('2017-10-01T23:59:59.999+11:00');

      expect(actual).toStrictEqual(expected);
    });

    it('handles DST fall backward', () => {
      const date = new Date('2018-04-01T00:00:00+11:00');
      const actual = getEndOf(date, TimeUnit.Day, 'Australia/Sydney');
      const expected = new Date('2018-04-01T23:59:59.999+10:00');

      expect(actual).toStrictEqual(expected);
    });
  });
});
