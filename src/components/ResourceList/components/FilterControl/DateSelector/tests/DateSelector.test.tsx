import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {Select, TextField} from '@shopify/polaris';
import {DatePicker} from 'components';
import {trigger, mountWithAppContext} from 'tests/utilities';

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

  describe('dateOptionType', () => {
    it('builds date filters Select options for past option type', async () => {
      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} dateOptionType="past" />,
      );

      const expectOptionValues = dateOptionType.past;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toEqual(expectOptionValues);
    });

    it('builds date filters Select options for future option type', async () => {
      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} dateOptionType="future" />,
      );

      const expectOptionValues = dateOptionType.future;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toEqual(expectOptionValues);
    });

    it('builds date filters Select options for full option type', async () => {
      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} dateOptionType="full" />,
      );

      const expectOptionValues = dateOptionType.full;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toEqual(expectOptionValues);
    });

    it('defaults to full date filters Select options when option type is missing', async () => {
      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} />,
      );

      const expectOptionValues = dateOptionType.full;

      expect(
        getOptionsValuesList(wrapper.find(Select).prop('options')),
      ).toEqual(expectOptionValues);
    });
  });

  describe('filterValue', () => {
    it('sets option in date filters Select', async () => {
      const dateFilterValue = DateFilterOption.PastMonth;

      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(Select).prop('value')).toBe(dateFilterValue);
    });

    it('displays DatePicker when filterValue is filter with minimum date predicate (on or after)', async () => {
      const dateFilterValue = DateFilterOption.OnOrAfter;

      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(DatePicker).exists()).toBe(true);
    });

    it('displays DatePicker when filterValue is filter with maximum date predicate (on or before)', async () => {
      const dateFilterValue = DateFilterOption.OnOrBefore;

      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(DatePicker).exists()).toBe(true);
    });

    it('does not display DatePicker when filterValue is filter without date predicate', async () => {
      const dateFilterValue = DateFilterOption.PastMonth;

      const wrapper = await mountWithAppContext(
        <DateSelector {...mockDefaultProps} filterValue={dateFilterValue} />,
      );

      expect(wrapper.find(DatePicker).exists()).toBe(false);
    });
  });

  describe('onFilterValueChange', () => {
    it('gets called with new filter value when date filter is updated to filter without date predicate', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.PastMonth;

      const wrapper = await mountWithAppContext(
        <DateSelector
          {...mockDefaultProps}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(newDateFilter);
    });

    it('gets called with undefined when date filter is updated to filter with minimum date predicate (on or after) and no current date selection', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrAfter;

      const wrapper = await mountWithAppContext(
        <DateSelector
          {...mockDefaultProps}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(undefined);
    });

    it('gets called with undefined when date filter is updated to filter with maximum date predicate (on or before) and no current date selection', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrBefore;

      const wrapper = await mountWithAppContext(
        <DateSelector
          {...mockDefaultProps}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', newDateFilter);

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith(undefined);
    });

    it('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with minimum date predicate (on or after) and current date selection', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrAfter;
      const date = '2019-05-28';

      const wrapper = await mountWithAppContext(
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

    it('gets called with formatted YYYY-MM-DD date when date filter is updated to filter with maximum date predicate (on or before) and current date selection', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const newDateFilter = DateFilterOption.OnOrBefore;
      const date = '2019-05-28';

      const wrapper = await mountWithAppContext(
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

    it('gets called with formatted YYYY-MM-DD date when date is updated in DatePicker', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const dateFilter = DateFilterOption.OnOrBefore;
      const date = '2019-05-28';

      const wrapper = await mountWithAppContext(
        <DateSelector
          {...mockDefaultProps}
          filterValue={dateFilter}
          onFilterValueChange={onFilterValueChangeSpy}
        />,
      );

      trigger(wrapper.find(DatePicker), 'onChange', {end: new Date(date)});

      expect(onFilterValueChangeSpy).toHaveBeenCalledWith('2019-05-28');
    });

    it('gets called with date when date is updated in TextField with YYYY-MM-DD date and TextField is blurred', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const dateFilter = DateFilterOption.OnOrBefore;
      const date = '2019-08-22';

      const wrapper = await mountWithAppContext(
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

    it('gets called with undefined when date is updated in TextField with invalid date and TextField is blurred', async () => {
      const onFilterValueChangeSpy = jest.fn();
      const dateFilter = DateFilterOption.OnOrBefore;
      const invalidDate = '2019/08/22';

      const wrapper = await mountWithAppContext(
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
    it('gets called with consumer filter key when date filter is updated to filter without date predicate', async () => {
      const onFilterKeyChangeSpy = jest.fn();
      const initialConsumerFilterKey = 'stasync arts';

      const wrapper = await mountWithAppContext(
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

    it('gets called with max filter key prop when date filter is updated to filter with maximum date predicate (on or before)', async () => {
      const onFilterKeyChangeSpy = jest.fn();
      const filterMaxKey = 'start_max';

      const wrapper = await mountWithAppContext(
        <DateSelector
          {...mockDefaultProps}
          filterMaxKey={filterMaxKey}
          onFilterKeyChange={onFilterKeyChangeSpy}
        />,
      );

      trigger(wrapper.find(Select), 'onChange', DateFilterOption.OnOrBefore);

      expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(filterMaxKey);
    });

    it('gets called with min filter key when date filter is updated to filter with minimum date predicate (on or after)', async () => {
      const onFilterKeyChangeSpy = jest.fn();
      const filterMinKey = 'start_min';

      const wrapper = await mountWithAppContext(
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

  it('resets date in DatePicker when user removes date in TextField', async () => {
    const wrapper = await mountWithAppContext(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', '');

    expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
  });

  it('updates selected date in DatePicker when user enters a valid date in TextField and field is blurred', async () => {
    const validUserInputDate = '2020-08-30';
    const wrapper = await mountWithAppContext(
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

  it('does not update selected date in DatePicker when user enters an invalid date in TextField and field is blurred', async () => {
    const wrapper = await mountWithAppContext(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', 'INVALID');
    trigger(wrapper.find(TextField), 'onBlur');

    expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
  });

  it('resets selected date in DatePicker when user enters an invalid date in TextField and field is blurred', async () => {
    const invalidUserInputDate = '08/20/2020';
    const wrapper = await mountWithAppContext(
      <DateSelector
        {...mockDefaultProps}
        filterValue={DateFilterOption.OnOrBefore}
      />,
    );

    trigger(wrapper.find(TextField), 'onChange', invalidUserInputDate);
    trigger(wrapper.find(TextField), 'onBlur');

    expect(wrapper.find(DatePicker).prop('selected')).toBeUndefined();
  });

  it('removes date field error when invalid date is replaced by valid date in TextField', async () => {
    const validUserInputDate = '2020-08-30';
    const invalidUserInputDate = '08/30/2020';
    const wrapper = await mountWithAppContext(
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

  it('removes date field error when new date is selected in DatePicker', async () => {
    const invalidUserInputDate = '08/30/2020';
    const wrapper = await mountWithAppContext(
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

  it('does not receive an error state when the textfield is blurred without interaction', async () => {
    const dateFilter = DateFilterOption.OnOrBefore;
    const wrapper = await mountWithAppContext(
      <DateSelector {...mockDefaultProps} filterValue={dateFilter} />,
    );

    const textField = wrapper.find(TextField);
    trigger(textField, 'onBlur');
    expect(textField).toHaveProp('error', undefined);
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
