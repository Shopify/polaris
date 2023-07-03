import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Checkbox, HorizontalStack, VerticalStack, Card} from '@shopify/polaris';

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

export function WithBleedAndFill() {
  const [checked1, setChecked1] = useState<CheckboxState>(false);
  const [checked2, setChecked2] = useState<CheckboxState>(false);
  const [checked3, setChecked3] = useState<CheckboxState>(false);
  const [checked4, setChecked4] = useState<CheckboxState>(false);
  const handleChange1 = useCallback(
    (newChecked) => setChecked1(newChecked),
    [],
  );
  const handleChange2 = useCallback(
    (newChecked) => setChecked2(newChecked),
    [],
  );
  const handleChange3 = useCallback(
    (newChecked) => setChecked3(newChecked),
    [],
  );
  const handleChange4 = useCallback(
    (newChecked) => setChecked4(newChecked),
    [],
  );
  return (
    <VerticalStack gap="6">
      <Card padding="4">
        <Checkbox
          label="No bleed"
          checked={checked1}
          onChange={handleChange1}
        />
      </Card>
      <Card padding="4">
        <Checkbox
          label="Bleed increase hit size"
          bleed="4"
          checked={checked2}
          onChange={handleChange2}
        />
      </Card>
      <Card padding="4">
        <div style={{height: '100px'}}>
          <Checkbox
            label="Fill to full width/height + bleed"
            bleed="4"
            fill
            checked={checked3}
            onChange={handleChange3}
          />
        </div>
      </Card>
      <Card padding={{xs: '4', lg: '6'}}>
        <Checkbox
          label="Supports responsive sizes"
          bleed={{xs: '4', lg: '6'}}
          checked={checked4}
          onChange={handleChange4}
        />
      </Card>
    </VerticalStack>
  );
}
