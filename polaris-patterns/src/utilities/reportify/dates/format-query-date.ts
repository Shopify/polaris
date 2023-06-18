import {getDateTimeParts} from '@shopify/dates';

import {padStart} from '../format-query-date';

export function formatQueryDate(date: Date, timeZone?: string) {
  const {year, month, day} = getDateTimeParts(date, timeZone);
  const paddedMonth = padStart(`${month()}`, 2, '0');
  const paddedDay = padStart(`${day()}`, 2, '0');

  return `${year()}-${paddedMonth}-${paddedDay}`;
}
