import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useComboBox} from '../../../../utilities/combo-box';
import {
  elementChildren,
  isElementOfType,
} from '../../../../utilities/components';
import {Key} from '../../../../types';
import {classNames} from '../../../../utilities/css';
import {KeypressListener} from '../../../KeypressListener';
import {scrollable} from '../../../shared';
import {Option, OptionProps} from '../Option';
import {ListBoxContext} from './context/list-box';
import styles from './ListBox.scss';

export type ListBoxProps = {
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
};

export type ScrollabelState = {
  height: number;
  scrollTop: number;
};

export function ListBox({children}: ListBoxProps) {
  const listBoxClassName = classNames(styles.ListBox);
  const [navigableItems, setNavigableItems] = useState([] as string[]);
  const [keyboardFocusedItem, setKeyboardFocusedItem] = useState();
  const [navigableItemsCursor, setNavigableItemsCursor] = useState(-1);
  const scrollableRef = useRef<Element | null>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBoxRef.current) {
      scrollableRef.current =
        listBoxRef.current.closest(scrollable.selector) || null;
    }
  }, []);

  const combobox = useComboBox();

  if (!combobox) {
    throw new Error('ListBox must be used inside a Combobox');
  }

  const {onOptionSelected, listBoxId} = combobox;

  const totalOptions = useRef<number>(navigableItems.length);

  // TODO: recursive when we add sections
  useEffect(() => {
    const updatedNavigableItems = elementChildren(children).map(
      (child: React.ReactElement<any>) => {
        if (
          child &&
          isElementOfType(child, Option) &&
          !child.props.disabled &&
          child.props.value
        ) {
          return child.props.value;
        }
      },
    );
    setNavigableItems(updatedNavigableItems);
    totalOptions.current = updatedNavigableItems.length;
  }, [children]);

  const onItemClick = (value: string) => {
    onOptionSelected(value);
  };

  const listBoxContext = {
    keyboardFocusedItem,
    onItemClick,
    scrollable:
      scrollableRef.current != null ? scrollableRef.current : undefined,
  };

  /** key interactions */
  const handleNextPosition = useCallback(
    (nextPosition: number) => {
      setKeyboardFocusedItem(navigableItems[nextPosition]);
      setNavigableItemsCursor(nextPosition);
    },
    [navigableItems],
  );

  const handleDownArrow = useCallback(() => {
    if (!navigableItems) return;
    const nextCursor =
      navigableItemsCursor >= totalOptions.current - 1
        ? 0
        : navigableItemsCursor + 1;
    handleNextPosition(nextCursor);
  }, [handleNextPosition, navigableItems, navigableItemsCursor]);

  const handleUpArrow = useCallback(
    (evt: KeyboardEvent) => {
      evt.preventDefault();
      if (!navigableItems || !totalOptions.current) return;
      const nextCursor =
        navigableItemsCursor <= 0
          ? totalOptions.current - 1
          : navigableItemsCursor - 1;
      handleNextPosition(nextCursor);
    },
    [handleNextPosition, navigableItems, navigableItemsCursor],
  );

  const handleEnter = useCallback((evt: KeyboardEvent) => {
    evt.preventDefault();
  }, []);

  return children ? (
    <div ref={listBoxRef}>
      <KeypressListener
        keyEventName="keydown"
        keyCode={Key.DownArrow}
        handler={handleDownArrow}
      />
      <KeypressListener
        keyEventName="keydown"
        keyCode={Key.UpArrow}
        handler={handleUpArrow}
      />
      <KeypressListener
        keyEventName="keydown"
        keyCode={Key.UpArrow}
        handler={handleEnter}
      />
      <ListBoxContext.Provider value={listBoxContext}>
        <ul id={listBoxId} className={listBoxClassName}>
          {children}
        </ul>
      </ListBoxContext.Provider>
    </div>
  ) : null;
}
