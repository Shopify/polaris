import {parseDateString} from '@shopify/dates';
import {useI18n} from '@shopify/react-i18n';
import {useShop} from '@web-utilities/shop';

import {LONG_DATE_FORMATS, SHORT_DATE_FORMATS} from './constants';
import type {TimeGrain, DateFormatStyle} from './types';

interface Props {
  value: string;
  timeGrain: TimeGrain;
  style: DateFormatStyle;
}

export function useFormatDate() {
  const [i18n] = useI18n();
  const {ianaTimezone} = useShop();

  return function formatDate({value, timeGrain, style}: Props) {
    const formats = style === 'long' ? LONG_DATE_FORMATS : SHORT_DATE_FORMATS;

    switch (timeGrain) {
      case 'day_of_week':
        return i18n.translate(
          `DateFormats.weekdays.${style}.${value.toLowerCase()}`,
        );

      case 'month_of_year':
        return i18n.translate(
          `DateFormats.months.${style}.${value.toLowerCase()}`,
        );

      case 'quarter': {
        const date = parseDateString(value, ianaTimezone);

        if (date == null) {
          throw new Error(`Could not parse provided date: ${value}`);
        }

        const quarterIndex = Math.floor(date.getMonth() / 3) + 1;

        return i18n.translate(`DateFormats.quarters.q${quarterIndex}`, {
          year: date.getFullYear(),
        });
      }

      case 'hour':
      case 'day':
      case 'week':
      case 'month':
      case 'year': {
        const date = parseDateString(value, ianaTimezone);

        if (date == null) {
          throw new Error(`Could not parse provided date: ${value}`);
        }

        return i18n.formatDate(date, formats[timeGrain]);
      }

      case 'hour_of_day': {
        const date = new Date(Date.UTC(0, 0, 0, Number(value)));
        return i18n.formatDate(date, formats[timeGrain]);
      }

      default: {
        const defaultTimeGrain = 'day';
        const date = parseDateString(value, ianaTimezone);

        if (date == null) {
          throw new Error(`Could not parse provided date: ${value}`);
        }

        return i18n.formatDate(date, formats[defaultTimeGrain]);
      }
    }
  };
}
