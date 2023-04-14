import {isNumeric} from './is-numeric';

export function needsNumericStyle(format: string, field: string) {
  return isNumeric(format) && field !== 'hour_of_day';
}
