import {formatQueryDatePeriod} from '../format-query-date-period';

describe('formatQueryDatePeriod()', () => {
  describe('UTC timezone', () => {
    it('returns formatted since', () => {
      const period = {
        since: new Date('2018-01-01T22:22:22+00:00'),
        until: new Date('2018-01-10T22:22:22+00:00'),
      };

      expect(formatQueryDatePeriod(period, 'UTC').since).toBe('2018-01-01');
    });

    it('returns formatted until', () => {
      const period = {
        since: new Date('2018-01-01T22:22:22+00:00'),
        until: new Date('2018-01-10T22:22:22+00:00'),
      };

      expect(formatQueryDatePeriod(period, 'UTC').until).toBe('2018-01-10');
    });
  });

  describe('not UTC timezone', () => {
    it('returns formatted since', () => {
      const period = {
        since: new Date('2018-01-01T22:22:22+00:00'),
        until: new Date('2018-01-10T22:22:22+00:00'),
      };

      expect(formatQueryDatePeriod(period, 'Australia/Perth').since).toBe(
        '2018-01-02',
      );
    });

    it('returns formatted until', () => {
      const period = {
        since: new Date('2018-01-01T22:22:22+00:00'),
        until: new Date('2018-01-10T22:22:22+00:00'),
      };

      expect(formatQueryDatePeriod(period, 'Australia/Perth').until).toBe(
        '2018-01-11',
      );
    });
  });
});
