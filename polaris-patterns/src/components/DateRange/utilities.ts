import {unapplyTimeZoneOffset} from '@shopify/dates';

import {formatQueryDatePeriod, parsePeriod} from 'utilities/reportify';

import type {DateRange} from './types';

export function formatDateForDatepicker(
  date: Date,
  timeZone: string | undefined,
) {
  const dateCopy = unapplyTimeZoneOffset(date, timeZone);
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  dateCopy.setMilliseconds(0);
  return dateCopy;
}

export function filterAndAdjustRangesAfter(
  date: Date,
  dateRanges: DateRange[],
  timeZone: string,
) {
  const endofDay = date.setHours(23, 59, 59, 999);

  const nonFutureRanges = dateRanges.filter((dateRange) => {
    if (dateRange.period === null) {
      return;
    }
    return (
      dateRange.period.until === 'today' ||
      parsePeriod(dateRange.period, timeZone).until <= new Date(endofDay)
    );
  });

  const rangesWithUntilInFuture: DateRange[] = dateRanges.filter(
    (dateRange) => {
      if (dateRange.period === null) {
        return;
      }
      const {since, until} = parsePeriod(dateRange.period, timeZone);
      return (
        dateRange.period.until !== 'today' &&
        since <= new Date(endofDay) &&
        until > new Date(endofDay)
      );
    },
  );
  const rangesWithFutureUntilsAdjusted: DateRange[] =
    rangesWithUntilInFuture.map((dateRange) => {
      const datePeriod = parsePeriod(dateRange.period!, timeZone);
      const newDatePeriod = {
        since: datePeriod.since,
        until: new Date(endofDay),
      };

      return {
        ...dateRange,
        period: formatQueryDatePeriod(newDatePeriod, timeZone),
      };
    });
  return [...rangesWithFutureUntilsAdjusted, ...nonFutureRanges];
}
