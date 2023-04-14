import type {RelativeDateParts} from './types';
import {TimeUnit} from './types';
import {getPreviousAdjacentPeriod} from './get-previous-adjacent-period';
import {parsePeriod} from './parse-period';

export function getPreviousRelativePeriod(
  {quantity: sinceQuantity, unit: sinceUnit}: RelativeDateParts,
  {quantity: untilQuantity, unit: untilUnit}: RelativeDateParts,
  timeZone?: string,
) {
  const period = parsePeriod(
    {
      since: `-${sinceQuantity}${sinceUnit}`,
      until: `-${untilQuantity}${untilUnit}`,
    },
    timeZone,
  );

  if (sinceUnit !== untilUnit || sinceUnit === TimeUnit.Day) {
    return getPreviousAdjacentPeriod(period, timeZone);
  }

  return parsePeriod(
    {
      since: `-${sinceQuantity + 1}${sinceUnit}`,
      until: `-${untilQuantity + 1}${untilUnit}`,
    },
    timeZone,
  );
}
