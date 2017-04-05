import * as React from 'react';
import * as styles from './DescriptionList.scss';

export interface Props {
  term: React.ReactNode,
  description: React.ReactNode,
}

export default function Item({term, description}: Props) {
  return (
    <div className={styles.Item}>
      <dt className={styles.Term}>{term}</dt>
      <dd className={styles.Description}>{description}</dd>
    </div>
  );
}
