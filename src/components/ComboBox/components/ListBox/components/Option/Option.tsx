import React, {useRef} from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {classNames} from '../../../../../../utilities/css';
import {useUniqueId} from '../../../../../../utilities/unique-id';
import {useListBox} from '../../hooks/useListBox';
import {Icon} from '../../../../../Icon';
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
  const listItemRef = useRef<HTMLLIElement>(null);
  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    keyboardFocusedOption === value && styles.focused,
  );

  const handleItemClick = () => {
    onItemClick && onItemClick(value);
  };

  const content = children ? children : label;
  const id = useUniqueId('Option');
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
      <div className={styles.Content}>{content}</div>
      {selectedIconMarkup}
    </li>
  );
}
