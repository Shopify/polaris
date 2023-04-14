import {mockI18n} from '@shopify/react-i18n-next';

import datePickerTranslations from 'components/AnalyticsDatePicker/translations/en.json';
import {mountWithAppContext} from 'tests/modern';

import DateRangeSelector from '../DateRangeSelector';

const mockProps = {
  activeDateRange: {
    alias: 'today',
    title: 'Today',
    period: {since: 'today', until: 'today'},
  },
  setIsDirty: () => {},
  setDateRange: () => {},
  setMonthShouldUpdate: () => {},
  timeZone: 'America/New_York',
  dateRanges: [
    {
      alias: 'today',
      title: 'Today',
      period: {since: 'today', until: 'today'},
    },
    {
      alias: 'yesterday',
      title: 'Yesterday',
      period: {since: 'yesterday', until: 'yesterday'},
    },
    {
      alias: 'bfcm_2021',
      title: 'BFCM 2021',
      period: {since: '2021-11-26', until: '2021-11-29'},
    },
  ],
};

describe('<DateRangeSelector', () => {
  it('renders the dateRanges', async () => {
    const translations = mockI18n(datePickerTranslations);
    const wrapper = await mountWithAppContext(
      <DateRangeSelector {...mockProps} />,
      translations,
    );

    expect(wrapper).toContainReactText('Today');
    expect(wrapper).toContainReactText('Yesterday');
    expect(wrapper).toContainReactText('BFCM 2021');
  });
});
