---
name: ComboBox
description:

Use Textfield as a prop and provide a composable list box.

```jsx
import React, {useCallback, useState} from 'react';
import {Page, ComboBox, TextField} from '../src';
import deselectedOptions from './test/100.json';

export function Playground() {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const handleSelection = (value: string) => {
    const {label} = deselectedOptions.filter(
      (option) => option.value === value,
    )[0];
    setInputValue(label);
    setSelected(value);
  };

  const updateText = useCallback((value) => {
    setInputValue(value);

    if (value === '') {
      setOptions(deselectedOptions);
      return;
    }

    const filterRegex = new RegExp(value, 'i');
    const resultOptions = deselectedOptions.filter((option) =>
      option.label.match(filterRegex),
    );
    setOptions(resultOptions);
  }, []);

  const optionsMarkup =
    options.length > 0
      ? options.map((option, index) => {
          const {label, value} = option;
          return (
            <ComboBox.Option
              key={`${value}_${index}`}
              value={value}
              selected={selected === value}
            >
              {label}
            </ComboBox.Option>
          );
        })
      : null;

  return (
    <Page title="Playground">
      <ComboBox
        onOptionSelected={handleSelection}
        allowMultiple
        activator={
          <TextField
            onChange={updateText}
            label="Tags"
            value={inputValue}
            autoComplete={false}
          />
        }
      >
        {optionsMarkup}
      </ComboBox>
    </Page>
  );
}
```
