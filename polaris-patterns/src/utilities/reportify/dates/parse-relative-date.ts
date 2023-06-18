import {applyTimeZoneOffset, getDateTimeParts} from '@shopify/dates';

import type {RelativeDateParts} from './types';
import {TimeUnit} from './types';

export function parseRelativeDate(
  date: Date,
  {quantity, unit}: RelativeDateParts,
  timeZone?: string,
) {
  switch (unit) {
    case TimeUnit.Day:
      return subtractDays(date, quantity, timeZone);
    case TimeUnit.Week:
      return subtractDays(date, quantity * 7, timeZone);
    case TimeUnit.Month:
      return subtractMonths(date, quantity, timeZone);
    case TimeUnit.Quarter:
      return subtractMonths(date, quantity * 3, timeZone);
    case TimeUnit.Year:
      return subtractYears(date, quantity, timeZone);
    default:
      throw new RangeError(`Unhandled relative time unit ${unit}`);
  }
}

function createDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone?: string,
) {
  return applyTimeZoneOffset(
    new Date(year, month - 1, day, hour, minute, second),
    timeZone,
  );
}

export function subtractDays(date: Date, quantity: number, timeZone?: string) {
  const {year, month, day, hour, minute, second} = getDateTimeParts(
    date,
    timeZone,
  );

  return createDate(
    year(),
    month(),
    day() - quantity,
    hour(),
    minute(),
    second(),
    timeZone,
  );
}

function subtractMonths(date: Date, quantity: number, timeZone?: string) {
  const {year, month, day, hour, minute, second} = getDateTimeParts(
    date,
    timeZone,
  );
  const newDate = createDate(
    year(),
    month() - quantity,
    day(),
    hour(),
    minute(),
    second(),
    timeZone,
  );

  const expectedMonth =
    quantity >= month() ? month() - quantity + 12 : month() - quantity;

  const newDateParts = getDateTimeParts(newDate, timeZone);

  if (newDateParts.month() !== expectedMonth) {
    return createDate(
      newDateParts.year(),
      expectedMonth + 1,
      0,
      hour(),
      minute(),
      second(),
      timeZone,
    );
  }

  return newDate;
}

function subtractYears(date: Date, quantity: number, timeZone?: string) {
  const {year, month, day, hour, minute, second} = getDateTimeParts(
    date,
    timeZone,
  );
  const newDate = createDate(
    year() - quantity,
    month(),
    day(),
    hour(),
    minute(),
    second(),
    timeZone,
  );

  const newDateParts = getDateTimeParts(newDate, timeZone);
  if (newDateParts.month() !== month()) {
    return createDate(
      year() - quantity,
      month() + 1,
      0,
      hour(),
      minute(),
      second(),
      timeZone,
    );
  }

  return newDate;
}
