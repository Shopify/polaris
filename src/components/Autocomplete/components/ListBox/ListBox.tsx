import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';

import {classNames} from '../../../../utilities/css';
import {useToggle} from '../../../../utilities/use-toggle';
import {useUniqueId} from '../../../../utilities/unique-id';
import {Key} from '../../../../types';
import {KeypressListener} from '../../../KeypressListener';
import {VisuallyHidden} from '../../../VisuallyHidden';
import {useComboBoxListBox} from '../ComboBox/utilities';

import {closestParentMatch} from './utilities/closest-parent-match';
import {scrollIntoView} from './utilities/scroll-into-view';
import {ListBoxContext} from './utilities/context/list-box';
import {
  Option,
  Section,
  Header,
  Action,
  Loading,
  TextOption,
  listBoxSectionDataSelector,
} from './components';
import type {NavigableOption} from './types';
import styles from './ListBox.scss';

export interface ListBoxProps {
  // ListBox.option
  children: ReactNode;
  // Explicitly enable keyboard control
  enableKeyboardControl?: boolean;
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Callback when an option is selected
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

export function ListBox({
  children,
  enableKeyboardControl,
  accessibilityLabel,
  onSelect,
}: ListBoxProps) {
  // const [, ShareTranslations] = useI18n(); TODO FIGURE OUT
  const listBoxClassName = classNames(styles.ListBox);
  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents,
  } = useToggle(Boolean(enableKeyboardControl));
  const listId = useUniqueId('ListBox');
  const scrollableRef = useRef<HTMLElement | null>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [loading, setLoading] = useState<string>();
  const [currentActiveOption, setCurrentActiveOption] = useState<
    NavigableOption
  >();
  const {
    setActiveOptionId,
    setListBoxId,
    listBoxId,
    textFieldLabelId,
    onOptionSelected,
    onKeyToBottom,
    textFieldFocused,
  } = useComboBoxListBox();

  const inComboBox = Boolean(setActiveOptionId);

  if (setListBoxId && !listBoxId) {
    setListBoxId(listId);
  }

  const handleScrollIntoView = (option: NavigableOption, first: boolean) => {
    if (scrollableRef.current) {
      const {element} = option;
      const focusTarget = first
        ? closestParentMatch(element, listBoxSectionDataSelector.selector)
        : element;
      scrollIntoView(focusTarget || element, scrollableRef.current);
    }
  };

  const handleChangeActiveOption = useCallback(
    (nextOption?: NavigableOption) => {
      setCurrentActiveOption((currentActiveOption) => {
        if (currentActiveOption) {
          currentActiveOption.element.removeAttribute(DATA_ATTRIBUTE);
        }

        if (nextOption) {
          if (setActiveOptionId) setActiveOptionId(nextOption.domId);
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
          if (setActiveOptionId) setActiveOptionId('');
          return undefined;
        }
      });
    },
    [setActiveOptionId],
  );

  useEffect(() => {
    if (listBoxRef.current) {
      scrollableRef.current = listBoxRef.current.closest(scrollable.selector);
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

  const listBoxContext = useMemo(
    () => ({
      onOptionSelect,
      setLoading,
    }),
    [onOptionSelect, setLoading],
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

    return nextElement;
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

  const listenners =
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
      {listenners}
      <VisuallyHidden>
        <div aria-live="polite">{loading ? loading : null}</div>
      </VisuallyHidden>
      <ListBoxContext.Provider value={listBoxContext}>
        {children ? (
          <ul
            tabIndex={0}
            role="listbox"
            className={listBoxClassName}
            aria-label={inComboBox ? undefined : accessibilityLabel}
            aria-labelledby={textFieldLabelId}
            aria-busy={Boolean(loading)}
            aria-activedescendant={
              currentActiveOption && currentActiveOption.domId
            }
            id={listId}
            onFocus={inComboBox ? undefined : handleFocus}
            onBlur={inComboBox ? undefined : handleBlur}
            ref={listBoxRef}
          >
            {children}
          </ul>
        ) : null}
      </ListBoxContext.Provider>
    </>
  );

  function getNavigableOptions() {
    return (
      [
        ...new Set(
          listBoxRef.current?.querySelectorAll<HTMLElement>(
            LISTBOX_OPTION_SELECTOR,
          ),
        ),
      ] || []
    );
  }
}

ListBox.Option = Option;
ListBox.TextOption = TextOption;
ListBox.Loading = Loading;
ListBox.Section = Section;
ListBox.Header = Header;
ListBox.Action = Action;
