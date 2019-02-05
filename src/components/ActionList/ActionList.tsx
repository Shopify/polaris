import * as React from 'react';
import {ActionListItemDescriptor, ActionListSection} from '../../types';
import {Section} from './components';

import styles from './ActionList.scss';

export interface Props {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export default function ActionList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem,
}: Props) {
  let finalSections: ActionListSection[] = [];

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const hasMultipleSections = finalSections.length > 1;
  const Element: string = hasMultipleSections ? 'ul' : 'div';
  const sectionMarkup = finalSections.map((section, index) => {
    return (
      <Section
        key={section.title || index}
        section={section}
        onActionAnyItem={onActionAnyItem}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
      />
    );
  });

  return <Element className={styles.ActionList}>{sectionMarkup}</Element>;
}
