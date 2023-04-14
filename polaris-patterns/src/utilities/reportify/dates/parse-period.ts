import type {QueryPeriod} from '../types';

import {parseSince} from './parse-since';
import {parseUntil} from './parse-until';
import type {DatePeriod} from './types';

export function parsePeriod(
  {since, until}: DatePeriod | QueryPeriod,
  timeZone?: string,
): DatePeriod {
  return {
    since: parseSince(since, timeZone),
    until: parseUntil(until, timeZone),
  };
}
