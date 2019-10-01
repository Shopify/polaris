---
name: Autocomplete
description:

Using Clone element

---

```jsx
import React, {useCallback, useState} from 'react';
import {Page, AutocompleteV3, TextField} from '../src';

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

  const getLabelFromValue = (value) => {
    const {label} = deselectedOptions.filter(
      (option) => option.value === value,
    )[0];

    return label;
  };

  const handleSelection = (value) => {
    const label = getLabelFromValue(value);
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

  const handleOptionClick = (value: string) => {
    const label = getLabelFromValue(value);
    updateText(label);
  };

  return (
    <Page title="Playground">
      <AutocompleteV3>
        <TextField
          onChange={updateText}
          label="Tags"
          value={inputValue}
          autoComplete={false}
        />
        <AutocompleteV3.ListBox onSelect={handleSelection}>
          {options.map((option) => {
            return (
              <AutocompleteV3.Option
                key={option.value}
                value={option.value}
                selected={selected === option.value}
                onClick={handleOptionClick}
              >
                {option.label}
              </AutocompleteV3.Option>
            );
          })}
        </AutocompleteV3.ListBox>
      </AutocompleteV3>
    </Page>
  );
}
```
