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
  const [lazyLoading, setLazyLoading] = useState(false);
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
    willLoadMoreOptions,
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
    const {current: scrollable} = scrollableRef;

    if (scrollable) {
      const listTop = scrollable.scrollTop;
      const listBottom = listTop + scrollable.clientHeight;
      const {offsetHeight: optionHeight} = option.element;
      const {offsetTop: optionTop} = option.element;
      const optionBottom = optionTop + optionHeight;
      const isVisible = optionTop > listTop && optionBottom < listBottom;

      if (!isVisible) {
        let top = 0;
        if (optionBottom > listBottom) {
          top = optionBottom + optionHeight * 0.85 - listBottom;
        } else if (optionTop < listTop) {
          top = optionTop - optionHeight * 0.15 - listTop;
        }

        requestAnimationFrame(() => {
          scrollable.scrollBy({top, behavior: 'smooth'});
        });
      }
    }
  }, []);

  const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);

  const handleKeyToBottom = useCallback(() => {
    if (onKeyToBottom) {
      setLazyLoading(true);
      return Promise.resolve(onKeyToBottom());
    }
  }, [onKeyToBottom]);

  const handleChangeActiveOption = useCallback(
    (nextOption?: NavigableOption) => {
      if (!nextOption) return;

      if (activeOption?.domId === nextOption?.domId) {
        setActiveOption(nextOption);
        if (onActiveOptionChange) onActiveOptionChange(nextOption.value);
        return;
      }

      activeOption?.element.removeAttribute(DATA_ATTRIBUTE);
      nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');
      handleScrollIntoViewDebounced(nextOption);
      setActiveOption(nextOption);

      if (setActiveOptionId) setActiveOptionId(nextOption?.domId);
      if (onActiveOptionChange) onActiveOptionChange(nextOption.value);
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
        element,
        index,
        domId: element.id,
        value: element.getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE) || '',
        disabled: element.getAttribute('aria-disabled') === 'true',
      };
    },
    [],
  );

  useEffect(() => {
    if (!loading && children && Children.count(children) > 0) {
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

      const listIsUnchanged = nextValues.every((value, index) => {
        return currentValues[index] === value;
      });

      if (listIsUnchanged) {
        if (
          activeOptionIsAction &&
          options.length === 1 &&
          activeOption?.value !== nextValues[0]
        ) {
          setResetActiveOption(true);
        }
        return;
      }

      setOptions(nextOptions);

      if (lazyLoading) {
        setLazyLoading(false);
        return;
      }

      setResetActiveOption(true);
    }
  }, [
    children,
    loading,
    lazyLoading,
    options,
    activeOption,
    resetActiveOption,
    willLoadMoreOptions,
    getFirstNavigableOption,
    onKeyToBottom,
  ]);

  useLayoutEffect(() => {
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
    resetActiveOption,
    getFormattedOption,
    getFirstNavigableOption,
    handleChangeActiveOption,
    handleKeyToBottom,
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

      if (onOptionSelected) onOptionSelected();
      if (onSelect) onSelect(option.value);
    },
    [handleChangeActiveOption, onSelect, onOptionSelected],
  );

  const getNextIndex = useCallback(
    (currentIndex: number, lastIndex: number, direction: string) => {
      let nextIndex;

      if (direction === 'down') {
        if (currentIndex === lastIndex) {
          nextIndex = willLoadMoreOptions ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex + 1;
        }
      } else {
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      }

      return nextIndex;
    },
    [willLoadMoreOptions],
  );

  const getNextValidOption = useCallback(
    async (key: ArrowKeys) => {
      const lastIndex = options.length - 1;
      let currentIndex = activeOption?.index || 0;
      let nextIndex = 0;
      let element = activeOption?.element;
      let totalOptions = -1;

      while (totalOptions++ < lastIndex) {
        nextIndex = getNextIndex(currentIndex, lastIndex, key);
        element = options[nextIndex];
        const triggerLazyLoad = nextIndex >= lastIndex;
        const isDisabled = element?.getAttribute('aria-disabled') === 'true';

        if (triggerLazyLoad && willLoadMoreOptions) {
          await handleKeyToBottom();
        }

        if (isDisabled) {
          // currentIndex = getNextIndex(nextIndex, lastIndex, key);
          currentIndex = nextIndex;
          element = undefined;
          continue;
        }

        break;
      }

      return {element, nextIndex};
    },
    [
      options,
      activeOption,
      willLoadMoreOptions,
      getNextIndex,
      handleKeyToBottom,
    ],
  );

  const handleArrow = useCallback(
    async (type: ArrowKeys, event: KeyboardEvent) => {
      event.preventDefault();
      const {element, nextIndex} = await getNextValidOption(type);
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
      if (keyboardEventsEnabled && !resetActiveOption) {
        setResetActiveOption(true);
      }
      if (enableKeyboardControl) return;
      disableKeyboardEvents();
    },
    [
      resetActiveOption,
      enableKeyboardControl,
      keyboardEventsEnabled,
      disableKeyboardEvents,
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
