import React from 'react';
import {Weekday, useI18n} from '@shopify/react-i18n';
import type {DatePickerProps} from '@shopify/polaris';
import {DatePicker as PolarisDatePicker} from '@shopify/polaris';

export function DatePicker(props: DatePickerProps) {
  const [i18n] = useI18n();

  const weekStartsOn = toPolarisWeekStartsOn(i18n.weekStartDay());

  return <PolarisDatePicker weekStartsOn={weekStartsOn} {...props} />;
}

function toPolarisWeekStartsOn(weekday: Weekday) {
  switch (weekday) {
    case Weekday.Sunday:
      return 0;
    case Weekday.Monday:
      return 1;
    case Weekday.Tuesday:
      return 2;
    case Weekday.Wednesday:
      return 3;
    case Weekday.Thursday:
      return 4;
    case Weekday.Friday:
      return 5;
    case Weekday.Saturday:
      return 6;
  }
}
