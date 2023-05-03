import React, {useState} from 'react';
import {I18nContext, I18nManager} from '@shopify/react-i18n';
import {DateRangePicker} from '@shopify/polaris-patterns';
import type {StringDatePeriod} from '@shopify/polaris-patterns';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
const i18nManager = new I18nManager({
  locale: 'en',
  currency: 'usd',
  country: 'CA',
});

function DateRangePickerDefault() {
  const [selectedRange, setSelectedRange] = useState<StringDatePeriod | null>(
    null,
  );
  const [savedComparisonRange, setComparisonRange] =
    useState<StringDatePeriod | null>(null);
  const onChange = (
    selectedRange: StringDatePeriod,
    comparisonRange: StringDatePeriod,
  ) => {
    setSelectedRange(selectedRange);
    if (comparisonRange && savedComparisonRange !== comparisonRange) {
      setComparisonRange(comparisonRange);
    }
  };

  return (
    <I18nContext.Provider value={i18nManager}>
      <DateRangePicker
        initialRange={{
          since: new Date('2023-03-01'),
          until: new Date('2023-03-08'),
        }}
        timeZone="UTC"
        onChange={onChange}
      />
      <div>Value: {JSON.stringify(selectedRange, null, 2)}</div>
    </I18nContext.Provider>
  );
}
export default withPolarisExample(DateRangePickerDefault);
