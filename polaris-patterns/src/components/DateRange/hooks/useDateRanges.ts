import {useI18n} from '@shopify/react-i18n';
import {useCallback, useMemo} from 'react';
import {useShop} from '@web-utilities/shop';

import {ReportComparisonPeriodDateRange} from 'types/graphql/core-types';
import {
  getPreviousPeriod,
  formatQueryDatePeriod,
  getPreviousYear,
  isDatePeriodEqual,
  parsePeriod,
  periodsInMs,
  getPeriodLength,
} from 'utilities/reportify';
import type {QueryPeriod, DatePeriod} from 'utilities/reportify';

import type {DateRange, ComparisonRange} from '../types';

export const comparisonRangeAlias = {
  ...ReportComparisonPeriodDateRange,
  NoComparison: 'NoComparison',
};

export function useDateRanges() {
  const [i18n] = useI18n();

  const {ianaTimezone: timeZone} = useShop();

  const getComparisonRangeText = useCallback(
    (alias: string) => {
      switch (alias) {
        case comparisonRangeAlias.PreviousPeriod:
          return i18n.translate('comparisonRanges.previousPeriod');
        case comparisonRangeAlias.PreviousYear:
          return i18n.translate('comparisonRanges.previousYear');
        case comparisonRangeAlias.NoComparison:
          return i18n.translate('comparisonRanges.noComparison');
        default:
          return '';
      }
    },
    [i18n],
  );

  const createCustomDateRange = useCallback(
    (datePeriod: DatePeriod, timeZone?: string): DateRange => {
      return {
        title: i18n.translate('dateRanges.custom'),
        alias: 'custom',
        period: formatQueryDatePeriod(datePeriod, timeZone),
      };
    },
    [i18n],
  );

  const getQuarterRangeTitle = (quarterIndex: number, year: number) => {
    switch (quarterIndex) {
      case 1:
        return i18n.translate('dateRanges.firstQuarter', {year});
      case 2:
        return i18n.translate('dateRanges.secondQuarter', {year});
      case 3:
        return i18n.translate('dateRanges.thirdQuarter', {year});
      case 4:
        return i18n.translate('dateRanges.fourthQuarter', {year});
      default:
        return '';
    }
  };

  const quarterDateRanges: (givenNow: Date) => {} = (givenNow) =>
    [1, 2, 3, 4].reduce((ranges, quantity) => {
      const now = new Date(givenNow);
      now.setDate(1);
      now.setMonth(now.getMonth() - quantity * 3);
      const targetQuarter = new Date(now.valueOf());
      const year = targetQuarter.getFullYear();
      const quarterIndex = Math.floor(targetQuarter.getMonth() / 3) + 1;
      const key = `Quarter${quarterIndex}_${year}`;

      return {
        ...ranges,
        [key]: {
          title: getQuarterRangeTitle(quarterIndex, year),
          alias: `quarter-${quarterIndex}-${year}`,
          period: {
            since: `-${quantity}q`,
            until: `-${quantity}q`,
          },
        },
      };
    }, {});

  function quarterDateRangesFromDate(currentDate: Date) {
    return quarterDateRanges(currentDate);
  }

  const DefaultDateRanges = {
    Today: {
      title: i18n.translate('dateRanges.today'),
      alias: 'today',
      period: {
        since: 'today',
        until: 'today',
      },
    },
    Yesterday: {
      title: i18n.translate('dateRanges.yesterday'),
      alias: 'yesterday',
      period: {
        since: 'yesterday',
        until: 'yesterday',
      },
    },
    Last7Days: {
      title: i18n.translate('dateRanges.last7days'),
      alias: 'last7days',
      period: {
        since: '-7d',
        until: '-1d',
      },
    },
    Last30days: {
      title: i18n.translate('dateRanges.last30days'),
      alias: 'last30days',
      period: {
        since: '-30d',
        until: '-1d',
      },
    },
    Last90Days: {
      title: i18n.translate('dateRanges.last90days'),
      alias: 'last90days',
      period: {
        since: '-90d',
        until: '-1d',
      },
    },
    LastMonth: {
      title: i18n.translate('dateRanges.lastMonth'),
      alias: 'last_month',
      period: {
        since: '-1m',
        until: '-1m',
      },
    },
    LastYear: {
      title: i18n.translate('dateRanges.lastYear'),
      alias: 'last_year',
      period: {
        since: '-1y',
        until: '-1y',
      },
    },
    WeekToDate: {
      title: i18n.translate('dateRanges.weekToDate'),
      alias: 'week_to_date',
      period: {
        since: '0w',
        until: 'today',
      },
    },
    MonthToDate: {
      title: i18n.translate('dateRanges.monthToDate'),
      alias: 'month_to_date',
      period: {
        since: '0m',
        until: 'today',
      },
    },
    QuarterToDate: {
      title: i18n.translate('dateRanges.quarterToDate'),
      alias: 'quarter_to_date',
      period: {
        since: '0q',
        until: 'today',
      },
    },
    YearToDate: {
      title: i18n.translate('dateRanges.yearToDate'),
      alias: 'year_to_date',
      period: {
        since: '0y',
        until: 'today',
      },
    },
    BFCM2026: {
      title: i18n.translate('dateRanges.bfcm', {year: 2026}),
      alias: 'bfcm-2026',
      period: {
        since: '2026-11-26',
        until: '2026-11-29',
      },
    },
    BFCM2025: {
      title: i18n.translate('dateRanges.bfcm', {year: 2025}),
      alias: 'bfcm-2025',
      period: {
        since: '2025-11-28',
        until: '2025-12-01',
      },
    },
    BFCM2024: {
      title: i18n.translate('dateRanges.bfcm', {year: 2024}),
      alias: 'bfcm-2024',
      period: {
        since: '2024-11-29',
        until: '2024-12-02',
      },
    },
    BFCM2023: {
      title: i18n.translate('dateRanges.bfcm', {year: 2023}),
      alias: 'bfcm-2023',
      period: {
        since: '2023-11-24',
        until: '2023-11-27',
      },
    },
    BFCM2022: {
      title: i18n.translate('dateRanges.bfcm', {year: 2022}),
      alias: 'bfcm-2022',
      period: {
        since: '2022-11-25',
        until: '2022-11-28',
      },
    },
    BFCM2021: {
      title: i18n.translate('dateRanges.bfcm', {year: 2021}),
      alias: 'bfcm-2021',
      period: {
        since: '2021-11-26',
        until: '2021-11-29',
      },
    },
    BFCM2020: {
      title: i18n.translate('dateRanges.bfcm', {year: 2020}),
      alias: 'bfcm-2020',
      period: {
        since: '2020-11-27',
        until: '2020-11-30',
      },
    },
    BFCM2019: {
      title: i18n.translate('dateRanges.bfcm', {year: 2019}),
      alias: 'bfcm-2019',
      period: {
        since: '2019-11-29',
        until: '2019-12-02',
      },
    },
  } as const;

  const DateRanges = {
    ...DefaultDateRanges,
    ...quarterDateRanges(new Date()),
  };

  const deriveDateRange = useCallback(
    (
      dateRanges: DateRange[],
      datePeriod: DatePeriod | null,
      timeZone?: string,
    ): DateRange | null => {
      if (!datePeriod) {
        return dateRanges.find(({period}) => period === null) || null;
      }

      return (
        dateRanges.find(
          ({period}) =>
            period &&
            isDatePeriodEqual(
              parsePeriod(period, timeZone),
              datePeriod,
              timeZone,
            ),
        ) || createCustomDateRange(datePeriod, timeZone)
      );
    },
    [createCustomDateRange],
  );

  const comparisonRanges: ComparisonRange[] = useMemo(
    () => [
      {
        alias: comparisonRangeAlias.NoComparison,
        period: () => null,
      },
      {
        alias: comparisonRangeAlias.PreviousPeriod,
        period: getPreviousPeriod,
      },
      {
        alias: comparisonRangeAlias.PreviousYear,
        period: getPreviousYear,
        condition: (reportingPeriod) =>
          getPeriodLength(reportingPeriod) < periodsInMs.year,
      },
    ],
    [],
  );

  const prepareComparisonRanges = useCallback(
    (reportingPeriod: QueryPeriod, otherRanges: DateRange[] = []) => {
      return [
        ...comparisonRanges.map((comparisonRange) => {
          const period = comparisonRange.period(reportingPeriod, timeZone);
          return {
            title: getComparisonRangeText(comparisonRange.alias),
            alias: comparisonRange.alias,
            period:
              period == null ? null : formatQueryDatePeriod(period, timeZone),
          };
        }),
        ...otherRanges,
      ];
    },
    [getComparisonRangeText, timeZone, comparisonRanges],
  );

  function createCustomComparisonRange(
    comparisonPeriod: DatePeriod,
  ): ComparisonRange {
    return {
      alias: comparisonRangeAlias.Custom,
      period: () => comparisonPeriod,
    };
  }

  function getValidComparisonRanges(reportingPeriod: DatePeriod) {
    return comparisonRanges.filter(
      ({condition}) => condition == null || condition(reportingPeriod),
    );
  }

  function deriveComparisonRange(
    reportingPeriod: QueryPeriod,
    comparisonPeriod: DatePeriod | null,
    timeZone?: string,
  ) {
    const parsedPeriod = parsePeriod(reportingPeriod, timeZone);
    const validComparisonRanges = getValidComparisonRanges(parsedPeriod).map(
      (range) => range.period(reportingPeriod, timeZone),
    );

    if (comparisonPeriod == null) {
      return comparisonRanges[0];
    }

    const comparisonRangeIndex = validComparisonRanges.findIndex(
      (comparisonRange) =>
        isDatePeriodEqual(comparisonRange, comparisonPeriod, timeZone),
    );

    return comparisonRangeIndex > -1
      ? comparisonRanges[comparisonRangeIndex]
      : createCustomComparisonRange(comparisonPeriod);
  }

  return {
    DateRanges,
    createCustomDateRange,
    deriveDateRange,
    prepareComparisonRanges,
    deriveComparisonRange,
    comparisonRanges,
    comparisonRangeAlias,
    quarterDateRangesFromDate,
  };
}
