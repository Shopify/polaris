import {TimeUnit} from './types';
import {parseDate} from './parse-date';
import {getRelativeDateParts} from './get-relative-date-parts';
import {getStartOf} from './get-start-of';

export function parseSince(date: string | Date, timeZone?: string) {
  if (date instanceof Date) {
    return getStartOf(date, TimeUnit.Day, timeZone);
  }
  const {unit} = getRelativeDateParts(date) || {unit: TimeUnit.Day};
  const parsedDate = parseDate(date, timeZone);

  return getStartOf(parsedDate, unit, timeZone);
}
