import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Checkbox, Box} from '@shopify/polaris';

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

export function DisabledUnchecked() {
  const [checked, setChecked] = useState<CheckboxState>(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      disabled
      onChange={handleChange}
    />
  );
}

export function DisabledChecked() {
  const [checked, setChecked] = useState<CheckboxState>(true);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      disabled
      onChange={handleChange}
    />
  );
}

export function DisabledIndeterminate() {
  const [checked, setChecked] = useState<CheckboxState>('indeterminate');
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      disabled
      onChange={handleChange}
    />
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

export function ControlledHoverState() {
  const [over, setOver] = useState<boolean>(false);
  const [checked, setChecked] = useState<CheckboxState>(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <div
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onClick={() => setChecked(!checked)}
      style={{
        width: '100%',
        padding: '2rem',
        backgroundColor: 'var(--p-color-bg-info-strong)',
      }}
    >
      <Checkbox
        label="Controlled hover on checkbox"
        checked={checked}
        hovered={over}
        onChange={handleChange}
      />
    </div>
  );
}
