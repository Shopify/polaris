import React, {useCallback, useState} from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  SearchIcon,
  // CollectionIcon,
  // ArrowDownIcon,
} from '@shopify/polaris-icons';

import {
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
}

export function Select({
  resourceTitle,
  emptyStateTitle,
  searchPlaceholder,
  defaultSelected = [],
  options: defaultOptions = [],
}: Props) {
  const collapsibleId = React.useId();
  const [active, setActive] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(defaultOptions);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(defaultOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = defaultOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
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
      options={options}
    />
  ));

  const hiddenTagsMarkup = remainingSelectedOptions.map((selectedOption) => (
    <Tag
      key={`option-${selectedOption}`}
      selectedOption={selectedOption}
      options={options}
    />
  ));

  const optionsMarkup =
    options.length > 0
      ? options.map(({label, value = ''}) => (
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
    <Box paddingBlockEnd={selectedOptions.length ? '150' : '0'}>
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
  );

  return (
    <Box padding="200" borderRadius="200" background="bg-surface-secondary">
      <Popover
        fullWidth
        active={active}
        onClose={() => {
          setActive(false);
          setInputValue('');
          setOptions(defaultOptions);
        }}
        preferredPosition="cover"
        activator={activator}
      >
        <Box paddingInline="200" paddingBlock="050" paddingBlockStart="200">
          {resourceTitle}
        </Box>
        <Combobox
          allowMultiple
          persistent
          onClose={() => {
            setActive(false);
            setInputValue('');
            setOptions(defaultOptions);
          }}
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
            <Listbox onSelect={updateSelection}>{[...optionsMarkup]}</Listbox>
          ) : null}
        </Combobox>
      </Popover>
      {visibleTagsMarkup.length > 0 && (
        <BlockStack>{visibleTagsMarkup}</BlockStack>
      )}
      {remainingSelectedOptions.length > 0 && (
        <>
          <Collapsible id={collapsibleId} open={collapsibleOpen}>
            <BlockStack>{hiddenTagsMarkup}</BlockStack>
          </Collapsible>

          <Bleed marginInline="100" marginBlockEnd="200">
            <Button
              variant="tertiary"
              size="micro"
              onClick={() => setCollapsibleOpen((open) => !open)}
              icon={collapsibleOpen ? ArrowUpIcon : ArrowDownIcon}
            >
              {collapsibleOpen
                ? 'show less'
                : `${remainingSelectedOptions.length} more`}
            </Button>
          </Bleed>
        </>
      )}
    </Box>
  );
}

function TagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.75 7.5C5.05964 7.5 4.5 8.05964 4.5 8.75V11.75C4.5 12.4404 5.05964 13 5.75 13H12.1716C12.5031 13 12.821 12.8683 13.0555 12.6339L15.2626 10.4268C15.3602 10.3291 15.3602 10.1709 15.2626 10.0732L13.0555 7.86612C12.821 7.6317 12.5031 7.5 12.1716 7.5H5.75ZM3 8.75C3 7.23122 4.23122 6 5.75 6H12.1716C12.9009 6 13.6004 6.28973 14.1161 6.80546L16.3232 9.01256C17.0066 9.69598 17.0066 10.804 16.3232 11.4874L14.1161 13.6945C13.6004 14.2103 12.9009 14.5 12.1716 14.5H5.75C4.23122 14.5 3 13.2688 3 11.75V8.75Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 10.25C6 9.83579 6.33579 9.5 6.75 9.5H11.25C11.6642 9.5 12 9.83579 12 10.25C12 10.6642 11.6642 11 11.25 11H6.75C6.33579 11 6 10.6642 6 10.25Z"
        fill="black"
      />
    </svg>
  );
}

function Tag({
  options,
  selectedOption,
}: {
  options: Option[];
  selectedOption: string;
}) {
  return (
    <Box
      background="bg-surface-secondary"
      borderBlockStartWidth="025"
      borderColor="border"
      paddingBlock="100"
    >
      <InlineStack gap="025">
        <TagIcon />
        <Text as="span" variant="bodyMd">
          {options?.find((option) => option.value === selectedOption)?.label}
        </Text>
      </InlineStack>
    </Box>
  );
}
