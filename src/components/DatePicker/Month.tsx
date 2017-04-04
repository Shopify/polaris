import * as React from 'react';
import {
  Range,
  Weekdays,
  Months,
  Year,
  isDateBefore,
  isDateAfter,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  abbreviationForWeekday,
} from '@shopify/javascript-utilities/dates';
import {noop} from '@shopify/javascript-utilities/other';

import * as styles from './DatePicker.scss';
import Day from './Day';
import Weekday from './Weekday';

export interface Props {
  selected: Range,
  hoverDate: Date,
  month: Months,
  year: Year,
  disableDatesBefore?: Date,
  disableDatesAfter?: Date,
  allowRange?: Boolean,
  onChange?(date: Range): void,
  onHover?(hoverEnd: Date): void,
  monthName?(month: Months): string,
  wekdayName?(weekday: Weekdays): string,
}

const WEEKDAYS = [Weekdays.Sunday, Weekdays.Monday, Weekdays.Tuesday, Weekdays.Wednesday, Weekdays.Thursday, Weekdays.Friday, Weekdays.Saturday];

export default function Month({
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  allowRange,
  onChange = noop,
  onHover = noop,
  month,
  year,
}: Props) {
  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const weeks = getWeeksForMonth(month, year);
  const weekdays = WEEKDAYS.map((weekday) => (
    <Weekday key={weekday} label={abbreviationForWeekday(weekday)} />
  ));

  function handleDateClick(selectedDate: Date) {
    return onChange(getNewRange(selected, selectedDate));
  }

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      const lastDayOfMonth = new Date(year, (month as number) + 1, 0);
      return <Day key={dayIndex} onHover={onHover.bind(null, lastDayOfMonth)} />;
    }

    const isDisabled = (
      disableDatesBefore && isDateBefore(day, disableDatesBefore)
      ||
      disableDatesAfter && isDateAfter(day, disableDatesAfter)
    );

    return (
      <Day
        day={day}
        key={dayIndex}
        onClick={handleDateClick.bind(null, day)}
        onHover={onHover.bind(null, day)}
        selected={dateIsSelected(day, selected)}
        inRange={dateIsInRange(day, selected)}
        disabled={isDisabled}
        inHoveringRange={isInHoveringRange(day, selected, hoverDate)}
      />
    );
  };

  const weeksMarkup = weeks.map((week, index) => (
    <div className={styles.Week} key={index}>
      {week.map(renderWeek)}
    </div>
  ));

  return (
    <div>
      <div className={styles.Title}>{Months[month]} {year}</div>
      <div className={styles.Week}>
        {weekdays}
      </div>
      {weeksMarkup}
    </div>
  );
}

function hoveringDateIsInRange(day: Date | null, range: Range, hoverEndDate: Date) {
  if (day == null) { return false; }

  const {start, end} = range;

  return Boolean((start === end) && (day > start) && (day <= hoverEndDate));
}
