import React, {useRef, useCallback, memo, useContext} from 'react';

import {classNames} from '../../../../utilities/css';
import {useUniqueId} from '../../../../utilities/unique-id';
import {useListbox} from '../../../../utilities/listbox';
import {useSection, listboxWithinSectionDataSelector} from '../Section';
import {TextOption} from '../TextOption';
import {UnstyledLink} from '../../../UnstyledLink';
import {MappedActionContext} from '../../../../utilities/autocomplete';

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
  const {onOptionSelect} = useListbox();
  const {role, url, external, onAction, destructive, isAction} = useContext(
    MappedActionContext,
  );
  const listItemRef = useRef<HTMLLIElement>(null);
  const domId = useUniqueId('ListboxOption');
  const sectionId = useSection();
  const isWithinSection = Boolean(sectionId);

  const handleOptionClick = useCallback(
    (evt: React.MouseEvent) => {
      evt.preventDefault();
      onAction && onAction();
      if (listItemRef.current && !isAction) {
        onOptionSelect({
          domId,
          value,
          element: listItemRef.current,
          disabled,
        });
      }
    },
    [domId, onOptionSelect, value, disabled, onAction, isAction],
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
    [listboxWithinSectionDataSelector.attribute]: isWithinSection,
  };

  const legacyRoleSupport = role || 'option';

  const contentMarkup = url ? (
    <UnstyledLink url={url} external={external}>
      {content}
    </UnstyledLink>
  ) : (
    content
  );

  return (
    <li
      {...sectionAttributes}
      data-within-section={isWithinSection}
      data-listbox-option-value={value}
      data-listbox-option-destructive={destructive}
      className={classNames(styles.Option, divider && styles.divider)}
      id={domId}
      ref={listItemRef}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      aria-disabled={disabled}
      onClick={disabled ? undefined : handleOptionClick}
      role={legacyRoleSupport}
      aria-label={accessibilityLabel}
      aria-selected={selected}
      data-listbox-option
    >
      {contentMarkup}
    </li>
  );
});
