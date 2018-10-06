import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {trigger, shallowWithAppProvider} from 'tests/utilities';
import {Select, TextField} from 'src/components';
import FilterValueSelector from '../FilterValueSelector';
import DateSelector from '../DateSelector';
import {Filter, FilterType, Operator} from '../types';

describe('<FilterValueSelector />', () => {
  const operators = [
    {
      optionLabel: 'equal to',
      filterLabel: 'is',
      key: 'times_used',
    },
    {
      optionLabel: 'not equal to',
      filterLabel: 'is not',
      key: 'times_used_not',
    },
    {
      optionLabel: 'less than',
      filterLabel: 'is less than',
      key: 'times_used_max',
    },
    {
      optionLabel: 'greater than',
      filterLabel: 'is greater than',
      key: 'times_used_min',
    },
  ];

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
        expect(select.exists()).toBe(true);
      });

      it('renders label using operatorText when it is a string', () => {
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

      it('renders a Select with options using operatorText when it is a list of operators', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const expectedOptions = getOptionsListForOperators(operators);

        const operatorsSelect = wrapper.find(Select).first();
        expect(operatorsSelect.prop('options')).toEqual(expectedOptions);
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

      it('calls onFilterKeyChange when operator is changed', () => {
        const onFilterKeyChangeSpy = jest.fn();
        const newOperator = operators[1].key;

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={onFilterKeyChangeSpy}
          />,
        );

        const operatorsSelect = wrapper.find(Select).first();
        trigger(operatorsSelect, 'onChange', newOperator);

        expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(newOperator);
      });

      it('calls onChange with filter value when operator is changed and filter value is set', () => {
        const onChangeSpy = jest.fn();
        const newFilterValue = 'foo';

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={onChangeSpy}
            onFilterKeyChange={noop}
          />,
        );

        const filterValueSelect = wrapper.find(Select).at(1);
        trigger(filterValueSelect, 'onChange', newFilterValue);

        const operatorsSelect = wrapper.find(Select).first();
        trigger(operatorsSelect, 'onChange', operators[1].key);

        expect(onChangeSpy).toHaveBeenCalledWith(newFilterValue);
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
        expect(textField.exists()).toBe(true);
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

      it('renders a Select with options using operatorText when it is a list of operators', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const expectedOptions = getOptionsListForOperators(operators);

        const operatorsSelect = wrapper.find(Select).first();
        expect(operatorsSelect.prop('options')).toEqual(expectedOptions);
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

      it('renders type using the textFieldType prop', () => {
        const textFieldType = 'number';

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{
              ...filter,
              textFieldType,
            }}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.prop('type')).toBe(textFieldType);
      });

      it('renders undefined type when the textFieldType prop is not passed', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.prop('type')).toBeUndefined();
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

      it('calls onFilterKeyChange when operator is changed', () => {
        const onFilterKeyChangeSpy = jest.fn();
        const newOperator = operators[1].key;

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={onFilterKeyChangeSpy}
          />,
        );

        const operatorsSelect = wrapper.find(Select).first();
        trigger(operatorsSelect, 'onChange', newOperator);

        expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(newOperator);
      });

      it('calls onChange with filter value when operator is changed and filter value is set', () => {
        const onChangeSpy = jest.fn();
        const newFilterValue = 'foo';

        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={onChangeSpy}
            onFilterKeyChange={noop}
          />,
        );

        const filterValueTextField = wrapper.find(TextField);
        trigger(filterValueTextField, 'onChange', newFilterValue);

        const operatorsSelect = wrapper.find(Select).first();
        trigger(operatorsSelect, 'onChange', operators[1].key);

        expect(onChangeSpy).toHaveBeenCalledWith(newFilterValue);
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
        expect(dateSelector.exists()).toBe(true);
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

      it('does not render Select with operator options', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const operatorsSelect = wrapper.find(Select);
        expect(operatorsSelect.exists()).toBe(false);
      });

      it('calls onFilterKeyChange when the filter key was changed', () => {
        const onChange = jest.fn();
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector
            filter={filter}
            onChange={onChange}
            onFilterKeyChange={noop}
          />,
        );

        trigger(wrapper.find(DateSelector), 'onFilterValueChange');
        expect(onChange).toHaveBeenCalled();
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

  function getOptionsListForOperators(operators: Operator[]) {
    return operators.map(({key, optionLabel}) => {
      return {value: key, label: optionLabel};
    });
  }
});
