import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  ReactNode,
  useMemo,
  Children,
} from 'react';
import debounce from 'lodash/debounce';

import {useToggle} from '../../utilities/use-toggle';
import {useUniqueId} from '../../utilities/unique-id';
import {useComboboxListbox} from '../../utilities/combobox';
import {ListboxContext, WithinListboxContext} from '../../utilities/listbox';
import type {NavigableOption} from '../../utilities/listbox';
import {Key} from '../../types';
import {KeypressListener} from '../KeypressListener';
import {VisuallyHidden} from '../VisuallyHidden';
import {scrollable} from '../shared';

import {
  Option,
  Section,
  Header,
  Action,
  Loading,
  TextOption,
} from './components';
import styles from './Listbox.scss';

export interface ListboxProps {
  /** Inner content of the listbox */
  children: ReactNode;
  /** Explicitly enable keyboard control */
  enableKeyboardControl?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Callback fired when an option is selected */
  onSelect?(value: string): void;
  /** Callback fired when an option becomes active */
  onActiveOptionChange?(value: string): void;
}

export type ArrowKeys = 'up' | 'down';

const LISTBOX_OPTION_SELECTOR = '[data-listbox-option]';
const LISTBOX_OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
const LISTBOX_OPTION_ACTION_ATTRIBUTE = 'data-listbox-option-action';

const DATA_ATTRIBUTE = 'data-focused';

export function Listbox({
  children,
  enableKeyboardControl,
  accessibilityLabel,
  onSelect,
  onActiveOptionChange,
}: ListboxProps) {
  const [loading, setLoading] = useState<string>();
  const [activeOption, setActiveOption] = useState<NavigableOption>();
  const [resetActiveOption, setResetActiveOption] = useState(false);
  const [options, setOptions] = useState<HTMLElement[]>([]);

  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents,
  } = useToggle(Boolean(enableKeyboardControl));

  const listId = useUniqueId('Listbox');

  const scrollableRef = useRef<HTMLElement | null>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const {
    listboxId,
    textFieldLabelId,
    textFieldFocused,
    setActiveOptionId,
    setListboxId,
    onOptionSelected,
    onKeyToBottom,
  } = useComboboxListbox();

  const inCombobox = Boolean(setActiveOptionId);

  useEffect(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);

  const getNavigableOptions = () => {
    if (!listboxRef.current) {
      return [];
    }

    return [
      ...new Set(
        listboxRef.current.querySelectorAll<HTMLElement>(
          LISTBOX_OPTION_SELECTOR,
        ),
      ),
    ];
  };

  const getFirstNavigableOption = useCallback(() => {
    const hasSelectedOptions = options.some(
      (option) => option.getAttribute('aria-selected') === 'true',
    );

    let elementIndex = 0;
    const element = options.find((option, index) => {
      const isInteractable = option.getAttribute('aria-disabled') !== 'true';
      let isFirstNavigableOption;

      if (hasSelectedOptions) {
        const isSelected = option.getAttribute('aria-selected') === 'true';
        isFirstNavigableOption = isSelected && isInteractable;
      } else {
        isFirstNavigableOption = isInteractable;
      }

      if (isFirstNavigableOption) elementIndex = index;

      return isFirstNavigableOption;
    });

    if (!element) return;

    return {element, index: elementIndex};
  }, [options]);

  const handleScrollIntoView = useCallback((option: NavigableOption) => {
    if (scrollableRef.current) {
      const {element} = option;
      element.scrollIntoView({block: 'nearest'});
    }
  }, []);

  const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);

  const handleChangeActiveOption = useCallback(
    (nextOption?: NavigableOption) => {
      if (!nextOption) return;
      if (activeOption?.domId === nextOption?.domId) return;

      activeOption?.element.removeAttribute(DATA_ATTRIBUTE);
      nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');
      setActiveOption(nextOption);

      if (setActiveOptionId) setActiveOptionId(nextOption?.domId);
      if (onActiveOptionChange) onActiveOptionChange(nextOption.value);

      if (scrollableRef.current) {
        const visibleListTop = scrollableRef.current.scrollTop;
        const visibleListBottom =
          visibleListTop + scrollableRef.current.clientHeight;

        const optionBottom =
          nextOption.element.offsetTop + nextOption.element.offsetHeight;

        const isVisible =
          optionBottom > visibleListTop && optionBottom <= visibleListBottom;

        if (!isVisible) {
          handleScrollIntoViewDebounced(nextOption);
        }
      }
    },
    [
      activeOption,
      setActiveOptionId,
      onActiveOptionChange,
      handleScrollIntoViewDebounced,
    ],
  );

  const getFormattedOption = useCallback(
    (element: HTMLElement, index: number) => {
      return {
        index,
        domId: element.id,
        value: element.getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE) || '',
        element,
        disabled: element.getAttribute('aria-disabled') === 'true',
      };
    },
    [],
  );

  useEffect(() => {
    if (children && Children.count(children) > 0) {
      const nextOptions = getNavigableOptions();
      const activeOptionIsAction = activeOption?.element.getAttribute(
        LISTBOX_OPTION_ACTION_ATTRIBUTE,
      );

      const currentValues = options.map((option) =>
        option.getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE),
      );

      const nextValues = nextOptions.map((option) =>
        option.getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE),
      );

      const listIsLazyLoading =
        onKeyToBottom && nextOptions.length === options.length + 1;

      const listIsUnchanged = nextValues.every((value, index) => {
        return currentValues[index] === value;
      });

      if (listIsUnchanged) return;

      setOptions(nextOptions);

      if (listIsLazyLoading) return;

      setResetActiveOption(true);
    }
  }, [
    children,
    options,
    activeOption,
    resetActiveOption,
    getFirstNavigableOption,
    onKeyToBottom,
  ]);

  useLayoutEffect(() => {
    if (loading || options.length === 0) return;

    if (resetActiveOption) {
      const nextActiveOption = getFirstNavigableOption();

      if (nextActiveOption) {
        const {element, index} = nextActiveOption;
        const option = getFormattedOption(element, index);
        handleChangeActiveOption(option);
        setResetActiveOption(false);
      }
    }
  }, [
    options,
    loading,
    resetActiveOption,
    getFormattedOption,
    getFirstNavigableOption,
    handleChangeActiveOption,
  ]);

  useEffect(() => {
    if (listboxRef.current) {
      scrollableRef.current = listboxRef.current.closest(scrollable.selector);
    }
  }, []);

  useEffect(() => {
    if (enableKeyboardControl && !keyboardEventsEnabled) {
      enableKeyboardEvents();
    }
  }, [enableKeyboardControl, keyboardEventsEnabled, enableKeyboardEvents]);

  const onOptionSelect = useCallback(
    (option: NavigableOption) => {
      handleChangeActiveOption(option);

      if (onOptionSelected) {
        onOptionSelected();
      }
      if (onSelect) onSelect(option.value);
    },
    [handleChangeActiveOption, onSelect, onOptionSelected],
  );

  const getNextValidOption = useCallback(
    (key: ArrowKeys) => {
      const options = getNavigableOptions();
      const lastIndex = options.length - 1;
      let currentIndex = activeOption?.index || 0;
      let nextIndex = 0;
      let element = activeOption?.element;
      let totalOptions = -1;

      const disabledItems = options.filter(
        (item) => item?.getAttribute('aria-disabled') === 'true',
      );

      const allNavItemsDisabled = disabledItems.length === options.length;

      if (allNavItemsDisabled && !onKeyToBottom) {
        return {element: undefined, nextIndex: -1};
      }

      // exit if we've cycled through all nav options
      while (totalOptions++ < lastIndex) {
        // increment nextIndex to able to find next option
        if (key === 'down') {
          nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
        } else {
          nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
        }

        /* when current nav options are all disabled but there is an onScrollToBottom, set nextIndex to either one before current index or one after last index */
        if (allNavItemsDisabled) {
          nextIndex = key === 'down' ? lastIndex + 1 : nextIndex - 1;
        }

        // // when the activeOption is the last nav item,
        // // set nextIndex to either one before current index
        // // or resetActiveOption back to beginning of nav options
        // if (currentIndex === lastIndex) {
        //   nextIndex = key === 'down' ? 0 : lastIndex - 1;
        // }

        element = options[nextIndex];

        if (element?.getAttribute('aria-disabled') === 'true') {
          if (key === 'down') {
            currentIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
          } else {
            currentIndex =
              nextIndex === lastIndex ? nextIndex : currentIndex - 1;
          }

          // restart while loop to find next valid option
          continue;
        }
      }

      if (onKeyToBottom && nextIndex >= lastIndex) {
        onKeyToBottom();
      }

      return {element, nextIndex};
    },
    [activeOption, onKeyToBottom],
  );

  const handleArrow = useCallback(
    (type: ArrowKeys, event: KeyboardEvent) => {
      event.preventDefault();
      const {element, nextIndex} = getNextValidOption(type);
      if (!element) return;
      const nextOption = getFormattedOption(element, nextIndex);
      handleChangeActiveOption(nextOption);
    },
    [getFormattedOption, getNextValidOption, handleChangeActiveOption],
  );

  const handleDownArrow = useCallback(
    (event: KeyboardEvent) => {
      handleArrow('down', event);
    },
    [handleArrow],
  );

  const handleUpArrow = useCallback(
    (event: KeyboardEvent) => {
      handleArrow('up', event);
    },
    [handleArrow],
  );

  const handleEnter = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (activeOption) {
        onOptionSelect(activeOption);
      }
    },
    [activeOption, onOptionSelect],
  );

  const handleFocus = useCallback(() => {
    if (enableKeyboardControl) return;
    enableKeyboardEvents();
  }, [enableKeyboardControl, enableKeyboardEvents]);

  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      event.stopPropagation();
      if (keyboardEventsEnabled) {
        handleChangeActiveOption();
      }
      if (enableKeyboardControl) return;
      disableKeyboardEvents();
    },
    [
      enableKeyboardControl,
      keyboardEventsEnabled,
      disableKeyboardEvents,
      handleChangeActiveOption,
    ],
  );

  const listeners =
    keyboardEventsEnabled || textFieldFocused ? (
      <>
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.DownArrow}
          handler={handleDownArrow}
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.UpArrow}
          handler={handleUpArrow}
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.Enter}
          handler={handleEnter}
        />
      </>
    ) : null;

  const listboxContext = useMemo(
    () => ({
      onOptionSelect,
      setLoading,
    }),
    [onOptionSelect],
  );

  return (
    <>
      {listeners}
      <VisuallyHidden>
        <div aria-live="polite">{loading ? loading : null}</div>
      </VisuallyHidden>
      <ListboxContext.Provider value={listboxContext}>
        <WithinListboxContext.Provider value>
          {children ? (
            <ul
              tabIndex={0}
              role="listbox"
              className={styles.Listbox}
              aria-label={inCombobox ? undefined : accessibilityLabel}
              aria-labelledby={textFieldLabelId}
              aria-busy={Boolean(loading)}
              aria-activedescendant={activeOption && activeOption.domId}
              id={listId}
              onFocus={inCombobox ? undefined : handleFocus}
              onBlur={inCombobox ? undefined : handleBlur}
              ref={listboxRef}
            >
              {children}
            </ul>
          ) : null}
        </WithinListboxContext.Provider>
      </ListboxContext.Provider>
    </>
  );
}

Listbox.Option = Option;
Listbox.TextOption = TextOption;
Listbox.Loading = Loading;
Listbox.Section = Section;
Listbox.Header = Header;
Listbox.Action = Action;
