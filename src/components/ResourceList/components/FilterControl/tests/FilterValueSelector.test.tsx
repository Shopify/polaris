import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  trigger,
  shallowWithAppProvider,
} from '../../../../../../tests/utilities';

import FilterValueSelector from '../FilterValueSelector';
import {Filter, FilterType} from '../types';
import {Select, TextField} from '../../../../';

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
          <FilterValueSelector filter={filter} onChange={noop} />,
        );

        const select = wrapper.find(Select);
        expect(select.exists()).toEqual(true);
      });

      it('renders label using the operatorText', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector filter={filter} onChange={noop} />,
        );

        const select = wrapper.find(Select);
        expect(select.prop('label')).toBe(filter.operatorText);
      });

      it('renders value using the value prop', () => {
        const value = 'test';
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector filter={filter} value={value} onChange={noop} />,
        );

        const select = wrapper.find(Select);
        expect(select.prop('value')).toBe(value);
      });

      it('calls onChange when the Select was changed', () => {
        const onChange = jest.fn();
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector filter={filter} onChange={onChange} />,
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
          <FilterValueSelector filter={filter} onChange={noop} />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.exists()).toEqual(true);
      });

      it('renders label as empty string if operatorText does not exist', () => {
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector filter={filter} onChange={noop} />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.prop('label')).toBe('');
      });

      it('renders value using the value prop', () => {
        const value = 'test';
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector filter={filter} value={value} onChange={noop} />,
        );

        const textField = wrapper.find(TextField);
        expect(textField.prop('value')).toBe(value);
      });

      it('calls onChange when the text field was changed', () => {
        const onChange = jest.fn();
        const wrapper = shallowWithAppProvider(
          <FilterValueSelector filter={filter} onChange={onChange} />,
        );

        trigger(wrapper.find(TextField), 'onChange');
        expect(onChange).toHaveBeenCalled();
      });
    });
  });
});
