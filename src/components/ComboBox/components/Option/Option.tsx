import React, {useRef, useCallback, useEffect} from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {useComboBox} from '../../../../utilities/combo-box';
import {classNames} from '../../../../utilities/css';
import {useUniqueId} from '../../../../utilities/unique-id';
import {Key} from '../../../../types';
import {KeypressListener} from '../../../KeypressListener';
import {Icon} from '../../../Icon';
import {useListBox} from '../ListBox';
import {useSection} from '../Section';
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
  const {keyboardFocusedItem, scrollable} = useListBox();
  const {setActiveDescendant, setSuggestion, onOptionSelected} = useComboBox();
  const {sectionId} = useSection();
  const listItemRef = useRef<HTMLLIElement>(null);
  const id = useUniqueId('ComboBoxOption');
  const text = typeof children === 'string' ? children : ariaLabel;

  const currentlyKeyboardFocused = keyboardFocusedItem === value;
  setSuggestion && suggest && text && setSuggestion(text);
  currentlyKeyboardFocused && setActiveDescendant && setActiveDescendant(id);

  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    currentlyKeyboardFocused && styles.focused,
  );

  useEffect(() => {
    if (currentlyKeyboardFocused && scrollable && listItemRef.current) {
      const elementTop = listItemRef.current.offsetTop;
      const elementBottom = elementTop + listItemRef.current.clientHeight;
      const viewportTop = (scrollable as HTMLElement).scrollTop;
      const viewportBottom = viewportTop + scrollable.clientHeight;

      let direction: boolean | undefined;

      if (elementBottom > viewportBottom) {
        direction = false;
      } else if (elementTop < viewportTop) {
        direction = true;
      }

      typeof direction === 'boolean' &&
        requestAnimationFrame(() => {
          listItemRef.current && listItemRef.current.scrollIntoView(direction);
        });
    }
  }, [currentlyKeyboardFocused, scrollable]);

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

  const aria = typeof children === 'string' ? children : ariaLabel;

  return (
    <li
      className={optionClassName}
      id={id}
      ref={listItemRef}
      onClick={handleItemClick}
      aria-label={ariaLabel || aria}
      role="option"
      aria-selected={selected || currentlyKeyboardFocused}
      aria-describedby={sectionId}
    >
      {enterKeyListenner}
      <div className={styles.Content}>{children}</div>
      {selectedIconMarkup}
    </li>
  );
}
