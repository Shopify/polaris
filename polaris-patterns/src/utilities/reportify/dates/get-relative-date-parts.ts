import type {RelativeDateParts} from './types';
import {TimeUnit} from './types';

const validTimeUnits = Object.values(TimeUnit);
const RELATIVE_DATE_REGEX = `^-?([0-9]+)([${validTimeUnits.join('')}])$`;

export function getRelativeDateParts(relativeDate: string) {
  if (relativeDate === 'today') {
    return {quantity: 0, unit: TimeUnit.Day};
  } else if (relativeDate === 'yesterday') {
    return {quantity: 1, unit: TimeUnit.Day};
  }

  const dateParts = new RegExp(RELATIVE_DATE_REGEX).exec(relativeDate);

  if (dateParts == null) {
    return null;
  }

  const [, rawQuantity, unit] = dateParts;
  const quantity = parseInt(rawQuantity, 10);

  return {quantity, unit} as RelativeDateParts;
}
