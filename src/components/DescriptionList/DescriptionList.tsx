import * as React from 'react';
import * as styles from './DescriptionList.scss';

export interface Item {
  term: string,
  description: React.ReactNode,
}

export interface Props {
  items: Item[],
}

export default function DescriptionList({items}: Props) {
  const terms = items.reduce((allTerms, {term, description}) => ([
    ...allTerms,
    <dt key={`${term}-term`} className={styles.Term}>{term}</dt>,
    <dd key={`${term}-description`} className={styles.Description}>{description}</dd>,
  ]), [] as React.ReactNode[]);

  return (
    <dl className={styles.DescriptionList}>
      {terms}
    </dl>
  );
}
