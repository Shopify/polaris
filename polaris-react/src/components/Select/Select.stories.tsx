import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  LegacyCard,
  FormLayout,
  Icon,
  InlineError,
  Link,
  Select,
  LegacyStack,
  TextField,
  Text,
} from '@shopify/polaris';
import {CaretDownIcon, CaretUpIcon} from '@shopify/polaris-icons';

export default {
  component: Select,
} as Meta<typeof Select>;

export const Default = {
  render() {
    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
      {label: 'Today', value: 'today'},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last 7 days', value: 'lastWeek'},
    ];

    return (
      <Select
        label="Date range"
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    );
  },
};

export const WithInlineLabel = {
  render() {
    const [selected, setSelected] = useState('newestUpdate');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
      {label: 'Newest update', value: 'newestUpdate'},
      {label: 'Oldest update', value: 'oldestUpdate'},
      {label: 'Most spent', value: 'mostSpent'},
      {label: 'Most orders', value: 'mostOrders'},
      {label: 'Last name A–Z', value: 'lastNameAlpha'},
      {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
    ];

    return (
      <Select
        label="Sort by"
        labelInline
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    );
  },
};

export const Disabled = {
  render() {
    return (
      <Select
        label="Date range"
        disabled
        options={[
          {label: 'Today', value: 'today'},
          {label: 'Yesterday', value: 'yesterday'},
          {label: 'Last 7 days', value: 'lastWeek'},
        ]}
      />
    );
  },
};

export const Magic = {
  render() {
    return (
      <Select
        label="Date range"
        tone="magic"
        options={[
          {label: 'Today', value: 'today'},
          {label: 'Yesterday', value: 'yesterday'},
          {label: 'Last 7 days', value: 'lastWeek'},
        ]}
      />
    );
  },
};

export const WithInlineLabelMagic = {
  render() {
    const [selected, setSelected] = useState('newestUpdate');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
      {label: 'Newest update', value: 'newestUpdate'},
      {label: 'Oldest update', value: 'oldestUpdate'},
      {label: 'Most spent', value: 'mostSpent'},
      {label: 'Most orders', value: 'mostOrders'},
      {label: 'Last name A–Z', value: 'lastNameAlpha'},
      {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
    ];

    return (
      <Select
        label="Sort by"
        tone="magic"
        labelInline
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    );
  },
};

export const WithPrefix = {
  render() {
    const [selected, setSelected] = useState('enabled');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
      {
        label: 'Increase',
        value: 'Increase',
        prefix: <Icon source={CaretUpIcon} />,
      },
      {
        label: 'Decrease',
        value: 'Decrease',
        prefix: <Icon source={CaretDownIcon} />,
      },
    ];

    return (
      <Select
        label="Permission"
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    );
  },
};

export const WithValidationError = {
  render() {
    const [selected, setSelected] = useState('');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    return (
      <Select
        label="Province"
        options={['Alberta']}
        value={selected}
        onChange={handleSelectChange}
        error="Province is required"
      />
    );
  },
};

export const WithSeparateValidationError = {
  render() {
    const [weight, setWeight] = useState('12');
    const [unit, setUnit] = useState('');

    const handleWeightChange = useCallback((value) => setWeight(value), []);
    const handleUnitChange = useCallback((value) => setUnit(value), []);

    const unitSelectID = 'unit';
    const errorMessage = generateErrorMessage();
    const formGroupMarkup = (
      <LegacyStack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              label="Product weight"
              type="number"
              value={weight}
              onChange={handleWeightChange}
              error={Boolean(!weight && unit)}
              autoComplete="off"
            />
            <Select
              id={unitSelectID}
              label="Unit of measure"
              placeholder="Select"
              options={['oz', 'g', 'kg', 'lb']}
              value={unit}
              onChange={handleUnitChange}
              error={Boolean(!unit && weight)}
            />
          </FormLayout.Group>
        </FormLayout>
        <InlineError message={errorMessage} fieldID={unitSelectID} />
      </LegacyStack>
    );

    return <LegacyCard sectioned>{formGroupMarkup}</LegacyCard>;

    function generateErrorMessage() {
      const weightError =
        !weight && unit ? 'The numeric weight of the product ' : '';
      const unitError =
        !unit && weight ? 'The unit of measure for the product weight' : '';

      if (!weightError && !unitError) {
        return '';
      }

      return (
        <Text as="p" tone="critical" variant="bodyMd">
          {`${weightError}${unitError} is required when weight based shipping rates are enabled. `}
          <Link>Manage shipping</Link>
        </Text>
      );
    }
  },
};

export const All = {
  render() {
    return (
      <FormLayout>
        <FormLayout.Group>
          <Select
            label="Default"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            onChange={() => {}}
          />
          <Select
            label="Disabled"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            onChange={() => {}}
            disabled
            helpText="Help text"
          />
          <Select
            label="Error"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            onChange={() => {}}
            error="Province is required"
          />
          <Select
            label="Magic"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            tone="magic"
            onChange={() => {}}
          />
          <Select
            label="Required"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            onChange={() => {}}
            requiredIndicator
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <Select
            label="Placeholder"
            options={['Ontario', 'Newfoundland and Labrador']}
            value=""
            placeholder="Placeholder"
            onChange={() => {}}
          />
          <Select
            label="Label action"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            labelAction={{content: 'Action'}}
            onChange={() => {}}
          />
          <Select
            label="Help text"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            helpText="Help text"
            onChange={() => {}}
          />
          <Select
            label="Long text"
            options={[
              'Ontario',
              'Newfoundland and Labrador and Newfoundland and Labrador and Newfoundland and Labrador',
            ]}
            value="Newfoundland and Labrador and Newfoundland and Labrador and Newfoundland and Labrador"
            onChange={() => {}}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <Select
            label="Label inline"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            onChange={() => {}}
            labelInline
          />
          <Select
            label="Label inline magic"
            tone="magic"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Ontario"
            onChange={() => {}}
            labelInline
          />
          <Select
            label="Label hidden"
            options={['Ontario', 'Newfoundland and Labrador']}
            value="Label hidden"
            onChange={() => {}}
            labelHidden
          />
        </FormLayout.Group>
      </FormLayout>
    );
  },
};
