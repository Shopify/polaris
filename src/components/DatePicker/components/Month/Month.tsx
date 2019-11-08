import React from 'react';
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
} from '@shopify/javascript-utilities/dates';
import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import styles from '../../DatePicker.scss';
import {Day} from '../Day';
import {Weekday} from '../Weekday';
import {monthName, weekdayName} from '../../utilities';

export interface MonthProps {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: Months;
  year: Year;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  allowRange?: boolean;
  weekStartsOn: Weekdays;
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

export function Month({
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
  weekStartsOn,
}: MonthProps) {
  const i18n = useI18n();

  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  const className = classNames(
    styles.Title,
    current && styles['Month-current'],
  );
  const weeks = getWeeksForMonth(month, year, weekStartsOn);
  const weekdays = getWeekdaysOrdered(weekStartsOn).map((weekday) => (
    <Weekday
      key={weekday}
      title={i18n.translate(
        `Polaris.DatePicker.daysAbbreviated.${weekdayName(weekday)}`,
      )}
      current={current && new Date().getDay() === weekday}
      label={weekday}
    />
  ));

  function handleDateClick(selectedDate: Date) {
    onChange(getNewRange(allowRange ? selected : undefined, selectedDate));
  }

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      const lastDayOfMonth = new Date(year, (month as number) + 1, 0);
      return (
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
        {i18n.translate(`Polaris.DatePicker.months.${monthName(month)}`)} {year}
      </div>
      <div role="rowheader" className={styles.WeekHeadings}>
        {weekdays}
      </div>
      {weeksMarkup}
    </div>
  );
}

function noop() {}

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date,
) {
  if (day == null) {
    return false;
  }
  const {start, end} = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function getWeekdaysOrdered(weekStartsOn: Weekdays): Weekdays[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
