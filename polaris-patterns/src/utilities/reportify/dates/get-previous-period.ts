import type {QueryPeriod} from '../types';

import {getPreviousAdjacentPeriod} from './get-previous-adjacent-period';
import {getPreviousRelativePeriod} from './get-previous-relative-period';
import {getPreviousToDatePeriod} from './get-previous-to-date-period';
import {getRelativeDateParts} from './get-relative-date-parts';
import {parsePeriod} from './parse-period';
import {TimeUnit} from './types';

export function getPreviousPeriod(
  currentPeriod: QueryPeriod,
  timeZone?: string,
) {
  const {since, until} = currentPeriod;

  const sinceRelativeDateParts = getRelativeDateParts(since);
  const untilRelativeDateParts = getRelativeDateParts(until);
  const parsedPeriod = parsePeriod(currentPeriod, timeZone);

  if (sinceRelativeDateParts != null && until === 'today') {
    const {unit} = sinceRelativeDateParts;
    return unit === TimeUnit.Day
      ? getPreviousAdjacentPeriod(parsedPeriod, timeZone)
      : getPreviousToDatePeriod(sinceRelativeDateParts, timeZone);
  }

  if (sinceRelativeDateParts != null && untilRelativeDateParts != null) {
    return getPreviousRelativePeriod(
      sinceRelativeDateParts,
      untilRelativeDateParts,
      timeZone,
    );
  }

  return getPreviousAdjacentPeriod(parsedPeriod, timeZone);
}
