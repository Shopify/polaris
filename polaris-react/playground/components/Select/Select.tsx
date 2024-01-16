import React, {useCallback, useState} from 'react';
import {SelectIcon} from '@shopify/polaris-icons';

import {
  Combobox,
  Listbox,
  BlockStack,
  Icon,
  Text,
  InlineGrid,
  UnstyledButton,
  Popover,
} from '../../../src';

import styles from './Select.module.scss';

interface Props {
  title: string;
  defaultSelected?: string[];
}

export function Select({
  title,
  defaultSelected = [],
  options: defaultOptions = [],
}: Props & {options?: {value?: string; label: string}[]}) {
  const [active, setActive] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

      // updateText('');
    },
    [selectedOptions],
  );

  // const removeTag = useCallback(
  //   (tag: string) => () => {
  //     const options = [...selectedOptions];
  //     options.splice(options.indexOf(tag), 1);
  //     setSelectedOptions(options);
  //   },
  //   [selectedOptions],
  // );

  // const tagsMarkup = selectedOptions.map((option) => (
  //   <Tag key={`option-${option}`} onRemove={removeTag(option)}>
  //     {option}
  //   </Tag>
  // ));

  const optionsMarkup =
    options.length > 0
      ? options.map(({label, value}) => (
          <Listbox.Option
            key={`${value}`}
            value={value ?? ''}
            selected={[...selectedOptions, ...defaultSelected].includes(
              value ?? '',
            )}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        ))
      : null;

  const firstSelected = defaultOptions?.find(
    (option) => option.value === defaultSelected?.[0],
  )?.label;

  const activator = (
    <UnstyledButton
      onClick={() => setActive((active) => !active)}
      className={styles.Select}
    >
      <InlineGrid columns="1fr auto" alignItems="center">
        <BlockStack gap="100" inlineAlign="start">
          <Text as="h3" variant="bodySm" tone="subdued">
            {title}
          </Text>

          {firstSelected && (
            <Text as="span" variant="bodyMd">
              {firstSelected}
            </Text>
          )}
        </BlockStack>
        <Icon source={SelectIcon} tone="subdued" />
      </InlineGrid>
    </UnstyledButton>
  );

  return (
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
        activator={
          <Combobox.TextField
            onChange={updateText}
            label="Search tags"
            labelHidden
            value={inputValue}
            placeholder="Search tags"
            autoComplete="off"
          />
        }
      >
        {optionsMarkup ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </Popover>
  );
}
