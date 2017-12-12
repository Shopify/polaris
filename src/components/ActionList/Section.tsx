import * as React from 'react';
import Item, {Props as ItemProps} from './Item';

import * as styles from './ActionList.scss';

export interface ActionListSection {
  title?: string,
  items: ItemProps[],
}

export interface Props {
  index: number,
  section: ActionListSection,
  hasMultipleSections: boolean,
  onActionAnyItem?: ItemProps['onAction'],
}

export default function Section({
  index,
  section,
  hasMultipleSections,
  onActionAnyItem,
}: Props) {

  const SectionElement: string = hasMultipleSections ? 'li' : 'div';
  const handleAction = (itemOnAction: ItemProps['onAction']) => {
    return () => {
      if (itemOnAction) {itemOnAction();}
      if (onActionAnyItem) {onActionAnyItem();}
    };
  };
  const actionMarkup = section.items.map(({content, onAction, ...item}) => {
    return (
      <Item key={content} content={content} onAction={handleAction(onAction)} {...item} />
    );
  });

  const className = section.title
    ? null
    : styles['Section-withoutTitle'];

  const titleMarkup = section.title
    ? <p className={styles.Title}>{section.title}</p>
    : null;

  return (
    <SectionElement key={section.title || index} className={className}>
      {titleMarkup}
      <ul className={styles.Actions}>{actionMarkup}</ul>
    </SectionElement>
  );
}
