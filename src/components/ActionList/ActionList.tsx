import React from 'react';
import {ActionListItemDescriptor, ActionListSection} from '../../types';
import {useFeatures} from '../../utilities/features';
import {classNames} from '../../utilities/css';
import {Section} from './components';

import styles from './ActionList.scss';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export function ActionList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem,
}: ActionListProps) {
  let finalSections: ActionListSection[] = [];

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const {newDesignLanguage = false} = useFeatures();
  const className = classNames(
    styles.ActionList,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const hasMultipleSections = finalSections.length > 1;
  // Type asserting to any is required for TS3.2 but can be removed when we update to 3.3
  // see https://github.com/Microsoft/TypeScript/issues/28768
  const Element: any = hasMultipleSections ? 'ul' : 'div';
  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={section.title || index}
        section={section}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
        onActionAnyItem={onActionAnyItem}
      />
    ) : null;
  });

  return <Element className={className}>{sectionMarkup}</Element>;
}
