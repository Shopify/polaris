import type {RelativeDateParts} from './types';
import {parseRelativeDate} from './parse-relative-date';
import {parseSince} from './parse-since';
import {parseUntil} from './parse-until';

export function getPreviousToDatePeriod(
  {quantity, unit}: RelativeDateParts,
  timeZone?: string,
) {
  const previousQuantity = quantity * 2 + 1;
  const until = parseUntil('today', timeZone);

  return {
    since: parseSince(`-${previousQuantity}${unit}`, timeZone),
    until: parseRelativeDate(
      until,
      {quantity: previousQuantity, unit},
      timeZone,
    ),
  };
}
