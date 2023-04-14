import type {TimeUnit} from '@shopify/reportify-react';

export type DateFormatStyle = 'short' | 'long';

export type TimeGrainsWithDateTimeFormatOptions =
  | 'hour'
  | 'hour_of_day'
  | 'day'
  | 'week'
  | 'year'
  | 'month';

export type TimeGrain =
  | ('day_of_week' | 'month_of_year' | 'quarter')
  | TimeGrainsWithDateTimeFormatOptions
  | TimeUnit;

export function isTimeGrain(value: string): value is TimeGrain {
  return [
    'second',
    'minute',
    'hour',
    'hour_of_day',
    'day',
    'day_of_week',
    'week',
    'month',
    'month_of_year',
    'quarter',
    'year',
  ].includes(value);
}
