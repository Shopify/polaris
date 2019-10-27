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
import {Option} from '../Option';
import {ListBoxContext} from './context/list-box';
import styles from './ListBox.scss';

export type ListBoxProps = {
  children?: React.ReactNode | React.ReactNode[];
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

  // const listBoxRef = useRef<HTMLDivElement>(null);
  // const scrollableRef = useRef<Element | null>(null);
  // const [scrollableState, setScrollableState] = useState({});

  // const handleScroll = useCallback(
  //   ({target}: Event) => {
  //     const scrolltop = target && (target as HTMLDivElement).scrollTop;
  //     setScrollableState({...scrollableState, scrolltop});
  //   },
  //   [scrollableState],
  // );

  // const handleResize = useCallback(
  //   ({target}: Event) => {
  //     const height = target && (target as HTMLDivElement).clientHeight;
  //     setScrollableState({...scrollableState, height});
  //   },
  //   [scrollableState],
  // );

  // // So that the Option gets the require info
  // useEffect(() => {
  //   scrollableRef.current = listBoxRef.current
  //     ? listBoxRef.current.closest(scrollable.selector)
  //     : null;

  //   const scrollableEl = scrollableRef.current;

  //   if (scrollableEl) {
  //     scrollableEl.addEventListener('scroll', handleScroll);
  //     scrollableEl.addEventListener('resize', handleResize);
  //     scrollableEl.dispatchEvent(new Event('scroll'));
  //     scrollableEl.dispatchEvent(new Event('resize'));
  //   }

  //   return () => {
  //     if (scrollableEl) {
  //       scrollableEl.removeEventListener('scroll', handleScroll);
  //       scrollableEl.removeEventListener('resize', handleResize);
  //     }
  //   };
  // }, [handleResize, handleScroll]);

  const combobox = useComboBox();

  if (!combobox) {
    throw new Error('ListBox must be used inside a Combobox');
  }

  const {
    // setFirstOptionLabel,
    // firstOptionLabel,
    onOptionSelected,
    listBoxId,
  } = combobox;

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
          // setFirstOptionLabel &&
          //   !firstOptionLabel &&
          //   setFirstOptionLabel(child.props.label);
          return child.props.value;
        }
      },
    );
    setNavigableItems(updatedNavigableItems);
    // setNavigableItemsCursor(-1);
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

  const handleNextPosition = useCallback(
    (nextPosition: number) => {
      setKeyboardFocusedItem(navigableItems[nextPosition]);
      setNavigableItemsCursor(nextPosition);
    },
    [navigableItems],
  );

  /** key interactions */
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

  // this check doesn't work
  return React.Children.toArray(children).length > 0 ? (
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
