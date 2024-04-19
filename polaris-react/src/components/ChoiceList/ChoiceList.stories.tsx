import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {ChoiceList, TextField} from '@shopify/polaris';

export default {
  component: ChoiceList,
} as Meta<typeof ChoiceList>;

export const Default = {
  render() {
    const [selected, setSelected] = useState(['hidden']);

    const handleChange = useCallback((value) => setSelected(value), []);

    return (
      <ChoiceList
        title="Company name"
        choices={[
          {label: 'Hidden', value: 'hidden'},
          {label: 'Optional', value: 'optional'},
          {label: 'Required', value: 'required'},
        ]}
        selected={selected}
        onChange={handleChange}
      />
    );
  },
};

export const WithError = {
  render() {
    const [selected, setSelected] = useState(['hidden']);

    const handleChange = useCallback((value) => setSelected(value), []);

    return (
      <ChoiceList
        title="Company name"
        choices={[
          {label: 'Hidden', value: 'hidden', describedByError: true},
          {label: 'Optional', value: 'optional'},
          {label: 'Required', value: 'required'},
        ]}
        selected={selected}
        onChange={handleChange}
        error="Company name cannot be hidden at this time"
      />
    );
  },
};

export const Magic = {
  render() {
    const [selected, setSelected] = useState(['hidden']);

    const handleChange = useCallback((value) => setSelected(value), []);

    return (
      <ChoiceList
        title="Company name"
        choices={[
          {label: 'Hidden', value: 'hidden'},
          {label: 'Optional', value: 'optional'},
          {label: 'Required', value: 'required'},
        ]}
        selected={selected}
        onChange={handleChange}
        tone="magic"
      />
    );
  },
};

export const WithMultiChoice = {
  render() {
    const [selected, setSelected] = useState(['hidden']);

    const handleChange = useCallback((value) => setSelected(value), []);

    return (
      <ChoiceList
        allowMultiple
        title="While the customer is checking out"
        choices={[
          {
            label: 'Use the shipping address as the billing address by default',
            value: 'shipping',
            helpText:
              'Reduces the number of fields required to check out. The billing address can still be edited.',
          },
          {
            label: 'Require a confirmation step',
            value: 'confirmation',
            helpText:
              'Customers must review their order details before purchasing.',
          },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    );
  },
};

export const MagicWithMultiChoice = {
  render() {
    const [selected, setSelected] = useState(['hidden']);

    const handleChange = useCallback((value) => setSelected(value), []);

    return (
      <ChoiceList
        allowMultiple
        title="While the customer is checking out"
        choices={[
          {
            label: 'Use the shipping address as the billing address by default',
            value: 'shipping',
            helpText:
              'Reduces the number of fields required to check out. The billing address can still be edited.',
          },
          {
            label: 'Require a confirmation step',
            value: 'confirmation',
            helpText:
              'Customers must review their order details before purchasing.',
          },
        ]}
        selected={selected}
        onChange={handleChange}
        tone="magic"
      />
    );
  },
};

export const WithChildrenContent = {
  render() {
    const [selected, setSelected] = useState(['none']);
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChoiceListChange = useCallback(
      (value) => setSelected(value),
      [],
    );

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    const renderChildren = useCallback(
      () => (
        <TextField
          label="Minimum Purchase"
          labelHidden
          onChange={handleTextFieldChange}
          value={textFieldValue}
          autoComplete="off"
        />
      ),
      [handleTextFieldChange, textFieldValue],
    );

    return (
      <ChoiceList
        title="Discount minimum requirements"
        choices={[
          {label: 'None', value: 'none'},
          {
            label: 'Minimum purchase',
            value: 'minimum_purchase',
            renderChildren,
          },
          {
            label: 'Minimum quantity',
            value: 'minimum_quantity',
          },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
    );
  },
};

export const WithDynamicChildrenContent = {
  render() {
    const [selected, setSelected] = useState(['none']);
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChoiceListChange = useCallback(
      (value) => setSelected(value),
      [],
    );

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    const renderChildren = useCallback(
      (isSelected) =>
        isSelected && (
          <TextField
            label="Minimum Quantity"
            labelHidden
            onChange={handleTextFieldChange}
            value={textFieldValue}
            autoComplete="off"
          />
        ),
      [handleTextFieldChange, textFieldValue],
    );

    return (
      <div style={{height: '150px'}}>
        <ChoiceList
          title="Discount minimum requirements"
          choices={[
            {label: 'None', value: 'none'},
            {
              label: 'Minimum purchase',
              value: 'minimum_purchase',
              renderChildren,
            },
            {
              label: 'Minimum quantity',
              value: 'minimum_quantity',
              renderChildren,
            },
          ]}
          selected={selected}
          onChange={handleChoiceListChange}
        />
      </div>
    );
  },
};
