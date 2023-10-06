export interface Range {
  start: Date;
  end: Date;
}

export type Week = (Date | null)[];

const WEEK_LENGTH = 7;

export function getWeeksForMonth(
  month: number,
  year: number,
  weekStartsOn = 0,
): Week[] {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks: Week[] = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  const orderedWeekday = getOrderedWeekdays(weekStartsOn);
  for (let i = 0; i < orderedWeekday.indexOf(firstDayOfWeek); i++) {
    currentWeek.push(null);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }

  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  return weeks;
}

export function dateIsInRange(day: Date | null, ranges: Range[]) {
  if (day == null) {
    return false;
  }

  return ranges.some(({start, end}) =>
    Boolean(start && day > start && end && day < end),
  );
}

export function dateIsSelected(day: Date | null, ranges: Range[]) {
  if (day == null) {
    return false;
  }

  return ranges.some(({start, end}) =>
    Boolean((start && isSameDay(start, day)) || (end && isSameDay(end, day))),
  );
}

export function isSameDay(day1: Date, day2: Date) {
  return (
    day1.getDate() === day2.getDate() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getFullYear() === day2.getFullYear()
  );
}

export function getNewRange(
  ranges: Range | Range[] | undefined,
  selected: Date,
): Range[] {
  if (ranges == null) {
    return [{start: selected, end: selected}];
  }
  if (Array.isArray(ranges)) {
    return [...ranges, {start: selected, end: selected}];
  }

  const {start, end} = ranges;

  if (end && (isDateAfter(start, end) || isDateBefore(start, end))) {
    return [{start: selected, end: selected}];
  }

  if (start) {
    if (isDateBefore(selected, start)) {
      return [{start: selected, end: selected}];
    }
    return [{start, end: selected}];
  }

  if (end) {
    if (isDateBefore(selected, end)) {
      return [{start: selected, end}];
    }
    return [{start: start || end, end: selected}];
  }

  return [{start: selected, end: selected}];
}

export function getNextDisplayMonth(month: number): number {
  if (month === 11) {
    return 0;
  }
  return month + 1;
}

export function getNextDisplayYear(month: number, year: number): number {
  if (month === 11) {
    return year + 1;
  }
  return year;
}

export function getPreviousDisplayMonth(month: number): number {
  if (month === 0) {
    return 11;
  }
  return month - 1;
}

export function getPreviousDisplayYear(month: number, year: number): number {
  if (month === 0) {
    return year - 1;
  }
  return year;
}

export function isDateAfter(date: Date, dateToCompare: Date) {
  return date.getTime() > dateToCompare.getTime();
}

export function isDateBefore(date: Date, dateToCompare: Date) {
  return date.getTime() < dateToCompare.getTime();
}

export function isDateDisabled(date: Date, datesToCompare: Date[]) {
  return datesToCompare.some((dateToCompare) => {
    return date.getTime() === dateToCompare.getTime();
  });
}

const WEEKDAYS: number[] = [0, 1, 2, 3, 4, 5, 6];

export function getOrderedWeekdays(weekStartsOn: number): number[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
