import * as React from 'react';
import * as styles from './DescriptionList.scss';

export interface Item {
  term: string,
  description: React.ReactNode,
}

export interface Props {
  items: Item[],
}

export default class DescriptionList extends React.PureComponent<Props, {}> {
  render() {
    const {items} = this.props;
    const terms = items.reduce((allTerms, {term, description}) => ([
      ...allTerms,
      <dt key={`${term}-dt`} className={styles.Term}>{term}</dt>,
      <dd key={`${term}-dd`} className={styles.Description}>{description}</dd>,
    ]), [] as React.ReactNode[]);

    return (
      <dl className={styles.DescriptionList}>
        {terms}
      </dl>
    );
  }
}
