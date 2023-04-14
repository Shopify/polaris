import {parseSince, parseUntil} from 'utilities/reportify';

import {getBestOverPeriod} from '../get-best-over-period';

describe('get-best-over-period', () => {
  describe('The following periods of time, <= 3 days, renders with an hourly grain', () => {
    it('returns an hourly grain for a custom 3 day period', () => {
      const since = new Date('2015-12-29T00:00:00.000Z');
      const until = new Date('2015-12-31T23:59:59.999Z');

      const actual = getBestOverPeriod({since, until});
      const expected = 'hour';

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('The following periods of time, > 3 days but <= 3 months, renders with a daily grain', () => {
    it('returns a daily grain for a custom 4 day period', () => {
      const since = new Date('2016-06-15T00:00:00.000Z');
      const until = new Date('2016-09-15T23:59:59.999Z');

      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });

    it('returns a daily grain for a custom 93 day (3 month) period', () => {
      const since = new Date('2016-06-15T00:00:00.000Z');
      const until = new Date('2016-09-15T23:59:59.999Z');

      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });
  });

  it('returns a monthly grain for a custom 4 month period', () => {
    const since = new Date('2016-06-15T00:00:00.000Z');
    const until = new Date('2016-10-15T23:59:59.999Z');

    const actual = getBestOverPeriod({since, until});
    const expected = 'month';

    expect(actual).toStrictEqual(expected);
  });

  describe('Quarter periods render with a daily grain', () => {
    it('returns a daily grain for 1st quarter 2016', () => {
      const since = new Date('2016-01-01T00:00:00.000Z');
      const until = new Date('2016-03-31T23:59:59.999Z');
      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });

    it('returns a daily grain for 2nd quarter 2016', () => {
      const since = new Date('2016-04-01T00:00:00.000Z');
      const until = new Date('2016-06-31T23:59:59.999Z');
      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });

    it('returns a daily grain for 3rd quarter 2016', () => {
      const since = new Date('2016-07-01T00:00:00.000Z');
      const until = new Date('2016-09-31T23:59:59.999Z');
      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });

    it('returns a daily grain for 4th quarter 2016 (longest quarter within the 3 month limit)', () => {
      const since = new Date('2016-10-01T00:00:00.000Z');
      const until = new Date('2016-12-31T23:59:59.999Z');
      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('DST boundaries', () => {
    it('returns a daily grain for a custom 4-day period that includes a spring forward DST boundary day', () => {
      const since = parseSince('2019-04-06', 'Australia/Sydney');
      const until = parseUntil('2019-04-09', 'Australia/Sydney');

      const actual = getBestOverPeriod({since, until});
      const expected = 'day';

      expect(actual).toStrictEqual(expected);
    });
  });
});
