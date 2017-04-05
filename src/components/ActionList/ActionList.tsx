import * as React from 'react';
import Item, {Props as ItemProps} from './Item';
import * as styles from './ActionList.scss';

export interface Section {
  title?: string,
  items: ItemProps[],
}

export interface Props {
  items?: ItemProps[],
  sections?: Section[],
}

export default function ActionList({items, sections}: Props) {
  let finalSections: Section[] = [];

  if (items) {
    finalSections = [{items}];
  } else if (sections) {
    finalSections = sections;
  }

  const hasMultipleSections = finalSections.length > 1;
  const element = hasMultipleSections ? 'ul' : 'div';
  const sectionMarkup = finalSections.map((section, index) => {
    const sectionElement = hasMultipleSections ? 'li' : 'div';
    const actionMarkup = section.items.map(({text, ...item}) => (
      <Item key={text} text={text} {...item} />
    ));

    const titleMarkup = section.title
      ? <p className={styles.Title}>{section.title}</p>
      : null;

    return React.createElement(
      sectionElement,
      {key: section.title || index},
      titleMarkup,
      <ul className={styles.Actions}>{actionMarkup}</ul>,
    );
  });

  return React.createElement(
    element,
    {className: styles.ActionList},
    sectionMarkup,
  );
}
