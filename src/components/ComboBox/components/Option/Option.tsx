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
  ariaLabel?: string;
};

export function Option({
  value,
  children,
  selected,
  suggest,
  ariaLabel,
}: OptionProps) {
  const {keyboardFocusedItem} = useListBox();
  const {setActiveDescendant, setSuggestion, onOptionSelected} = useComboBox();
  const listItemRef = useRef<HTMLLIElement>(null);
  // const scrollableRef = useRef<HTMLElement | Document>(document);
  const id = useUniqueId('ComboBoxOption');
  const text = typeof children === 'string' ? children : ariaLabel;

  setSuggestion && suggest && text && setSuggestion(text);

  // const scrollable = useRef<any>(Scrollable.forNode(listItemRef.current));

  // useEffect(() => {
  //   if (keyboardFocusedItem && listItemRef.current) {
  //     const scrollable = Scrollable.forNode(listItemRef.current);
  //     scrollableRef.current = scrollable;
  //   }
  // }, [keyboardFocusedItem]);

  // console.log(combobox && suggest && value);

  // useEffect(() => {
  //   if (scrollable && listItemRef.current && keyboardFocusedItem === value) {
  //     const scrollableHeight = scrollable.clientHeight;
  //     const scrollableOffsetTop = (scrollable as HTMLElement).offsetTop;
  //     const optionHeight = scrollable.getBoundingClientRect();
  //     const optionOffsetTop = listItemRef.current.offsetTop;
  //   }
  // });`

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
  currentlyKeyboardFocused && setActiveDescendant && setActiveDescendant(id);

  // const scrollToView = currentlyKeyboardFocused ? (
  //   <Scrollable.ScrollTo />
  // ) : null;

  const handleItemClick = useCallback(() => {
    onOptionSelected && onOptionSelected(value);
  }, [onOptionSelected, value]);

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
