import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  LegacyCard,
  FormLayout,
  Icon,
  InlineError,
  Link,
  Select,
  Stack,
  TextField,
  Text,
} from '@shopify/polaris';
import {CaretDownMinor, CaretUpMinor} from '@shopify/polaris-icons';

export default {
  component: Select,
} as ComponentMeta<typeof Select>;

export function Default() {
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
}

export function WithInlineLabel() {
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
}

export function Disabled() {
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
}

export function WithPrefix() {
  const [selected, setSelected] = useState('enabled');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={CaretUpMinor} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={CaretDownMinor} />,
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
}

export function WithValidationError() {
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
}

export function WithSeparateValidationError() {
  const [weight, setWeight] = useState('12');
  const [unit, setUnit] = useState('');

  const handleWeightChange = useCallback((value) => setWeight(value), []);
  const handleUnitChange = useCallback((value) => setUnit(value), []);

  const unitSelectID = 'unit';
  const errorMessage = generateErrorMessage();
  const formGroupMarkup = (
    <Stack vertical spacing="extraTight">
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
    </Stack>
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
      <span>
        <Text variant="bodyMd" color="critical" as="span">
          <p>
            {`${weightError}${unitError} is required when weight based shipping rates are enabled. `}
            <Link>Manage shipping</Link>
          </p>
        </Text>
      </span>
    );
  }
}
