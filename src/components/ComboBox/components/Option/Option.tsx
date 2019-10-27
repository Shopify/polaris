import React, {useRef, useCallback} from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {useComboBox} from '../../../../utilities/combo-box';
import {classNames} from '../../../../utilities/css';
import {useUniqueId} from '../../../../utilities/unique-id';
import {Key} from '../../../../types';
import {KeypressListener} from '../../../KeypressListener';
import {Icon} from '../../../Icon';
import {useListBox} from '../ListBox';
import styles from './Option.scss';

export type OptionProps = {
  label: string;
  value: string;
  suggest?: boolean;
  children?: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
};

export function Option({value, label, children, selected}: OptionProps) {
  const {keyboardFocusedOption, onItemClick} = useListBox();
  const combobox = useComboBox();
  const listItemRef = useRef<HTMLLIElement>(null);
  const id = useUniqueId('ComboBoxOption');

  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    keyboardFocusedOption === value && styles.focused,
  );

  // ListBox Context keeps track of which option is keyboard focused using the value
  const currentlyKeyboardFocused = keyboardFocusedOption === value;

  // The parent doesn't know the id and we need the id for the activeDescendant
  // TODO: TEXTFIELD ONLY PROVIDER
  currentlyKeyboardFocused && combobox && combobox.setActiveDescendant(id);

  const handleItemClick = useCallback(() => {
    onItemClick && onItemClick(value);
  }, [onItemClick, value]);

  const handleEnter = useCallback(
    (evt: KeyboardEvent) => {
      evt.preventDefault();
      handleItemClick();
    },
    [handleItemClick],
  );

  const enterKeyListenner = currentlyKeyboardFocused ? (
    <KeypressListener
      keyEventName="keydown"
      keyCode={Key.Enter}
      handler={handleEnter}
    />
  ) : null;

  const content = children ? children : label;
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
      <div className={styles.Content}>{content}</div>
      {selectedIconMarkup}
    </li>
  );
}
