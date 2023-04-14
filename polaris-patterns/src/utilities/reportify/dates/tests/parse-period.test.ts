import {clock} from '@shopify/jest-dom-mocks';

import {parsePeriod} from '../parse-period';

describe('parsePeriod()', () => {
  describe('UTC timezone', () => {
    beforeEach(() => {
      // Default 'now' is June 28, 2018 at 12:00:00 (UTC)
      const now = new Date('2018-06-28T12:00:00+00:00');

      clock.mock(now.valueOf());
    });

    afterEach(() => {
      clock.restore();
    });

    it('parses a -1q period', () => {
      const date = parsePeriod(
        {
          since: '-1q',
          until: '-1q',
        },
        'UTC',
      );
      const expected = {
        since: new Date('2018-01-01T00:00:00.000+00:00'),
        until: new Date('2018-03-31T23:59:59.999+00:00'),
      };

      expect(date).toStrictEqual(expected);
    });

    it('parses a -2q period', () => {
      const date = parsePeriod(
        {
          since: '-2q',
          until: '-2q',
        },
        'UTC',
      );
      const expected = {
        since: new Date('2017-10-01T00:00:00.000+00:00'),
        until: new Date('2017-12-31T23:59:59.999+00:00'),
      };

      expect(date).toStrictEqual(expected);
    });

    it('parses a -3q period', () => {
      const date = parsePeriod(
        {
          since: '-3q',
          until: '-3q',
        },
        'UTC',
      );
      const expected = {
        since: new Date('2017-07-01T00:00:00.000+00:00'),
        until: new Date('2017-09-30T23:59:59.999+00:00'),
      };

      expect(date).toStrictEqual(expected);
    });

    it('parses a -4q period', () => {
      const date = parsePeriod(
        {
          since: '-4q',
          until: '-4q',
        },
        'UTC',
      );
      const expected = {
        since: new Date('2017-04-01T00:00:00.000+00:00'),
        until: new Date('2017-06-30T23:59:59.999+00:00'),
      };

      expect(date).toStrictEqual(expected);
    });
  });

  describe('not UTC timezone', () => {
    beforeEach(() => {
      // Default 'now' is June 28, 2018 at 12:00:00 (UTC)
      const now = new Date('2018-06-28T12:00:00+00:00');

      clock.mock(now.valueOf());
    });

    afterEach(() => {
      clock.restore();
    });

    it('parses a -1q period', () => {
      const date = parsePeriod(
        {
          since: '-1q',
          until: '-1q',
        },
        'Australia/Perth',
      );
      const expected = {
        since: new Date('2018-01-01T00:00:00.000+08:00'),
        until: new Date('2018-03-31T23:59:59.999+08:00'),
      };

      expect(date).toStrictEqual(expected);
    });

    it('parses a -2q period', () => {
      const date = parsePeriod(
        {
          since: '-2q',
          until: '-2q',
        },
        'Australia/Perth',
      );
      const expected = {
        since: new Date('2017-10-01T00:00:00.000+08:00'),
        until: new Date('2017-12-31T23:59:59.999+08:00'),
      };

      expect(date).toStrictEqual(expected);
    });

    it('parses a -3q period', () => {
      const date = parsePeriod(
        {
          since: '-3q',
          until: '-3q',
        },
        'Australia/Perth',
      );
      const expected = {
        since: new Date('2017-07-01T00:00:00.000+08:00'),
        until: new Date('2017-09-30T23:59:59.999+08:00'),
      };

      expect(date).toStrictEqual(expected);
    });

    it('parses a -4q period', () => {
      const date = parsePeriod(
        {
          since: '-4q',
          until: '-4q',
        },
        'Australia/Perth',
      );
      const expected = {
        since: new Date('2017-04-01T00:00:00.000+08:00'),
        until: new Date('2017-06-30T23:59:59.999+08:00'),
      };

      expect(date).toStrictEqual(expected);
    });
  });
});
