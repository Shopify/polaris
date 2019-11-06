---
name: ComboBox
description:

Use Textfield as a prop and provide a composable list box.

```jsx
import React, {useCallback, useState} from 'react';
import {Page, ComboBox, TextField, Modal} from '../src';
import deselectedOptions from './test/100.json';

export function Playground() {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const handleSelection = useCallback((value: string) => {
    const {label} = deselectedOptions.filter(
      (option) => option.value === value,
    )[0];
    setInputValue(label);
    setSelected(value);
  }, []);

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

  const suggest =
    inputValue !== ''
      ? options.find((option) => {
          const {label, value} = option;
          return (
            value && value.toLowerCase().startsWith(inputValue.toLowerCase(), 0)
          );
        })
      : false;

  const optionsMarkup =
    options.length > 0
      ? options.map((option, index) => {
          const {label, value} = option;

          return (
            <ComboBox.Option
              key={`${value}_${index}`}
              value={value}
              selected={selected === value}
              suggest={suggest && suggest.value === value}
            >
              {label}
            </ComboBox.Option>
          );
        })
      : null;

  return (
    <Page title="Playground">
      {/* <Modal
        title="Reach more shoppers with Instagram product tags"
        open
        onClose={() => null}
      >
        <Modal.Section> */}
      <ComboBox
        onOptionSelected={handleSelection}
        activator={
          <TextField
            onChange={updateText}
            label="Tags"
            value={inputValue}
            autoComplete={false}
          />
        }
      >
        <ComboBox.Section title="My Section Title">
          {optionsMarkup}
        </ComboBox.Section>
      </ComboBox>
      {/* </Modal.Section>
      </Modal> */}
    </Page>
  );
}

```

---
Multi-select using ComboBox

```jsx
import React, {useCallback, useState} from 'react';
import {Page, ComboBox, TextField, Tag, Stack} from '../src';
import deselectedOptions from './test/100.json';

export function Playground() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState(deselectedOptions);

  const handleSelection = (value: string) => {
    const {label} = deselectedOptions.filter(
      (option) => option.value === value,
    )[0];
    setInputValue(label);

    const indexOfSelectedOption = selectedOptions.indexOf(value);
    const optionAlreadySelected = indexOfSelectedOption > -1;

    if (optionAlreadySelected) {
      setSelectedOptions(removeElement(indexOfSelectedOption));
      return;
    }

    setSelectedOptions(selectNewOption(value));
  };

  const removeElement = (elementPosition) => {
    const options = [...selectedOptions];
    options.splice(elementPosition, 1);
    return options;

    // return [
    //   ...selectedOptions.slice(0, elementPosition),
    //   ...selectedOptions.slice(elementPosition + 1),
    // ];
  };

  const selectNewOption = (option) => {
    const options = [...selectedOptions];
    options.push(option);

    return options;
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
              // Highlights all of the selected options
              selected={
                selectedOptions.length > 0 && selectedOptions.includes(value)
              }
            >
              {label}
            </ComboBox.Option>
          );
        })
      : null;

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const tagsMarkup = selectedOptions.map((option) => {
    return (
      <Tag key={`option-${option}`} onRemove={removeTag(option)}>
        {option}
      </Tag>
    );
  });

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
      <br />
      <Stack spacing="tight">{tagsMarkup}</Stack>
    </Page>
  );
}
```
