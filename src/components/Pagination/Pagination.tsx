import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';

import * as styles from './Pagination.scss';

export interface PaginationDescriptor {
  hasNext?: boolean,
  hasPrevious?: boolean,
  nextURL?: string,
  previousURL?: string,
  onNext?(): void,
  onPrevious?(): void,
}

export interface Props extends PaginationDescriptor {
  plain?: boolean,
}

export default function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  plain,
}: Props) {
  const className = classNames(
    styles.Pagination,
    plain && styles.plain,
  );

  const previousButton = previousURL
    ? (
      <UnstyledLink
        className={styles.Button}
        url={previousURL}
        aria-label="Previous"
      >
        <Icon source="arrowLeft" />
      </UnstyledLink>
    )
    : (
      <button
        onClick={onPrevious}
        className={styles.Button}
        aria-label="Previous"
        disabled={!hasPrevious}
      >
        <Icon source="arrowLeft" />
      </button>
  );

  const nextButton = nextURL
    ? (
      <UnstyledLink
        className={styles.Button}
        url={nextURL}
        aria-label="Next"
      >
        <Icon source="arrowRight" />
      </UnstyledLink>
    )
    : (
      <button
        onClick={onNext}
        className={styles.Button}
        aria-label="Next"
        disabled={!hasNext}
      >
        <Icon source="arrowRight" />
      </button>
  );

  return (
    <span className={className}>
      {previousButton}
      {nextButton}
    </span>
  );
}
