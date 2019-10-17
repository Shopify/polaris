import React, {useRef} from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {classNames} from '../../../../../../utilities/css';
import {useListBox} from '../../hooks/useListBox';
import {Icon} from '../../../../../Icon';
import styles from './Option.scss';

export type OptionProps = {
  label: string;
  id: string;
  children?: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
};

export function Option({id, label, children, selected}: OptionProps) {
  const {keyboardFocusedOption, onItemClick} = useListBox();
  const listItemRef = useRef<HTMLLIElement>(null);
  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    keyboardFocusedOption === id && styles.focused,
  );

  const handleItemClick = () => {
    onItemClick && onItemClick(id);
  };

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
      <div className={styles.Content}>{content}</div>
      {selectedIconMarkup}
    </li>
  );
}
