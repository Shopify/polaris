import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';
import {
  Range,
  Months,
  Year,
  isDateBefore,
  isDateAfter,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
} from '@shopify/javascript-utilities/dates';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import Month from './Month';
import * as styles from './DatePicker.scss';

export interface Props {
  selected: Date | Range,
  month: Months,
  year: Year,
  disableDatesBefore?: Date,
  disableDatesAfter?: Date,
  multiMonth?: boolean,
  onChange?(date: Range): void,
  onMonthChange?(month: Months, year: Year): void,
}

export interface State {
  hoverDate: Date,
  focusDate: Date,
}

const fakeDate = new Date(2099, 10, 10);

export default class DatePicker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const {selected} = props;
    const range = selected instanceof Date ? {start: selected, end: selected} : selected;

    this.state = {
      hoverDate: range.end,
      focusDate: fakeDate,
    };
  }

  componentDidMount() {
    addEventListener(findDOMNode(this), 'keyup', this.handleKeyPress, {capture: true});
  }

  componentWillUnmount() {
    removeEventListener(findDOMNode(this), 'keyup', this.handleKeyPress, true);
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
    const allowRange = !(selected instanceof Date);
    const range = selected instanceof Date ? {start: selected, end: selected} : selected;

    const showNextYear = getNextDisplayYear(month, year);
    const showNextMonth = getNextDisplayMonth(month);

    const showNextToNextYear = getNextDisplayYear(showNextMonth, showNextYear);
    const showNextToNextMonth = getNextDisplayMonth(showNextMonth);

    const showPreviousYear = getPreviousDisplayYear(month, year);
    const showPreviousMonth = getPreviousDisplayMonth(month);

    const previousMonthName = Months[showPreviousMonth];
    const nextMonth = multiMonth ?  Months[showNextToNextMonth] : Months[showNextMonth];
    const nextYear = multiMonth ? showNextToNextYear : showNextYear;

    const secondDatePicker = multiMonth
      ? (
        <div role="grid" className={styles.Month}>
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
        </div>
      )
      : null;

    return (
      <div className={styles.DatePicker}>
        <div className={styles.Header}>
          <UnstyledButton
            accessibilityLabel={`Show previous month, ${previousMonthName} ${showPreviousYear}`}
            className={styles.Icon}
            onClick={this.handleMonthChangeClick.bind(null, showPreviousMonth, showPreviousYear)}
          >
            <Icon source="chevronLeft" size={24} />
          </UnstyledButton>
          <UnstyledButton
            accessibilityLabel={`Show next month, ${nextMonth} ${nextYear}`}
            className={styles.Icon}
            onClick={this.handleMonthChangeClick.bind(null, showNextMonth, showNextYear)}
          >
            <Icon source="chevronRight" size={24} />
          </UnstyledButton>
        </div>
        <div className={styles.MonthContainer}>
          <div role="grid" className={styles.Month}>
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
          </div>
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
  private handleKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.key;
    const {
      selected,
      disableDatesBefore,
      disableDatesAfter,
    } = this.props;

    let {focusDate} = this.state;
    const range = selected instanceof Date ? {start: selected, end: selected} : selected;
    focusDate = focusDate === fakeDate ? range.start : focusDate;

    if (key === 'ArrowUp') {
      const tomorrow = new Date(focusDate);
      tomorrow.setDate(focusDate.getDate() - 7);
      if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(tomorrow);
      }
    }

    if (key === 'ArrowDown') {
      const tomorrow = new Date(focusDate);
      tomorrow.setDate(focusDate.getDate() + 7);
      if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(tomorrow);
      }
    }

    if (key === 'ArrowRight') {
      const tomorrow = new Date(focusDate);
      tomorrow.setDate(focusDate.getDate() + 1);
      if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(tomorrow);
      }
    }

    if (key === 'ArrowLeft') {
      const yesterday = new Date(focusDate);
      yesterday.setDate(focusDate.getDate() - 1);
      if (!(disableDatesBefore && isDateBefore(yesterday, disableDatesBefore))) {
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
    if (!onMonthChange) { return; }
    onMonthChange(month, year);
  }

  @autobind
  private handleHover(date: Date) {
    this.setState({
      hoverDate: date,
    });
  }
}
