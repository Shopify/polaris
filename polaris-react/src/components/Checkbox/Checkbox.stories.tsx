import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Checkbox} from '@shopify/polaris';

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export function Default() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}
