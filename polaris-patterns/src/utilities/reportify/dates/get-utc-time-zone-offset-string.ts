import {getTimeZoneOffset} from '@shopify/dates';
import {padStart} from '@web-utilities/string';

export function getUTCTimeZoneOffsetString(
  date = new Date(),
  timeZone?: string,
) {
  const offsetMinutes = getTimeZoneOffset(date, timeZone, 'UTC');
  const sign = offsetMinutes < 0 ? '-' : '+';
  const offsetHour = Math.floor(offsetMinutes / 60);
  const offsetMinute = offsetMinutes % 60;
  const hourString = padStart(`${Math.abs(offsetHour)}`, 2, '0');
  const minuteString = padStart(`${Math.abs(offsetMinute)}`, 2, '0');

  return `${sign}${hourString}:${minuteString}`;
}
