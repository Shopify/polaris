import {clock} from '@shopify/jest-dom-mocks';

import {parseUntil} from '../parse-until';

describe('parseUntil()', () => {
  describe('UTC timezone', () => {
    beforeEach(() => {
      // Default 'now' is Monday, May 28, 2018 at 12:00:00 (UTC)
      const now = new Date('2018-05-28T12:00:00+00:00');

      clock.mock(now.valueOf());
    });

    afterEach(() => {
      clock.restore();
    });

    it('parses a date object', () => {
      const startDate = new Date('2018-05-28T12:00:00+00:00');
      const date = parseUntil(startDate, 'UTC');
      const expected = new Date('2018-05-28T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string without time or timezone', () => {
      const date = parseUntil('2018-05-28', 'UTC');
      const expected = new Date('2018-05-28T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and without timezone', () => {
      const date = parseUntil('2018-05-28T12:00:00', 'UTC');
      const expected = new Date('2018-05-28T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and timezone', () => {
      const date = parseUntil('2018-05-28T10:00:00+05:00', 'UTC');
      const expected = new Date('2018-05-28T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "today" date string', () => {
      const date = parseUntil('today', 'UTC');
      const expected = new Date('2018-05-28T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "yesterday" date string', () => {
      const date = parseUntil('yesterday', 'UTC');
      const expected = new Date('2018-05-27T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1d" date string', () => {
      const date = parseUntil('-1d', 'UTC');
      const expected = new Date('2018-05-27T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1w" date string', () => {
      const date = parseUntil('-1w', 'UTC');
      const expected = new Date('2018-05-27T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1m" date string', () => {
      const date = parseUntil('-1m', 'UTC');
      const expected = new Date('2018-04-30T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1q" date string', () => {
      const date = parseUntil('-1q', 'UTC');
      const expected = new Date('2018-03-31T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1y" date string', () => {
      const date = parseUntil('-1y', 'UTC');
      const expected = new Date('2017-12-31T23:59:59.999+00:00');

      expect(date).toStrictEqual(expected);
    });
  });

  describe('not UTC timezone', () => {
    beforeEach(() => {
      // Default 'now' is Monday, May 28, 2018 at 12:00:00 (Australia/Perth)
      const now = new Date('2018-05-28T12:00:00+08:00');

      clock.mock(now.valueOf());
    });

    afterEach(() => {
      clock.restore();
    });

    it('parses a date object', () => {
      const startDate = new Date('2018-05-28T12:00:00+08:00');
      const date = parseUntil(startDate, 'Australia/Perth');
      const expected = new Date('2018-05-28T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string without time or timezone', () => {
      const date = parseUntil('2018-05-28', 'Australia/Perth');
      const expected = new Date('2018-05-28T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and without timezone', () => {
      const date = parseUntil('2018-05-28T12:00:00', 'Australia/Perth');
      const expected = new Date('2018-05-28T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a date string with time and timezone', () => {
      const date = parseUntil('2018-05-28T10:00:00+05:00', 'Australia/Perth');
      const expected = new Date('2018-05-28T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "today" date string', () => {
      const date = parseUntil('today', 'Australia/Perth');
      const expected = new Date('2018-05-28T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "yesterday" date string', () => {
      const date = parseUntil('yesterday', 'Australia/Perth');
      const expected = new Date('2018-05-27T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1d" date string', () => {
      const date = parseUntil('-1d', 'Australia/Perth');
      const expected = new Date('2018-05-27T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1w" date string', () => {
      const date = parseUntil('-1w', 'Australia/Perth');
      const expected = new Date('2018-05-27T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1m" date string', () => {
      const date = parseUntil('-1m', 'Australia/Perth');
      const expected = new Date('2018-04-30T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1q" date string', () => {
      const date = parseUntil('-1q', 'Australia/Perth');
      const expected = new Date('2018-03-31T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });

    it('parses a relative "-1y" date string', () => {
      const date = parseUntil('-1y', 'Australia/Perth');
      const expected = new Date('2017-12-31T23:59:59.999+08:00');

      expect(date).toStrictEqual(expected);
    });
  });
});
