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
import {Key} from '../../types';
import {KeypressListener} from '../KeypressListener';
import {VisuallyHidden} from '../VisuallyHidden';
import {useComboboxListbox} from '../../utilities/combobox';
import {closestParentMatch} from '../../utilities/closest-parent-match';
import {scrollIntoView} from '../../utilities/scroll-into-view';
import {ListboxContext, WithinListboxContext} from '../../utilities/listbox';
import type {NavigableOption} from '../../utilities/listbox';

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
  const listboxClassName = classNames(styles.Listbox);
  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents,
  } = useToggle(Boolean(enableKeyboardControl));
  const listId = useUniqueId('Listbox');
  const scrollableRef = useRef<HTMLElement | null>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [loading, setLoading] = useState<string>();
  const [
    currentActiveOption,
    setCurrentActiveOption,
  ] = useState<NavigableOption>();
  const {
    setActiveOptionId,
    setListboxId,
    listboxId,
    textFieldLabelId,
    onOptionSelected,
    onKeyToBottom,
    textFieldFocused,
  } = useComboboxListbox();

  const inCombobox = Boolean(setActiveOptionId);

  useEffect(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);

  useEffect(() => {
    if (!currentActiveOption || !setActiveOptionId) return;
    setActiveOptionId(currentActiveOption.domId);
  }, [currentActiveOption, setActiveOptionId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScrollIntoView = useCallback(
    debounce((option: NavigableOption, first: boolean) => {
      if (scrollableRef.current) {
        const {element} = option;
        const focusTarget = first
          ? closestParentMatch(element, listboxSectionDataSelector.selector) ||
            element
          : element;

        scrollIntoView(focusTarget, scrollableRef.current);
      }
    }, 15),
    [],
  );

  const handleChangeActiveOption = useCallback(
    (nextOption?: NavigableOption) => {
      setCurrentActiveOption((currentActiveOption) => {
        if (currentActiveOption) {
          currentActiveOption.element.removeAttribute(DATA_ATTRIBUTE);
        }

        if (nextOption) {
          nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');
          if (scrollableRef.current) {
            const first =
              getNavigableOptions().findIndex(
                (element) => element.id === nextOption.element.id,
              ) === 0;

            handleScrollIntoView(nextOption, first);
          }
          return nextOption;
        } else {
          return undefined;
        }
      });
    },
    [handleScrollIntoView],
  );

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

  function findNextValidOption(type: ArrowKeys) {
    const isUp = type === 'up';
    const navItems = getNavigableOptions();
    let nextElement: HTMLElement | null | undefined =
      currentActiveOption?.element;
    let count = -1;

    while (count++ < navItems.length) {
      let nextIndex;
      if (nextElement) {
        const currentId = nextElement?.id;
        const currentIndex = navItems.findIndex(
          (currentNavItem) => currentNavItem.id === currentId,
        );

        let increment = isUp ? -1 : 1;
        if (currentIndex === 0 && isUp) {
          increment = navItems.length - 1;
        } else if (currentIndex === navItems.length - 1 && !isUp) {
          increment = -(navItems.length - 1);
        }

        nextIndex = currentIndex + increment;
        nextElement = navItems[nextIndex];
      } else {
        nextIndex = isUp ? navItems.length - 1 : 0;
        nextElement = navItems[nextIndex];
      }

      if (nextElement?.getAttribute('aria-disabled') === 'true') continue;

      if (nextIndex === navItems.length - 1 && onKeyToBottom) {
        onKeyToBottom();
      }
      return nextElement;
    }

    return null;
  }

  function handleArrow(type: ArrowKeys, evt: KeyboardEvent) {
    evt.preventDefault();

    const nextValidElement = findNextValidOption(type);

    if (!nextValidElement) return;

    const nextOption = {
      domId: nextValidElement.id,
      value:
        nextValidElement.getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE) || '',
      element: nextValidElement,
      disabled: nextValidElement.getAttribute('aria-disabled') === 'true',
    };

    handleChangeActiveOption(nextOption);
  }

  function handleDownArrow(evt: KeyboardEvent) {
    handleArrow('down', evt);
  }

  function handleUpArrow(evt: KeyboardEvent) {
    handleArrow('up', evt);
  }

  function handleEnter(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    if (currentActiveOption) {
      onOptionSelect(currentActiveOption);
    }
  }

  function handleFocus() {
    if (enableKeyboardControl) return;
    enableKeyboardEvents();
  }

  function handleBlur(event: React.FocusEvent) {
    event.stopPropagation();
    if (keyboardEventsEnabled) {
      handleChangeActiveOption();
    }
    if (enableKeyboardControl) return;
    disableKeyboardEvents();
  }

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
              aria-activedescendant={
                currentActiveOption && currentActiveOption.domId
              }
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

  function getNavigableOptions() {
    return [
      ...new Set(
        listboxRef.current?.querySelectorAll<HTMLElement>(
          LISTBOX_OPTION_SELECTOR,
        ),
      ),
    ];
  }
}

Listbox.Option = Option;
Listbox.TextOption = TextOption;
Listbox.Loading = Loading;
Listbox.Section = Section;
Listbox.Header = Header;
Listbox.Action = Action;
