import React, {useCallback, useState} from 'react';
import {PlusIcon, SelectIcon, SearchIcon} from '@shopify/polaris-icons';

import {
  Combobox,
  Listbox,
  Text,
  InlineGrid,
  Popover,
  BlockStack,
  Box,
  Icon,
} from '../../../src';

import styles from './ComplexSingleSelect.module.scss';

interface Option {
  value: string;
  label: string;
}
interface ComplexSingleSelectProps {
  resourceTitle: string;
  emptyStateTitle: string;
  searchPlaceholder?: string;
  defaultSelected?: string;
  options?: Option[];
}

export function ComplexSingleSelect({
  resourceTitle,
  emptyStateTitle,
  searchPlaceholder,
  defaultSelected,
  options: defaultOptions = [],
}: ComplexSingleSelectProps) {
  const [active, setActive] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(defaultOptions);
  const [selectedOptions, setSelectedOptions] = useState<string | undefined>(
    defaultSelected,
  );

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setFilteredOptions(defaultOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = defaultOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setFilteredOptions(resultOptions);
    },
    [defaultOptions],
  );

  const updateSelection = useCallback((selected: string) => {
    setSelectedOptions(selected);
    setInputValue('');
    setActive(false);
  }, []);

  const optionsMarkup =
    filteredOptions.length > 0
      ? filteredOptions.map(({label, value = ''}) => (
          <Listbox.Option
            key={`${value}`}
            value={value}
            selected={selectedOptions === value}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        ))
      : null;

  const activator = (
    <button
      type="button"
      className={styles.Activator}
      onClick={() => setActive((active) => !active)}
    >
      <BlockStack as="span" gap="100">
        <Text as="span" variant="bodySm" alignment="start" tone="subdued">
          {resourceTitle}
        </Text>
        <Text as="span" variant="bodyMd" alignment="start">
          {defaultOptions.find((option) => option.value === selectedOptions)
            ?.label ?? emptyStateTitle}
        </Text>
      </BlockStack>
      <span>
        <Icon tone="subdued" source={SelectIcon} />
      </span>
    </button>
  );

  return (
    <>
      <Popover
        fullWidth
        active={active}
        onClose={() => {
          setActive(false);
          setInputValue('');
          setFilteredOptions(defaultOptions);
        }}
        preferredPosition="cover"
        activator={activator}
      >
        <Box paddingInline="200" paddingBlock="050" paddingBlockStart="200">
          <Box paddingInlineStart="050">
            <Text as="span" tone="subdued" variant="bodySm">
              {resourceTitle}
            </Text>
          </Box>
        </Box>
        <Combobox
          variant="experimental-inline"
          activator={
            <Box
              borderBlockEndWidth="025"
              borderColor="border"
              paddingBlockEnd="100"
              paddingInline="200"
            >
              <InlineGrid gap="100" columns="auto 1fr">
                <Icon source={SearchIcon} tone="subdued" />

                <Combobox.TextField
                  focused
                  onChange={updateText}
                  label="Search or add tags"
                  labelHidden
                  value={inputValue}
                  placeholder={searchPlaceholder ?? 'Search tags'}
                  autoComplete="off"
                  inline
                />
              </InlineGrid>
            </Box>
          }
        >
          {optionsMarkup ? (
            <>
              <Listbox onSelect={updateSelection}>
                {inputValue !== '' && (
                  <Box paddingInline="300" paddingBlockEnd="100">
                    {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
                    <Text as="span" variant="bodySm" tone="subdued">
                      {`${filteredOptions.length} results`}
                    </Text>
                  </Box>
                )}
                {optionsMarkup}
              </Listbox>
              {inputValue !== '' && (
                <>
                  <Listbox onSelect={updateSelection}>
                    <Listbox.Action
                      value={inputValue}
                      icon={PlusIcon}
                      accessibilityLabel="Add new tag"
                    >
                      {inputValue}
                    </Listbox.Action>
                  </Listbox>
                  <Box paddingBlockEnd="100" />
                </>
              )}
            </>
          ) : (
            <>
              <Box paddingInline="200">
                {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
                <Text as="span" variant="bodySm" tone="subdued">
                  No results
                </Text>
              </Box>

              <Listbox onSelect={updateSelection}>
                <Listbox.Action
                  value={inputValue}
                  icon={PlusIcon}
                  accessibilityLabel="Add new tag"
                >
                  {inputValue}
                </Listbox.Action>
              </Listbox>
              <Box paddingBlockEnd="100" />
            </>
          )}
        </Combobox>
      </Popover>
    </>
  );
}
