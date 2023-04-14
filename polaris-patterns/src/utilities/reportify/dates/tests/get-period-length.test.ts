import {getPeriodLength} from '../get-period-length';
import {TimeUnit} from '../types';

describe('getPeriodLength', () => {
  it('returns the length of a day in milliseconds', () => {
    const since = new Date('2018-05-28T00:00:00.000+00:00');
    const until = new Date('2018-05-28T23:59:59.999+00:00');
    const oneDayInMilliseconds = 1 * 24 * 60 * 60 * 1000;
    const periodLength = getPeriodLength({since, until});

    expect(periodLength).toBe(oneDayInMilliseconds);
  });

  it('returns the length of a week in hours', () => {
    const since = new Date('2018-05-22T00:00:00.000+00:00');
    const until = new Date('2018-05-28T23:59:59.999+00:00');
    const oneWeekInHours = 7 * 24;
    const periodLength = getPeriodLength({since, until}, TimeUnit.Hour);

    expect(periodLength).toBe(oneWeekInHours);
  });

  it('returns the length of a week in days', () => {
    const since = new Date('2018-05-22T00:00:00.000+00:00');
    const until = new Date('2018-05-28T23:59:59.999+00:00');
    const periodLength = getPeriodLength({since, until}, TimeUnit.Day);

    expect(periodLength).toBe(7);
  });

  describe('DST boundaries', () => {
    it('returns the length of a DST spring forward boundary day in milliseconds', () => {
      const since = new Date('2018-10-07T00:00:00.000+10:00');
      const until = new Date('2018-10-07T23:59:59.999+11:00');
      const oneSpringForwardDayInMilliseconds = 1 * 23 * 60 * 60 * 1000;
      const periodLength = getPeriodLength({since, until});

      expect(periodLength).toBe(oneSpringForwardDayInMilliseconds);
    });

    it('returns the length of a DST spring forward boundary day in hours', () => {
      const since = new Date('2018-10-07T00:00:00.000+10:00');
      const until = new Date('2018-10-07T23:59:59.999+11:00');
      const periodLength = getPeriodLength({since, until}, TimeUnit.Hour);

      expect(periodLength).toBe(23);
    });

    it('returns the length of a DST spring forward boundary day as one day', () => {
      const since = new Date('2018-10-07T00:00:00.000+10:00');
      const until = new Date('2018-10-07T23:59:59.999+11:00');
      const periodLength = getPeriodLength({since, until}, TimeUnit.Day);

      expect(periodLength).toBe(1);
    });

    it('returns the length of a DST fall back boundary day in milliseconds', () => {
      const since = new Date('2019-04-07T00:00:00.000+11:00');
      const until = new Date('2019-04-07T23:59:59.999+10:00');
      const oneFallBackDayInMilliseconds = 1 * 25 * 60 * 60 * 1000;
      const periodLength = getPeriodLength({since, until});

      expect(periodLength).toBe(oneFallBackDayInMilliseconds);
    });

    it('returns the length of a DST fall back boundary day in hours', () => {
      const since = new Date('2019-04-07T00:00:00.000+11:00');
      const until = new Date('2019-04-07T23:59:59.999+10:00');
      const periodLength = getPeriodLength({since, until}, TimeUnit.Hour);

      expect(periodLength).toBe(25);
    });

    it('returns the length of a DST fall back boundary day as one day', () => {
      const since = new Date('2018-10-07T00:00:00.000+11:00');
      const until = new Date('2018-10-07T23:59:59.999+10:00');
      const periodLength = getPeriodLength({since, until}, TimeUnit.Day);

      expect(periodLength).toBe(1);
    });
  });
});
