import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  Range,
  Months,
  Year,
  isDateAfter,
  isDateBefore,
  Weekdays,
  isSameDay,
} from '@shopify/javascript-utilities/dates';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Button from '../Button';

import {Month} from './components';
import * as styles from './DatePicker.scss';

export {Range, Months, Year};

export interface BaseProps {
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
  /** Locale for date formatting. 'en' by default */
  locale?: string;
  /** Callback when date is selected. */
  onChange?(date: Range): void;
  /** Callback when month is changed. */
  onMonthChange?(month: Months, year: Year): void;
}

export interface Props extends BaseProps {}
export type CombinedProps = Props & WithAppProviderProps;

export interface State {
  hoverDate?: Date;
  focusDate?: Date;
}

export class DatePicker extends React.PureComponent<CombinedProps, State> {
  state: State = {
    hoverDate: undefined,
    focusDate: undefined,
  };

  componentDidUpdate(prevProps: Props) {
    const selectedPropDidChange = !isSameSelectedDate(
      prevProps.selected,
      this.props.selected,
    );

    if (selectedPropDidChange) {
      this.resetFocus();
    }
  }

  render() {
    const {
      id,
      selected,
      month,
      year,
      allowRange,
      multiMonth,
      disableDatesBefore,
      disableDatesAfter,
      weekStartsOn = Weekdays.Sunday,
      locale = 'en',
    } = this.props;

    const {hoverDate, focusDate} = this.state;

    const visibleMonth = new Date(year, month);
    const previousVisibleMonth = new Date(year, month - 1);
    const nextVisibleMonth = new Date(year, month + 1);
    const nextToNextVisibleMonth = new Date(year, month + 2);

    const secondDatePicker = multiMonth ? (
      <Month
        onFocus={this.handleFocus}
        focusedDate={focusDate}
        visibleMonth={nextVisibleMonth}
        selected={deriveRange(selected)}
        hoverDate={hoverDate}
        onChange={this.handleDateSelection}
        onHover={this.handleHover}
        disableDatesBefore={disableDatesBefore}
        disableDatesAfter={disableDatesAfter}
        allowRange={allowRange}
        weekStartsOn={weekStartsOn}
        locale={locale}
      />
    ) : null;

    return (
      <div
        id={id}
        className={styles.DatePicker}
        onKeyDown={handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <div className={styles.Header}>
          <Button
            plain
            icon="arrowLeft"
            accessibilityLabel={Intl.DateTimeFormat(locale, {
              month: 'long',
              year: 'numeric',
            }).format(previousVisibleMonth)}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={this.handleMonthChangeClick.bind(
              null,
              previousVisibleMonth.getMonth(),
              previousVisibleMonth.getFullYear(),
            )}
          />
          <Button
            plain
            icon="arrowRight"
            accessibilityLabel={Intl.DateTimeFormat(locale, {
              month: 'long',
              year: 'numeric',
            }).format(multiMonth ? nextToNextVisibleMonth : nextVisibleMonth)}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={this.handleMonthChangeClick.bind(
              null,
              nextVisibleMonth.getMonth(),
              nextVisibleMonth.getFullYear(),
            )}
          />
        </div>
        <div className={styles.MonthContainer}>
          <Month
            locale={locale}
            onFocus={this.handleFocus}
            focusedDate={focusDate}
            visibleMonth={visibleMonth}
            selected={deriveRange(selected)}
            hoverDate={hoverDate}
            onChange={this.handleDateSelection}
            onHover={this.handleHover}
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

  @autobind
  private handleFocus(date: Date) {
    this.setState({focusDate: date});
  }

  @autobind
  private resetFocus() {
    this.setState({focusDate: undefined});
  }

  @autobind
  private handleKeyUp(event: React.KeyboardEvent<HTMLElement>) {
    const {key} = event;
    const {selected, disableDatesBefore, disableDatesAfter} = this.props;

    const {focusDate} = this.state;
    const range = deriveRange(selected);
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
  private handleDateSelection(range: Range) {
    const {end} = range;
    const {onChange = noop} = this.props;

    this.setState({hoverDate: end, focusDate: new Date(end)}, () =>
      onChange(range),
    );
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

function isSameSelectedDate(
  previousDate?: Props['selected'],
  currentDate?: Props['selected'],
) {
  if (previousDate == null || currentDate == null) {
    return previousDate == null && currentDate == null;
  }

  if (previousDate instanceof Date || currentDate instanceof Date) {
    return (
      previousDate instanceof Date &&
      currentDate instanceof Date &&
      isSameDay(previousDate, currentDate)
    );
  }

  return (
    isSameDay(previousDate.start, currentDate.start) &&
    isSameDay(previousDate.end, currentDate.end)
  );
}

function deriveRange(selected?: Date | Range) {
  return selected instanceof Date ? {start: selected, end: selected} : selected;
}

export default withAppProvider<Props>()(DatePicker);
