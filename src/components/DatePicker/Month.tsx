import * as React from 'react';
import {
  Range,
  Weekdays,
  Months,
  Year,
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  abbreviationForWeekday,
} from '@shopify/javascript-utilities/dates';
import {noop} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './DatePicker.scss';
import Day from './Day';
import Weekday from './Weekday';

export interface Props {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: Months;
  year: Year;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  allowRange?: Boolean;
  onChange?(date: Range): void;
  onHover?(hoverEnd: Date): void;
  onFocus?(date: Date): void;
  monthName?(month: Months): string;
  weekdayName?(weekday: Weekdays): string;
}

const WEEKDAYS = [
  Weekdays.Sunday,
  Weekdays.Monday,
  Weekdays.Tuesday,
  Weekdays.Wednesday,
  Weekdays.Thursday,
  Weekdays.Friday,
  Weekdays.Saturday,
];

export default function Month({
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  month,
  year,
}: Props) {
  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const current = new Date().getMonth() === month;
  const className = classNames(
    styles.Title,
    current && styles['Month-current'],
  );
  const weeks = getWeeksForMonth(month, year);
  const weekdays = WEEKDAYS.map((weekday) => (
    <Weekday
      key={weekday}
      title={abbreviationForWeekday(weekday)}
      current={current && new Date().getDay() === weekday}
      label={weekday}
    />
  ));

  function handleDateClick(selectedDate: Date) {
    onChange(getNewRange(allowRange && selected, selectedDate));
  }

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      const lastDayOfMonth = new Date(year, (month as number) + 1, 0);
      return (
        // eslint-disable-next-line react/jsx-no-bind
        <Day key={dayIndex} onHover={onHover.bind(null, lastDayOfMonth)} />
      );
    }

    const disabled =
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter));

    return (
      <Day
        focused={focusedDate != null && isSameDay(day, focusedDate)}
        day={day}
        key={dayIndex}
        onFocus={onFocus}
        onClick={handleDateClick}
        onHover={onHover}
        selected={selected != null && dateIsSelected(day, selected)}
        inRange={selected != null && dateIsInRange(day, selected)}
        disabled={disabled}
        inHoveringRange={
          selected != null &&
          hoverDate != null &&
          isInHoveringRange(day, selected, hoverDate)
        }
      />
    );
  }

  const weeksMarkup = weeks.map((week, index) => (
    <div role="row" className={styles.Week} key={index}>
      {week.map(renderWeek)}
    </div>
  ));

  return (
    <div role="grid" className={styles.Month}>
      <div className={className}>
        {Months[month]} {year}
      </div>
      <div role="rowheader" className={styles.WeekHeadings}>
        {weekdays}
      </div>
      {weeksMarkup}
    </div>
  );
}

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date,
) {
  if (day == null) {
    return false;
  }
  const {start, end} = range;
  return Boolean(start === end && day > start && day <= hoverEndDate);
}
