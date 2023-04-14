import type {DatePeriod} from './types';
import {TimeUnit} from './types';
import {getPeriodLength} from './get-period-length';
import {parseRelativeDate} from './parse-relative-date';
import {parseSince} from './parse-since';
import {parseUntil} from './parse-until';

export function getPreviousAdjacentPeriod(
  {since, until}: DatePeriod,
  timeZone?: string,
) {
  const periodLength = getPeriodLength({since, until}, TimeUnit.Day);

  return {
    since: parseSince(
      parseRelativeDate(
        since,
        {quantity: periodLength, unit: TimeUnit.Day},
        timeZone,
      ),
      timeZone,
    ),
    until: parseUntil(
      parseRelativeDate(
        until,
        {quantity: periodLength, unit: TimeUnit.Day},
        timeZone,
      ),
      timeZone,
    ),
  };
}
