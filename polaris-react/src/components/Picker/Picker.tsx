import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  isValidElement,
} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import {Popover} from '../Popover';
import type {PopoverPublicAPI} from '../Popover';
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
  /** Textfield that allows filtering of options */
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
const QUERY_REGEX = (value: string) => new RegExp(`^${value}$`, 'i');

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
  const [query, setQuery] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<OptionProps[] | null>(
    options,
  );
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [activeItem, setActiveItem] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const popoverRef = useRef<PopoverPublicAPI | null>(null);
  const shouldOpen = !popoverActive;

  const handleClose = useCallback(() => {
    setPopoverActive(false);
    onClose?.();
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setPopoverActive(true);
  }, []);

  const handleSelect = useCallback((selected: string) => {
    setActiveItem(selected);
  }, []);

  const onOptionSelected = useCallback(() => {
    if (!allowMultiple) {
      handleClose();
      return;
    }

    popoverRef.current?.forceUpdatePosition();
  }, [allowMultiple, handleClose]);

  const handleFocus = useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);

  const handleChange = useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);

  const handleBlur = useCallback(() => {
    if (popoverActive) {
      handleClose();
    }
  }, [popoverActive, handleClose]);

  const textFieldContextValue: ComboboxTextFieldType = useMemo(
    () => ({
      activeOptionId,
      expanded: popoverActive,
      listboxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      onTextFieldFocus: handleFocus,
      onTextFieldChange: handleChange,
      onTextFieldBlur: handleBlur,
    }),
    [
      activeOptionId,
      popoverActive,
      listboxId,
      setTextFieldFocused,
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
      textFieldFocused,
      willLoadMoreOptions,
      onOptionSelected,
      setActiveOptionId,
      setListboxId,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      listboxId,
      textFieldLabelId,
      textFieldFocused,
      willLoadMoreOptions,
      onOptionSelected,
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

  const firstSelectedOption = reactChildrenText(
    options.find((option) => option.value === activeItem)?.children,
  );
  const firstSelectedLabel = firstSelectedOption
    ? firstSelectedOption?.toString()
    : activator.placeholder;

  const queryMatchesExistingOption = options.some((option) =>
    QUERY_REGEX(query).exec(reactChildrenText(option.children)),
  );

  return (
    <Popover
      ref={popoverRef}
      active={popoverActive}
      activator={
        <Activator
          {...activator}
          onClick={handleOpen}
          placeholder={firstSelectedLabel}
        />
      }
      autofocusTarget="none"
      preventFocusOnClose
      fullWidth
      preferInputActivator={false}
      preferredPosition="cover"
      onClose={handleClose}
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
                focused
                autoFocus
              />
            </ComboboxTextFieldContext.Provider>
          </Box>
        ) : null}

        <ComboboxListboxContext.Provider value={listboxContextValue}>
          <ComboboxListboxOptionContext.Provider
            value={listboxOptionContextValue}
          >
            <Box paddingBlock="200">
              <Listbox
                {...listboxProps}
                onSelect={(selected: string) => {
                  onOptionSelected();
                  handleSelect(selected);
                  listboxProps.onSelect?.(selected);
                }}
              >
                {filteredOptions?.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    selected={option.value === activeItem}
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
