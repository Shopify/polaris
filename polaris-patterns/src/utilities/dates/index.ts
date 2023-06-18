const VALID_YYYY_MM_DD_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

export function isDate(date: string) {
  return !isNaN(new Date(date).getDate());
}

export function isValidYearMonthDayDateString(date: string) {
  return VALID_YYYY_MM_DD_DATE_REGEX.test(date) && isDate(date);
}

export function parseYearMonthDayDateString(input: string) {
  // Date-only strings (e.g. "1970-01-01") are treated as UTC, not local time
  // when using new Date()
  // We need to split year, month, day to pass into new Date() separately
  // to get a localized Date
  const [year, month, day] = input.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function formatDateToYearMonthDayDateString(date: Date) {
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  if (month.length < 2) {
    month = String(month).padStart(2, '0');
  }
  if (day.length < 2) {
    day = String(day).padStart(2, '0');
  }

  return [year, month, day].join('-');
}

/* Convert Date to format yyyy-mm-dd HH:mm:ss */
export function formatMonorailEventTimestamp(date: Date) {
  const formattedDate = formatDateToYearMonthDayDateString(date);
  const formattedTimestamp = date.toString().split(' ')[4];

  return [formattedDate, formattedTimestamp].join(' ');
}

export function mockedDateNow(today = 1606855959781) {
  jest.spyOn(global.Date, 'now').mockImplementation(() => today);

  return {
    today,
  };
}

export function getDifferenceInDays(
  earlierDate: Date,
  laterDate: Date,
  roundToNearestInteger = false,
) {
  const differenceInTime = laterDate.getTime() - earlierDate.getTime();
  const absoluteDifferenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (roundToNearestInteger) {
    return Math.round(absoluteDifferenceInDays);
  }

  return Math.floor(absoluteDifferenceInDays);
}
