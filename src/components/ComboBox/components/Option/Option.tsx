import React, {useRef, useCallback, useEffect} from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {useComboBox} from '../../../../utilities/combo-box';
import {classNames} from '../../../../utilities/css';
import {useUniqueId} from '../../../../utilities/unique-id';
import {Key} from '../../../../types';
import {KeypressListener} from '../../../KeypressListener';
import {Icon} from '../../../Icon';
import {Scrollable} from '../../../Scrollable';
import {useListBox} from '../ListBox';
import styles from './Option.scss';

export type OptionProps = {
  value: string;
  suggest?: boolean;
  children?: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
};

export function Option({value, children, selected}: OptionProps) {
  const {keyboardFocusedItem, onItemClick, scrollable} = useListBox();
  const combobox = useComboBox();
  const listItemRef = useRef<HTMLLIElement>(null);
  const id = useUniqueId('ComboBoxOption');

  // useEffect(() => {
  //   if (scrollable && listItemRef.current && keyboardFocusedItem === value) {
  //     const scrollableHeight = scrollable.clientHeight;
  //     const scrollableOffsetTop = (scrollable as HTMLElement).offsetTop;
  //     const optionHeight = scrollable.getBoundingClientRect();
  //     const optionOffsetTop = listItemRef.current.offsetTop;
  //   }
  // });

  // ListBox Context keeps track of which option is keyboard focused using the value
  const currentlyKeyboardFocused = keyboardFocusedItem === value;

  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    currentlyKeyboardFocused && styles.focused,
  );

  useEffect(() => {
    if (currentlyKeyboardFocused && listItemRef.current != null) {
      listItemRef.current.scrollIntoView(false);
    }
  }, [currentlyKeyboardFocused]);

  // The parent doesn't know the id and we need the id for the activeDescendant
  // TODO: TEXTFIELD ONLY PROVIDER
  currentlyKeyboardFocused && combobox && combobox.setActiveDescendant(id);

  // const scrollToView = currentlyKeyboardFocused ? (
  //   <Scrollable.ScrollTo />
  // ) : null;

  const handleItemClick = useCallback(() => {
    onItemClick && onItemClick(value);
  }, [onItemClick, value]);

  const handleEnter = useCallback(() => {
    handleItemClick();
  }, [handleItemClick]);

  const enterKeyListenner = currentlyKeyboardFocused ? (
    <KeypressListener
      keyEventName="keydown"
      keyCode={Key.Enter}
      handler={handleEnter}
    />
  ) : null;

  const selectedIconMarkup = selected ? (
    <div className={styles.Checkmark}>
      <Icon color="indigo" source={TickMinor} />
    </div>
  ) : null;

  return (
    <li
      className={optionClassName}
      id={id}
      ref={listItemRef}
      onClick={handleItemClick}
    >
      {enterKeyListenner}
      <div className={styles.Content}>{children}</div>
      {selectedIconMarkup}
    </li>
  );
}
