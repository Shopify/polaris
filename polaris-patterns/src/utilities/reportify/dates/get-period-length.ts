import type {DatePeriod} from './types';
import {TimeUnit} from './types';

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
