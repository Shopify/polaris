import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  RadioButton,
  LegacyStack,
  Card,
  BlockStack,
  Text,
  Box,
  Divider,
} from '@shopify/polaris';

export default {
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

export function Default() {
  const [value, setValue] = useState('disabled');

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    [],
  );

  return (
    <LegacyStack vertical>
      <RadioButton
        label="Accounts are disabled"
        helpText="Customers will only be able to check out as guests."
        checked={value === 'disabled'}
        id="disabled"
        name="accounts"
        onChange={handleChange}
      />
      <RadioButton
        label="Accounts are optional"
        helpText="Customers will be able to check out with a customer account or as a guest."
        id="optional"
        name="accounts"
        checked={value === 'optional'}
        onChange={handleChange}
      />
    </LegacyStack>
  );
}

export function DisabledRadio() {
  const handleChange = useCallback((_checked, newValue) => {
    // eslint-disable-next-line no-alert
    alert('This should never ever get called');
  }, []);
  return (
    <LegacyStack vertical>
      <RadioButton
        label="Accounts are required"
        id="required"
        name="accounts"
        checked
        onChange={handleChange}
        disabled
      />
      <RadioButton
        label="Accounts are optional"
        id="optional"
        name="accounts"
        onChange={handleChange}
        disabled
      />
    </LegacyStack>
  );
}

export function Magic() {
  const [value, setValue] = useState('disabled');

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    [],
  );

  return (
    <LegacyStack vertical>
      <RadioButton
        label="Accounts are disabled"
        helpText="Customers will only be able to check out as guests."
        checked={value === 'disabled'}
        id="disabled"
        name="accounts"
        onChange={handleChange}
        tone="magic"
      />
      <RadioButton
        label="Accounts are optional"
        helpText="Customers will be able to check out with a customer account or as a guest."
        id="optional"
        name="accounts"
        checked={value === 'optional'}
        onChange={handleChange}
        tone="magic"
      />
    </LegacyStack>
  );
}

export function WithBleed() {
  const [value1, setValue1] = useState('disabled');
  const [value2, setValue2] = useState('disabled2');
  const handleChange1 = useCallback(
    (_checked, newValue) => setValue1(newValue),
    [],
  );
  const handleChange2 = useCallback(
    (_checked, newValue) => setValue2(newValue),
    [],
  );

  return (
    <BlockStack gap="800">
      <BlockStack gap="200">
        <Text as="h2">No Bleed</Text>
        <Card padding="400">
          <BlockStack gap="400">
            <RadioButton
              label="Accounts are disabled"
              checked={value1 === 'disabled'}
              id="disabled"
              name="accounts"
              onChange={handleChange1}
            />
            <RadioButton
              label="Accounts are optional"
              id="optional"
              name="accounts"
              checked={value1 === 'optional'}
              onChange={handleChange1}
            />
          </BlockStack>
        </Card>
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2">Bleed</Text>
        <Box width="min-content" background="bg-surface" borderRadius="300">
          <div
            // Flex to shrink the container to the height of the radio (ie;
            // ignore line-height)
            style={{padding: 'var(--p-space-800)', display: 'flex'}}
          >
            <RadioButton
              label="Accounts are disabled"
              labelHidden
              checked={value2 === 'disabled2'}
              id="disabled2"
              name="accounts2"
              onChange={handleChange2}
              bleed="800"
            />
          </div>
          <Divider />
          <div style={{padding: 'var(--p-space-800)', display: 'flex'}}>
            <RadioButton
              label="Accounts are optional"
              labelHidden
              checked={value2 === 'optional2'}
              id="optional2"
              name="accounts2"
              onChange={handleChange2}
              bleed="800"
            />
          </div>
        </Box>
      </BlockStack>
    </BlockStack>
  );
}
