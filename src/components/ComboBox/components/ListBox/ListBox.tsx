import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useMediaQuery} from '../../../../utilities/media-query';
import {
  elementChildren,
  isElementOfType,
} from '../../../../utilities/components';
import {Key} from '../../../../types';
import {classNames} from '../../../../utilities/css';
import {KeypressListener} from '../../../KeypressListener';
import {scrollable} from '../../../shared';
import {Option} from '../Option';
import {Section} from '../Section';
import {ComboBoxChildrenType} from '../../ComboBox';

import {ListBoxContext} from './context/list-box';
import styles from './ListBox.scss';

export type ListBoxProps = {
  children: ComboBoxChildrenType | ComboBoxChildrenType[];
};

export function ListBox({children}: ListBoxProps) {
  const listBoxClassName = classNames(styles.ListBox);
  const [navigableItems, setNavigableItems] = useState([] as string[]);
  const [keyboardFocusedItem, setKeyboardFocusedItem] = useState();
  // const [navigableItemsCursor, setNavigableItemsCursor] = useState(-1);
  const {isNavigationCollapsed} = useMediaQuery();
  const scrollableRef = useRef<Element | null>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);
  const totalOptions = useRef<number>(navigableItems.length);

  useEffect(() => {
    if (listBoxRef.current) {
      scrollableRef.current = listBoxRef.current.closest(scrollable.selector);
    }
  }, [isNavigationCollapsed]);

  useEffect(() => {
    const updatedNavigableItems = getNavigableItems([children]);
    setNavigableItems(updatedNavigableItems);
    totalOptions.current = updatedNavigableItems.length;
  }, [children]);

  const listBoxContext = {
    keyboardFocusedItem,
    scrollable: scrollableRef.current,
  };

  /** key interactions */
  const handleDownArrow = () => {
    if (!navigableItems) return;
    keyboardFocusedItem == null
      ? setKeyboardFocusedItem(navigableItems[0])
      : handleNextPosition(navigableItems.indexOf(keyboardFocusedItem) + 1);
  };

  const handleUpArrow = () => {
    if (!navigableItems || !totalOptions.current) return;
    keyboardFocusedItem == null
      ? setKeyboardFocusedItem(navigableItems[totalOptions.current - 1])
      : handleNextPosition(navigableItems.indexOf(keyboardFocusedItem) - 1);
  };

  const handleNextPosition = (nextPosition: number) => {
    switch (nextPosition) {
      case -1:
        setKeyboardFocusedItem(navigableItems[totalOptions.current - 1]);
        break;
      case totalOptions.current:
        setKeyboardFocusedItem(navigableItems[0]);
        break;
      default:
        setKeyboardFocusedItem(navigableItems[nextPosition]);
    }
  };

  /** key interactions */
  // const handleNextPosition = useCallback(
  //   (nextPosition: number) => {
  //     setKeyboardFocusedItem(navigableItems[nextPosition]);
  //     setNavigableItemsCursor(nextPosition);
  //   },
  //   [navigableItems],
  // );

  // const handleDownArrow = useCallback(() => {
  //   if (!navigableItems) return;
  //   const nextCursor =
  //     navigableItemsCursor >= totalOptions.current - 1
  //       ? 0
  //       : navigableItemsCursor + 1;
  //   handleNextPosition(nextCursor);
  // }, [handleNextPosition, navigableItems, navigableItemsCursor]);

  // const handleUpArrow = useCallback(
  //   (evt: KeyboardEvent) => {
  //     evt.preventDefault();
  //     if (!navigableItems || !totalOptions.current) return;
  //     const nextCursor =
  //       navigableItemsCursor <= 0
  //         ? totalOptions.current - 1
  //         : navigableItemsCursor - 1;
  //     handleNextPosition(nextCursor);
  //   },
  //   [handleNextPosition, navigableItems, navigableItemsCursor],
  // );

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
        <ul className={listBoxClassName}>{children}</ul>
      </ListBoxContext.Provider>
    </div>
  ) : null;
}

function getNavigableItems(children: React.ReactNodeArray): string[] {
  const updateNavigableItems = elementChildren(children).reduce(
    (acc, child: React.ReactElement<any>) => {
      if (
        child &&
        isElementOfType(child, Option) &&
        !child.props.disabled &&
        child.props.value
      ) {
        return [...acc, child.props.value];
      } else if (child && isElementOfType(child, Section)) {
        return [...acc, ...getNavigableItems(child.props.children)];
      }
    },
    [] as string[],
  );
  return updateNavigableItems ? updateNavigableItems : [];
}
