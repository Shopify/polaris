import React, {useState, useEffect, useCallback} from 'react';
import {ArrowLeftMinor, ArrowRightMinor} from '@shopify/polaris-icons';
import {
  Range,
  Months,
  Year,
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  Weekdays,
} from '@shopify/javascript-utilities/dates';

import {Button} from '../Button';
import {useI18n} from '../../utilities/i18n';
import {monthName} from './utilities';

import {Month} from './components';
import styles from './DatePicker.scss';

export {Range, Months, Year};

export interface DatePickerProps {
  /** ID for the element */
  id?: string;
  /** The selected date or range of dates */
  selected?: Date | Range;
  /** The month to show */
  month: Months;
  /** The year to show */
  year: Year;
  /** Allow a range of dates to be selected */
  allowRange?: boolean;
  /** Disable selecting dates before this. */
  disableDatesBefore?: Date;
  /** Disable selecting dates after this. */
  disableDatesAfter?: Date;
  /** The selection can span multiple months */
  multiMonth?: boolean;
  /** First day of week. Sunday by default */
  weekStartsOn?: Weekdays;
  /** Callback when date is selected. */
  onChange?(date: Range): void;
  /** Callback when month is changed. */
  onMonthChange?(month: Months, year: Year): void;
}

export function DatePicker({
  id,
  selected,
  month,
  year,
  allowRange,
  multiMonth,
  disableDatesBefore,
  disableDatesAfter,
  weekStartsOn = Weekdays.Sunday,
  onMonthChange,
  onChange = noop,
}: DatePickerProps) {
  const i18n = useI18n();
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  const [focusDate, setFocusDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setFocusDate(undefined);
  }, [selected]);

  const handleFocus = useCallback((date: Date) => {
    setFocusDate(date);
  }, []);

  const setFocusDateAndHandleMonthChange = useCallback(
    (date: Date) => {
      if (onMonthChange) {
        onMonthChange(date.getMonth(), date.getFullYear());
      }
      setHoverDate(date);
      setFocusDate(date);
    },
    [onMonthChange],
  );

  const handleDateSelection = useCallback(
    (range: Range) => {
      const {end} = range;

      setHoverDate(end);
      setFocusDate(new Date(end));
      onChange(range);
    },
    [onChange],
  );

  const handleMonthChangeClick = useCallback(
    (month: Months, year: Year) => {
      if (!onMonthChange) {
        return;
      }
      setFocusDate(undefined);
      onMonthChange(month, year);
    },
    [onMonthChange],
  );

  const handleHover = useCallback((date: Date) => {
    setHoverDate(date);
  }, []);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const {key} = event;

      const range = deriveRange(selected);
      const focusedDate = focusDate || (range && range.start);

      if (focusedDate == null) {
        return;
      }

      if (key === 'ArrowUp') {
        const previousWeek = new Date(focusedDate);
        previousWeek.setDate(focusedDate.getDate() - 7);
        if (
          !(
            disableDatesBefore && isDateBefore(previousWeek, disableDatesBefore)
          )
        ) {
          setFocusDateAndHandleMonthChange(previousWeek);
        }
      }

      if (key === 'ArrowDown') {
        const nextWeek = new Date(focusedDate);
        nextWeek.setDate(focusedDate.getDate() + 7);
        if (!(disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter))) {
          setFocusDateAndHandleMonthChange(nextWeek);
        }
      }

      if (key === 'ArrowRight') {
        const tomorrow = new Date(focusedDate);
        tomorrow.setDate(focusedDate.getDate() + 1);
        if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter))) {
          setFocusDateAndHandleMonthChange(tomorrow);
        }
      }

      if (key === 'ArrowLeft') {
        const yesterday = new Date(focusedDate);
        yesterday.setDate(focusedDate.getDate() - 1);
        if (
          !(disableDatesBefore && isDateBefore(yesterday, disableDatesBefore))
        ) {
          setFocusDateAndHandleMonthChange(yesterday);
        }
      }
    },
    [
      disableDatesAfter,
      disableDatesBefore,
      focusDate,
      selected,
      setFocusDateAndHandleMonthChange,
    ],
  );

  const showNextYear = getNextDisplayYear(month, year);
  const showNextMonth = getNextDisplayMonth(month);

  const showNextToNextYear = getNextDisplayYear(showNextMonth, showNextYear);
  const showNextToNextMonth = getNextDisplayMonth(showNextMonth);

  const showPreviousYear = getPreviousDisplayYear(month, year);
  const showPreviousMonth = getPreviousDisplayMonth(month);

  const previousMonthName = i18n.translate(
    `Polaris.DatePicker.months.${monthName(showPreviousMonth)}`,
  );
  const nextMonth = multiMonth
    ? i18n.translate(
        `Polaris.DatePicker.months.${monthName(showNextToNextMonth)}`,
      )
    : i18n.translate(`Polaris.DatePicker.months.${monthName(showNextMonth)}`);
  const nextYear = multiMonth ? showNextToNextYear : showNextYear;

  const secondDatePicker = multiMonth ? (
    <Month
      onFocus={handleFocus}
      focusedDate={focusDate}
      month={showNextMonth}
      year={showNextYear}
      selected={deriveRange(selected)}
      hoverDate={hoverDate}
      onChange={handleDateSelection}
      onHover={handleHover}
      disableDatesBefore={disableDatesBefore}
      disableDatesAfter={disableDatesAfter}
      allowRange={allowRange}
      weekStartsOn={weekStartsOn}
    />
  ) : null;

  return (
    <div
      id={id}
      className={styles.DatePicker}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <div className={styles.Header}>
        <Button
          plain
          icon={ArrowLeftMinor}
          accessibilityLabel={i18n.translate(
            'Polaris.DatePicker.previousMonth',
            {
              previousMonthName,
              showPreviousYear,
            },
          )}
          onClick={() =>
            handleMonthChangeClick(showPreviousMonth, showPreviousYear)
          }
        />
        <Button
          plain
          icon={ArrowRightMinor}
          accessibilityLabel={i18n.translate('Polaris.DatePicker.nextMonth', {
            nextMonth,
            nextYear,
          })}
          onClick={() => handleMonthChangeClick(showNextMonth, showNextYear)}
        />
      </div>
      <div className={styles.MonthContainer}>
        <Month
          onFocus={handleFocus}
          focusedDate={focusDate}
          month={month}
          year={year}
          selected={deriveRange(selected)}
          hoverDate={hoverDate}
          onChange={handleDateSelection}
          onHover={handleHover}
          disableDatesBefore={disableDatesBefore}
          disableDatesAfter={disableDatesAfter}
          allowRange={allowRange}
          weekStartsOn={weekStartsOn}
        />
        {secondDatePicker}
      </div>
    </div>
  );
}

function noop() {}

function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (
    key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function deriveRange(selected?: Date | Range) {
  return selected instanceof Date ? {start: selected, end: selected} : selected;
}
