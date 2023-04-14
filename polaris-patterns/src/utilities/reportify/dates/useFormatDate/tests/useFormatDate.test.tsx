import {I18n} from '@shopify/react-i18n';

import {mountWithAppContext} from 'tests/modern';

import {useFormatDate} from '../useFormatDate';
import translations from '../translations/en.json';
import type {TimeGrain, DateFormatStyle} from '../types';

describe('useFormatDate()', () => {
  const i18n = new I18n([translations], {
    locale: 'en',
  });

  const dateString = '2020-01-01T14:00:00-05:00';

  function MockComponent({
    value,
    timeGrain,
    formatStyle,
  }: {
    value: string;
    timeGrain: TimeGrain;
    formatStyle: DateFormatStyle;
  }) {
    const formatDate = useFormatDate();
    const formattedValue = formatDate({value, timeGrain, style: formatStyle});

    return <p>{formattedValue}</p>;
  }

  describe('long style', () => {
    it('returns a formatted value for the day_of_week time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value="Tuesday"
          timeGrain="day_of_week"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toStrictEqual(
        i18n.translate('DateFormats.weekdays.long.tuesday'),
      );
    });

    it('returns a formatted value for the month_of_year time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value="February"
          timeGrain="month_of_year"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toStrictEqual(
        i18n.translate('DateFormats.months.long.february'),
      );
    });

    it('returns a formatted value for the quarter time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="quarter"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toStrictEqual(
        i18n.translate('DateFormats.quarters.q1', {year: 2020}),
      );
    });

    it('returns a formatted value for the hour time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="hour"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 01, 02:00 PM');
    });

    it('returns a formatted value for the day time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent value={dateString} timeGrain="day" formatStyle="long" />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 01, 2020');
    });

    it('returns a formatted value for the week time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="week"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 1');
    });

    it('returns a formatted value for the year time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="year"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('2020');
    });

    it('returns a formatted value for the month time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="month"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 2020');
    });

    it('returns a formatted value for the hour_of_day time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent value="16" timeGrain="hour_of_day" formatStyle="long" />,
      );

      expect(wrapper.find('p')!.props.children).toBe('4:00 PM');
    });
  });

  describe('short style', () => {
    it('returns a formatted value for the day_of_week time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value="Tuesday"
          timeGrain="day_of_week"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toStrictEqual(
        i18n.translate('DateFormats.weekdays.short.tuesday'),
      );
    });

    it('returns a formatted value for the month_of_year time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value="February"
          timeGrain="month_of_year"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toStrictEqual(
        i18n.translate('DateFormats.months.short.february'),
      );
    });

    it('returns a formatted value for the quarter time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="quarter"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toStrictEqual(
        i18n.translate('DateFormats.quarters.q1', {year: 2020}),
      );
    });

    it('returns a formatted value for the hour time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="hour"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('2:00 PM');
    });

    it('returns a formatted value for the day time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="day"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 1');
    });

    it('returns a formatted value for the week time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="week"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 1');
    });

    it('returns a formatted value for the year time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="year"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('2020');
    });

    it('returns a formatted value for the month time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="month"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan');
    });

    it('returns a formatted value for the hour_of_day time grain', async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value="16"
          timeGrain="hour_of_day"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('4:00 PM');
    });
  });

  describe('defaults', () => {
    it("defaults to the 'day' time grain for the 'second' timeGrain", async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="second"
          formatStyle="short"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 1');
    });

    it("defaults to the 'day' time grain for the 'minute' timeGrain", async () => {
      const wrapper = await mountWithAppContext(
        <MockComponent
          value={dateString}
          timeGrain="minute"
          formatStyle="long"
        />,
      );

      expect(wrapper.find('p')!.props.children).toBe('Jan 01, 2020');
    });
  });
});
