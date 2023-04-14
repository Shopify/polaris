import {clock} from '@shopify/jest-dom-mocks';

import {parseDate} from '../parse-date';

describe('parseDate()', () => {
  describe('UTC timezone', () => {
    beforeEach(() => {
      // Default 'now' is Monday, May 28, 2018 at 0:00:00 (UTC)
      const now = new Date('2018-05-28T00:00:00+00:00');

      clock.mock(now.valueOf());
    });

    afterEach(() => {
      clock.restore();
    });

    it('parses a date string without time or timezone', () => {
      const date = parseDate('2018-05-28', 'UTC');
      const expected = new Date('2018-05-28T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and without timezone', () => {
      const date = parseDate('2018-05-28T00:00:00', 'UTC');
      const expected = new Date('2018-05-28T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and timezone', () => {
      const date = parseDate('2018-05-28T00:00:00+05:00', 'UTC');
      const expected = new Date('2018-05-28T00:00:00+05:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "today" date string', () => {
      const date = parseDate('today', 'UTC');
      const expected = new Date('2018-05-28T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "yesterday" date string', () => {
      const date = parseDate('yesterday', 'UTC');
      const expected = new Date('2018-05-27T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1d" date string', () => {
      const date = parseDate('-1d', 'UTC');
      const expected = new Date('2018-05-27T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1w" date string', () => {
      const date = parseDate('-1w', 'UTC');
      const expected = new Date('2018-05-21T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1m" date string', () => {
      const date = parseDate('-1m', 'UTC');
      const expected = new Date('2018-04-28T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1q" date string', () => {
      const date = parseDate('-1q', 'UTC');
      const expected = new Date('2018-02-28T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1y" date string', () => {
      const date = parseDate('-1y', 'UTC');
      const expected = new Date('2017-05-28T00:00:00+00:00');

      expect(date).toStrictEqual(expected);
    });
  });

  describe('not UTC timezone', () => {
    beforeEach(() => {
      // Default 'now' is Monday, May 28, 2018 at 0:00:00 (Australia/Perth)
      const now = new Date('2018-05-28T00:00:00+08:00');

      clock.mock(now.valueOf());
    });

    afterEach(() => {
      clock.restore();
    });

    it('parses a date string without time or timezone', () => {
      const date = parseDate('2018-05-28', 'Australia/Perth');
      const expected = new Date('2018-05-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and without timezone', () => {
      const date = parseDate('2018-05-28T00:00:00', 'Australia/Perth');
      const expected = new Date('2018-05-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and timezone', () => {
      const date = parseDate('2018-05-28T00:00:00+08:00', 'Australia/Perth');
      const expected = new Date('2018-05-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "today" date string', () => {
      const date = parseDate('today', 'Australia/Perth');
      const expected = new Date('2018-05-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "yesterday" date string', () => {
      const date = parseDate('yesterday', 'Australia/Perth');
      const expected = new Date('2018-05-27T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1d" date string', () => {
      const date = parseDate('-1d', 'Australia/Perth');
      const expected = new Date('2018-05-27T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1w" date string', () => {
      const date = parseDate('-1w', 'Australia/Perth');
      const expected = new Date('2018-05-21T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1m" date string', () => {
      const date = parseDate('-1m', 'Australia/Perth');
      const expected = new Date('2018-04-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1q" date string', () => {
      const date = parseDate('-1q', 'Australia/Perth');
      const expected = new Date('2018-02-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1y" date string', () => {
      const date = parseDate('-1y', 'Australia/Perth');
      const expected = new Date('2017-05-28T00:00:00+08:00');

      expect(date).toStrictEqual(expected);
    });
  });
});
