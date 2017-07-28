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

export default function ActionList({items, sections = []}: Props) {
  let finalSections: Section[] = [];

  if (items) {
    finalSections = [{items}].concat(sections);
  } else if (sections) {
    finalSections = sections;
  }

  const hasMultipleSections = finalSections.length > 1;
  const Element: string = hasMultipleSections ? 'ul' : 'div';
  const sectionMarkup = finalSections.map((section, index) => renderSection(section, hasMultipleSections, index));

  return <Element className={styles.ActionList}>{sectionMarkup}</Element>;
}

function renderSection(section: Section, hasMultipleSections: boolean, index: number) {
  const SectionElement: string = hasMultipleSections ? 'li' : 'div';
  const actionMarkup = section.items.map(({content, ...item}) => (
    <Item key={content} content={content} {...item} />
  ));

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
