import {applyTimeZoneOffset, getDateTimeParts} from '@shopify/dates';

import {TimeUnit} from './types';

export function getStartOf(date: Date, unit: TimeUnit, timeZone?: string) {
  const {year, month, day, weekday} = getDateTimeParts(date, timeZone);
  let startOfDate: Date;

  switch (unit) {
    case TimeUnit.Day:
      startOfDate = startOfPeriodDate(year(), month(), day());
      break;

    case TimeUnit.Week:
      startOfDate = startOfPeriodDate(year(), month(), day() - weekday());
      break;

    case TimeUnit.Month:
      startOfDate = startOfPeriodDate(year(), month());
      break;

    case TimeUnit.Quarter:
      startOfDate = startOfPeriodDate(year(), month() - ((month() - 1) % 3));
      break;

    case TimeUnit.Year:
      startOfDate = startOfPeriodDate(year());
      break;

    default:
      throw new RangeError(`Unhandled relative time unit ${unit}`);
  }

  return applyTimeZoneOffset(startOfDate, timeZone, 'UTC');
}

function startOfPeriodDate(
  year: number,
  month = 1,
  date = 1,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
) {
  return new Date(
    Date.UTC(year, month - 1, date, hour, minute, second, millisecond),
  );
}
