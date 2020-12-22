import React, {useRef, useCallback, memo} from 'react';

import {classNames} from '../../../../../../utilities/css';
import {useUniqueId} from '../../../../../../utilities/unique-id';
import {useListBox} from '../../utilities/hooks/useListBox';
import {useSection, listBoxWithinSectionDataSelector} from '../Section';
import {TextOption} from '../TextOption';

import styles from './Option.scss';

export interface OptionProps {
  // Unique item value
  value: string;
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Children. When a string, children are rendered in a styled TextOption
  children?: string | React.ReactNode;
  // Option is selected
  selected?: boolean;
  // Option is disabled
  disabled?: boolean;
  // Adds a border-bottom to the Option
  divider?: boolean;
}

export const Option = memo(function Option({
  value,
  children,
  selected,
  disabled = false,
  accessibilityLabel,
  divider,
}: OptionProps) {
  const {onOptionSelect} = useListBox();
  const listItemRef = useRef<HTMLLIElement>(null);
  const domId = useUniqueId('ListBoxOption');
  const sectionId = useSection();
  const isWithinSection = Boolean(sectionId);

  const handleOptionClick = useCallback(
    (evt: React.MouseEvent) => {
      evt.preventDefault();
      if (onOptionSelect && listItemRef.current) {
        onOptionSelect({
          domId,
          value,
          element: listItemRef.current,
          disabled,
        });
      }
    },
    [domId, onOptionSelect, value, disabled],
  );

  // prevents lost of focus on Textfield
  const handleMouseDown = (evt: React.MouseEvent) => {
    evt.preventDefault();
  };

  const content =
    typeof children === 'string' ? (
      <TextOption selected={selected} disabled={disabled}>
        {children}
      </TextOption>
    ) : (
      children
    );

  const sectionAttributes = {
    [listBoxWithinSectionDataSelector.attribute]: isWithinSection,
  };

  return (
    <li
      {...sectionAttributes}
      data-within-section={isWithinSection}
      data-listbox-option-value={value}
      className={classNames(styles.Option, divider && styles.divider)}
      id={domId}
      ref={listItemRef}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      aria-disabled={disabled}
      onClick={disabled ? undefined : handleOptionClick}
      role="option"
      aria-label={accessibilityLabel}
      aria-selected={selected}
      data-listbox-option
    >
      {content}
    </li>
  );
});
