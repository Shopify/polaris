---
name: Autocomplete
description:

Use Textfield as a prop and provide a composable list box.

```jsx
import React, {useCallback, useState} from 'react';
import {Page, AutocompleteV2, TextField} from '../src';

export function Playground() {
  const deselectedOptions = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];

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

  const updateText = useCallback(
    (value) => {
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
    },
    [deselectedOptions],
  );

  return (
    <Page title="Playground">
      <AutocompleteV2
        textfield={
          <TextField
            onChange={updateText}
            label="Tags"
            value={inputValue}
            autoComplete={false}
          />
        }
      >
        <AutocompleteV2.ListBox onSelect={handleSelection}>
          {options.map((option) => {
            return (
              <AutocompleteV2.Option
                key={option.value}
                value={option.value}
                selected={selected === option.value}
              >
                {option.label}
              </AutocompleteV2.Option>
            );
          })}
        </AutocompleteV2.ListBox>
      </AutocompleteV2>
    </Page>
  );
}
```
