import React, {useCallback, useState} from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  SearchIcon,
} from '@shopify/polaris-icons';

import type {IconProps} from '../../../src';
import {
  UnstyledButton,
  Combobox,
  Listbox,
  Text,
  InlineGrid,
  Popover,
  InlineStack,
  Button,
  BlockStack,
  Collapsible,
  Box,
  Bleed,
  Icon,
} from '../../../src';

interface Option {
  value: string;
  label: string;
}
interface Props {
  resourceTitle: string;
  emptyStateTitle: string;
  searchPlaceholder?: string;
  defaultSelected?: string[];
  options?: Option[];
  optionIcon?: IconProps['source'];
}

export function Select({
  resourceTitle,
  emptyStateTitle,
  searchPlaceholder,
  defaultSelected = [],
  optionIcon,
  options: defaultOptions = [],
}: Props) {
  const collapsibleId = React.useId();
  const [active, setActive] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(defaultOptions);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);

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

  const updateSelection = useCallback(
    (selected: string) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected),
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }
    },
    [selectedOptions],
  );

  const firstFourSelectedOptions = selectedOptions.slice(0, 4);
  const remainingSelectedOptions = selectedOptions.slice(
    4,
    selectedOptions.length,
  );

  const visibleTagsMarkup = firstFourSelectedOptions.map((selectedOption) => (
    <Tag
      key={`option-${selectedOption}`}
      selectedOption={selectedOption}
      options={defaultOptions}
      icon={optionIcon}
      resourceTitle={resourceTitle}
    />
  ));

  const hiddenTagsMarkup = remainingSelectedOptions.map((selectedOption) => (
    <Tag
      key={`option-${selectedOption}`}
      selectedOption={selectedOption}
      options={defaultOptions}
      icon={optionIcon}
      resourceTitle={resourceTitle}
    />
  ));

  const optionsMarkup =
    filteredOptions.length > 0
      ? filteredOptions.map(({label, value = ''}) => (
          <Listbox.Option
            key={`${value}`}
            value={value}
            selected={selectedOptions.includes(value)}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        ))
      : null;

  const activator = (
    <Box padding="200">
      <Box paddingInlineStart="050">
        <InlineGrid columns="1fr auto" alignItems="center">
          <Text as="h3" variant="bodySm" alignment="start" tone="subdued">
            {selectedOptions.length ? resourceTitle : emptyStateTitle}
          </Text>

          <Button
            variant="tertiary"
            icon={PlusIcon}
            onClick={() => setActive((active) => !active)}
          />
        </InlineGrid>
      </Box>
    </Box>
  );

  return (
    <Box borderRadius="200" background="bg-surface-secondary">
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
          persistent
          allowMultiple
          activator={
            <Bleed marginInline="200">
              <Box
                borderBlockEndWidth="025"
                borderColor="border"
                paddingBlockEnd="100"
                paddingInline="200"
              >
                <InlineGrid gap="100" columns="auto 1fr">
                  <Icon source={SearchIcon} tone="subdued" />

                  <Combobox.TextField
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
            </Bleed>
          }
        >
          {optionsMarkup ? (
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
              {inputValue !== '' && (
                <>
                  <Listbox.Action
                    value={inputValue}
                    icon={PlusIcon}
                    accessibilityLabel="Add new tag"
                  >
                    {inputValue}
                  </Listbox.Action>
                  <Box paddingBlockEnd="100" />
                </>
              )}
            </Listbox>
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
      {visibleTagsMarkup.length > 0 && (
        <Box paddingInline="200">{visibleTagsMarkup}</Box>
      )}
      {remainingSelectedOptions.length > 0 && (
        <Box paddingInline="200" paddingBlockEnd="150">
          <Collapsible id={collapsibleId} open={collapsibleOpen}>
            <BlockStack>{hiddenTagsMarkup}</BlockStack>
          </Collapsible>

          <Box borderWidth="025" borderColor="border" borderRadius="100">
            <UnstyledButton
              style={{
                padding: 'var(--p-space-075)',
                background: 'none',
                border: 'var(--p-border-width-1) solid var(--p-color-border)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--p-space-100)',
                cursor: 'pointer',
              }}
              onClick={() => setCollapsibleOpen((open) => !open)}
            >
              <div>
                <Icon
                  source={collapsibleOpen ? ArrowUpIcon : ArrowDownIcon}
                  tone="subdued"
                />
              </div>
              {collapsibleOpen
                ? 'show less'
                : `${remainingSelectedOptions.length} more`}
            </UnstyledButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function Tag({
  options,
  selectedOption,
  icon,
  resourceTitle,
}: {
  options: Option[];
  selectedOption: string;
  icon?: IconProps['source'];
  resourceTitle?: string;
}) {
  return (
    <Box
      background="bg-surface-secondary"
      borderBlockStartWidth="025"
      borderColor="border"
      paddingBlock="100"
    >
      <InlineStack gap="025">
        {icon && (
          <span>
            <Icon source={icon} />
          </span>
        )}
        <Text as="span" variant="bodyMd">
          {options?.find((option) => option.value === selectedOption)?.label ??
            `new fake ${resourceTitle?.toLocaleLowerCase()}`}
        </Text>
      </InlineStack>
    </Box>
  );
}
