import React from 'react';
import {Weekday, useI18n, I18nContext} from '@shopify/react-i18n';
import type {DatePickerProps} from '@shopify/polaris';
import {DatePicker as PolarisDatePicker} from '@shopify/polaris';

import {useI18nManager} from '../PolarisPatternsProvider';

export function DatePicker(props: DatePickerProps) {
  const manager = useI18nManager();

  return (
    <I18nContext.Provider value={manager}>
      <DatePickerComponent {...props} />
    </I18nContext.Provider>
  );
}

export function DatePickerComponent(props: DatePickerProps) {
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
