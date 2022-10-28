import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
  Children,
} from 'react';

import {debounce} from '../../utilities/debounce';
import {useToggle} from '../../utilities/use-toggle';
import {useUniqueId} from '../../utilities/unique-id';
import {useComboboxListbox} from '../../utilities/combobox';
import {
  ListboxContext,
  WithinListboxContext,
  NavigableOption,
  scrollOptionIntoView,
} from '../../utilities/listbox';
import {Key} from '../../types';
import {KeypressListener} from '../KeypressListener';
import {Text} from '../Text';
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

export enum AutoSelection {
  /** Default active option is the first selected option. If no options are selected, defaults to first interactive option. */
  FirstSelected = 'FIRST_SELECTED',
  /** Default active option is always the first interactive option. */
  First = 'FIRST',
  /** Default to the manual selection pattern. */
  None = 'NONE',
}

export interface ListboxProps {
  /** Inner content of the listbox */
  children: ReactNode;
  /** Indicates the default active option in the list. Patterns that support option creation should default the active option to the first option.
   * @default AutoSelection.FirstSelected
   */
  autoSelection?: AutoSelection;
  /** Explicitly enable keyboard control */
  enableKeyboardControl?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Provide a custom ID for the list element */
  customListId?: string;
  /** Callback fired when an option is selected */
  onSelect?(value: string): void;
  /** Callback fired when an option becomes active */
  onActiveOptionChange?(value: string, domId: string): void;
}

export type ArrowKeys = 'up' | 'down';

const OPTION_SELECTOR = '[data-listbox-option]';
const OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
const OPTION_ACTION_ATTRIBUTE = 'data-listbox-option-action';
const OPTION_FOCUS_ATTRIBUTE = 'data-focused';

export function Listbox({
  children,
  autoSelection = AutoSelection.FirstSelected,
  enableKeyboardControl,
  accessibilityLabel,
  customListId,
  onSelect,
  onActiveOptionChange,
}: ListboxProps) {
  const [loading, setLoading] = useState<string>();
  const [activeOption, setActiveOption] = useState<NavigableOption>();
  const [lazyLoading, setLazyLoading] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<HTMLElement[]>([]);

  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents,
  } = useToggle(Boolean(enableKeyboardControl));

  const uniqueId = useUniqueId('Listbox');
  const listId = customListId || uniqueId;

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

  const getNavigableOptions = useCallback(() => {
    if (!listboxRef.current) {
      return [];
    }

    return [
      ...new Set(
        listboxRef.current.querySelectorAll<HTMLElement>(OPTION_SELECTOR),
      ),
    ];
  }, []);

  const getFirstNavigableOption = useCallback(
    (currentOptions: HTMLElement[]) => {
      const hasSelectedOptions = currentOptions.some(
        (option) => option.getAttribute('aria-selected') === 'true',
      );

      let elementIndex = 0;
      const element = currentOptions.find((option, index) => {
        const isInteractable = option.getAttribute('aria-disabled') !== 'true';
        let isFirstNavigableOption;

        if (
          hasSelectedOptions &&
          autoSelection === AutoSelection.FirstSelected
        ) {
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
    },
    [autoSelection],
  );

  const handleScrollIntoView = useCallback((option: NavigableOption) => {
    const {current: scrollable} = scrollableRef;

    if (scrollable) {
      scrollOptionIntoView(option.element, scrollable);
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
      if (!nextOption) return setActiveOption(undefined);

      activeOption?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
      nextOption.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
      handleScrollIntoViewDebounced(nextOption);
      setActiveOption(nextOption);
      setActiveOptionId?.(nextOption.domId);
      onActiveOptionChange?.(nextOption.value, nextOption.domId);
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
        value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || '',
        disabled: element.getAttribute('aria-disabled') === 'true',
        isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === 'true',
      };
    },
    [],
  );

  const resetActiveOption = useCallback(() => {
    let nextOption;
    const nextOptions = getNavigableOptions();
    const nextActiveOption = getFirstNavigableOption(nextOptions);

    if (nextOptions.length === 0 && currentOptions.length > 0) {
      setCurrentOptions(nextOptions);
      handleChangeActiveOption();
      return;
    }

    if (nextActiveOption) {
      const {element, index} = nextActiveOption;
      nextOption = getFormattedOption(element, index);
    }

    const optionIsAlreadyActive =
      activeOption !== undefined && nextOption?.domId === activeOption?.domId;

    const actionContentHasUpdated =
      activeOption?.isAction &&
      nextOption?.isAction &&
      nextOption?.value !== activeOption?.value;

    const currentValues = currentOptions.map((option) =>
      option.getAttribute(OPTION_VALUE_ATTRIBUTE),
    );

    const nextValues = nextOptions.map((option) =>
      option.getAttribute(OPTION_VALUE_ATTRIBUTE),
    );

    const listIsUnchanged =
      nextValues.length === currentValues.length &&
      nextValues.every((value, index) => {
        return currentValues[index] === value;
      });

    const listIsAppended =
      currentValues.length !== 0 &&
      nextValues.length > currentValues.length &&
      currentValues.every((value, index) => {
        return nextValues[index] === value;
      });

    if (listIsUnchanged) {
      if (optionIsAlreadyActive && actionContentHasUpdated) {
        setCurrentOptions(nextOptions);
        handleChangeActiveOption(nextOption);
      }

      return;
    }

    if (listIsAppended) {
      setCurrentOptions(nextOptions);
      return;
    }

    setCurrentOptions(nextOptions);

    if (lazyLoading) {
      setLazyLoading(false);
      return;
    }

    handleChangeActiveOption(nextOption);
  }, [
    lazyLoading,
    currentOptions,
    activeOption,
    getFirstNavigableOption,
    getNavigableOptions,
    getFormattedOption,
    handleChangeActiveOption,
  ]);

  useEffect(() => {
    if (
      autoSelection !== AutoSelection.None &&
      !loading &&
      children &&
      Children.count(children) > 0
    ) {
      resetActiveOption();
    }
  }, [children, autoSelection, activeOption, loading, resetActiveOption]);

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
      const lastIndex = currentOptions.length - 1;
      let currentIndex = activeOption?.index || 0;
      let nextIndex = 0;
      let element = activeOption?.element;
      let totalOptions = -1;

      if (!activeOption && autoSelection === AutoSelection.None) {
        const nextOptions = getNavigableOptions();
        const nextActiveOption = getFirstNavigableOption(nextOptions);
        setCurrentOptions(nextOptions);
        return {
          element: nextActiveOption?.element,
          nextIndex: nextActiveOption?.index || 0,
        };
      }

      while (totalOptions++ < lastIndex) {
        nextIndex = getNextIndex(currentIndex, lastIndex, key);
        element = currentOptions[nextIndex];
        const triggerLazyLoad = nextIndex >= lastIndex;
        const isDisabled = element?.getAttribute('aria-disabled') === 'true';

        if (triggerLazyLoad && willLoadMoreOptions) {
          await handleKeyToBottom();
        }

        if (isDisabled) {
          currentIndex = nextIndex;
          element = undefined;
          continue;
        }

        break;
      }
      return {element, nextIndex};
    },
    [
      autoSelection,
      currentOptions,
      activeOption,
      willLoadMoreOptions,
      getNextIndex,
      handleKeyToBottom,
      getFirstNavigableOption,
      getNavigableOptions,
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
      if (keyboardEventsEnabled) {
        const nextActiveOption = getFirstNavigableOption(currentOptions);

        if (nextActiveOption) {
          const {element, index} = nextActiveOption;
          const nextOption = getFormattedOption(element, index);
          handleChangeActiveOption(nextOption);
        }
      }
      if (enableKeyboardControl) return;
      disableKeyboardEvents();
    },
    [
      enableKeyboardControl,
      currentOptions,
      keyboardEventsEnabled,
      disableKeyboardEvents,
      getFirstNavigableOption,
      getFormattedOption,
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
      <Text variant="bodySm" as="span" visuallyHidden>
        <div aria-live="polite">{loading ? loading : null}</div>
      </Text>
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
