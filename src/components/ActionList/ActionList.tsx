import * as React from 'react';
import {Props as ItemProps} from './Item';
import Section, {ActionListSection} from './Section';

import * as styles from './ActionList.scss';

export interface Props {
  /** Collection of actions for list */
  items?: ItemProps[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ItemProps['onAction'];
}

export default function ActionList({
  items,
  sections = [],
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
      />
    );
  });

  return <Element className={styles.ActionList}>{sectionMarkup}</Element>;
}
