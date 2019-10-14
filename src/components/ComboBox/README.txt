---
name: ComboBox
description:

Use Textfield as a prop and provide a composable list box.

```jsx
import React, {useCallback, useState} from 'react';
import {Page, ComboBox, TextField} from '../src';
import deselectedOptions from './test/1000.json';

export function Playground() {
  // const deselectedOptions = [
  //   {value: 'rustic', label: 'Rustic'},
  //   {value: 'antique', label: 'Antique'},
  //   {value: 'vinyl', label: 'Vinyl'},
  //   {value: 'vintage', label: 'Vintage'},
  //   {value: 'refurbished', label: 'Refurbished'},
  // ];

  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const handleSelection = (value) => {
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

  return (
    <Page title="Playground">
      <ComboBox
        textfield={
          <TextField
            onChange={updateText}
            label="Tags"
            value={inputValue}
            ComboBox={false}
          />
        }
      >
        <ComboBox.ListBox onSelect={handleSelection}>
          {options.map((option) => {
            return (
              <ComboBox.Option
                key={option.value}
                value={option.value}
                selected={selected === option.value}
              >
                {option.label}
              </ComboBox.Option>
            );
          })}
        </ComboBox.ListBox>
      </ComboBox>
    </Page>
  );
}
```
