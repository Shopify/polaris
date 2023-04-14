import {parseDateString} from '@shopify/dates';

import {getRelativeDateParts} from './get-relative-date-parts';
import {parseRelativeDate} from './parse-relative-date';

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
