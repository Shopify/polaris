import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
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

const getUniqueTermKey = createUniqueIDFactory(`Term`);
const getUniqueDescriptionKey = createUniqueIDFactory(`Description`);

export function DescriptionList({items}: DescriptionListProps) {
  const terms = items.reduce(
    (allTerms, {term, description}) => [
      ...allTerms,
      <dt key={getUniqueTermKey()} className={styles.Term}>
        {term}
      </dt>,
      <dd key={getUniqueDescriptionKey()} className={styles.Description}>
        {description}
      </dd>,
    ],
    [] as React.ReactNode[],
  );

  return <dl className={styles.DescriptionList}>{terms}</dl>;
}
