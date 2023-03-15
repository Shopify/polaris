import React, {useState} from 'react';

import {AlphaCard, Page, TextField} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <AlphaCard>
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
        <NumberInput />
      </AlphaCard>
    </Page>
  );
}

function NumberInput() {
  const [value, setValue] = useState('');

  function handleOnChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <TextField
      label="Number input"
      value={value}
      type="number"
      autoComplete="off"
      onChange={handleOnChange}
    />
  );
}
