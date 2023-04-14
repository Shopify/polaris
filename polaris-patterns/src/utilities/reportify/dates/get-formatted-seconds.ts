import {padStart} from '@web-utilities/string';

import {periodsInMs} from './periods-in-ms';

export function getFormattedSeconds(seconds: number) {
  const ms = seconds * periodsInMs.second;
  const hour = Math.floor(ms / periodsInMs.hour);
  const minute = Math.floor((ms % periodsInMs.hour) / periodsInMs.minute);
  const second = Math.floor((ms % periodsInMs.minute) / periodsInMs.second);
  const formatHours = padStart(hour, 2, '0');
  const formatMinutes = padStart(minute, 2, '0');
  const formatSeconds = padStart(second, 2, '0');
  return `${formatHours}:${formatMinutes}:${formatSeconds}`;
}
