import * as React from 'react';
import {
  Range,
  Weekdays,
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
} from '@shopify/javascript-utilities/dates';
import {noop} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from '../../DatePicker.scss';
import Day from '../Day';
import Weekday from '../Weekday';

export interface Props {
  locale?: string;
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  visibleMonth: Date;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  allowRange?: Boolean;
  weekStartsOn: Weekdays;
  onChange?(date: Range): void;
  onHover?(hoverEnd: Date): void;
  onFocus?(date: Date): void;
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
  locale = 'en',
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  visibleMonth,
  weekStartsOn,
}: Props) {
  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current =
    now.getMonth() === visibleMonth.getMonth() &&
    now.getFullYear() === visibleMonth.getFullYear();
  const className = classNames(
    styles.Title,
    current && styles['Month-current'],
  );

  const weeks = getWeeksForMonth(
    visibleMonth.getMonth(),
    visibleMonth.getFullYear(),
    weekStartsOn,
  );

  const weekdayFormat = Intl.DateTimeFormat(locale, {weekday: 'short'});

  const weekdays = getWeekdaysOrdered(weekStartsOn).map((weekday) => {
    // October 1, 2017 is a Sunday
    const arbitraryWeekdayDate = new Date(2017, 9, weekday + 1);

    return (
      <Weekday
        key={weekday}
        title={weekdayFormat.format(arbitraryWeekdayDate)}
        current={current && new Date().getDay() === weekday}
        label={weekday}
      />
    );
  });

  function handleDateClick(selectedDate: Date) {
    onChange(getNewRange(allowRange && selected, selectedDate));
  }

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      const lastDayOfMonth = new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
        0,
      );
      return (
        <Day
          key={dayIndex}
          // eslint-disable-next-line react/jsx-no-bind
          onHover={onHover.bind(null, lastDayOfMonth)}
          locale={locale}
        />
      );
    }

    const disabled =
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter));

    return (
      <Day
        locale={locale}
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
        {Intl.DateTimeFormat(locale, {month: 'long', year: 'numeric'}).format(
          visibleMonth,
        )}
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
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function getWeekdaysOrdered(weekStartsOn: Weekdays): Weekdays[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
