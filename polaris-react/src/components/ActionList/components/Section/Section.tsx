import React from 'react';

import {Item} from '../Item';
import {Box} from '../../../Box';
import {Text} from '../../../Text';
import type {
  ActionListItemDescriptor,
  ActionListSection,
} from '../../../../types';
import styles from '../../ActionList.scss';

export interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export function Section({
  section,
  hasMultipleSections,
  actionRole,
  onActionAnyItem,
}: SectionProps) {
  const handleAction = (itemOnAction: ActionListItemDescriptor['onAction']) => {
    return () => {
      if (itemOnAction) {
        itemOnAction();
      }
      if (onActionAnyItem) {
        onActionAnyItem();
      }
    };
  };
  const actionMarkup = section.items.map(
    ({content, helpText, onAction, ...item}, index) => {
      return (
        <li
          key={`${content}-${index}`}
          role={actionRole === 'menuitem' ? 'presentation' : undefined}
        >
          <Item
            content={content}
            helpText={helpText}
            role={actionRole}
            onAction={handleAction(onAction)}
            {...item}
          />
        </li>
      );
    },
  );

  const className = section.title ? undefined : styles['Section-withoutTitle'];

  const titleMarkup = section.title ? (
    <Box paddingInlineStart="4" paddingBlockEnd="3" paddingInlineEnd="4">
      <Text as="p" variant="headingXs">
        {section.title}
      </Text>
    </Box>
  ) : null;

  let sectionRole;
  switch (actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;
    case 'menuitem':
      sectionRole = !hasMultipleSections ? 'menu' : 'presentation';
      break;
    default:
      sectionRole = undefined;
      break;
  }

  const sectionMarkup = (
    <div className={className}>
      {titleMarkup}
      <ul
        className={styles.Actions}
        role={sectionRole}
        tabIndex={!hasMultipleSections ? -1 : undefined}
      >
        {actionMarkup}
      </ul>
    </div>
  );

  return hasMultipleSections ? (
    <li className={styles.Section} role="presentation">
      {sectionMarkup}
    </li>
  ) : (
    sectionMarkup
  );
}
