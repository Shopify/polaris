import type {QueryPeriod} from '../types';

import {parsePeriod} from './parse-period';
import {parseRelativeDate} from './parse-relative-date';
import {TimeUnit} from './types';

export function getPreviousYear(
  reportingPeriod: QueryPeriod,
  timeZone?: string,
) {
  const {since, until} = parsePeriod(reportingPeriod, timeZone);
  const oneYear = {quantity: 1, unit: TimeUnit.Year};

  return parsePeriod(
    {
      since: parseRelativeDate(since, oneYear, timeZone),
      until: parseRelativeDate(until, oneYear, timeZone),
    },
    timeZone,
  );
}
