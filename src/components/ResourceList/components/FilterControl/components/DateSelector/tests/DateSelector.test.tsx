import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {DatePicker, Select, TextField} from 'components';
import {trigger, mountWithAppProvider} from 'test-utilities';
import DateSelector, {Props, DateFilterOption} from '../DateSelector';

describe('<DateSelector />', () => {
  const mockDefaultProps: Props = {
    filterKey: 'starts',
    filterMinKey: 'starts_min',
    filterMaxKey: 'starts_max',
    onFilterValueChange: noop,
    onFilterKeyChange: noop,
  };

  const dateOptionType = {
    past: [
      DateFilterOption.PastWeek,
      DateFilterOption.PastMonth,
      DateFilterOption.PastQuarter,
      DateFilterOption.PastYear,
      DateFilterOption.OnOrBefore,
      DateFilterOption.OnOrAfter,
    ],
    future: [
      DateFilterOption.ComingWeek,
      DateFilterOption.ComingMonth,
      DateFilterOption.ComingQuarter,
      DateFilterOption.ComingYear,
      DateFilterOption.OnOrBefore,
      DateFilterOption.OnOrAfter,
    ],
    full: [
      DateFilterOption.PastWeek,
      DateFilterOption.PastMonth,
      DateFilterOption.PastQuarter,
      DateFilterOption.PastYear,
      DateFilterOption.ComingWeek,
      DateFilterOption.ComingMonth,
      DateFilterOption.ComingQuarter,
      DateFilterOption.ComingYear,
      DateFilterOption.OnOrBefore,
      DateFilterOption.OnOrAfter,
    ],
  };

  let getTimezoneOffset: jest.SpyInstance;

  beforeEach(() => {
    getTimezoneOffset = jest.spyOn(Date.prototype, 'getTimezoneOffset');
    getTimezoneOffset.mockImplementation(() => -540);
  });

  afterEach(() => {
    getTimezoneOffset.mockRestore();
  });

  describe('dateOptionType', () => {
    it('builds date filters Select options for past option type', () => {
      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} dateOptionType="past" />,
      );

      const expectOptionValues = dateOptionType.past;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toStrictEqual(expectOptionValues);
    });

    it('builds date filters Select options for future option type', () => {
      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} dateOptionType="future" />,
      );

      const expectOptionValues = dateOptionType.future;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toStrictEqual(expectOptionValues);
    });

    it('builds date filters Select options for full option type', () => {
      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} dateOptionType="full" />,
      );

      const expectOptionValues = dateOptionType.full;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toStrictEqual(expectOptionValues);
    });

    it('defaults to full date filters Select options when option type is missing', () => {
      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} />,
      );

      const expectOptionValues = dateOptionType.full;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toStrictEqual(expectOptionValues);
    });
  });

  describe('filterValue', () => {
    it('sets option in date filters Select', () => {
      const dateFilterValue = DateFilterOption.PastMonth;

      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(Select).prop('value')).toBe(dateFilterValue);
    });

    it('displays DatePicker when filterValue is filter with minimum date predicate (on or after)', () => {
      const dateFilterValue = DateFilterOption.OnOrAfter;

      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(DatePicker).exists()).toBe(true);
    });

    it('displays DatePicker when filterValue is filter with maximum date predicate (on or before)', () => {
      const dateFilterValue = DateFilterOption.OnOrBefore;

      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(DatePicker).exists()).toBe(true);
    });

    it('does not display DatePicker when filterValue is filter without date predicate', () => {
      const dateFilterValue = DateFilterOption.PastMonth;

      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(DatePicker).exists()).toBe(false);
    });

    it('is used to calculate dateFilterOption and gets passed to Select as value', () => {
      const filterValue = 'filter value';
      const wrapper = mountWithAppProvider(
        <DateSelector {...mockDefaultProps} filterValue={filterValue} />,
      );
      expect(wrapper.find(Select).prop('value')).toBe(filterValue);
    });
  });

  describe('filterKey and filterMaxKey', () => {
    it('is used to calculate dateFilterOption and gets passed to Select as value', () => {
      const filterValue = 'filter value';
      const filterKey = 'before';
      const filterMaxKey = 'before';
      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={filterValue}
          filterKey={filterKey}
          filterMaxKey={filterMaxKey}
        />,
      );
      expect(wrapper.find(Select).prop('value')).toBe('on_or_before');
    });
  });

  describe('timezones adjustments', () => {
    it('sets the selected date with negative timezone offset on DatePicker and TextField', () => {
      const nextUserInputDate = '2019-01-01';
      const timezoneOffset = -540;
      const timezoneOffsetInHours = Math.abs(timezoneOffset / 60);
      getTimezoneOffset.mockImplementation(() => timezoneOffset);

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={DateFilterOption.OnOrBefore}
        />,
      );

      trigger(wrapper.find(TextField), 'onChange', nextUserInputDate);
      trigger(wrapper.find(TextField), 'onBlur');

      const selectedDate = wrapper.find(DatePicker).prop('selected') as Date;
      const selectedInputDate = wrapper.find(TextField).prop('value');

      expect(selectedDate.toISOString()).toBe(
        `2019-01-01T0${timezoneOffsetInHours}:00:00.000Z`,
      );
      expect(selectedInputDate).toBe(nextUserInputDate);
    });

    it('sets the selected date with fringe timezone offset on DatePicker and TextField', () => {
      const nextUserInputDate = '2019-01-01';
      getTimezoneOffset.mockImplementation(() => -720);

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={DateFilterOption.OnOrBefore}
        />,
      );

      trigger(wrapper.find(TextField), 'onChange', nextUserInputDate);
      trigger(wrapper.find(TextField), 'onBlur');

      const selectedDate = wrapper.find(DatePicker).prop('selected') as Date;
      const selectedInputDate = wrapper.find(TextField).prop('value');

      expect(selectedDate.toISOString()).toContain(nextUserInputDate);
      expect(selectedInputDate).toBe(nextUserInputDate);
    });

    it('sets the selected date with positive timezone offset on DatePicker and TextField', () => {
      const nextUserInputDate = '2019-01-01';
      const timezoneOffset = 300;
      const timezoneOffsetInHours = Math.abs(timezoneOffset / 60);
      getTimezoneOffset.mockImplementation(() => timezoneOffset);

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={DateFilterOption.OnOrBefore}
        />,
      );

      trigger(wrapper.find(TextField), 'onChange', nextUserInputDate);
      trigger(wrapper.find(TextField), 'onBlur');

      const selectedDate = wrapper.find(DatePicker).prop('selected') as Date;
      const selectedInputDate = wrapper.find(TextField).prop('value');

      expect(selectedDate.toISOString()).toBe(
        `2019-01-01T0${timezoneOffsetInHours}:00:00.000Z`,
      );
      expect(selectedInputDate).toBe(nextUserInputDate);
    });
  });

  describe('filterKey and filterMinKey', () => {
    it('is used to calculate dateFilterOption and gets passed to Select as value', () => {
      const filterValue = 'filter value';
      const filterKey = 'after';
      const filterMinKey = 'after';
      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={filterValue}
          filterKey={filterKey}
          filterMinKey={filterMinKey}
        />,
      );
      expect(wrapper.find(Select).prop('value')).toBe('on_or_after');
    });
  });

  describe('onFilterValueChange', () => {
    it('gets called with new filter value when date filter is updated to filter without date predicate', () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.PastMonth;

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(newDateFilter);
    });

    it('gets called with undefined when date filter is updated to filter with minimum date predicate (on or after) and no current date selection', () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrAfter;

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(undefined);
    });

    it('gets called with undefined when date filter is updated to filter with maximum date predicate (on or before) and no current date selection', () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrBefore;

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(undefined);
    });

    it('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with minimum date predicate (on or after) and current date selection', () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrAfter;
      const date = '2019-05-28';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={DateFilterOption.OnOrBefore}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(DatePicker), 'onChange', {end: new Date(date)});
      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith('2019-05-28');
    });

    it('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with maximum date predicate (on or before) and current date selection', () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrBefore;
      const date = '2019-05-28';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={DateFilterOption.OnOrAfter}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(DatePicker), 'onChange', {end: new Date(date)});
      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith('2019-05-28');
    });

    it('gets called with formatted YYYY-MM-DD date when date is updated in DatePicker', () => {
      const onFilterValueChangeSpy = jest.fn();
      const dateFilter = DateFilterOption.OnOrBefore;
      const date = '2019-05-28';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={dateFilter}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(DatePicker), 'onChange', {end: new Date(date)});

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith('2019-05-28');
    });

    it('gets called with date when date is updated in TextField with YYYY-MM-DD date and TextField is blurred', () => {
      const onFilterValueChangeSpy = jest.fn();
      const dateFilter = DateFilterOption.OnOrBefore;
      const date = '2019-08-22';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={dateFilter}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(TextField), 'onChange', date);
      trigger(wrapper.find(TextField), 'onBlur');

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(date);
    });

    it('gets called with undefined when date is updated in TextField with invalid date and TextField is blurred', () => {
      const onFilterValueChangeSpy = jest.fn();
      const dateFilter = DateFilterOption.OnOrBefore;
      const invalidDate = '2019/08/22';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterValue={dateFilter}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(TextField), 'onChange', invalidDate);
      trigger(wrapper.find(TextField), 'onBlur');

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('onFilterKeyChange', () => {
    it('gets called with consumer filter key when date filter is updated to filter without date predicate', () => {
      const onFilterKeyChangeSpy = jest.fn();
      const initialConsumerFilterKey = 'starts';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterKey={initialConsumerFilterKey}
          onFilterKeyChange={onFilterKeyChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', DateFilterOption.PastMonth);

      expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(
        initialConsumerFilterKey,
      );
    });

    it('gets called with max filter key prop when date filter is updated to filter with maximum date predicate (on or before)', () => {
      const onFilterKeyChangeSpy = jest.fn();
      const filterMaxKey = 'starts_max';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterMaxKey={filterMaxKey}
          onFilterKeyChange={onFilterKeyChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', DateFilterOption.OnOrBefore);

      expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(filterMaxKey);
    });

    it('gets called with min filter key when date filter is updated to filter with minimum date predicate (on or after)', () => {
      const onFilterKeyChangeSpy = jest.fn();
      const filterMinKey = 'starts_min';

      const wrapper = mountWithAppProvider(
        <DateSelector
          {...mockDefaultProps}
          filterMinKey={filterMinKey}
          onFilterKeyChange={onFilterKeyChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', DateFilterOption.OnOrAfter);

      expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(filterMinKey);
    });
  });

  it('resets date in DatePicker when user removes date in TextField', () => {
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', '');

    expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
  });

  it('updates selected date in DatePicker when user enters a valid date in TextField and field is blurred', () => {
    const validUserInputDate = '2020-08-30';
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', validUserInputDate);
    trigger(wrapper.find(TextField), 'onBlur');

    const selectedDate = wrapper.find(DatePicker).prop('selected') as Date;
    expect(selectedDate.toISOString()).toContain(validUserInputDate);
  });

  it('does not update selected date in DatePicker when user enters an invalid date in TextField and field is blurred', () => {
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', 'INVALID');
    trigger(wrapper.find(TextField), 'onBlur');

    expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
  });

  it('resets selected date in DatePicker when user enters an invalid date in TextField and field is blurred', () => {
    const invalidUserInputDate = '08/20/2020';
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', invalidUserInputDate);
    trigger(wrapper.find(TextField), 'onBlur');

    expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
  });

  it('removes date field error when invalid date is replaced by valid date in TextField', () => {
    const validUserInputDate = '2020-08-30';
    const invalidUserInputDate = '08/30/2020';
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', invalidUserInputDate);
    trigger(wrapper.find(TextField), 'onBlur');

    trigger(wrapper.find(TextField), 'onChange', validUserInputDate);

    expect(wrapper.find(TextField).prop('error')).toBeUndefined();
  });

  it('removes date field error when new date is selected in DatePicker', () => {
    const invalidUserInputDate = '08/30/2020';
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', invalidUserInputDate);
    trigger(wrapper.find(TextField), 'onBlur');

    trigger(wrapper.find(DatePicker), 'onChange', {end: new Date()});

    expect(wrapper.find(TextField).prop('error')).toBeUndefined();
  });

  it('does not display error when date is added in date filed by DatePicker and date field is blurred', () => {
    const wrapper = mountWithAppProvider(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(DatePicker), 'onChange', {end: new Date()});
    trigger(wrapper.find(TextField), 'onBlur');

    expect(wrapper.find(TextField).prop('error')).toBeUndefined();
  });

  function getOptionsValuesList(options?: any) {
    if (!options) {
      return [];
    }

    return options.map((option: any) => {
      return typeof option === 'string' ? option : option.value;
    });
  }
});
