import {useCallback, useEffect, useState} from 'react';
import {Icon, useBreakpoints} from '@shopify/polaris';
import {ArrowRightMinor} from '@shopify/polaris-icons';
import {useI18n} from '@shopify/react-i18n';
import {applyTimeZoneOffset, unapplyTimeZoneOffset} from '@shopify/dates';

import {DatePickerTextField} from 'components/DatePickerTextField';
import type {DatePeriod} from 'utilities/reportify';
import {
  formatDateToYearMonthDayDateString,
  isValidYearMonthDayDateString,
  parseYearMonthDayDateString,
} from 'utilities/dates';

import styles from '../../AnalyticsDatePicker.scss';

export interface Props {
  datePeriod: DatePeriod | null;
  timeZone?: string;
  onChange(datePeriod: DatePeriod): void;
}

function isValidDate(date: string) {
  return date.length === 10 && isValidYearMonthDayDateString(date);
}

export default function TextFields({timeZone, datePeriod, onChange}: Props) {
  const [i18n] = useI18n();

  const {smUp, mdDown, lgUp} = useBreakpoints();

  const dateShouldBeLong = (smUp && mdDown) || lgUp;

  const dateFormat: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: dateShouldBeLong ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  };

  const formatDateForTextField = useCallback(
    (date: Date) => {
      return formatDateToYearMonthDayDateString(
        unapplyTimeZoneOffset(date, timeZone),
      );
    },
    [timeZone],
  );

  const [datesToDisplay, setDatesToDisplay] = useState<{
    since: string;
    until: string;
  } | null>({
    since: datePeriod ? formatDateForTextField(datePeriod.since) : '',
    until: datePeriod ? formatDateForTextField(datePeriod.until) : '',
  });

  useEffect(() => {
    setDatesToDisplay({
      since: datePeriod ? formatDateForTextField(datePeriod.since) : '',
      until: datePeriod ? formatDateForTextField(datePeriod.until) : '',
    });
  }, [datePeriod, formatDateForTextField]);

  function handleStartChange(value: string) {
    if (isValidDate(value)) {
      const since = applyTimeZoneOffset(
        parseYearMonthDayDateString(value),
        timeZone,
      );

      const newDatePeriod =
        datePeriod && since <= datePeriod.until
          ? {since, until: datePeriod.until}
          : {since, until: new Date(since)};

      onChange(newDatePeriod);
      return;
    }

    setDatesToDisplay({since: value, until: datesToDisplay?.until ?? ''});
  }

  function handleEndChange(value: string) {
    if (isValidDate(value)) {
      const until = applyTimeZoneOffset(
        parseYearMonthDayDateString(value),
        timeZone,
      );

      const newDatePeriod =
        datePeriod && datePeriod.since <= until
          ? {since: datePeriod.since, until}
          : {since: new Date(until), until};

      onChange(newDatePeriod);
      return;
    }
    setDatesToDisplay({since: datesToDisplay?.since ?? '', until: value});
  }

  function handleBlur() {
    if (datesToDisplay && datePeriod) {
      if (!isValidDate(datesToDisplay.since || '')) {
        setDatesToDisplay({
          ...datesToDisplay,
          since: formatDateToYearMonthDayDateString(datePeriod.since),
        });
      } else if (!isValidDate(datesToDisplay?.until || '')) {
        setDatesToDisplay({
          ...datesToDisplay,
          until: formatDateToYearMonthDayDateString(datePeriod.until),
        });
      }
    }
  }

  return (
    <div className={styles.TextFields}>
      <DatePickerTextField
        label={i18n.translate('TextFields.starting')}
        labelHidden
        iconHidden
        hideDatePicker
        value={datesToDisplay?.since || ''}
        onChange={handleStartChange}
        formatDateOnBlur={dateFormat}
        onBlur={handleBlur}
      />
      <div className={styles.ArrowIcon}>
        <Icon source={ArrowRightMinor} color="subdued" />
      </div>
      <DatePickerTextField
        label={i18n.translate('TextFields.ending')}
        labelHidden
        iconHidden
        hideDatePicker
        value={datesToDisplay?.until || ''}
        onChange={handleEndChange}
        formatDateOnBlur={dateFormat}
        onBlur={handleBlur}
      />
    </div>
  );
}
