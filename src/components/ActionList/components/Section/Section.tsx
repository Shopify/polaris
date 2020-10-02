import React from 'react';

import {Item} from '../Item';
import type {
  ActionListItemDescriptor,
  ActionListSection,
} from '../../../../types';
import styles from '../../ActionList.scss';
import {useFeatures} from '../../../../utilities/features';
import {classNames} from '../../../../utilities/css';

export interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string;
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

  const {newDesignLanguage} = useFeatures();
  const actionsClassName = classNames(
    styles.Actions,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const titleMarkup = section.title ? (
    <p className={styles.Title}>{section.title}</p>
  ) : null;

  const sectionRole = actionRole === 'option' ? 'presentation' : undefined;

  const sectionMarkup = (
    <div className={className}>
      {titleMarkup}
      <ul className={actionsClassName} role={sectionRole}>
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
