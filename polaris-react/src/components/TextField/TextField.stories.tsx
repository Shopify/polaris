import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  LegacyCard,
  ChoiceList,
  FormLayout,
  InlineError,
  Select,
  LegacyStack,
  Tag,
  TextField,
} from '@shopify/polaris';
import {DeleteMinor} from '@shopify/polaris-icons';

export default {
  component: TextField,
} as ComponentMeta<typeof TextField>;

export function Default() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}

export function Number() {
  const [value, setValue] = useState('1.0');
  const [value1, setValue1] = useState('1.0');

  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const handleChange1 = useCallback((newValue) => setValue1(newValue), []);

  return (
    <LegacyStack vertical>
      <TextField
        label="First Quantity"
        type="number"
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      <TextField
        label="Second Quantity"
        type="number"
        value={value1}
        onChange={handleChange1}
        autoComplete="off"
      />
    </LegacyStack>
  );
}

export function Integer() {
  const [value, setValue] = useState('1');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Integer"
      type="integer"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}

export function Email() {
  const [value, setValue] = useState('bernadette.lapresse@jadedpixel.com');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Email"
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
    />
  );
}

export function Multiline() {
  const [value, setValue] = useState('1776 Barnes Street\nOrlando, FL 32801');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Shipping address"
      value={value}
      onChange={handleChange}
      multiline={4}
      autoComplete="off"
    />
  );
}

export function WithHiddenLabel() {
  const [value, setValue] = useState('12');
  const [selected, setSelected] = useState('yes');

  const handleTextChange = useCallback((newValue) => setValue(newValue), []);

  const handleChoiceChange = useCallback(
    (selections) => setSelected(selections[0]),
    [],
  );

  return (
    <FormLayout>
      <ChoiceList
        title="Gift card auto-expiration"
        choices={[
          {label: 'Gift cards never expire', value: 'no'},
          {label: 'Gift cards expire', value: 'yes'},
        ]}
        selected={[selected]}
        onChange={handleChoiceChange}
      />
      <TextField
        label="Gift cards expire after"
        type="number"
        labelHidden
        value={value}
        disabled={selected === 'no'}
        onChange={handleTextChange}
        autoComplete="off"
        connectedRight={
          <Select
            label="Unit of time"
            labelHidden
            options={['months after purchase']}
          />
        }
      />
    </FormLayout>
  );
}

export function WithLabelAction() {
  const [textFieldValue, setTextFieldValue] = useState('6201.11.0000');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Tariff code"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      labelAction={{content: 'Look up codes'}}
      autoComplete="off"
    />
  );
}

export function WithRightAlignedText() {
  const [textFieldValue, setTextFieldValue] = useState('1');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <LegacyStack>
      <LegacyStack.Item fill>Price</LegacyStack.Item>
      <TextField
        label="Price"
        labelHidden
        value={textFieldValue}
        onChange={handleTextFieldChange}
        autoComplete="off"
        align="right"
      />
    </LegacyStack>
  );
}

export function WithPlaceholderText() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Shipping zone name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Example: North America, Europe"
      autoComplete="off"
    />
  );
}

export function WithHelpText() {
  const [textFieldValue, setTextFieldValue] = useState(
    'bernadette.lapresse@jadedpixel.com',
  );

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Account email"
      type="email"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      helpText="We’ll use this address if we need to contact you about your account."
      autoComplete="email"
    />
  );
}

export function WithPrefixOrSuffix() {
  const [textFieldValue, setTextFieldValue] = useState('2.00');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Price"
      type="number"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      prefix="$"
      autoComplete="off"
    />
  );
}

export function WithVerticalContent() {
  const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const verticalContentMarkup =
    tags.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </LegacyStack>
    ) : null;

  return (
    <TextField
      label="Tags"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Search tags"
      autoComplete="off"
      verticalContent={verticalContentMarkup}
    />
  );
}

export function WithConnectedFields() {
  const [textFieldValue, setTextFieldValue] = useState('10.6');
  const [selectValue, setSelectValue] = useState('kg');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const handleSelectChange = useCallback((value) => setSelectValue(value), []);

  return (
    <TextField
      label="Weight"
      type="number"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      autoComplete="off"
      connectedLeft={
        <Select
          value={selectValue}
          label="Weight unit"
          onChange={handleSelectChange}
          labelHidden
          options={['kg', 'lb']}
        />
      }
      connectedRight={<Button>Submit</Button>}
    />
  );
}

export function WithValidationError() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      error="Store name is required"
      autoComplete="off"
    />
  );
}

export function WithSeparateValidationError() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectTypeValue, setSelectTypeValue] = useState('Product type');
  const [selectConditionValue, setSelectConditionValue] =
    useState('is equal to');

  const handleTextFieldValueChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const handleSelectTypeChange = useCallback(
    (value) => setSelectTypeValue(value),
    [],
  );

  const handleSelectConditionChange = useCallback(
    (value) => setSelectConditionValue(value),
    [],
  );

  const textFieldID = 'ruleContent';
  const isInvalid = isValueInvalid(textFieldValue);
  const errorMessage = isInvalid
    ? 'Enter 3 or more characters for product type is equal to'
    : '';

  const formGroupMarkup = (
    <LegacyStack wrap={false} alignment="leading" spacing="loose">
      <LegacyStack.Item fill>
        <FormLayout>
          <FormLayout.Group condensed>
            <Select
              labelHidden
              label="Collection rule type"
              options={['Product type']}
              value={selectTypeValue}
              onChange={handleSelectTypeChange}
            />
            <Select
              labelHidden
              label="Collection rule condition"
              options={['is equal to']}
              value={selectConditionValue}
              onChange={handleSelectConditionChange}
            />
            <TextField
              labelHidden
              label="Collection rule content"
              error={isInvalid}
              id={textFieldID}
              value={textFieldValue}
              onChange={handleTextFieldValueChange}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>
        <div style={{marginTop: '4px'}}>
          <InlineError message={errorMessage} fieldID={textFieldID} />
        </div>
      </LegacyStack.Item>
      <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
    </LegacyStack>
  );

  return (
    <LegacyCard sectioned>
      <FormLayout>{formGroupMarkup}</FormLayout>
    </LegacyCard>
  );

  function isValueInvalid(content) {
    if (!content) {
      return true;
    }

    return content.length < 3;
  }
}

export function Disabled() {
  return <TextField label="Store name" disabled autoComplete="off" />;
}

export function WithCharacterCount() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      maxLength={20}
      autoComplete="off"
      showCharacterCount
    />
  );
}

export function WithClearButton() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const handleClearButtonClick = useCallback(() => setTextFieldValue(''), []);

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      clearButton
      onClearButtonClick={handleClearButtonClick}
      autoComplete="off"
    />
  );
}

export function WithMonospacedFont() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      monospaced
    />
  );
}

export function WithValueSelectedOnFocus() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      selectTextOnFocus
    />
  );
}

export function WithInlineSuggestion() {
  const suggestions = useMemo(
    () => [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Minor Outlying Islands',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'U.S. Virgin Islands',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ],
    [],
  );

  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSuggestion = useCallback(
    (nextValue) => {
      const nextSuggestion = suggestions.find((suggestion) =>
        suggestion.toLowerCase().startsWith(nextValue.toLowerCase()),
      );

      if (nextSuggestion) setSuggestion(nextSuggestion);
    },
    [suggestions],
  );

  useEffect(() => {
    if (value !== suggestion) handleSuggestion(value);
  }, [handleSuggestion, suggestion, value]);

  const handleChange = useCallback((value) => {
    setValue(value);
    setSuggestion('');
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleChange(suggestion);
      }
    },
    [suggestion, handleChange],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <TextField
        type="text"
        label="State"
        value={value}
        onChange={handleChange}
        suggestion={suggestion}
      />
    </div>
  );
}
