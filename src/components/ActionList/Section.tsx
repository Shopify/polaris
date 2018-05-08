import * as React from 'react';
import Item from './Item';
import {ItemDescriptor} from './types';

import * as styles from './ActionList.scss';

export interface ActionListSection {
  /** Title of the section */
  title?: string;
  /** List of items */
  items: ItemDescriptor[];
}

export interface Props {
  /** Section of the action */
  section: ActionListSection;
  /** Should their be multiple sections */
  hasMultipleSections: boolean;
  /** Callback when any action takes place */
  onActionAnyItem?: ItemDescriptor['onAction'];
}

export default function Section({
  section,
  hasMultipleSections,
  onActionAnyItem,
}: Props) {
  const handleAction = (itemOnAction: ItemDescriptor['onAction']) => {
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
    ({content, onAction, ...item}, index) => {
      return (
        <Item
          key={`${content}-${index}`}
          content={content}
          onAction={handleAction(onAction)}
          {...item}
        />
      );
    },
  );

  const className = section.title ? null : styles['Section-withoutTitle'];

  const titleMarkup = section.title ? (
    <p className={styles.Title}>{section.title}</p>
  ) : null;

  const sectionMarkup = (
    <div className={className}>
      {titleMarkup}
      <ul className={styles.Actions}>{actionMarkup}</ul>
    </div>
  );

  return hasMultipleSections ? (
    <li className={styles.Section}>{sectionMarkup}</li>
  ) : (
    sectionMarkup
  );
}
