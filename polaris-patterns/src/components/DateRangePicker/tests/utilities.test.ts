import {mockI18n} from 'tests/utilities';

import {daysAgo, today, yesterday} from '../../../utilities/dates';
import {
  getPeriodLength,
  getComparisonPeriod,
  getDateRangeString,
  getRangeFromDates,
  areRangesDifferent,
  formatQueryDate,
  parseDate,
} from '../utilities';
import translations from '../translations/en.json';

const i18n = mockI18n([translations]);
const timeZone = 'America/New_York';

const ranges = [
  {
    title: i18n.translate('periods.today'),
    alias: 'today',
    period: {
      since: today(),
      until: today(),
    },
  },
  {
    title: i18n.translate('periods.yesterday'),
    alias: 'yesterday',
    period: {
      since: yesterday(),
      until: yesterday(),
    },
  },
  {
    title: i18n.translate('periods.last7Days'),
    alias: 'last7days',
    period: {
      since: daysAgo(7),
      until: yesterday(),
    },
  },
];

describe('utilities', () => {
  describe('isComparisonRangeDifferent', () => {
    it('returns true when the comparison range is different than reporting range', () => {
      const reportingPeriod = {
        since: new Date('2023-03-04'),
        until: new Date('2023-03-06'),
      };
      const comparisonPeriod = {
        since: new Date('2023-03-01'),
        until: new Date('2023-03-03'),
      };

      expect(areRangesDifferent(reportingPeriod, comparisonPeriod)).toBe(true);
    });

    it('returns false when the comparison range is the same as reporting range', () => {
      const reportingPeriod = {
        since: new Date('2023-03-04'),
        until: new Date('2023-03-06'),
      };
      const comparisonPeriod = {
        since: new Date('2023-03-04'),
        until: new Date('2023-03-06'),
      };

      expect(areRangesDifferent(reportingPeriod, comparisonPeriod)).toBe(false);
    });
  });

  describe('getDateRangeString', () => {
    it('returns a formatted date range string', () => {
      const dateRange = {since: '2023-03-04', until: '2023-03-06'};
      expect(getDateRangeString(dateRange, i18n, timeZone)).toBe(
        'Mar 4-Mar 6, 2023',
      );
    });

    it('includes both years when the range spans more than one year', () => {
      const dateRange = {since: '2022-03-04', until: '2023-03-06'};
      expect(getDateRangeString(dateRange, i18n, timeZone)).toBe(
        'Mar 4, 2022-Mar 6, 2023',
      );
    });

    it('returns an empty string when since is empty', () => {
      const dateRange = {since: '', until: '2023-03-04'};
      expect(getDateRangeString(dateRange, i18n, timeZone)).toBe('');
    });

    it('returns an empty string when until is empty', () => {
      const dateRange = {since: '2023-03-04', until: ''};
      expect(getDateRangeString(dateRange, i18n, timeZone)).toBe('');
    });

    it('returns an empty string when since is invalid', () => {
      const dateRange = {since: '', until: 'sdfsadf'};
      expect(getDateRangeString(dateRange, i18n, timeZone)).toBe('');
    });

    it('returns an empty string when until is invalid', () => {
      const dateRange = {since: 'asdfasdf', until: ''};
      expect(getDateRangeString(dateRange, i18n, timeZone)).toBe('');
    });
  });

  describe('getComparisonPeriod', () => {
    it('returns a comparison period of the same length as the reporting period', () => {
      const reportingPeriod = {since: '2023-03-31', until: '2023-04-03'};
      const comparisonPeriod = getComparisonPeriod(reportingPeriod);

      expect(comparisonPeriod).toBeDefined();

      expect(formatQueryDate(comparisonPeriod!.since)).toBe('2023-03-27');
      expect(formatQueryDate(comparisonPeriod!.until)).toBe('2023-03-30');
      expect(
        getPeriodLength({
          since: parseDate(reportingPeriod.since),
          until: parseDate(reportingPeriod.until),
        }),
      ).toBe(
        getPeriodLength({
          since: comparisonPeriod!.since,
          until: comparisonPeriod!.until,
        }),
      );
    });

    it('calculates the comparison period between 2 months', () => {
      const reportingPeriod = {since: '2023-03-02', until: '2023-03-06'};
      const comparisonPeriod = getComparisonPeriod(reportingPeriod);

      expect(comparisonPeriod).toBeDefined();

      expect(formatQueryDate(comparisonPeriod!.since)).toBe('2023-02-25');
      expect(formatQueryDate(comparisonPeriod!.until)).toBe('2023-03-01');
      expect(
        getPeriodLength({
          since: parseDate(reportingPeriod.since),
          until: parseDate(reportingPeriod.until),
        }),
      ).toBe(
        getPeriodLength({
          since: comparisonPeriod!.since,
          until: comparisonPeriod!.until,
        }),
      );
    });
  });

  describe('formatDateToYearMonthDayDateString', () => {
    it('returns a formatted date string', () => {
      const date = new Date('2023-03-04');
      expect(formatQueryDate(date)).toBe('2023-03-04');
    });
  });

  describe('getRangeFromDates', () => {
    it('returns a range from the predefined list of ranges', () => {
      const dateRange = {since: yesterday(), until: yesterday()};
      const range = getRangeFromDates(dateRange, ranges);

      expect(range.alias).toBe('yesterday');
    });

    it('returns a range of multiple days from the predefined list', () => {
      const dateRange = {since: daysAgo(7), until: yesterday()};
      const range = getRangeFromDates(dateRange, ranges);

      expect(range.alias).toBe('last7days');
    });

    it('returns a custom range if the range is not in the list', () => {
      const dateRange = {since: daysAgo(3), until: yesterday()};
      const range = getRangeFromDates(dateRange, ranges);

      expect(range.alias).toBe('custom');
    });
  });
});
