import type {ReactNode} from 'react';

import {classNames} from '../../utilities/css';

import styles from './DescriptionList.scss';

interface Item {
  /** Title of the item */
  term: ReactNode;
  /**  Item content */
  description: ReactNode;
}

export interface DescriptionListProps {
  /** Collection of items for list */
  items: Item[];
  /** Determines the spacing between list items */
  spacing?: 'tight' | 'loose';
}

export function DescriptionList({
  items,
  spacing = 'loose',
}: DescriptionListProps) {
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

  const className = classNames(
    styles.DescriptionList,
    spacing === 'tight' && styles.spacingTight,
  );

  return <dl className={className}>{terms}</dl>;
}
