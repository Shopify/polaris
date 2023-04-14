import type {I18n} from '@shopify/react-i18n';
import {isSameDay, isSameYear} from '@shopify/dates';

import type {QueryPeriod, DatePeriod} from './types';
import {parsePeriod} from './dates';

const DATE_FORMAT_LONG: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const DATE_FORMAT_SHORT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

export function humanizedDateRange(
  period: DatePeriod | QueryPeriod,
  i18n: I18n,
  timeZone?: string,
) {
  const {since, until} = parsePeriod(period, timeZone);

  let startDate = i18n.formatDate(since, {
    timeZone,
    ...DATE_FORMAT_LONG,
  });

  const endDate = i18n.formatDate(until, {
    timeZone,
    ...DATE_FORMAT_LONG,
  });

  if (isSameDay(since, until, timeZone)) {
    return startDate;
  }

  if (isSameYear(since, until, timeZone)) {
    startDate = i18n.formatDate(since, {
      timeZone,
      ...DATE_FORMAT_SHORT,
    });
  }

  return i18n.translate('date.range', {startDate, endDate});
}
