import React from 'react';

import styles from './DescriptionList.scss';

interface Item {
  /** Title of the item */
  term: React.ReactNode;
  /**  Item content */
  description: React.ReactNode;
}

export interface DescriptionListProps {
  /** Collection of items for list */
  items: Item[];
}

export function DescriptionList({items}: DescriptionListProps) {
  // There's no good key to give React so using the index is a last resport.
  // we can't use the term/description value as it may be a react component
  // which can't be stringified
  const terms = items.reduce(
    (allTerms, {term, description}, index) => [
      ...allTerms,
      <dt key={`dt${index}`} className={styles.Term}>
        {term}
      </dt>,
      <dd key={`dd${index}`} className={styles.Description}>
        {description}
      </dd>,
    ],
    [],
  );

  return <dl className={styles.DescriptionList}>{terms}</dl>;
}
