import {useShop} from '@web-utilities/shop';
import {useI18n} from '@shopify/react-i18n';

import {getDifferenceInDays} from 'utilities/dates';
import {parsePeriod} from 'utilities/reportify';
import type {QueryPeriod} from 'utilities/reportify';

import {filterAndAdjustRangesAfter} from '../utilities';
import type {DateRange} from '../types';
import type {QuickPicks} from '../DateRange';

import {useDateRanges} from './useDateRanges';

export function useReportQuickPicks(currentPeriod?: QueryPeriod | null) {
  const {DateRanges, prepareComparisonRanges} = useDateRanges();

  const dateRanges = Object.values(DateRanges);
  const {ianaTimezone: timeZone} = useShop();
  const today = new Date();
  const [i18n] = useI18n();
  const filteredDateRanges = filterAndAdjustRangesAfter(
    today,
    dateRanges,
    timeZone,
  );
  enum PickerType {
    Date = 'date',
    Comparison = 'comparison',
  }

  function getRecommendedRanges(
    ranges: DateRange[],
    picker: PickerType,
    targetDate: Date,
    timeZone: string,
  ) {
    const recommended: DateRange[] = [];
    const recommendedRangeWindow = 14;
    ranges.forEach((range, index) => {
      if (range.period == null) {
        return;
      }
      const {until} = parsePeriod(range.period, timeZone);
      if (
        Math.abs(getDifferenceInDays(until, targetDate)) <
        recommendedRangeWindow
      ) {
        if (picker === PickerType.Date) {
          recommended.push(range);
        } else if (picker === PickerType.Comparison) {
          recommended.push(ranges[index + 1]);
        }
      }
    });

    return recommended;
  }

  const quarters = filteredDateRanges.filter(
    (dateRange) =>
      dateRange.alias.includes('quarter') &&
      dateRange.alias !== 'quarter_to_date',
  );
  const bfcmRanges = filteredDateRanges.filter((dateRange) =>
    dateRange.alias.includes('bfcm'),
  );

  const dateRangeQuickPicks: QuickPicks = {
    recommended: filterAndAdjustRangesAfter(
      new Date(),
      getRecommendedRanges(bfcmRanges, PickerType.Date, today, timeZone),
      timeZone,
    ),
    options: filteredDateRanges.filter(
      (dateRange) =>
        (!dateRange.alias.includes('quarter') &&
          !dateRange.alias.includes('bfcm')) ||
        dateRange.alias === 'quarter_to_date',
    ),
    sections: [
      {
        title: i18n.translate('quickPicks.sections.quarters'),
        options: quarters,
      },
      {
        title: i18n.translate('quickPicks.sections.bfcm'),
        options: bfcmRanges,
      },
    ],
  };
  const preparedComparisonRanges = currentPeriod
    ? prepareComparisonRanges(currentPeriod, [...quarters, ...bfcmRanges])
    : [];
  const comparisonRangeQuickPicks: QuickPicks = {
    recommended: getRecommendedRanges(
      bfcmRanges,
      PickerType.Comparison,
      today,
      timeZone,
    ),
    options: preparedComparisonRanges.filter(
      (dateRange) =>
        !dateRange.alias.includes('quarter') &&
        !dateRange.alias.includes('bfcm'),
    ),
    sections: [
      {
        title: i18n.translate('quickPicks.sections.quarters'),
        options: quarters,
      },
      {
        title: i18n.translate('quickPicks.sections.bfcm'),
        options: bfcmRanges,
      },
    ],
  };
  return {dateRangeQuickPicks, comparisonRangeQuickPicks};
}
