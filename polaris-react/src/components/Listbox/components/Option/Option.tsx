import React, {useRef, useCallback, memo, useContext, useId} from 'react';

import {classNames} from '../../../../utilities/css';
import {useListbox} from '../../../../utilities/listbox';
import {useSection, listboxWithinSectionDataSelector} from '../Section';
import {TextOption} from '../TextOption';
import {UnstyledLink} from '../../../UnstyledLink';
import {MappedActionContext} from '../../../../utilities/autocomplete';
import {ActionContext} from '../../../../utilities/listbox/context';
import {Box} from '../../../Box';
import {InlineStack} from '../../../InlineStack';

import styles from './Option.module.css';

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
  const isAction = useContext(ActionContext);
  const {role, url, external, onAction, destructive} =
    useContext(MappedActionContext);

  const listItemRef = useRef<HTMLLIElement>(null);
  const domId = useId();
  const sectionId = useSection();
  const isWithinSection = Boolean(sectionId);

  const handleOptionSelect = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onAction && onAction();
      if (listItemRef.current && !onAction) {
        onOptionSelect({
          domId,
          value,
          element: listItemRef.current,
          disabled,
        });
      }
    },
    [domId, onOptionSelect, value, disabled, onAction],
  );

  // prevents lost of focus on Textfield
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  // Always use TextOption to ensure consistent behavior and styling
  const content = (
    <TextOption selected={selected} disabled={disabled}>
      {children}
    </TextOption>
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
      data-listbox-option
      data-listbox-option-action={isAction}
      data-listbox-option-value={value}
      data-listbox-option-destructive={destructive}
      data-within-section={isWithinSection}
      className={classNames(styles.Option, divider && styles.divider)}
      id={domId}
      ref={listItemRef}
      tabIndex={-1}
      role={legacyRoleSupport}
      aria-label={accessibilityLabel}
      aria-selected={selected}
      aria-disabled={disabled}
      onClick={disabled ? undefined : handleOptionSelect}
      onKeyDown={disabled ? undefined : handleOptionSelect}
      onMouseDown={handleMouseDown}
    >
      {contentMarkup}
    </li>
  );
});
