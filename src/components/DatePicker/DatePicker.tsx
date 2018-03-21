import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {autobind} from '@shopify/javascript-utilities/decorators';
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
} from '@shopify/javascript-utilities/dates';

import Button from '../Button';

import Month from './Month';
import * as styles from './DatePicker.scss';

export {Range, Months, Year};

export interface Props {
  /** The selected date or range of dates */
  selected?: Date | Range;
  /** The month to show */
  month: Months;
  /** The year to show */
  year: Year;
  /** Disable selecting dates before this. */
  disableDatesBefore?: Date;
  /** Disable selecting dates after this. */
  disableDatesAfter?: Date;
  /** The selection can span multiple months */
  multiMonth?: boolean;
  /** Callback when date is selected. */
  onChange?(date: Range): void;
  /** Callback when month is changed. */
  onMonthChange?(month: Months, year: Year): void;
}

export interface State {
  hoverDate?: Date;
  focusDate?: Date;
}

export default class DatePicker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const {selected} = props;
    const range =
      selected instanceof Date ? {start: selected, end: selected} : selected;

    this.state = {
      hoverDate: range && range.end,
    };
  }

  render() {
    const {
      month,
      year,
      multiMonth,
      disableDatesBefore,
      disableDatesAfter,
      selected,
    } = this.props;

    const {hoverDate, focusDate} = this.state;
    const allowRange = selected != null && !(selected instanceof Date);
    const range =
      selected != null && selected instanceof Date
        ? {start: selected, end: selected}
        : selected;

    const showNextYear = getNextDisplayYear(month, year);
    const showNextMonth = getNextDisplayMonth(month);

    const showNextToNextYear = getNextDisplayYear(showNextMonth, showNextYear);
    const showNextToNextMonth = getNextDisplayMonth(showNextMonth);

    const showPreviousYear = getPreviousDisplayYear(month, year);
    const showPreviousMonth = getPreviousDisplayMonth(month);

    const previousMonthName = Months[showPreviousMonth];
    const nextMonth = multiMonth
      ? Months[showNextToNextMonth]
      : Months[showNextMonth];
    const nextYear = multiMonth ? showNextToNextYear : showNextYear;

    const secondDatePicker = multiMonth ? (
      <Month
        onFocus={this.handleFocus}
        focusedDate={focusDate}
        month={showNextMonth}
        year={showNextYear}
        selected={range}
        hoverDate={hoverDate}
        onChange={this.handleDateSelection}
        onHover={this.handleHover}
        disableDatesBefore={disableDatesBefore}
        disableDatesAfter={disableDatesAfter}
        allowRange={allowRange}
      />
    ) : null;

    return (
      <div
        className={styles.DatePicker}
        onKeyDown={handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <div className={styles.Header}>
          <Button
            plain
            icon="arrowLeft"
            accessibilityLabel={`Show previous month, ${previousMonthName} ${showPreviousYear}`}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={this.handleMonthChangeClick.bind(
              null,
              showPreviousMonth,
              showPreviousYear,
            )}
          />
          <Button
            plain
            icon="arrowRight"
            accessibilityLabel={`Show next month, ${nextMonth} ${nextYear}`}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={this.handleMonthChangeClick.bind(
              null,
              showNextMonth,
              showNextYear,
            )}
          />
        </div>
        <div className={styles.MonthContainer}>
          <Month
            onFocus={this.handleFocus}
            focusedDate={focusDate}
            month={month}
            year={year}
            selected={range}
            hoverDate={hoverDate}
            onChange={this.handleDateSelection}
            onHover={this.handleHover}
            disableDatesBefore={disableDatesBefore}
            disableDatesAfter={disableDatesAfter}
            allowRange={allowRange}
          />
          {secondDatePicker}
        </div>
      </div>
    );
  }

  @autobind
  private handleFocus(date: Date) {
    this.setState({
      focusDate: date,
    });
  }

  @autobind
  private handleKeyUp(event: React.KeyboardEvent<HTMLElement>) {
    const {key} = event;
    const {selected, disableDatesBefore, disableDatesAfter} = this.props;

    const {focusDate} = this.state;
    const range =
      selected instanceof Date ? {start: selected, end: selected} : selected;
    const focusedDate = focusDate || (range && range.start);

    if (focusedDate == null) {
      return;
    }

    if (key === 'ArrowUp') {
      const previousWeek = new Date(focusedDate);
      previousWeek.setDate(focusedDate.getDate() - 7);
      if (
        !(disableDatesBefore && isDateBefore(previousWeek, disableDatesBefore))
      ) {
        this.setFocusDateAndHandleMonthChange(previousWeek);
      }
    }

    if (key === 'ArrowDown') {
      const nextWeek = new Date(focusedDate);
      nextWeek.setDate(focusedDate.getDate() + 7);
      if (!(disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(nextWeek);
      }
    }

    if (key === 'ArrowRight') {
      const tomorrow = new Date(focusedDate);
      tomorrow.setDate(focusedDate.getDate() + 1);
      if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(tomorrow);
      }
    }

    if (key === 'ArrowLeft') {
      const yesterday = new Date(focusedDate);
      yesterday.setDate(focusedDate.getDate() - 1);
      if (
        !(disableDatesBefore && isDateBefore(yesterday, disableDatesBefore))
      ) {
        this.setFocusDateAndHandleMonthChange(yesterday);
      }
    }
  }

  @autobind
  private setFocusDateAndHandleMonthChange(date: Date) {
    const {onMonthChange} = this.props;
    if (onMonthChange) {
      onMonthChange(date.getMonth(), date.getFullYear());
    }
    this.setState({
      hoverDate: date,
      focusDate: date,
    });
  }

  @autobind
  private handleDateSelection(selected: Range) {
    const {end: endDate} = selected;
    const {onChange = noop} = this.props;

    this.setState({
      hoverDate: endDate,
      focusDate: new Date(endDate),
    });

    onChange(selected);
  }

  @autobind
  private handleMonthChangeClick(month: Months, year: Year) {
    const {onMonthChange} = this.props;
    if (!onMonthChange) {
      return;
    }
    this.setState({
      focusDate: undefined,
    });
    onMonthChange(month, year);
  }

  @autobind
  private handleHover(date: Date) {
    this.setState({
      hoverDate: date,
    });
  }
}

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
