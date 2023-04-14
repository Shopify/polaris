import type {TimeGrainsWithDateTimeFormatOptions} from './types';

export const SHORT_DATE_FORMATS: {
  [key in TimeGrainsWithDateTimeFormatOptions]: Intl.DateTimeFormatOptions;
} = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  hour_of_day: {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  },
  hour: {hour: 'numeric', minute: 'numeric'},
  day: {month: 'short', day: 'numeric'},
  month: {month: 'short'},
  week: {month: 'short', day: 'numeric'},
  year: {year: 'numeric'},
};

export const LONG_DATE_FORMATS: {
  [key in TimeGrainsWithDateTimeFormatOptions]: Intl.DateTimeFormatOptions;
} = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  hour_of_day: {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  },
  hour: {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  },
  day: {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  },
  week: {
    month: 'short',
    day: 'numeric',
  },
  month: {
    year: 'numeric',
    month: 'short',
  },
  year: {
    year: 'numeric',
  },
};
