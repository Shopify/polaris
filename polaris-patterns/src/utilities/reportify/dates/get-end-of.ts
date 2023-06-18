import {applyTimeZoneOffset, getDateTimeParts} from '@shopify/dates';

import {TimeUnit} from './types';

export function getEndOf(date: Date, unit: TimeUnit, timeZone?: string) {
  const {year, month, day, weekday} = getDateTimeParts(date, timeZone);
  let endOfDate: Date;

  switch (unit) {
    case TimeUnit.Day:
      endOfDate = endOfDay(year(), month(), day());
      break;

    case TimeUnit.Week:
      endOfDate = endOfDay(year(), month(), day() - weekday() + 6);
      break;

    case TimeUnit.Month:
      endOfDate = endOfMonth(year(), month());
      break;

    case TimeUnit.Quarter:
      endOfDate = endOfQuarter(year(), month());
      break;

    case TimeUnit.Year:
      endOfDate = endOfYear(year());
      break;

    default:
      throw new RangeError(`Unhandled relative time unit ${unit}`);
  }

  return applyTimeZoneOffset(endOfDate, timeZone, 'UTC');
}

function endOfDay(year: number, month: number, date: number) {
  const nextDay = new Date(Date.UTC(year, month - 1, date + 1, 0, 0, 0, 0));

  return new Date(nextDay.setMilliseconds(-1).valueOf());
}

function endOfMonth(year: number, month: number) {
  return endOfDay(year, month + 1, 0);
}

function endOfQuarter(year: number, month: number) {
  const monthBefore = month - 1;
  const startOfQuarter = month - (monthBefore % 3);
  const endOfQuarter = startOfQuarter + 2;

  return endOfMonth(year, endOfQuarter);
}

function endOfYear(year: number) {
  return endOfMonth(year, 12);
}
