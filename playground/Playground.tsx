import React, {useState, useEffect, useCallback} from 'react';

import {Page, Combobox, Listbox, Stack, Icon, TextStyle} from '../src';
import {CirclePlusMinor} from '@shopify/polaris-icons';

interface Option {
  label: string;
  value: string;
}

const tags = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
];

const formattedTags = tags.map((tag) => ({label: tag, value: tag}));

export function Playground() {
  const [inputValue, setInputValue] = useState<string>('');

  const [options, setOptions] = useState<Option[]>(formattedTags);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    formattedTags.slice(0, 7),
  );
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    formattedTags.slice(0, 7),
  );
  const [selection, setSelection] = useState({start: 0, end: 0});
  const [autofillValue, setAutofillValue] = useState<string>('');

  const label = 'Tags';

  const updateSelection = useCallback(
    (selected) => {
      debugger;
      const selectedValues = selectedOptions.map((opt) => opt.value);
      if (selectedValues.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option.value !== selected),
        );
      } else {
        setSelectedOptions([
          ...selectedOptions,
          {label: selected, value: selected},
        ]);

        setFilteredOptions([
          ...filteredOptions,
          {label: selected, value: selected},
        ]);
      }
    },
    [options, selectedOptions],
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);
      setAutofillValue(value);

      if (value === '') {
        setFilteredOptions(selectedOptions);
        return;
      }

      // fetch with query
      const filterRegex = new RegExp(value, 'i');
      const resultOptions = options.filter((option) =>
        option.label.match(filterRegex),
      );

      setFilteredOptions(resultOptions);

      if (Boolean(resultOptions.length)) {
        const firstMatch = resultOptions[0].value.slice(value.length);
        setInputValue(value);
        setAutofillValue(`${value}${firstMatch}`);
        setSelection({
          start: value.length,
          end: firstMatch.length + 1,
        });
      }
    },
    [options, filteredOptions],
  );

  const handleOptionChange = useCallback(
    (value) => {
      if (!autofillValue) return;

      if (filteredOptions.length === 0) {
        setAutofillValue(inputValue);
        return;
      }

      if (autofillValue !== value) {
        setAutofillValue(value);
        setSelection({
          start: value.length,
          end: value.length,
        });
        return;
      }
    },
    [inputValue, autofillValue],
  );

  const activator = (
    <Combobox.TextField
      disabled={false}
      label="Tags"
      value={autofillValue}
      onChange={updateText}
      labelHidden
      type="text"
      autoComplete="on"
      ariaAutocomplete="list"
      selection={selection}
    />
  );

  const optionMarkup =
    filteredOptions.length > 0 ? (
      filteredOptions.map((option) => {
        const {label, value} = option;
        const selected = selectedOptions
          .map((opt) => opt.value)
          .includes(value);

        return (
          <Listbox.Option
            accessibilityLabel={label}
            key={`${value}`}
            value={value}
            selected={selected}
          >
            {label}
          </Listbox.Option>
        );
      })
    ) : (
      <Listbox.Option
        accessibilityLabel={`Add: ${inputValue}`}
        key={`Add: ${inputValue}`}
        value={`Add: ${inputValue}`}
        selected={false}
      >
        <Stack spacing="tight" wrap={false}>
          <Icon source={CirclePlusMinor} color="interactive" />
          <p>
            <TextStyle variation="strong">Add: </TextStyle>
            {inputValue}
          </p>
        </Stack>
      </Listbox.Option>
    );

  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <Combobox activator={activator} allowMultiple>
        <Listbox
          accessibilityLabel={label}
          onSelect={updateSelection}
          onActiveOptionChange={handleOptionChange}
          enableKeyboardControl
        >
          {optionMarkup}
        </Listbox>
      </Combobox>
    </Page>
  );
}
