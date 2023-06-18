import {isSameDay} from '@shopify/dates';

import type {DatePeriod} from './types';

export function isDatePeriodEqual(
  period1: DatePeriod | null | undefined,
  period2: DatePeriod | null | undefined,
  timeZone?: string,
  exactEquality?: boolean,
) {
  const bothNull = period1 === null && period2 === null;
  const bothUndefined = period1 === undefined && period2 === undefined;

  if (bothNull || bothUndefined) {
    return true;
  }

  if (period1 == null || period2 == null) {
    return false;
  }

  if (exactEquality) {
    return (
      period1.since.valueOf() === period2.since.valueOf() &&
      period1.until.valueOf() === period2.until.valueOf()
    );
  } else {
    return (
      isSameDay(period1.since, period2.since, timeZone) &&
      isSameDay(period1.until, period2.until, timeZone)
    );
  }
}
