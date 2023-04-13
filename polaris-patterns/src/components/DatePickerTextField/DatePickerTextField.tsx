import React, {useState, useRef, useEffect, useMemo, useId} from 'react';
import type {FocusEvent} from 'react';
import type {PopoverProps, Range} from '@shopify/polaris';
import {
  Box,
  Icon,
  Key,
  KeypressListener,
  Popover,
  TextField,
} from '@shopify/polaris';
import {CalendarMinor} from '@shopify/polaris-icons';
import {useI18n} from '@shopify/react-i18n';

import {focusFirstFocusableNode} from '../../utilities/focus';
import {
  isValidYearMonthDayDateString,
  parseYearMonthDayDateString,
  formatDateToYearMonthDayDateString,
} from '../../utilities/dates';
import {DatePicker} from '../DatePicker';

import en from './translations/en.json';

export interface Props {
  disabled?: boolean;
  disableDatesAfter?: Date;
  disableDatesBefore?: Date;
  error?: string | boolean;
  errorMessage?: string;
  formatDateOnBlur?: boolean | Intl.DateTimeFormatOptions;
  helpText?: string;
  hideDatePicker?: boolean;
  iconHidden?: boolean;
  label: string;
  labelHidden?: boolean;
  preferInputActivator?: PopoverProps['preferInputActivator'];
  preferredAlignment?: PopoverProps['preferredAlignment'];
  preferredPosition?: PopoverProps['preferredPosition'];
  value: string;
  datePlaceholder: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
}

const DATE_BLACKLIST_REGEX = /[^\d\-/.]/g;
const DISPLAY_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
};

export function DatePickerTextField({
  value,
  label,
  hideDatePicker,
  labelHidden,
  iconHidden,
  disabled,
  helpText,
  preferredAlignment,
  preferredPosition,
  preferInputActivator,
  errorMessage,
  error,
  formatDateOnBlur,
  onChange,
  onBlur,
  disableDatesBefore,
  disableDatesAfter,
  datePlaceholder,
}: Props) {
  const [i18n] = useI18n({fallback: en});
  const [visible, setVisible] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePickerTextId = useId();

  console.log(i18n.translate('hi'));
  // Formatting the date using the year, month, date, time args,
  // to avoid Date() errors when month or day is only a single digit.

  const formattedValue =
    formatDateOnBlur &&
    !visible &&
    value &&
    isValidYearMonthDayDateString(value)
      ? i18n.formatDate(
          new Date(
            Date.UTC(
              Number(value.split('-')[0]),
              Number(value.split('-')[1]) - 1,
              Number(value.split('-')[2]),
              0,
              0,
            ),
          ),
          typeof formatDateOnBlur === 'boolean'
            ? DISPLAY_DATE_FORMAT
            : formatDateOnBlur,
        )
      : value;

  const selectedDate = useMemo(
    () =>
      isValidYearMonthDayDateString(value)
        ? parseYearMonthDayDateString(value)
        : undefined,
    [value],
  );

  const [{month, year}, setDate] = useState({
    month: getCurrentDate().getMonth(),
    year: getCurrentDate().getFullYear(),
  });

  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);

  function getErrorState() {
    if (error !== undefined) {
      return error;
    }

    return errorMessage ?? '';
  }

  function getCurrentDate() {
    return new Date();
  }

  function isNodeWithinPopover(node: HTMLElement): boolean {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false;
  }

  function focusPopover() {
    if (datePickerRef && datePickerRef.current) {
      focusFirstFocusableNode(datePickerRef.current);
    }
  }

  function handleDateSelection({end: newSelectedDate}: Range) {
    const formattedSelectedDate =
      formatDateToYearMonthDayDateString(newSelectedDate);
    onChange(formattedSelectedDate);
    setVisible(false);
    onBlur?.(formattedSelectedDate);
  }

  function handleMonthChange(month: number, year: number) {
    setDate({month, year});
  }

  function handleInputValueChange(value: string) {
    const userInputDate = value.replace(DATE_BLACKLIST_REGEX, '');
    const validDate = isValidYearMonthDayDateString(userInputDate);

    onChange(userInputDate);

    if (validDate) {
      const date = parseYearMonthDayDateString(userInputDate);

      setDate({
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }
  }

  function handleInputBlur({relatedTarget}: FocusEvent<HTMLInputElement>) {
    const isRelatedTargetWithinPopover =
      relatedTarget != null &&
      isNodeWithinPopover(relatedTarget as HTMLElement);

    // If focus moves from the TextField to the Popover
    // we don't want to close the popover
    if (isRelatedTargetWithinPopover) {
      return;
    }

    onBlur?.(formattedValue);
    setVisible(false);
  }

  function handleClose() {
    setVisible(false);
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    } else {
      setDate({
        month: getCurrentDate().getMonth(),
        year: getCurrentDate().getFullYear(),
      });
    }
  }

  const activator = (
    <TextField
      ariaControls={datePickerTextId}
      // work around for: https://github.com/Shopify/polaris/issues/7824
      role={disabled ? undefined : 'combobox'}
      label={label}
      labelHidden={labelHidden}
      disabled={disabled}
      helpText={helpText}
      prefix={iconHidden ? undefined : <Icon source={CalendarMinor} />}
      value={formattedValue}
      placeholder={datePlaceholder}
      onFocus={() => setVisible(Boolean(!disabled))}
      onChange={handleInputValueChange}
      onBlur={handleInputBlur as any}
      autoComplete="off"
      error={getErrorState()}
    />
  );

  if (disabled) {
    return activator;
  }

  return (
    <Popover
      active={visible}
      onClose={handleClose}
      autofocusTarget="none"
      preferredAlignment={preferredAlignment}
      preferredPosition={preferredPosition}
      preferInputActivator={preferInputActivator}
      ariaHaspopup="grid"
      activator={activator}
    >
      {!hideDatePicker && (
        <Box ref={datePickerRef} id={datePickerTextId} padding="3">
          <DatePicker
            month={month}
            year={year}
            selected={selectedDate}
            onMonthChange={handleMonthChange}
            onChange={handleDateSelection}
            disableDatesBefore={disableDatesBefore}
            disableDatesAfter={disableDatesAfter}
          />
          <KeypressListener keyCode={Key.DownArrow} handler={focusPopover} />
        </Box>
      )}
    </Popover>
  );
}

function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
}
