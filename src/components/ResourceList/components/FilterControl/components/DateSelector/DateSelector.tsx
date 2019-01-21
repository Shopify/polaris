import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import DatePicker, {Months, Year, Range} from '../../../../../DatePicker';
import Select from '../../../../../Select';
import TextField from '../../../../../TextField';
import Icon from '../../../../../Icon';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../../AppProvider';

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

export enum DateFilterOption {
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
      dateFilterOption === DateFilterOption.OnOrBefore ||
      dateFilterOption === DateFilterOption.OnOrAfter;

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
        value: DateFilterOption.OnOrBefore,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.OnOrBefore',
        ),
      },
      {
        value: DateFilterOption.OnOrAfter,
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
        value: DateFilterOption.PastWeek,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastWeek',
        ),
      },
      {
        value: DateFilterOption.PastMonth,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastMonth',
        ),
      },
      {
        value: DateFilterOption.PastQuarter,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastQuarter',
        ),
      },
      {
        value: DateFilterOption.PastYear,
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
        value: DateFilterOption.ComingWeek,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingWeek',
        ),
      },
      {
        value: DateFilterOption.ComingMonth,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingMonth',
        ),
      },
      {
        value: DateFilterOption.ComingQuarter,
        label: intl.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingQuarter',
        ),
      },
      {
        value: DateFilterOption.ComingYear,
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
      return stripTimeFromISOString(formatDateForLocalTimezone(selectedDate));
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

    if (newOption === DateFilterOption.OnOrBefore) {
      onFilterKeyChange(filterMaxKey);
      onFilterValueChange(
        selectedDate
          ? stripTimeFromISOString(formatDateForLocalTimezone(selectedDate))
          : undefined,
      );
      return;
    }

    if (newOption === DateFilterOption.OnOrAfter) {
      onFilterKeyChange(filterMinKey);
      onFilterValueChange(
        selectedDate
          ? stripTimeFromISOString(formatDateForLocalTimezone(selectedDate))
          : undefined,
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

    const formattedDateForTimezone = new Date(
      formatDateForLocalTimezone(new Date(userInputDate)),
    );

    this.setState(
      {
        selectedDate: formattedDateForTimezone,
        datePickerMonth: formattedDateForTimezone.getMonth(),
        datePickerYear: formattedDateForTimezone.getFullYear(),
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
    onFilterValueChange(
      stripTimeFromISOString(formatDateForLocalTimezone(selectedDate)),
    );
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
    return DateFilterOption.OnOrBefore;
  }

  if (filterKey === filterMinKey) {
    return DateFilterOption.OnOrAfter;
  }

  return filterValue;
}

function stripTimeFromISOString(ISOString: string) {
  return ISOString.slice(0, 10);
}

function formatDateForLocalTimezone(date: Date) {
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetMs = timezoneOffset * 60 * 1000;
  const isFringeTimezone = timezoneOffset === -720 || timezoneOffset === 720;
  const formattedDate = new Date();

  if (isFringeTimezone && date.getHours() !== 0) {
    return date.toISOString();
  }

  const newTime =
    timezoneOffset > -1
      ? date.getTime() + timezoneOffsetMs
      : date.getTime() - timezoneOffsetMs;

  formattedDate.setTime(newTime);
  return formattedDate.toISOString();
}

export default withAppProvider<Props>()(DateSelector);
