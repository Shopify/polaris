import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {RadioButton, LegacyStack} from '@shopify/polaris';

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
