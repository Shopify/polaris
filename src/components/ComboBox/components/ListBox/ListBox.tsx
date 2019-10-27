import React, {useState, useRef, useEffect} from 'react';

import {useComboBox} from '../../../../utilities/combo-box';
import {
  elementChildren,
  isElementOfType,
} from '../../../../utilities/components';
import {Key} from '../../../../types';
import {classNames} from '../../../../utilities/css';
import {KeypressListener} from '../../../KeypressListener';
import {Option} from '../Option';
import {ListBoxContext} from './context/list-box';
import styles from './ListBox.scss';

export type ListBoxProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export function ListBox({children}: ListBoxProps) {
  const listBoxClassName = classNames(styles.ListBox);
  const [navigableItems, setNavigableItems] = useState([] as string[]);
  const [keyboardFocusedItem, setKeyboardFocusedItem] = useState();
  const [navigableItemsCursor, setNavigableItemsCursor] = useState(0);
  const combobox = useComboBox();

  if (!combobox) {
    throw new Error('ListBox must be used inside a Combobox');
  }

  const {
    setFirstOptionLabel,
    firstOptionLabel,
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
          setFirstOptionLabel &&
            !firstOptionLabel &&
            setFirstOptionLabel(child.props.label);
          return child.props.value;
        }
      },
    );
    setNavigableItems(updatedNavigableItems);
    setNavigableItemsCursor(0);
    totalOptions.current = updatedNavigableItems.length;
  }, [children, firstOptionLabel, setFirstOptionLabel]);

  const onItemClick = (value: string) => {
    onOptionSelected(value);
  };

  const listBoxContext = {
    keyboardFocusedItem,
    onItemClick,
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

  // this check doesn't work
  return React.Children.toArray(children).length > 0 ? (
    <React.Fragment>
      <KeypressListener keyCode={Key.DownArrow} handler={handleDownArrow} />
      <KeypressListener keyCode={Key.UpArrow} handler={handleUpArrow} />
      <ListBoxContext.Provider value={listBoxContext}>
        <ul id={listBoxId} className={listBoxClassName}>
          {children}
        </ul>
      </ListBoxContext.Provider>
    </React.Fragment>
  ) : null;
}
