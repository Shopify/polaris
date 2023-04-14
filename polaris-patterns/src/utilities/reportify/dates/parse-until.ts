import {TimeUnit} from './types';
import {parseDate} from './parse-date';
import {getRelativeDateParts} from './get-relative-date-parts';
import {getEndOf} from './get-end-of';

export function parseUntil(date: string | Date, timeZone?: string) {
  if (date instanceof Date) {
    return getEndOf(date, TimeUnit.Day, timeZone);
  }
  const {unit} = getRelativeDateParts(date) || {unit: TimeUnit.Day};
  const parsedDate = parseDate(date, timeZone);

  return getEndOf(parsedDate, unit, timeZone);
}
