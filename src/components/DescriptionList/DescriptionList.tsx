import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import * as styles from './DescriptionList.scss';

export interface Item {
  term: React.ReactNode;
  description: React.ReactNode;
}

export interface Props {
  /** Collection of items for list */
  items: Item[];
}

const getUniqueTermKey = createUniqueIDFactory(`Term`);
const getUniqueDescriptionKey = createUniqueIDFactory(`Description`);

export default function DescriptionList({items}: Props) {
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
