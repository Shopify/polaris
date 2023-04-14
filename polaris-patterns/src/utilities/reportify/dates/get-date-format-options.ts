import type {TimeUnit} from '@shopify/reportify-react';

export function getDateFormatOptions(
  overPeriod: TimeUnit = 'hour',
): Intl.DateTimeFormatOptions {
  switch (overPeriod) {
    case 'second':
      return {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      };
    case 'hour':
      return {
        month: 'short',
        day: '2-digit',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      };
    case 'day':
      return {
        month: 'short',
        day: 'numeric',
      };
    case 'week':
      return {
        month: 'short',
        day: '2-digit',
      };
    case 'month':
      return {
        year: 'numeric',
        month: 'short',
      };
    case 'year':
      return {
        year: 'numeric',
      };
    default:
      throw new Error(`Unexpected over period: ${overPeriod}`);
  }
}
