import * as React from 'react';
import Item, {Props as ItemProps} from './Item';

import * as styles from './ActionList.scss';

export interface ActionListSection {
  title?: string;
  items: ItemProps[];
}

export interface Props {
  section: ActionListSection;
  hasMultipleSections: boolean;
  onActionAnyItem?: ItemProps['onAction'];
}

export default function Section({
  section,
  hasMultipleSections,
  onActionAnyItem,
}: Props) {
  const handleAction = (itemOnAction: ItemProps['onAction']) => {
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
