import type {DatePeriod, OverPeriod} from './types';
import {TimeUnit} from './types';
import {getPeriodLength} from './get-period-length';

// Keeps the data from getting too dense. There is a bit
// more tolerance before switching to days because granular
// hourly data can be very helpful.
const MAX_DAY_DATA_POINTS = 93;
const MAX_HOUR_DATA_POINTS = 72;

export function getBestOverPeriod(period: DatePeriod): OverPeriod {
  const periodLengthInDays = getPeriodLength(period, TimeUnit.Day);
  const periodLengthInHours = getPeriodLength(period, TimeUnit.Hour);

  if (periodLengthInDays > MAX_DAY_DATA_POINTS) {
    return 'month';
  } else if (periodLengthInHours > MAX_HOUR_DATA_POINTS) {
    return 'day';
  } else {
    return 'hour';
  }
}
