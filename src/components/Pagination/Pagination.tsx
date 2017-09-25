import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import * as styles from './Pagination.scss';

export interface PaginationDescriptor {
  hasNext?: boolean,
  hasPrevious?: boolean,
  nextURL?: string,
  previousURL?: string,
  accessibilityLabel?: string,
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
  accessibilityLabel,
}: Props) {
  let label: string;

  if (accessibilityLabel) {
    label = accessibilityLabel;
  } else {
    label = 'Pagination';
  }

  const className = classNames(
    styles.Pagination,
    plain && styles.plain,
  );

  const previousButton = previousURL
    ? (
      <UnstyledLink
        className={styles.Button}
        url={previousURL}
        onMouseUp={handleMouseUpByBlurring}
        aria-label="Previous"
      >
        <Icon source="arrowLeft" />
      </UnstyledLink>
    )
    : (
      <button
        onClick={onPrevious}
        onMouseUp={handleMouseUpByBlurring}
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
        onMouseUp={handleMouseUpByBlurring}
        aria-label="Next"
      >
        <Icon source="arrowRight" />
      </UnstyledLink>
    )
    : (
      <button
        onClick={onNext}
        onMouseUp={handleMouseUpByBlurring}
        className={styles.Button}
        aria-label="Next"
        disabled={!hasNext}
      >
        <Icon source="arrowRight" />
      </button>
  );

  return (
    <nav className={className} aria-label={label}>
      {previousButton}
      {nextButton}
    </nav>
  );
}
