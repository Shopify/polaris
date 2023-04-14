import type {AliasableField} from '@shopify/reportify-react';

import {periodsInMs, getPeriodLength} from './dates';
import type {DatePeriod} from './types';

const hour: AliasableField = {alias: 'Hour', field: 'hour'};
const day: AliasableField = {alias: 'Day', field: 'day'};
const week: AliasableField = {alias: 'Week', field: 'week'};
const month: AliasableField = {alias: 'Month', field: 'month'};
const quarter: AliasableField = {alias: 'Quarter', field: 'quarter'};
const year: AliasableField = {alias: 'Year', field: 'year'};
const hourOfDay: AliasableField = {
  alias: 'Hour of day',
  field: 'hour_of_day',
};
const dayOfWeek: AliasableField = {
  alias: 'Day of week',
  field: 'day_of_week',
};
const monthOfYear: AliasableField = {
  alias: 'Month of year',
  field: 'month_of_year',
};

export const ALL_AVAILABLE_TIME_GRAINS = [
  hour,
  day,
  week,
  month,
  quarter,
  year,
  hourOfDay,
  dayOfWeek,
  monthOfYear,
] as const;

const TIME_GRAINS_GROUPING = [
  {
    minRange: 0,
    maxRange: 1,
    grains: [hour],
  },
  {
    minRange: 2,
    maxRange: 6,
    grains: [hour, day, hourOfDay],
  },
  {
    minRange: 7,
    maxRange: 13,
    grains: [hour, day, week, hourOfDay],
  },
  {
    minRange: 14,
    maxRange: 27,
    grains: [hour, day, week, hourOfDay, dayOfWeek],
  },
  {
    minRange: 28,
    maxRange: 89,
    grains: [hour, day, week, month, hourOfDay, dayOfWeek],
  },
  {
    minRange: 90,
    maxRange: 364,
    grains: [hour, day, week, month, quarter, hourOfDay, dayOfWeek],
  },
  {
    minRange: 365,
    maxRange: 729,
    grains: [hour, day, week, month, quarter, year, hourOfDay, dayOfWeek],
  },
  {
    minRange: 730,
    maxRange: Infinity,
    grains: [
      hour,
      day,
      week,
      month,
      quarter,
      year,
      hourOfDay,
      dayOfWeek,
      monthOfYear,
    ],
  },
];

const DEFAULT_TIME_GRAINS = [hour, day, week, month];

export function getTimeGrains(period: DatePeriod): AliasableField[] {
  const periodLength = getPeriodLength(period);

  const timeInDays = Math.round(periodLength / periodsInMs.day);

  const group = TIME_GRAINS_GROUPING.find((group) => {
    return timeInDays >= group.minRange && timeInDays <= group.maxRange;
  });

  return group == null ? DEFAULT_TIME_GRAINS : group.grains;
}
