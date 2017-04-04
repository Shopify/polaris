import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';
import {
  Range,
  Months,
  Year,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
} from '@shopify/javascript-utilities/dates';

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

interface State {
  hoverDate: Date,
}

export default class DatePicker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const {selected} = props;
    const range = selected instanceof Date ? {start: selected, end: selected} : selected;

    this.state = {
      hoverDate: range.end,
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
    const {hoverDate} = this.state;
    const allowRange = !(selected instanceof Date);
    const range = selected instanceof Date ? {start: selected, end: selected} : selected;
    const showNextYear = getNextDisplayYear(month, year);
    const showNextMonth = getNextDisplayMonth(month);
    const showPreviousYear = getPreviousDisplayYear(month, year);
    const showPreviousMonth = getPreviousDisplayMonth(month);

    const secondDatePicker = multiMonth
      ? (
        <div className={styles.Month}>
          <Month
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
          <button
            className={styles.Icon}
            onClick={this.handleMonthChangeClick.bind(null, showPreviousMonth, showPreviousYear)}
          >
            <Icon source="chevronLeft" size={24} />
          </button>
          <button
            className={styles.Icon}
            onClick={this.handleMonthChangeClick.bind(null, showNextMonth, showNextYear)}
          >
            <Icon source="chevronRight" size={24} />
          </button>
        </div>
        <div className={styles.MonthContainer}>
          <div className={styles.Month}>
            <Month
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
  private handleDateSelection(selected: Range) {
    const {end: endDate} = selected;
    const {onChange = noop} = this.props;

    this.setState({
      hoverDate: endDate,
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
