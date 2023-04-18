import {getDateTimeParts} from '@shopify/dates';

// Native padStart isn't supported in Safari before v10.3
export function padStart(
  input: string | number,
  minLength: number,
  padString = ' ',
) {
  const stringInput = String(input);
  if (stringInput.length > minLength) {
    return input;
  } else {
    const paddingLength = minLength - stringInput.length;
    const repeatedPadding = `${padString.repeat(
      Math.ceil(paddingLength / padString.length),
    )}`;

    const padding =
      paddingLength > padString.length ? repeatedPadding : padString;
    return `${padding.slice(0, paddingLength)}${input}`;
  }
}

export function formatQueryDate(date: Date, timeZone?: string) {
  const {year, month, day} = getDateTimeParts(date, timeZone);
  const paddedMonth = padStart(`${month()}`, 2, '0');
  const paddedDay = padStart(`${day()}`, 2, '0');

  return `${year()}-${paddedMonth}-${paddedDay}`;
}
