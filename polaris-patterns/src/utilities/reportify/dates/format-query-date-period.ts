import {formatQueryDate} from './format-query-date';
import type {DatePeriod} from './types';

export function formatQueryDatePeriod(
  {since, until}: DatePeriod,
  timeZone?: string,
) {
  return {
    since: formatQueryDate(since, timeZone),
    until: formatQueryDate(until, timeZone),
  };
}
