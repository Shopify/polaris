import React from 'react';
import {mountWithApp} from 'test-utilities';
import {Select, TextField} from 'components';

import {FilterValueSelector} from '../FilterValueSelector';
import {DateSelector} from '../../DateSelector';
import {Filter, FilterType, Operator} from '../../../types';

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
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(Select);
      });

      it('renders label using operatorText when it is a string', () => {
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(Select, {
          label: filter.operatorText,
        });
      });

      it('renders a Select with options using operatorText when it is a list of operators', () => {
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const expectedOptions = getOptionsListForOperators(operators);

        expect(wrapper).toContainReactComponent(Select, {
          options: expectedOptions,
        });
      });

      it('renders value using the value prop', () => {
        const value = 'test';
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            value={value}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        // const select = wrapper.find(Select);
        // expect(select.prop('value')).toBe(value);
        expect(wrapper).toContainReactComponent(Select, {value});
      });

      it('calls onChange when the Select was changed', () => {
        const onChange = jest.fn();
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={onChange}
            onFilterKeyChange={noop}
          />,
        );

        wrapper.find(Select)?.trigger('onChange');
        expect(onChange).toHaveBeenCalled();
      });

      it('calls onFilterKeyChange when operator is changed', () => {
        const onFilterKeyChangeSpy = jest.fn();
        const newOperator = operators[1].key;

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={onFilterKeyChangeSpy}
          />,
        );

        const operatorsSelect = wrapper.findAll(Select)[0];
        operatorsSelect.trigger('onChange', newOperator);

        expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(newOperator);
      });

      it('calls onChange with filter value when operator is changed and filter value is set', () => {
        const onChangeSpy = jest.fn();
        const newFilterValue = 'foo';

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={onChangeSpy}
            onFilterKeyChange={noop}
          />,
        );

        const selects = wrapper.findAll(Select);

        const filterValueSelect = selects[1];
        filterValueSelect.trigger('onChange', newFilterValue);

        const operatorsSelect = selects[0];
        operatorsSelect.trigger('onChange', operators[1].key);

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
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(TextField);
      });

      it('renders label as empty string if operatorText does not exist', () => {
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(TextField, {label: ''});
      });

      it('renders a Select with options using operatorText when it is a list of operators', () => {
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        const expectedOptions = getOptionsListForOperators(operators);

        expect(wrapper).toContainReactComponent(Select, {
          options: expectedOptions,
        });
      });

      it('renders value using the value prop', () => {
        const value = 'test';
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            value={value}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(TextField, {value});
      });

      it('renders type using the textFieldType prop', () => {
        const textFieldType = 'number';

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{
              ...filter,
              textFieldType,
            }}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(TextField, {
          type: textFieldType,
        });
      });

      it('renders undefined type when the textFieldType prop is not passed', () => {
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(TextField, {
          type: undefined,
        });
      });

      it('calls onChange when the text field was changed', () => {
        const onChange = jest.fn();
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={onChange}
            onFilterKeyChange={noop}
          />,
        );

        wrapper.find(TextField)!.trigger('onChange');
        expect(onChange).toHaveBeenCalled();
      });

      it('calls onFilterKeyChange when operator is changed', () => {
        const onFilterKeyChangeSpy = jest.fn();
        const newOperator = operators[1].key;

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={noop}
            onFilterKeyChange={onFilterKeyChangeSpy}
          />,
        );

        const operatorsSelect = wrapper.findAll(Select)[0];
        operatorsSelect.trigger('onChange', newOperator);

        expect(onFilterKeyChangeSpy).toHaveBeenCalledWith(newOperator);
      });

      it('calls onChange with filter value when operator is changed and filter value is set', () => {
        const onChangeSpy = jest.fn();
        const newFilterValue = 'foo';

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={{...filter, operatorText: operators}}
            onChange={onChangeSpy}
            onFilterKeyChange={noop}
          />,
        );

        const filterValueTextField = wrapper.find(TextField)!;
        filterValueTextField.trigger('onChange', newFilterValue);

        const operatorsSelect = wrapper.findAll(Select)[0];
        operatorsSelect.trigger('onChange', operators[1].key);

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
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(DateSelector);
      });

      it('renders filterValue using the value prop', () => {
        const filterValue = 'test';
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            value={filterValue}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(DateSelector, {
          filterValue,
        });
      });

      it('renders filterKey using the filterKey prop', () => {
        const filterKey = 'test';
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            filterKey={filterKey}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(DateSelector, {
          filterKey,
        });
      });

      it('renders filterMinKey using the min key of filter on filter prop', () => {
        const filterMinKey = 'test';
        const mockFilter = {...filter, minKey: filterMinKey};

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={mockFilter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(DateSelector, {
          filterMinKey,
        });
      });

      it('renders filterMaxKey using the max key of filter on filter prop', () => {
        const filterMaxKey = 'test';
        const mockFilter = {...filter, maxKey: filterMaxKey};

        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={mockFilter}
            onChange={noop}
            onFilterKeyChange={noop}
          />,
        );

        expect(wrapper).toContainReactComponent(DateSelector, {
          filterMaxKey,
        });
      });

      it('calls onChange when the filter key was changed', () => {
        const onChange = jest.fn();
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={onChange}
            onFilterKeyChange={noop}
          />,
        );

        wrapper.find(DateSelector)!.trigger('onFilterValueChange');
        expect(onChange).toHaveBeenCalled();
      });

      it('calls onFilterKeyChange when the filter key was changed', () => {
        const onFilterKeyChange = jest.fn();
        const wrapper = mountWithApp(
          <FilterValueSelector
            filter={filter}
            onChange={noop}
            onFilterKeyChange={onFilterKeyChange}
          />,
        );

        wrapper.find(DateSelector)!.trigger('onFilterKeyChange');
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

function noop() {}
