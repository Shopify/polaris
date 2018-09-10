import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  DatePicker,
  Months,
  Year,
  Range,
  Select,
  TextField,
  Icon,
} from '../../../..';

import {withAppProvider, WithAppProviderProps} from '../../../../AppProvider';

import * as styles from './DateSelector.scss';

const VALID_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

type DateOptionType = 'past' | 'future' | 'full';

export interface Props {
  dateOptionType?: DateOptionType;
  filterValue?: string;
  filterKey?: string;
  filterMinKey: string;
  filterMaxKey: string;
  onFilterValueChange(filterValue?: string): void;
  onFilterKeyChange(filterKey?: string): void;
}

interface State {
  selectedDate?: Date;
  userInputDate?: string;
  userInputDateError?: string;
  datePickerMonth: Months;
  datePickerYear: Year;
  initialConsumerFilterKey?: string;
}

export type CombinedProps = Props & WithAppProviderProps;

export enum DateFilterOptions {
  PastWeek = 'past_week',
  PastMonth = 'past_month',
  PastQuarter = 'past_quarter',
  PastYear = 'past_year',
  ComingWeek = 'coming_week',
  ComingMonth = 'coming_month',
  ComingQuarter = 'coming_quarter',
  ComingYear = 'coming_year',
  OnOrBefore = 'on_or_before',
  OnOrAfter = 'on_or_after',
}

class DateSelector extends React.PureComponent<CombinedProps, State> {
  state: State = {
    datePickerMonth: this.now.getMonth(),
    datePickerYear: this.now.getFullYear(),
    initialConsumerFilterKey: this.props.filterKey,
  };

  render() {
    const {
      filterValue,
      filterKey,
      filterMinKey,
      filterMaxKey,
      dateOptionType,
      polaris: {intl},
    } = this.props;

    const {
      selectedDate,
      datePickerMonth,
      datePickerYear,
      userInputDateError,
    } = this.state;

    const dateFilterOption = getDateFilterOption(
      filterValue,
      filterKey,
      filterMinKey,
      filterMaxKey,
    );

    const showDatePredicate =
      dateFilterOption === DateFilterOptions.OnOrBefore ||
      dateFilterOption === DateFilterOptions.OnOrAfter;

    const datePredicateMarkup = showDatePredicate && (
      <React.Fragment>
        <div className={styles.DateTextField}>
          <TextField
            label={intl.translate(
              'Polaris.ResourceList.DateSelector.dateValueLabel',
            )}
            placeholder={intl.translate(
              'Polaris.ResourceList.DateSelector.dateValuePlaceholder',
            )}
            value={this.dateTextFieldValue}
            error={userInputDateError}
            prefix={<Icon source="calendar" color="skyDark" />}
            autoComplete={false}
            onChange={this.handleDateFieldChange}
            onBlur={this.handleDateBlur}
          />
        </div>
        <div className={styles.DatePicker}>
          <DatePicker
            selected={selectedDate}
            month={datePickerMonth}
            year={datePickerYear}
            onChange={this.handleDatePickerChange}
            onMonthChange={this.handleDatePickerMonthChange}
          />
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Select
          label={intl.translate(
            'Polaris.ResourceList.DateSelector.SelectOptions.dateFilterLabel',
          )}
          labelHidden
          options={
            dateOptionType
              ? this.dateOptionTypes[dateOptionType]
              : this.dateOptionTypes.full
          }
          placeholder={intl.translate(
            'Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder',
          )}
          value={dateFilterOption}
          onChange={this.handleDateFilterOptionsChange}
        />
        {datePredicateMarkup}
      </React.Fragment>
    );
  }

  private get dateComparatorOptions() {
    const {
      polaris: {intl},
    } = this.props;

    return [
      {
        value: DateFilterOptions.OnOrBefore,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.OnOrBefore',
        ),
      },
      {
        value: DateFilterOptions.OnOrAfter,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.OnOrAfter',
        ),
      },
    ];
  }

  private get datePastOptions() {
    const {
      polaris: {intl},
    } = this.props;

    return [
      {
        value: DateFilterOptions.PastWeek,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastWeek',
        ),
      },
      {
        value: DateFilterOptions.PastMonth,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastMonth',
        ),
      },
      {
        value: DateFilterOptions.PastQuarter,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastQuarter',
        ),
      },
      {
        value: DateFilterOptions.PastYear,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastYear',
        ),
      },
    ];
  }

  private get dateFutureOptions() {
    const {
      polaris: {intl},
    } = this.props;

    return [
      {
        value: DateFilterOptions.ComingWeek,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingWeek',
        ),
      },
      {
        value: DateFilterOptions.ComingMonth,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingMonth',
        ),
      },
      {
        value: DateFilterOptions.ComingQuarter,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingQuarter',
        ),
      },
      {
        value: DateFilterOptions.ComingYear,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingYear',
        ),
      },
    ];
  }

  private get dateOptionTypes() {
    return {
      past: [...this.datePastOptions, ...this.dateComparatorOptions],
      future: [...this.dateFutureOptions, ...this.dateComparatorOptions],
      full: [
        ...this.datePastOptions,
        ...this.dateFutureOptions,
        ...this.dateComparatorOptions,
      ],
    };
  }

  private get now() {
    return new Date();
  }

  private get dateTextFieldValue() {
    const {userInputDate, selectedDate} = this.state;

    if (!userInputDate && !selectedDate) {
      return undefined;
    }

    if (userInputDate !== undefined) {
      return userInputDate;
    }

    if (selectedDate) {
      return formatDateValue(selectedDate);
    }
  }

  @autobind
  private handleDateFilterOptionsChange(newOption: string) {
    const {
      onFilterValueChange,
      onFilterKeyChange,
      filterMinKey,
      filterMaxKey,
    } = this.props;
    const {initialConsumerFilterKey, selectedDate} = this.state;

    if (!initialConsumerFilterKey) {
      return;
    }

    if (newOption === DateFilterOptions.OnOrBefore) {
      onFilterKeyChange(filterMaxKey);
      onFilterValueChange(
        selectedDate ? formatDateValue(selectedDate) : undefined,
      );
      return;
    }

    if (newOption === DateFilterOptions.OnOrAfter) {
      onFilterKeyChange(filterMinKey);
      onFilterValueChange(
        selectedDate ? formatDateValue(selectedDate) : undefined,
      );
      return;
    }

    onFilterKeyChange(initialConsumerFilterKey);
    onFilterValueChange(newOption);
  }

  @autobind
  private handleDateFieldChange(value: string) {
    const {onFilterValueChange} = this.props;
    const {userInputDateError} = this.state;

    if (value.length === 0) {
      this.setState(
        {
          selectedDate: undefined,
        },
        () => {
          onFilterValueChange(undefined);
        },
      );
    }

    if (userInputDateError && isValidDate(value)) {
      this.setState({
        userInputDateError: undefined,
      });
    }

    this.setState({
      userInputDate: value,
    });
  }

  @autobind
  private handleDateBlur() {
    const {
      polaris: {intl},
      onFilterValueChange,
    } = this.props;

    if (!this.dateTextFieldValue || !isValidDate(this.dateTextFieldValue)) {
      this.setState({
        selectedDate: undefined,
        userInputDateError: intl.translate(
          'Polaris.ResourceList.DateSelector.dateValueError',
        ),
      });
      onFilterValueChange(undefined);

      return;
    }

    const {userInputDate} = this.state;
    if (!userInputDate) {
      return;
    }

    const nextDate = new Date(userInputDate.replace(/-/g, '/'));

    this.setState(
      {
        selectedDate: nextDate,
        datePickerMonth: nextDate.getMonth(),
        datePickerYear: nextDate.getFullYear(),
        userInputDate: undefined,
        userInputDateError: undefined,
      },
      this.handleDateChanged,
    );
  }

  private handleDateChanged() {
    const {onFilterValueChange} = this.props;
    const {selectedDate} = this.state;

    if (!selectedDate) {
      return;
    }

    onFilterValueChange(formatDateValue(selectedDate));
  }

  @autobind
  private handleDatePickerChange({end: nextDate}: Range) {
    this.setState(
      {
        selectedDate: new Date(nextDate),
        userInputDate: undefined,
        userInputDateError: undefined,
      },
      this.handleDateChanged,
    );
  }

  @autobind
  private handleDatePickerMonthChange(month: Months, year: Year) {
    this.setState({datePickerMonth: month, datePickerYear: year});
  }
}

function isValidDate(date?: string) {
  if (!date) {
    return false;
  }
  return VALID_DATE_REGEX.test(date) && !isNaN(new Date(date).getTime());
}

function getDateFilterOption(
  filterValue?: string,
  filterKey?: string,
  filterMinKey?: string,
  filterMaxKey?: string,
) {
  if (filterKey === filterMaxKey) {
    return DateFilterOptions.OnOrBefore;
  }

  if (filterKey === filterMinKey) {
    return DateFilterOptions.OnOrAfter;
  }

  return filterValue;
}

function formatDateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default withAppProvider<Props>()(DateSelector);
