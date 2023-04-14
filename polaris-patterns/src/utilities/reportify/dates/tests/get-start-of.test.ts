import {getStartOf} from '../get-start-of';
import {TimeUnit} from '../types';

describe('getStartOf()', () => {
  describe('UTC timezone', () => {
    it('returns the start of the day', () => {
      const date = new Date('2015-02-20T11:22:33+00:00');
      const actual = getStartOf(date, TimeUnit.Day, 'UTC');
      const expected = new Date('2015-02-20T00:00:00.000+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the week', () => {
      const date = new Date('2015-02-20T11:22:33+00:00');
      const actual = getStartOf(date, TimeUnit.Week, 'UTC');
      const expected = new Date('2015-02-16T00:00:00.000+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the month', () => {
      const date = new Date('2015-02-20T11:22:33+00:00');
      const actual = getStartOf(date, TimeUnit.Month, 'UTC');
      const expected = new Date('2015-02-01T00:00:00.000+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the quarter', () => {
      const date = new Date('2015-02-20T11:22:33+00:00');
      const actual = getStartOf(date, TimeUnit.Quarter, 'UTC');
      const expected = new Date('2015-01-01T00:00:00.000+00:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the year', () => {
      const date = new Date('2015-02-20T11:22:33+00:00');
      const actual = getStartOf(date, TimeUnit.Year, 'UTC');
      const expected = new Date('2015-01-01T00:00:00.000+00:00');

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('not UTC timezone', () => {
    it('returns the start of the day', () => {
      const date = new Date('2015-02-20T11:22:33+08:00');
      const actual = getStartOf(date, TimeUnit.Day, 'Australia/Perth');
      const expected = new Date('2015-02-20T00:00:00.000+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the week', () => {
      const date = new Date('2015-02-20T11:22:33+08:00');
      const actual = getStartOf(date, TimeUnit.Week, 'Australia/Perth');
      const expected = new Date('2015-02-16T00:00:00.000+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the month', () => {
      const date = new Date('2015-02-20T11:22:33+08:00');
      const actual = getStartOf(date, TimeUnit.Month, 'Australia/Perth');
      const expected = new Date('2015-02-01T00:00:00.000+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the quarter', () => {
      const date = new Date('2015-02-20T11:22:33+08:00');
      const actual = getStartOf(date, TimeUnit.Quarter, 'Australia/Perth');
      const expected = new Date('2015-01-01T00:00:00.000+08:00');

      expect(actual).toStrictEqual(expected);
    });

    it('returns the start of the year', () => {
      const date = new Date('2015-02-20T11:22:33+08:00');
      const actual = getStartOf(date, TimeUnit.Year, 'Australia/Perth');
      const expected = new Date('2015-01-01T00:00:00.000+08:00');

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('Daylight Saving Time', () => {
    it('handles DST spring forward', () => {
      const date = new Date('2018-10-07T23:59:59+11:00');
      const actual = getStartOf(date, TimeUnit.Day, 'Australia/Sydney');
      const expected = new Date('2018-10-07T00:00:00.000+10:00');

      expect(actual).toStrictEqual(expected);
    });

    it('handles DST fall backward', () => {
      const date = new Date('2019-04-07T23:59:59+10:00');
      const actual = getStartOf(date, TimeUnit.Day, 'Australia/Sydney');
      const expected = new Date('2019-04-07T00:00:00.000+11:00');

      expect(actual).toStrictEqual(expected);
    });
  });
});
