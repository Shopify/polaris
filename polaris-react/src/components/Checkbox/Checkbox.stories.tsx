import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Checkbox, InlineStack, BlockStack, Card} from '@shopify/polaris';

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
    <InlineStack gap="200">
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
    </InlineStack>
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

export function Magic() {
  const [checked, setChecked] = useState<CheckboxState>();
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <Checkbox
      label="Magic checkbox"
      checked={checked}
      onChange={handleChange}
      tone="magic"
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
    <BlockStack gap="600">
      <Card padding="400">
        <Checkbox
          label="No bleed"
          checked={checked1}
          onChange={handleChange1}
        />
      </Card>
      <Card padding="400">
        <Checkbox
          label="Bleed increase hit size"
          bleed="400"
          checked={checked2}
          onChange={handleChange2}
        />
      </Card>
      <Card padding="400">
        <div style={{height: '100px'}}>
          <Checkbox
            label="Fill to full width/height + bleed"
            bleed="400"
            fill
            checked={checked3}
            onChange={handleChange3}
          />
        </div>
      </Card>
      <Card padding={{xs: '400', lg: '600'}}>
        <Checkbox
          label="Supports responsive sizes"
          bleed={{xs: '400', lg: '600'}}
          checked={checked4}
          onChange={handleChange4}
        />
      </Card>
    </BlockStack>
  );
}
