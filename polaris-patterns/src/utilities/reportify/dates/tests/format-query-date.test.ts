import {formatQueryDate} from '../format-query-date';

describe('formatQueryDate()', () => {
  describe('UTC timezone', () => {
    it('returns formatted query date', () => {
      const date = new Date('2018-01-01T14:14:14+00:00');

      expect(formatQueryDate(date, 'UTC')).toBe('2018-01-01');
    });
  });

  describe('not UTC timezone', () => {
    it('returns formatted query date', () => {
      const date = new Date('2018-01-01T20:14:14+00:00');

      expect(formatQueryDate(date, 'Australia/Perth')).toBe('2018-01-02');
    });
  });
});
