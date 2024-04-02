import React, {useState, useMemo, useCallback, isValidElement} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import {Popover} from '../Popover';
import {
  ComboboxTextFieldContext,
  ComboboxListboxContext,
  ComboboxListboxOptionContext,
} from '../../utilities/combobox';
import type {
  ComboboxTextFieldType,
  ComboboxListboxType,
  ComboboxListboxOptionType,
} from '../../utilities/combobox';
import {Box} from '../Box';
import type {TextFieldProps} from '../TextField';
import type {ListboxProps, OptionProps} from '../Listbox';
import {Listbox} from '../Listbox';
import type {IconProps} from '../Icon';
import {Icon} from '../Icon';
import {escapeRegex} from '../../utilities/string';

import {Activator, SearchField} from './components';
import type {ActivatorProps} from './components';

export interface PickerProps extends Omit<ListboxProps, 'children'> {
  /** Configure the button that activates the Picker */
  activator: ActivatorProps;
  /** Allows more than one option to be selected */
  allowMultiple?: boolean;
  /** The options to be listed within the picker */
  options?: OptionProps[];
  /** Used to add a new picker option that isn't listed */
  addAction?: OptionProps & {icon?: IconProps['source']};
  /** TextField that allows filtering of options */
  searchField?: TextFieldProps;
  /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  /** Height to set on the Popover Pane. */
  height?: string;
  /** Callback fired when the bottom of the listbox is reached. Use to lazy load when listbox option data is paginated. */
  onScrolledToBottom?(): void;
  /** Callback fired when the popover closes */
  onClose?(): void;
}

const FILTER_REGEX = (value: string) => new RegExp(value, 'i');
const QUERY_REGEX = (value: string) =>
  new RegExp(`^${escapeRegex(value)}$`, 'i');

export function Picker({
  activator,
  allowMultiple,
  searchField,
  options = [],
  willLoadMoreOptions,
  height,
  addAction,
  onScrolledToBottom,
  onClose,
  ...listboxProps
}: PickerProps) {
  const activatorRef = React.createRef<HTMLButtonElement>();
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [query, setQuery] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<OptionProps[] | null>(
    options,
  );

  const shouldOpen = !popoverActive;
  const handleClose = useCallback(() => {
    setPopoverActive(false);
    onClose?.();
    activatorRef.current?.focus();
  }, [activatorRef, onClose]);

  const handleOpen = useCallback(() => {
    setPopoverActive(true);
  }, []);

  const handleFocus = useCallback(() => {
    if (shouldOpen) handleOpen();
  }, [shouldOpen, handleOpen]);

  const handleChange = useCallback(() => {
    if (shouldOpen) handleOpen();
  }, [shouldOpen, handleOpen]);

  const handleBlur = useCallback(() => {
    if (popoverActive) {
      handleClose();
      setQuery('');
      setFilteredOptions(options);
    }
  }, [popoverActive, handleClose, options]);

  const textFieldContextValue: ComboboxTextFieldType = useMemo(
    () => ({
      activeOptionId,
      expanded: popoverActive,
      listboxId,
      setTextFieldLabelId,
      onTextFieldFocus: handleFocus,
      onTextFieldChange: handleChange,
      onTextFieldBlur: handleBlur,
    }),
    [
      activeOptionId,
      popoverActive,
      listboxId,
      setTextFieldLabelId,
      handleFocus,
      handleChange,
      handleBlur,
    ],
  );

  const listboxOptionContextValue: ComboboxListboxOptionType = useMemo(
    () => ({
      allowMultiple,
    }),
    [allowMultiple],
  );

  const listboxContextValue: ComboboxListboxType = useMemo(
    () => ({
      listboxId,
      textFieldLabelId,
      textFieldFocused: popoverActive,
      willLoadMoreOptions,
      setActiveOptionId,
      setListboxId,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      listboxId,
      textFieldLabelId,
      popoverActive,
      willLoadMoreOptions,
      setActiveOptionId,
      setListboxId,
      onScrolledToBottom,
    ],
  );

  const updateText = useCallback(
    (value: string) => {
      setQuery(value);

      if (value === '') {
        setFilteredOptions(options);
        return;
      }

      const resultOptions = options?.filter((option) =>
        FILTER_REGEX(value).exec(reactChildrenText(option.children)),
      );
      setFilteredOptions(resultOptions ?? []);
    },
    [options],
  );

  const handleSelect = useCallback(
    (selected: string) => {
      setQuery('');
      updateText('');
      listboxProps.onSelect?.(selected);

      if (!allowMultiple) {
        handleClose();
        setActiveItems([selected]);
        return;
      }

      setActiveItems((selectedOptions) => {
        return activeItems.includes(selected)
          ? selectedOptions.filter((option) => option !== selected)
          : [...selectedOptions, selected];
      });
    },
    [updateText, listboxProps, allowMultiple, activeItems, handleClose],
  );

  const firstSelectedOption = reactChildrenText(
    options.find((option) => option.value === activeItems?.[0])?.children,
  );

  const queryMatchesExistingOption = options.some((option) => {
    const matcher = QUERY_REGEX(query);
    return reactChildrenText(option.children).match(matcher);
  });

  return (
    <Popover
      activator={
        <Activator
          {...activator}
          onClick={handleOpen}
          selected={firstSelectedOption || ''}
          placeholder={activator.placeholder}
          ref={activatorRef}
        />
      }
      active={popoverActive}
      autofocusTarget="none"
      onClose={handleClose}
      preferredPosition="cover"
      preventFocusOnClose
    >
      <Popover.Pane onScrolledToBottom={onScrolledToBottom} height={height}>
        {searchField ? (
          <Box
            paddingBlockStart="200"
            paddingBlockEnd="100"
            paddingInline="200"
            borderBlockEndWidth="025"
            borderColor="border"
          >
            <ComboboxTextFieldContext.Provider value={textFieldContextValue}>
              <SearchField
                {...searchField}
                value={query}
                onChange={(value) => {
                  updateText(value);
                  searchField.onChange?.(value, searchField.id ?? '');
                }}
                prefix={<Icon source={SearchIcon} />}
                labelHidden
                focused={popoverActive}
              />
            </ComboboxTextFieldContext.Provider>
          </Box>
        ) : null}

        <ComboboxListboxContext.Provider value={listboxContextValue}>
          <ComboboxListboxOptionContext.Provider
            value={listboxOptionContextValue}
          >
            <Box paddingBlock="200">
              <Listbox {...listboxProps} onSelect={handleSelect}>
                {filteredOptions?.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    selected={activeItems.some((item) => item === option.value)}
                    {...option}
                  />
                ))}
                {addAction && query !== '' && !queryMatchesExistingOption ? (
                  <Listbox.Action {...addAction} value={query} />
                ) : null}
              </Listbox>
            </Box>
          </ComboboxListboxOptionContext.Provider>
        </ComboboxListboxContext.Provider>
      </Popover.Pane>
    </Popover>
  );
}

const reactChildrenText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;

  return isValidElement(children)
    ? reactChildrenText(children?.props?.children)
    : '';
};
