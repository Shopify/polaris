import type {KeyboardEvent} from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {ArrowLeftMinor, ArrowRightMinor} from '@shopify/polaris-icons';

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
import styles from './DatePicker.scss';

export type {Range};

export interface DatePickerProps {
  /** ID for the element */
  id?: string;
  /** The selected date or range of dates */
  selected?: Date | Range;
  /** The month to show, from 0 to 11. 0 is January, 1 is February ... 11 is December */
  month: number;
  /** The year to show */
  year: number;
  /** Allow a range of dates to be selected */
  allowRange?: boolean;
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
  /** Callback when month is changed. */
  onMonthChange?(month: number, year: number): void;
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
  disableSpecificDates,
  weekStartsOn = 0,
  dayAccessibilityLabelPrefix,
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
    (event: KeyboardEvent<HTMLElement>) => {
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

  const monthIsSelected = useMemo(() => deriveRange(selected), [selected]);

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
      weekStartsOn={weekStartsOn}
      accessibilityLabelPrefixes={accessibilityLabelPrefixes}
    />
  ) : null;

  const datePickerClassName = classNames(styles.DatePicker);

  return (
    <div
      id={id}
      className={datePickerClassName}
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
      <div className={styles.MonthLayout}>
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
          disableSpecificDates={disableSpecificDates}
          allowRange={allowRange}
          weekStartsOn={weekStartsOn}
          accessibilityLabelPrefixes={accessibilityLabelPrefixes}
        />
        {secondDatePicker}
      </div>
    </div>
  );
}

function noop() {}

function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
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
