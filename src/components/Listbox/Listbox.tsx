import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import debounce from 'lodash/debounce';

import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {useUniqueId} from '../../utilities/unique-id';
import {useComboboxListbox} from '../../utilities/combobox';
import {closestParentMatch} from '../../utilities/closest-parent-match';
import {scrollIntoView} from '../../utilities/scroll-into-view';
import {ListboxContext, WithinListboxContext} from '../../utilities/listbox';
import type {NavigableOption} from '../../utilities/listbox';
import {Key} from '../../types';
import {KeypressListener} from '../KeypressListener';
import {VisuallyHidden} from '../VisuallyHidden';

import {
  Option,
  Section,
  Header,
  Action,
  Loading,
  TextOption,
  listboxSectionDataSelector,
} from './components';
import styles from './Listbox.scss';

export interface ListboxProps {
  /** Inner content of the listbox */
  children: ReactNode;
  /** Explicitly enable keyboard control */
  enableKeyboardControl?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Callback when an option is selected */
  onSelect?(value: string): void;
}

export type ArrowKeys = 'up' | 'down';

export const scrollable = {
  props: {'data-polaris-scrollable': true},
  selector: '[data-polaris-scrollable]',
};

const LISTBOX_OPTION_SELECTOR = '[data-listbox-option]';
const LISTBOX_OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';

const DATA_ATTRIBUTE = 'data-focused';

export function Listbox({
  children,
  enableKeyboardControl,
  accessibilityLabel,
  onSelect,
}: ListboxProps) {
  const [loading, setLoading] = useState<string>();
  const [activeOption, setActiveOption] = useState<NavigableOption>();
  const [listLength, setListLength] = useState(0);
  const [reset, setReset] = useState(false);

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
  const listboxClassName = classNames(styles.Listbox);

  useEffect(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);

  function getNavigableOptions() {
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
  }

  const getFirstNavigableOption = useCallback(() => {
    const navItems = getNavigableOptions();
    const hasSelectedOptions = navItems.some(
      (option) => option.getAttribute('aria-selected') === 'true',
    );

    const element = navItems.find((option) => {
      const isInteractable = option.getAttribute('aria-disabled') !== 'true';

      if (hasSelectedOptions) {
        const isSelected = option.getAttribute('aria-selected') === 'true';
        return isSelected && isInteractable;
      } else {
        return isInteractable;
      }
    });

    if (!element) return;

    const index = navItems.indexOf(element);
    console.log('First navigable option: ', index);

    return {element, index};
  }, []);

  const handleScrollIntoView = useCallback(
    (option: NavigableOption, first: boolean) => {
      if (scrollableRef.current) {
        const {element} = option;
        const focusTarget = first
          ? closestParentMatch(element, listboxSectionDataSelector.selector) ||
            element
          : element;

        scrollIntoView(focusTarget, scrollableRef.current);
      }
    },
    [],
  );

  const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 15);

  const handleChangeActiveOption = useCallback(
    (nextOption?: NavigableOption) => {
      if (activeOption && activeOption.domId !== nextOption?.domId) {
        activeOption.element.removeAttribute(DATA_ATTRIBUTE);
      }

      if (nextOption) {
        if (scrollableRef.current) {
          const first =
            getNavigableOptions().findIndex(
              (element) => element.id === nextOption.element.id,
            ) === 0;

          handleScrollIntoViewDebounced(nextOption, first);
        }

        nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');

        setActiveOption(nextOption);

        if (setActiveOptionId) setActiveOptionId(nextOption?.domId);
      }
    },
    [activeOption, setActiveOptionId, handleScrollIntoViewDebounced],
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
    if (children) {
      let reset = false;
      setListLength((length) => {
        const nextListLength = React.Children.count(children);
        if (nextListLength !== length) {
          reset = true;
          return nextListLength;
        }
        return length;
      });

      if (reset) {
        setReset(true);
      }
    }
  }, [children, listLength, getFirstNavigableOption]);

  useEffect(() => {
    if (loading || listLength === 0) return;

    if (reset) {
      const nextActiveOption = getFirstNavigableOption();

      if (nextActiveOption) {
        const {element, index} = nextActiveOption;
        const option = getFormattedOption(element, index);
        handleChangeActiveOption(option);
        setReset(false);
      }
    }
  }, [
    listLength,
    loading,
    reset,
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

  const listboxContext = useMemo(
    () => ({
      onOptionSelect,
      setLoading,
    }),
    [onOptionSelect],
  );

  const getNextValidOption = useCallback(
    (key: ArrowKeys) => {
      const navItems = getNavigableOptions();
      const lastIndex = navItems.length - 1;
      const currentIndex = activeOption?.index ? activeOption.index : 0;
      let nextIndex = 0;
      let element = activeOption?.element;
      let count = -1;

      while (count++ < lastIndex) {
        if (key === 'up') {
          nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
        } else {
          nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
        }

        element = navItems[nextIndex];

        if (element.getAttribute('aria-disabled') === 'true') {
          continue;
        }
      }

      if (nextIndex === lastIndex && onKeyToBottom) {
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
              className={listboxClassName}
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
