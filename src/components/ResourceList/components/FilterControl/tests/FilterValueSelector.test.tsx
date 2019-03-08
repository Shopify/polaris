import * as React from 'react';
import {Select, TextField} from '@shopify/polaris';
import {noop} from '@shopify/javascript-utilities/other';
import {trigger} from 'tests/utilities';
import {shallowWithAppProvider} from '../../../tests/utilities';
import FilterValueSelector from '../FilterValueSelector';
import DateSelector from '../DateSelector';
import {Filter, FilterType} from '../types';

describe('<FilterValueSelector />', () => {
  describe('filter.type', () => {
    describe('FilterType.Select', () => {
      const filter: Filter = {
        key: 'filterKey1',
        label: 'Product type',
        operatorText: 'is',
        type: FilterType.Select,
        options: [
          'Bundle',
          {
            value: 'electronic_value',
            label: 'Electronic',
            disabled: true,
          },
          {
            value: 'beauty_value',
            label: 'Beauty',
          },
        ],
      };

      it('renders a Select field', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const select = wrapper.find(Select);
        expect(select.exists()).toEqual(true);
      });

      it('renders label using the operatorText', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const select = wrapper.find(Select);
        expect(select.prop('label')).toBe(filter.operatorText);
      });

      it('renders value using the value prop', () => {
        const value = 'test';
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            value={value}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const select = wrapper.find(Select);
        expect(select.prop('value')).toBe(value);
      });

      it('calls onChange when the Select was changed', () => {
        const onChange = jest.fn();
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={onChange}
            onFilterKeyChange={noop}
          />,
        );

        trigger(wrapper.find(Select), 'onChange');
        expect(onChange).toHaveBeenCalled();
      });
    });

    describe('FilterType.TextField', () => {
      const filter: Filter = {
        key: 'filterKey2',
        label: 'Tagged with',
        type: FilterType.TextField,
      };

      it('renders a TextField', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.exists()).toEqual(true);
      });

      it('renders label as empty string if operatorText does not exist', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.prop('label')).toBe('');
      });

      it('renders value using the value prop', () => {
        const value = 'test';
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            value={value}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.prop('value')).toBe(value);
      });

      it('calls onChange when the text field was changed', () => {
        const onChange = jest.fn();
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={onChange}
            onFilterKeyChange={noop}
          />,
        );

        trigger(wrapper.find(TextField), 'onChange');
        expect(onChange).toHaveBeenCalled();
      });
    });

    describe('FilterType.DateSelector', () => {
      const filter: Filter = {
        key: 'filterKey1',
        minKey: 'ends_min',
        maxKey: 'ends_max',
        label: 'Starts',
        type: FilterType.DateSelector,
        dateOptionType: 'past',
      };

      it('renders a DateSelector', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const dateSelector = wrapper.find(DateSelector);
        expect(dateSelector.exists()).toEqual(true);
      });

      it('renders filterValue using the value prop', () => {
        const value = 'test';
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            value={value}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const dateSelector = wrapper.find(DateSelector);
        expect(dateSelector.prop('filterValue')).toBe(value);
      });

      it('renders filterKey using the filterKey prop', () => {
        const filterKey = 'test';
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            filterKey={filterKey}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const dateSelector = wrapper.find(DateSelector);
        expect(dateSelector.prop('filterKey')).toBe(filterKey);
      });

      it('renders filterMinKey using the min key of filter on filter prop', () => {
        const filterMinKey = 'test';
        const mockFilter = {...filter, minKey: filterMinKey};

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={mockFilter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const dateSelector = wrapper.find(DateSelector);
        expect(dateSelector.prop('filterMinKey')).toBe(filterMinKey);
      });

      it('renders filterMaxKey using the max key of filter on filter prop', () => {
        const filterMaxKey = 'test';
        const mockFilter = {...filter, maxKey: filterMaxKey};

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={mockFilter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const dateSelector = wrapper.find(DateSelector);
        expect(dateSelector.prop('filterMaxKey')).toBe(filterMaxKey);
      });

      it('calls onFilterKeyChange when the filter key was changed', () => {
        const onFilterKeyChange = jest.fn();
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={onFilterKeyChange}
          />,
        );

        trigger(wrapper.find(DateSelector), 'onFilterKeyChange');
        expect(onFilterKeyChange).toHaveBeenCalled();
      });
    });
  });
});
