import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Checkbox, HorizontalStack} from '@shopify/polaris';

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

type CheckboxState = boolean | 'indeterminate';

export function Default() {
  const [checked, setChecked] = useState<CheckboxState>(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export function Indeterminate() {
  const [checked, setChecked] = useState<CheckboxState>('indeterminate');
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export function DisabledStates() {
  const handleChange = () => {
    console.error('This should never be fired');
  };

  return (
    <HorizontalStack gap="2">
      <Checkbox
        label="Disabled unchecked checkbox"
        disabled
        onChange={handleChange}
      />
      <Checkbox
        label="Disabled checked checkbox"
        checked
        disabled
        onChange={handleChange}
      />
      <Checkbox
        label="Disabled indeterminate checkbox"
        checked="indeterminate"
        disabled
        onChange={handleChange}
      />
    </HorizontalStack>
  );
}

export function Error() {
  const [checked, setChecked] = useState<CheckboxState>('indeterminate');
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      helpText="Some help text"
      error="Something went wrong"
      checked={checked}
      onChange={handleChange}
    />
  );
}
