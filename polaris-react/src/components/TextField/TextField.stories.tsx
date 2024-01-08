import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  LegacyCard,
  ChoiceList,
  Form,
  FormLayout,
  InlineError,
  Select,
  LegacyStack,
  Tag,
  Text,
  TextField,
  Icon,
  Tooltip,
  BlockStack,
  Link,
} from '@shopify/polaris';
import {
  DeleteIcon,
  QuestionCircleIcon,
  SearchIcon,
} from '@shopify/polaris-icons';

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

export function Magic() {
  const [value, setValue] = useState('Jaded Pixel');
  const [value1, setValue1] = useState('Jaded Pixel');
  const [value2, setValue2] = useState('Jaded Pixel');

  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const handleChange1 = useCallback((newValue) => setValue1(newValue), []);
  const handleChange2 = useCallback((newValue) => setValue2(newValue), []);

  return (
    <LegacyStack vertical>
      <TextField
        label="Store name"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        tone="magic"
      />
      <TextField
        label="Prefix icon"
        type="search"
        value={value1}
        onChange={handleChange1}
        prefix={<Icon source={SearchIcon} />}
        autoComplete="off"
        tone="magic"
      />
      <TextField
        label="Suffix icon"
        value={value2}
        onChange={handleChange2}
        suffix={
          <Tooltip content="Hello world">
            <Icon source={QuestionCircleIcon} />
          </Tooltip>
        }
        tone="magic"
        autoComplete="off"
      />
    </LegacyStack>
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
    <LegacyStack vertical>
      <TextField
        label="Price"
        type="number"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        prefix="$"
        autoComplete="off"
      />
      <TextField
        label="Price"
        type="number"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        prefix="$"
        autoComplete="off"
        tone="magic"
      />
    </LegacyStack>
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
      <Button icon={DeleteIcon} accessibilityLabel="Remove item" />
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
      'Icon Outlying Islands',
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
  const [suggestion, setSuggestion] = useState<string | undefined>();

  const handleChange = useCallback(
    (value: string) => {
      const suggestion =
        value &&
        suggestions.find((suggestion) =>
          suggestion.toLowerCase().startsWith(value.toLowerCase()),
        );

      setValue(value);
      setSuggestion(suggestion);
    },
    [suggestions],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Tab') {
        setValue(suggestion || value);
        setSuggestion('');
      } else if (event.key === 'Backspace') {
        setValue(value);
        setSuggestion('');
      }
    },
    [value, suggestion],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <TextField
        type="text"
        label="State"
        value={value}
        onChange={handleChange}
        suggestion={suggestion}
        autoComplete="off"
      />
    </div>
  );
}

export function All() {
  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          label="Default"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Disabled"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
          helpText="Help text"
          disabled
        />
        <TextField
          label="Read only"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
          readOnly
        />
        <TextField
          label="Error"
          value="Value"
          onChange={() => {}}
          error="Error message."
          autoComplete="off"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Number"
          type="number"
          value="5"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="With label action"
          value="Value"
          onChange={() => {}}
          labelAction={{content: 'Action'}}
          autoComplete="off"
        />
        <TextField
          label="Placeholder"
          value=""
          onChange={() => {}}
          placeholder="Example"
          autoComplete="off"
        />
        <TextField
          label="Help text"
          type="email"
          value="Value"
          onChange={() => {}}
          helpText="Help text."
          autoComplete="email"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Prefix"
          type="number"
          value="4"
          onChange={() => {}}
          prefix="$"
          autoComplete="off"
        />
        <TextField
          label="Prefix with magic"
          type="number"
          value="4"
          onChange={() => {}}
          prefix="$"
          autoComplete="off"
          tone="magic"
        />
        <TextField
          label="Prefix icon"
          type="search"
          value="Value"
          onChange={() => {}}
          prefix={<Icon source={SearchIcon} />}
          autoComplete="off"
        />
        <TextField
          label="Prefix icon with magic"
          type="search"
          value="Value"
          onChange={() => {}}
          prefix={<Icon source={SearchIcon} />}
          autoComplete="off"
          tone="magic"
        />
        <TextField
          label="Suffix tooltip"
          value="Value"
          onChange={() => {}}
          suffix={
            <Tooltip content="Hello world">
              <Icon source={QuestionCircleIcon} />
            </Tooltip>
          }
          autoComplete="off"
        />
        <TextField
          label="Suffix tooltip with magic"
          value="Value"
          onChange={() => {}}
          suffix={
            <Tooltip content="Hello world">
              <Icon source={QuestionCircleIcon} />
            </Tooltip>
          }
          tone="magic"
          autoComplete="off"
        />
        <TextField
          label="Character count"
          value="Value"
          onChange={() => {}}
          maxLength={20}
          autoComplete="off"
          showCharacterCount
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Clear button"
          value="Value"
          onChange={() => {}}
          clearButton
          onClearButtonClick={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Required"
          value="Value"
          onChange={() => {}}
          requiredIndicator
          autoComplete="off"
        />
        <TextField
          label="Monospaced"
          value="Value"
          onChange={() => {}}
          monospaced
          autoComplete="off"
        />
        <TextField
          label="Borderless"
          value="Value"
          onChange={() => {}}
          variant="borderless"
          autoComplete="off"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Shipping address"
          value="Value"
          onChange={() => {}}
          multiline={4}
          autoComplete="off"
        />
        <TextField
          label="Multiline error"
          value="Value"
          onChange={() => {}}
          error="Error message."
          multiline={4}
          autoComplete="off"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Label hidden"
          value=""
          labelHidden
          onChange={() => {}}
          placeholder="Label hidden"
          autoComplete="off"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Connected"
          type="number"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
          connectedLeft={<Button>Left</Button>}
          connectedRight={<Button>Right</Button>}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Search native"
          type="search"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Date native"
          type="date"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Date time native"
          type="datetime-local"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Month native"
          type="month"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Time native"
          type="time"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Week native"
          type="week"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Slim variant"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
          size="slim"
        />
        <TextField
          label="Borderless slim variant"
          value="Value"
          onChange={() => {}}
          autoComplete="off"
          variant="borderless"
          size="slim"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}

export function WithFormSubmit() {
  const [adjustment, setAdjustment] = useState('0');
  const [onHandTotal, setOnHandTotal] = useState(0);

  return (
    <BlockStack gap="200">
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setAdjustment('0');
          setOnHandTotal(onHandTotal + parseInt(adjustment, 10));
        }}
      >
        <FormLayout>
          <Text as="h2" variant="headingSm">
            On hand quantity ({onHandTotal.toString()})
          </Text>
          <TextField
            label="Adjustment"
            value={adjustment}
            onChange={(value) => setAdjustment(value)}
            autoComplete="off"
            type="number"
            selectTextOnFocus
          />
          <Button
            variant="primary"
            submit
            disabled={isNaN(parseInt(adjustment, 10))}
          >
            Save
          </Button>
        </FormLayout>
      </Form>
    </BlockStack>
  );
}

export function With1PasswordDisabled() {
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

export function WithAutoSize() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoSize
      suffix="in: Your stores"
    />
  );
}

export function WithAutoSizeAndDynamicSuffix() {
  const [value, setValue] = useState('');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const suffix = value ? 'in: Unfulfilled orders' : null;

  return (
    <TextField
      label="Search view"
      value={value}
      onChange={handleChange}
      autoSize
      placeholder="Searching in Unfulfilled orders"
      suffix={suffix}
    />
  );
}

export function WithAutoSizeAndOtherElements() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const handleTextFieldChange = useCallback((value) => setValue(value), []);

  const handleClearButtonClick = useCallback(() => setValue(''), []);

  return (
    <TextField
      label="Search view"
      value={value}
      onChange={handleChange}
      clearButton
      onClearButtonClick={handleClearButtonClick}
      autoSize
      suffix="in: Unfulfilled orders"
      showCharacterCount
      maxLength={128}
    />
  );
}
