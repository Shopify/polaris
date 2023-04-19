import type {I18n} from '@shopify/react-i18n';
import {DateStyle} from '@shopify/react-i18n';
import {
  parseDateString,
  applyTimeZoneOffset,
  getDateTimeParts,
} from '@shopify/dates';
import padStart from 'lodash/padStart';

import {
  formatDateToYearMonthDayDateString,
  isValidYearMonthDayDateString,
  parseYearMonthDayDateString,
} from '../../utilities/dates';

import {TimeUnit} from './types';
import type {
  DateRangePickerRange,
  StringDatePeriod,
  DatePeriod,
  QueryPeriod,
  RelativeDateParts,
} from './types';

export const getComparisonPeriod = (
  inputPeriod: StringDatePeriod,
  timezone?: string,
): DatePeriod | undefined => {
  if (
    !isValidYearMonthDayDateString(inputPeriod.since) ||
    !isValidYearMonthDayDateString(inputPeriod.until)
  ) {
    return;
  }

  const sinceDate = parseYearMonthDayDateString(inputPeriod.since);
  const untilDate = parseYearMonthDayDateString(inputPeriod.until);

  if (sinceDate && untilDate) {
    const period = parsePeriod(
      {
        since: sinceDate,
        until: untilDate,
      },
      timezone,
    );

    const periodLength = getPeriodLength(period, TimeUnit.Day);

    const compareSince = new Date(period.since);
    compareSince.setDate(period.since.getDate() - periodLength);
    const compareUntil = new Date(period.since);
    compareUntil.setDate(period.since.getDate() - 1);

    return {
      since: compareSince,
      until: compareUntil,
    };
  }
};

export const areRangesDifferent = (range1: DatePeriod, range2: DatePeriod) => {
  return !(
    formatDateToYearMonthDayDateString(range2.since) ===
      formatDateToYearMonthDayDateString(range1.since) &&
    formatDateToYearMonthDayDateString(range2.until) ===
      formatDateToYearMonthDayDateString(range1.until)
  );
};

export const getRangeFromDates = (
  dateRange: {since: Date; until: Date},
  ranges: DateRangePickerRange[],
) => {
  return (
    ranges.find((range) => {
      return (
        range.period.since.valueOf() === dateRange.since.valueOf() &&
        range.period.until.valueOf() === dateRange.until.valueOf()
      );
    }) || {
      alias: 'custom',
      title: 'Custom',
      period: {
        since: dateRange.since,
        until: dateRange.until,
      },
    }
  );
};

export const getDateRangeString = (
  dateRange: StringDatePeriod,
  i18n: I18n,
  timeZone?: string,
): string => {
  if (
    !isValidYearMonthDayDateString(dateRange.since) ||
    !isValidYearMonthDayDateString(dateRange.until)
  ) {
    return '';
  }
  const parsedRange = parsePeriod(dateRange, timeZone);
  const shortFormatSince = i18n.formatDate(parsedRange.since, {
    style: DateStyle.Short,
  });
  const shortFormatUntil = i18n.formatDate(parsedRange.until, {
    style: DateStyle.Short,
  });

  if (shortFormatSince === shortFormatUntil) {
    return shortFormatSince;
  }

  const splitSinceDate = shortFormatSince.split(',');
  const sinceDisplayDate =
    parsedRange.since.getFullYear() === parsedRange.until.getFullYear()
      ? splitSinceDate[0]
      : shortFormatSince;
  return [sinceDisplayDate, shortFormatUntil].join('-');
};

type SupportedTimeUnit = TimeUnit.Millisecond | TimeUnit.Day | TimeUnit.Hour;

export function getPeriodLength(
  {since, until}: DatePeriod,
  unit: SupportedTimeUnit = TimeUnit.Millisecond,
) {
  const lengthInMilliseconds = until.valueOf() - since.valueOf() + 1;
  const lengthInHours = lengthInMilliseconds / 1000 / 60 / 60;
  const lengthInDays = Math.round(lengthInHours / 24);

  switch (unit) {
    case TimeUnit.Millisecond:
      return lengthInMilliseconds;
    case TimeUnit.Hour:
      return lengthInHours;
    case TimeUnit.Day:
      return lengthInDays;
    default:
      throw new RangeError(`Unhandled TimeUnit: ${unit}`);
  }
}

export function formatQueryDate(date: Date, timeZone?: string) {
  const {year, month, day} = getDateTimeParts(date, timeZone);
  const paddedMonth = padStart(`${month()}`, 2, '0');
  const paddedDay = padStart(`${day()}`, 2, '0');

  return `${year()}-${paddedMonth}-${paddedDay}`;
}

export function parsePeriod(
  {since, until}: DatePeriod | QueryPeriod,
  timeZone?: string,
): DatePeriod {
  return {
    since: parseSince(since, timeZone),
    until: parseUntil(until, timeZone),
  };
}

export function parseSince(date: string | Date, timeZone?: string) {
  if (date instanceof Date) {
    return getStartOf(date, TimeUnit.Day, timeZone);
  }
  const {unit} = getRelativeDateParts(date) || {unit: TimeUnit.Day};
  const parsedDate = parseDate(date, timeZone);

  return getStartOf(parsedDate, unit, timeZone);
}

export function parseUntil(date: string | Date, timeZone?: string) {
  if (date instanceof Date) {
    return getEndOf(date, TimeUnit.Day, timeZone);
  }
  const {unit} = getRelativeDateParts(date) || {unit: TimeUnit.Day};
  const parsedDate = parseDate(date, timeZone);

  return getEndOf(parsedDate, unit, timeZone);
}

const validTimeUnits = Object.values(TimeUnit);
const RELATIVE_DATE_REGEX = `^-?([0-9]+)([${validTimeUnits.join('')}])$`;

export function getRelativeDateParts(relativeDate: string) {
  if (relativeDate === 'today') {
    return {quantity: 0, unit: TimeUnit.Day};
  } else if (relativeDate === 'yesterday') {
    return {quantity: 1, unit: TimeUnit.Day};
  }

  const dateParts = new RegExp(RELATIVE_DATE_REGEX).exec(relativeDate);

  if (dateParts == null) {
    return null;
  }

  const [, rawQuantity, unit] = dateParts;
  const quantity = parseInt(rawQuantity, 10);

  return {quantity, unit} as RelativeDateParts;
}

export function parseDate(date: string, timeZone?: string) {
  const parsedDate = parseDateString(date, timeZone);

  if (parsedDate != null) {
    return parsedDate;
  }

  const relativeDateParts = getRelativeDateParts(date);

  if (relativeDateParts != null) {
    return parseRelativeDate(new Date(), relativeDateParts, timeZone);
  }

  throw new Error(`Unable to parse date: ${date} for timezone: ${timeZone}`);
}

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

function subtractDays(date: Date, quantity: number, timeZone?: string) {
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

export const VALID_YYYY_MM_DD_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}/;

export const isDate = (date: string) => {
  return !isNaN(new Date(date).getDate());
};
