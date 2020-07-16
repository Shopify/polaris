export enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

export interface Range {
  start: Date;
  end: Date;
}

export type Year = number;

export type Week = (Date | null)[];

const WEEK_LENGTH = 7;

export function getWeeksForMonth(
  month: Month,
  year: Year,
  weekStartsOn: Weekday = Weekday.Sunday,
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

export function dateIsInRange(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }

  const {start, end} = range;

  return Boolean(start && day > start && end && day < end);
}

export function dateIsSelected(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }
  const {start, end} = range;

  return Boolean(
    (start && isSameDay(start, day)) || (end && isSameDay(end, day)),
  );
}

export function isSameDay(day1: Date, day2: Date) {
  return (
    day1.getDate() === day2.getDate() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getFullYear() === day2.getFullYear()
  );
}

export function getNewRange(range: Range | undefined, selected: Date): Range {
  if (range == null) {
    return {start: selected, end: selected};
  }

  const {start, end} = range;

  if (end && (isDateAfter(start, end) || isDateBefore(start, end))) {
    return {start: selected, end: selected};
  }

  if (start) {
    if (isDateBefore(selected, start)) {
      return {start: selected, end: selected};
    }
    return {start, end: selected};
  }

  if (end) {
    if (isDateBefore(selected, end)) {
      return {start: selected, end};
    }
    return {start: start || end, end: selected};
  }

  return {start: selected, end: selected};
}

export function getNextDisplayMonth(month: Month): Month {
  if (Month[month] === Month[11]) {
    return 0;
  }
  return (month as number) + 1;
}

export function getNextDisplayYear(month: Month, year: Year): Year {
  if (Month[month] === Month[11]) {
    return year + 1;
  }
  return year;
}

export function getPreviousDisplayMonth(month: Month): Month {
  if (Month[month] === Month[0]) {
    return 11;
  }
  return (month as number) - 1;
}

export function getPreviousDisplayYear(month: Month, year: Year): Year {
  if (Month[month] === Month[0]) {
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

export function isSameDate(source: Date, target: Date) {
  return (
    source.getFullYear() === target.getFullYear() &&
    source.getMonth() === target.getMonth() &&
    source.getDate() === target.getDate()
  );
}

const WEEKDAYS = [
  Weekday.Sunday,
  Weekday.Monday,
  Weekday.Tuesday,
  Weekday.Wednesday,
  Weekday.Thursday,
  Weekday.Friday,
  Weekday.Saturday,
];

export function getOrderedWeekdays(weekStartsOn: Weekday): Weekday[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
