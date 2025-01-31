import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {ArrowLeftIcon, ArrowRightIcon} from '@shopify/polaris-icons';

import {Button} from '../Button';
import {classNames} from '../../utilities/css';
import {
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  isDateDisabled,
} from '../../utilities/dates';
import type {Range} from '../../utilities/dates';
import {useI18n} from '../../utilities/i18n';

import {monthName} from './utilities';
import {Month} from './components';
import styles from './DatePicker.module.css';

export type {Range};

export interface DatePickerProps {
  /** ID for the element */
  id?: string;
  /** The selected date or range of dates */
  selected?: Date | Range | Date[];
  /** The month to show, from 0 to 11. 0 is January, 1 is February ... 11 is December */
  month: number;
  /** The year to show */
  year: number;
  /** Allow a range of dates to be selected */
  allowRange?: boolean;
  /** Allow multiple dates to be selected */
  allowMultiple?: boolean;
  /** Disable selecting dates before this. */
  disableDatesBefore?: Date;
  /** Disable selecting dates after this. */
  disableDatesAfter?: Date;
  /** Disable specific dates. */
  disableSpecificDates?: Date[];
  /** The selection can span multiple months */
  multiMonth?: boolean;
  /**
   * First day of week, from 0 to 6. 0 is Sunday, 1 is Monday ... 6 is Saturday
   * @default 0
   */
  weekStartsOn?: number;
  /** Visually hidden prefix text for selected days on single selection date pickers */
  dayAccessibilityLabelPrefix?: string;
  /** Callback when date is selected. */
  onChange?(date: Range): void;
  /** Callback when multiple dates are selected. Only called when allowMultiple is true. */
  onMultipleDatesChange?(dates: Date[]): void;
  /** Callback when month is changed. */
  onMonthChange?(month: number, year: number): void;
}

export function DatePicker({
  id,
  selected,
  month,
  year,
  allowRange,
  allowMultiple,
  multiMonth,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  weekStartsOn = 0,
  dayAccessibilityLabelPrefix,
  onMonthChange,
  onChange = noop,
  onMultipleDatesChange,
}: DatePickerProps) {
  const i18n = useI18n();
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  const [focusDate, setFocusDate] = useState<Date | undefined>(undefined);
  const [multipleSelectedDates, setMultipleSelectedDates] = useState<Date[]>(
    Array.isArray(selected) ? (selected as Date[]) : [],
  );

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
    (range: Range | Date) => {
      if (allowMultiple) {
        const dateToAdd = range instanceof Date ? range : range.start;
        const existingIndex = multipleSelectedDates.findIndex(
          (date) => date.getTime() === dateToAdd.getTime(),
        );

        let newDates: Date[];
        if (existingIndex >= 0) {
          newDates = [...multipleSelectedDates];
          newDates.splice(existingIndex, 1);
        } else {
          newDates = [...multipleSelectedDates, dateToAdd];
        }

        setMultipleSelectedDates(newDates);
        setHoverDate(dateToAdd);
        setFocusDate(dateToAdd);

        if (onMultipleDatesChange) {
          onMultipleDatesChange(newDates);
        }
      } else if (allowRange) {
        const rangeValue =
          range instanceof Date ? {start: range, end: range} : range;
        setHoverDate(rangeValue.end);
        setFocusDate(new Date(rangeValue.end));
        onChange(rangeValue);
      } else {
        // Single date selection - set start and end to the same date
        const date = range instanceof Date ? range : range.start;
        setHoverDate(date);
        setFocusDate(date);
        onChange({start: date, end: date});
      }
    },
    [
      allowMultiple,
      allowRange,
      onChange,
      onMultipleDatesChange,
      multipleSelectedDates,
    ],
  );

  const handleMonthChangeClick = useCallback(
    (month: number, year: number) => {
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
      const focusedDate =
        focusDate || (Array.isArray(range) ? range[0]?.start : range?.start);

      if (focusedDate == null) {
        return;
      }

      if (key === 'ArrowUp') {
        const previousWeek = new Date(focusedDate);
        previousWeek.setDate(focusedDate.getDate() - 7);
        if (
          !(
            (disableDatesBefore &&
              isDateBefore(previousWeek, disableDatesBefore)) ||
            (disableSpecificDates &&
              isDateDisabled(previousWeek, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(previousWeek);
        }
      }

      if (key === 'ArrowDown') {
        const nextWeek = new Date(focusedDate);
        nextWeek.setDate(focusedDate.getDate() + 7);
        if (
          !(
            (disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter)) ||
            (disableSpecificDates &&
              isDateDisabled(nextWeek, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(nextWeek);
        }
      }

      if (key === 'ArrowRight') {
        const tomorrow = new Date(focusedDate);
        tomorrow.setDate(focusedDate.getDate() + 1);
        if (
          !(
            (disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter)) ||
            (disableSpecificDates &&
              isDateDisabled(tomorrow, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(tomorrow);
        }
      }

      if (key === 'ArrowLeft') {
        const yesterday = new Date(focusedDate);
        yesterday.setDate(focusedDate.getDate() - 1);
        if (
          !(
            (disableDatesBefore &&
              isDateBefore(yesterday, disableDatesBefore)) ||
            (disableSpecificDates &&
              isDateDisabled(yesterday, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(yesterday);
        }
      }
    },
    [
      disableDatesAfter,
      disableDatesBefore,
      disableSpecificDates,
      focusDate,
      selected,
      setFocusDateAndHandleMonthChange,
    ],
  );

  const monthIsSelected = useMemo(() => {
    if (!allowMultiple) {
      return deriveRange(selected as Date | Range);
    }

    // Convert Date[] to Range[] for multiple selection
    return multipleSelectedDates.map((date) => ({
      start: date,
      end: date,
    }));
  }, [selected, allowMultiple, multipleSelectedDates]);

  const firstDatePickerAccessibilityLabelPrefix = allowRange
    ? i18n.translate(`Polaris.DatePicker.start`)
    : dayAccessibilityLabelPrefix;
  const secondDatePickerAccessibilityLabelPrefix = i18n.translate(
    `Polaris.DatePicker.end`,
  );

  const accessibilityLabelPrefixes: [string | undefined, string] = [
    firstDatePickerAccessibilityLabelPrefix,
    secondDatePickerAccessibilityLabelPrefix,
  ];

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
      selected={monthIsSelected}
      hoverDate={hoverDate}
      onChange={handleDateSelection}
      onHover={handleHover}
      disableDatesBefore={disableDatesBefore}
      disableDatesAfter={disableDatesAfter}
      disableSpecificDates={disableSpecificDates}
      allowRange={allowRange}
      allowMultiple={allowMultiple}
      weekStartsOn={weekStartsOn}
      accessibilityLabelPrefixes={accessibilityLabelPrefixes}
    />
  ) : null;

  return (
    <div
      id={id}
      className={classNames(
        styles.DatePicker,
        multiMonth && styles.DatePickerMultiMonth,
      )}
      onKeyUp={handleKeyUp}
    >
      <div className={styles.Header}>
        <Button
          onClick={() =>
            handleMonthChangeClick(showPreviousMonth, showPreviousYear)
          }
          disabled={
            disableDatesBefore != null &&
            isDateBefore(
              new Date(showPreviousYear, showPreviousMonth, 1),
              disableDatesBefore,
            )
          }
          icon={ArrowLeftIcon}
          accessibilityLabel={i18n.translate(
            'Polaris.DatePicker.previousMonth',
            {
              previousMonthName: previousMonthName,
              showPreviousYear,
            },
          )}
        />
        <Button
          onClick={() => handleMonthChangeClick(showNextMonth, nextYear)}
          disabled={
            disableDatesAfter != null &&
            isDateAfter(new Date(nextYear, showNextMonth, 1), disableDatesAfter)
          }
          icon={ArrowRightIcon}
          accessibilityLabel={i18n.translate('Polaris.DatePicker.nextMonth', {
            nextMonth,
            nextYear,
          })}
        />
      </div>
      <div className={styles.MonthLayout}>
        <Month
          onFocus={handleFocus}
          focusedDate={focusDate}
          month={month}
          year={year}
          selected={monthIsSelected}
          hoverDate={hoverDate}
          onChange={handleDateSelection}
          onHover={handleHover}
          disableDatesBefore={disableDatesBefore}
          disableDatesAfter={disableDatesAfter}
          disableSpecificDates={disableSpecificDates}
          allowRange={allowRange}
          allowMultiple={allowMultiple}
          weekStartsOn={weekStartsOn}
          accessibilityLabelPrefixes={accessibilityLabelPrefixes}
        />
        {secondDatePicker}
      </div>
    </div>
  );
}

function noop() {}

function deriveRange(selected?: Date | Range | Date[]) {
  if (selected == null) {
    return undefined;
  }

  if (selected instanceof Date) {
    return {
      start: selected,
      end: selected,
    };
  }

  if (Array.isArray(selected)) {
    return undefined;
  }

  return selected;
}
