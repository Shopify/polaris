import React, {useState, useCallback, useRef, memo} from 'react';
import {CalendarMinor} from '@shopify/polaris-icons';

import {DatePicker, Range} from '../../../../../DatePicker';
import {Select} from '../../../../../Select';
import {TextField} from '../../../../../TextField';
import {Icon} from '../../../../../Icon';
import {useI18n} from '../../../../../../utilities/i18n';

import styles from './DateSelector.scss';

const VALID_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

type DateOptionType = 'past' | 'future' | 'full';

export interface DateSelectorProps {
  dateOptionType?: DateOptionType;
  filterValue?: string;
  filterKey?: string;
  filterMinKey: string;
  filterMaxKey: string;
  onFilterValueChange(filterValue?: string): void;
  onFilterKeyChange(filterKey?: string): void;
}

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

export const DateSelector = memo(function DateSelector({
  filterValue,
  filterKey,
  filterMinKey,
  filterMaxKey,
  dateOptionType,
  onFilterValueChange,
  onFilterKeyChange,
}: DateSelectorProps) {
  const now = new Date();

  const i18n = useI18n();
  const initialConsumerFilterKey = useRef(filterKey);
  const [datePickerMonth, setDatePickerMonth] = useState(now.getMonth());
  const [datePickerYear, setDatePickerYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [userInputDate, setUserInputDate] = useState<string>();
  const [userInputDateError, setUserInputDateError] = useState<string>();

  const dateTextFieldValue = getDateTextFieldValue();

  const handleDateFieldChange = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setSelectedDate(undefined);
        onFilterValueChange(undefined);
      }

      if (userInputDateError && isValidDate(value)) {
        setUserInputDateError(undefined);
      }

      setUserInputDate(value);
    },
    [onFilterValueChange, userInputDateError],
  );

  const handleDateChanged = useCallback(
    (date) => {
      if (!date) {
        return;
      }
      onFilterValueChange(
        stripTimeFromISOString(formatDateForLocalTimezone(date)),
      );
    },
    [onFilterValueChange],
  );

  const handleDateBlur = useCallback(() => {
    if (!dateTextFieldValue || !isValidDate(dateTextFieldValue)) {
      setSelectedDate(undefined);
      setUserInputDateError(
        i18n.translate('Polaris.ResourceList.DateSelector.dateValueError'),
      );
      onFilterValueChange(undefined);

      return;
    }

    if (!userInputDate) {
      return;
    }

    const formattedDateForTimezone = new Date(
      formatDateForLocalTimezone(new Date(userInputDate)),
    );

    setSelectedDate(formattedDateForTimezone);
    setDatePickerMonth(formattedDateForTimezone.getMonth());
    setDatePickerYear(formattedDateForTimezone.getFullYear());
    setUserInputDate(undefined);
    setUserInputDateError(undefined);

    handleDateChanged(formattedDateForTimezone);
  }, [
    dateTextFieldValue,
    handleDateChanged,
    i18n,
    onFilterValueChange,
    userInputDate,
  ]);

  const handleDateFilterOptionsChange = useCallback(
    (newOption: string) => {
      if (!initialConsumerFilterKey.current) {
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

      onFilterKeyChange(initialConsumerFilterKey.current);
      onFilterValueChange(newOption);
    },
    [
      filterMaxKey,
      filterMinKey,
      initialConsumerFilterKey,
      onFilterKeyChange,
      onFilterValueChange,
      selectedDate,
    ],
  );

  const handleDatePickerChange = useCallback(
    ({end: nextDate}: Range) => {
      const date = new Date(nextDate);
      setSelectedDate(date);
      setUserInputDate(undefined);
      setUserInputDateError(undefined);

      handleDateChanged(date);
    },
    [handleDateChanged],
  );

  const handleDatePickerMonthChange = useCallback(
    (month: number, year: number) => {
      setDatePickerMonth(month);
      setDatePickerYear(year);
    },
    [],
  );

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
    <>
      <div className={styles.DateTextField}>
        <TextField
          label={i18n.translate(
            'Polaris.ResourceList.DateSelector.dateValueLabel',
          )}
          placeholder={i18n.translate(
            'Polaris.ResourceList.DateSelector.dateValuePlaceholder',
          )}
          value={dateTextFieldValue}
          error={userInputDateError}
          prefix={<Icon source={CalendarMinor} color="subdued" />}
          autoComplete="off"
          onChange={handleDateFieldChange}
          onBlur={handleDateBlur}
        />
      </div>
      <div className={styles.DatePicker}>
        <DatePicker
          selected={selectedDate}
          month={datePickerMonth}
          year={datePickerYear}
          onChange={handleDatePickerChange}
          onMonthChange={handleDatePickerMonthChange}
        />
      </div>
    </>
  );

  const dateOptionTypes = {
    past: [...getDatePastOptions(), ...getDateComparatorOptions()],
    future: [...getDateFutureOptions(), ...getDateComparatorOptions()],
    full: [
      ...getDatePastOptions(),
      ...getDateFutureOptions(),
      ...getDateComparatorOptions(),
    ],
  };

  return (
    <>
      <Select
        label={i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.dateFilterLabel',
        )}
        labelHidden
        options={
          dateOptionType
            ? dateOptionTypes[dateOptionType]
            : dateOptionTypes.full
        }
        placeholder={i18n.translate(
          'Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder',
        )}
        value={dateFilterOption}
        onChange={handleDateFilterOptionsChange}
      />
      {datePredicateMarkup}
    </>
  );

  function getDateComparatorOptions() {
    return [
      {
        value: DateFilterOption.OnOrBefore,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.OnOrBefore',
        ),
      },
      {
        value: DateFilterOption.OnOrAfter,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.OnOrAfter',
        ),
      },
    ];
  }

  function getDatePastOptions() {
    return [
      {
        value: DateFilterOption.PastWeek,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastWeek',
        ),
      },
      {
        value: DateFilterOption.PastMonth,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastMonth',
        ),
      },
      {
        value: DateFilterOption.PastQuarter,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastQuarter',
        ),
      },
      {
        value: DateFilterOption.PastYear,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.PastYear',
        ),
      },
    ];
  }

  function getDateFutureOptions() {
    return [
      {
        value: DateFilterOption.ComingWeek,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingWeek',
        ),
      },
      {
        value: DateFilterOption.ComingMonth,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingMonth',
        ),
      },
      {
        value: DateFilterOption.ComingQuarter,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingQuarter',
        ),
      },
      {
        value: DateFilterOption.ComingYear,
        label: i18n.translate(
          'Polaris.ResourceList.DateSelector.SelectOptions.ComingYear',
        ),
      },
    ];
  }

  function getDateTextFieldValue() {
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
});

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
