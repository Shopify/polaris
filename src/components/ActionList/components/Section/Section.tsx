import React from 'react';

import {classNames} from '../../../../utilities/css';
import {Item} from '../Item';
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
  actionRole?: string;
  /** Whether or not the section is the first to appear */
  firstSection?: boolean;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export function Section({
  section,
  hasMultipleSections,
  actionRole,
  firstSection,
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
        <Item
          key={`${content}-${index}`}
          content={content}
          helpText={helpText}
          role={actionRole}
          onAction={handleAction(onAction)}
          {...item}
        />
      );
    },
  );

  const className = section.title ? undefined : styles['Section-withoutTitle'];
  const titleClassName = classNames(
    styles.Title,
    firstSection && styles.firstSectionWithTitle,
  );

  const titleMarkup = section.title ? (
    <p className={titleClassName}>{section.title}</p>
  ) : null;

  let sectionRole;
  switch (actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;
    case 'menuitem':
      sectionRole = 'menu';
      break;
    default:
      sectionRole = undefined;
      break;
  }

  const sectionMarkup = (
    <div className={className}>
      {titleMarkup}
      <ul className={styles.Actions} role={sectionRole}>
        {actionMarkup}
      </ul>
    </div>
  );

  return hasMultipleSections ? (
    <li className={styles.Section}>{sectionMarkup}</li>
  ) : (
    sectionMarkup
  );
}
