import {getPreviousPeriod} from '../get-previous-period';

describe('getPreviousPeriod()', () => {
  describe('UTC timezone', () => {
    it('returns the previous period for a single day', () => {
      const period = {
        since: '2018-05-28',
        until: '2018-05-28',
      };
      const expected = {
        since: new Date('2018-05-27T00:00:00.000+00:00'),
        until: new Date('2018-05-27T23:59:59.999+00:00'),
      };

      expect(getPreviousPeriod(period, 'UTC')).toStrictEqual(expected);
    });

    it('returns the previous period for a 2-day period', () => {
      const period = {
        since: '2018-05-28',
        until: '2018-05-29',
      };
      const expected = {
        since: new Date('2018-05-26T00:00:00.000+00:00'),
        until: new Date('2018-05-27T23:59:59.999+00:00'),
      };

      expect(getPreviousPeriod(period, 'UTC')).toStrictEqual(expected);
    });
  });

  describe('not UTC timezone', () => {
    it('returns the previous period for a single day', () => {
      const period = {
        since: '2018-05-28',
        until: '2018-05-28',
      };
      const expected = {
        since: new Date('2018-05-27T00:00:00.000+08:00'),
        until: new Date('2018-05-27T23:59:59.999+08:00'),
      };

      expect(getPreviousPeriod(period, 'Australia/Perth')).toStrictEqual(
        expected,
      );
    });

    it('returns the previous period for a 2-day period', () => {
      const period = {
        since: '2018-05-28',
        until: '2018-05-29',
      };
      const expected = {
        since: new Date('2018-05-26T00:00:00.000+08:00'),
        until: new Date('2018-05-27T23:59:59.999+08:00'),
      };

      expect(getPreviousPeriod(period, 'Australia/Perth')).toStrictEqual(
        expected,
      );
    });
  });

  describe('DST boundaries', () => {
    it('returns the previous period for spring forward DST boundary day', () => {
      const period = {
        since: '2018-03-25',
        until: '2018-03-25',
      };
      const expected = {
        since: new Date('2018-03-24T00:00:00.000+01:00'),
        until: new Date('2018-03-24T23:59:59.999+01:00'),
      };

      expect(getPreviousPeriod(period, 'Europe/Stockholm')).toStrictEqual(
        expected,
      );
    });

    it('returns the previous period for the day after spring forward DST boundary day', () => {
      const period = {
        since: '2018-03-26',
        until: '2018-03-26',
      };
      const expected = {
        since: new Date('2018-03-25T00:00:00.000+01:00'),
        until: new Date('2018-03-25T23:59:59.999+02:00'),
      };

      expect(getPreviousPeriod(period, 'Europe/Stockholm')).toStrictEqual(
        expected,
      );
    });

    it('returns the previous period for fall back DST boundary day', () => {
      const period = {
        since: '2017-10-29',
        until: '2017-10-29',
      };
      const expected = {
        since: new Date('2017-10-28T00:00:00.000+02:00'),
        until: new Date('2017-10-28T23:59:59.999+02:00'),
      };

      expect(getPreviousPeriod(period, 'Europe/Stockholm')).toStrictEqual(
        expected,
      );
    });

    it('returns the previous period for the day after fall back DST boundary day', () => {
      const period = {
        since: '2017-10-30',
        until: '2017-10-30',
      };
      const expected = {
        since: new Date('2017-10-29T00:00:00.000+02:00'),
        until: new Date('2017-10-29T23:59:59.999+01:00'),
      };

      expect(getPreviousPeriod(period, 'Europe/Stockholm')).toStrictEqual(
        expected,
      );
    });
  });
});
