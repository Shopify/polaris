import React, {useCallback, useState} from 'react';
import {
  PlusIcon,
  // CollectionIcon,
  // ArrowDownIcon,
  XIcon,
} from '@shopify/polaris-icons';

import {
  Combobox,
  Listbox,
  Text,
  InlineGrid,
  Popover,
  InlineStack,
  Button,
} from '../../../src';

import styles from './Select.module.scss';

interface Props {
  resourceTitle: string;
  emptyStateTitle: string;
  searchPlaceholder?: string;
  defaultSelected?: string[];
}

export function Select({
  resourceTitle,
  emptyStateTitle,
  searchPlaceholder,
  defaultSelected = [],
  options: defaultOptions = [],
}: Props & {options?: {value?: string; label: string}[]}) {
  const [active, setActive] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [options, setOptions] = useState(defaultOptions);

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

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const tagsMarkup = selectedOptions.map((option) => (
    <InlineStack key={`option-${option}`} gap="100">
      <TagIcon /> {option}
      <Button variant="plain" icon={XIcon} onClick={removeTag(option)} />
    </InlineStack>
  ));

  const optionsMarkup =
    options.length > 0
      ? options.map(({label, value}) => (
          <Listbox.Option
            key={`${value}`}
            value={value ?? ''}
            selected={selectedOptions.includes(value ?? '')}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        ))
      : null;

  const activator = (
    <div className={styles.Select}>
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
    </div>
  );

  return (
    <>
      <Popover
        fullWidth
        active={active}
        onClose={() => setActive(false)}
        // TODO: Allow coverage of activator
        // preferredAlignment="cover"
        activator={activator}
      >
        <Combobox
          allowMultiple
          persistent
          onClose={() => setActive(false)}
          activator={
            <Combobox.TextField
              onChange={updateText}
              label="Search tags"
              labelHidden
              value={inputValue}
              placeholder={searchPlaceholder ?? 'Search tags'}
              autoComplete="off"
            />
          }
        >
          {optionsMarkup ? (
            <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
          ) : null}
        </Combobox>
      </Popover>
      ---
      {tagsMarkup}
    </>
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.75 7.5C5.05964 7.5 4.5 8.05964 4.5 8.75V11.75C4.5 12.4404 5.05964 13 5.75 13H12.1716C12.5031 13 12.821 12.8683 13.0555 12.6339L15.2626 10.4268C15.3602 10.3291 15.3602 10.1709 15.2626 10.0732L13.0555 7.86612C12.821 7.6317 12.5031 7.5 12.1716 7.5H5.75ZM3 8.75C3 7.23122 4.23122 6 5.75 6H12.1716C12.9009 6 13.6004 6.28973 14.1161 6.80546L16.3232 9.01256C17.0066 9.69598 17.0066 10.804 16.3232 11.4874L14.1161 13.6945C13.6004 14.2103 12.9009 14.5 12.1716 14.5H5.75C4.23122 14.5 3 13.2688 3 11.75V8.75Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 10.25C6 9.83579 6.33579 9.5 6.75 9.5H11.25C11.6642 9.5 12 9.83579 12 10.25C12 10.6642 11.6642 11 11.25 11H6.75C6.33579 11 6 10.6642 6 10.25Z"
        fill="black"
      />
    </svg>
  );
}
