import React from 'react';

import type {ActionListItemDescriptor, ActionListSection} from '../../types';
import {classNames} from '../../utilities/css';

import {Section} from './components';
import styles from './NotificationList.scss';

export interface NotificationListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export function NotificationList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem,
}: NotificationListProps) {
  let finalSections: ActionListSection[] = [];

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const className = classNames(styles.ActionList);

  const hasMultipleSections = finalSections.length > 1;
  const Element = hasMultipleSections ? 'ul' : 'div';
  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={section.title || index}
        firstSection={index === 0}
        section={section}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
        onActionAnyItem={onActionAnyItem}
      />
    ) : null;
  });

  return <Element className={className}>{sectionMarkup}</Element>;
}
