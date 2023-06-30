import React, {useCallback, useMemo} from 'react';

import {classNames} from '../../../../utilities/css';
import {
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
  isDateDisabled,
} from '../../../../utilities/dates';
import type {Range} from '../../../../utilities/dates';
import {useI18n} from '../../../../utilities/i18n';
import styles from '../../DatePicker.scss';
import {Day} from '../Day';
import {Weekday} from '../Weekday';
import {monthName, weekdayName} from '../../utilities';

export interface MonthProps {
  focusedDate?: Date;
  selected?: Range | Range[];
  hoverDate?: Date;
  month: number;
  year: number;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  allowRange?: boolean;
  weekStartsOn: number;
  accessibilityLabelPrefixes: [string | undefined, string];
  onChange?(date: Range[]): void;
  onHover?(hoverEnd: Date): void;
  onFocus?(date: Date): void;
}

export function Month({
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  month,
  year,
  weekStartsOn,
  accessibilityLabelPrefixes,
}: MonthProps) {
  const selectedRanges = useMemo(() => {
    if (!selected) return undefined;

    return Array.isArray(selected) ? selected : [selected];
  }, [selected]);

  const i18n = useI18n();

  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  const className = classNames(
    styles.Title,
    current && styles['Month-current'],
  );
  const weeks = useMemo(
    () => getWeeksForMonth(month, year, weekStartsOn),
    [month, weekStartsOn, year],
  );
  const weekdays = getOrderedWeekdays(weekStartsOn).map((weekday) => (
    <Weekday
      key={weekday}
      title={i18n.translate(
        `Polaris.DatePicker.daysAbbreviated.${weekdayName(weekday)}`,
      )}
      label={weekdayLabel(weekday)}
      current={current && new Date().getDay() === weekday}
    />
  ));

  const handleDateClick = useCallback(
    (selectedDate: Date) => {
      onChange(
        getNewRange(
          allowRange ? selectedRanges?.[0] : selectedRanges,
          selectedDate,
        ),
      );
    },
    [allowRange, onChange, selectedRanges],
  );

  const lastDayOfMonth = useMemo(
    () => new Date(year, (month as number) + 1, 0),
    [month, year],
  );

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      return (
        <Day key={dayIndex} onHover={onHover} lastDayOfMonth={lastDayOfMonth} />
      );
    }
    const disabled =
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter)) ||
      (disableSpecificDates && isDateDisabled(day, disableSpecificDates));

    // We can surly take the first index, because an array must have been thrown if there are several ranged dates
    const isFirstSelectedDay =
      allowRange && selectedRanges && isDateStart(day, selectedRanges[0]);
    const isLastSelectedDay =
      allowRange &&
      selectedRanges &&
      ((!isSameDay(selectedRanges[0].start, selectedRanges[0].end) &&
        isDateEnd(day, selectedRanges[0])) ||
        (hoverDate &&
          isSameDay(selectedRanges[0].start, selectedRanges[0].end) &&
          isDateAfter(hoverDate, selectedRanges[0].start) &&
          isSameDay(day, hoverDate) &&
          !isFirstSelectedDay));
    const rangeIsDifferent = !(
      selectedRanges &&
      isSameDay(selectedRanges[0].start, selectedRanges[0].end)
    );
    const isHoveringRight = hoverDate && isDateBefore(day, hoverDate);
    const [firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix] =
      accessibilityLabelPrefixes;
    let accessibilityLabelPrefix;

    if (
      (allowRange && isFirstSelectedDay) ||
      (!allowRange && firstAccessibilityLabelPrefix)
    ) {
      accessibilityLabelPrefix = firstAccessibilityLabelPrefix;
    } else if (allowRange && isLastSelectedDay) {
      accessibilityLabelPrefix = lastAccessibilityLabelPrefix;
    }

    return (
      <Day
        selectedAccessibilityLabelPrefix={accessibilityLabelPrefix}
        weekday={weekdayLabel(dayIndex)}
        focused={focusedDate != null && isSameDay(day, focusedDate)}
        day={day}
        key={dayIndex}
        onFocus={onFocus}
        onClick={handleDateClick}
        onHover={onHover}
        selected={selectedRanges != null && dateIsSelected(day, selectedRanges)}
        inRange={selectedRanges != null && dateIsInRange(day, selectedRanges)}
        disabled={disabled}
        inHoveringRange={
          selectedRanges != null &&
          hoverDate != null &&
          isInHoveringRange(day, selectedRanges[0], hoverDate)
        }
        isLastSelectedDay={isLastSelectedDay}
        isFirstSelectedDay={isFirstSelectedDay}
        isHoveringRight={isHoveringRight}
        rangeIsDifferent={rangeIsDifferent}
      />
    );
  }

  const weeksMarkup = weeks.map((week, index) => (
    <tr className={styles.Week} key={index}>
      {week.map(renderWeek)}
    </tr>
  ));

  return (
    <div className={styles.MonthContainer}>
      <table role="grid" className={styles.Month}>
        <caption className={className}>
          {i18n.translate(`Polaris.DatePicker.months.${monthName(month)}`)}{' '}
          {year}
        </caption>
        <thead>
          <tr className={styles.WeekHeadings}>{weekdays}</tr>
        </thead>
        <tbody>{weeksMarkup}</tbody>
      </table>
    </div>
  );

  function weekdayLabel(weekday: number) {
    return i18n.translate(`Polaris.DatePicker.days.${weekdayName(weekday)}`);
  }
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

function isDateEnd(day: Date | null, range: Range) {
  if (day == null) return false;
  const {end} = range;

  return Boolean(end && isSameDay(end, day));
}

function isDateStart(day: Date | null, range: Range) {
  if (day == null) return false;
  const {start} = range;

  return Boolean(start && isSameDay(start, day));
}
