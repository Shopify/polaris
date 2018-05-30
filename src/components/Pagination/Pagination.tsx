import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import * as styles from './Pagination.scss';

export interface PaginationDescriptor {
  /** The URL of the next page */
  nextURL?: string;
  /** The URL of the previous page */
  previousURL?: string;
  /** Whether there is a next page to show */
  hasNext?: boolean;
  /** Whether there is a previous page to show */
  hasPrevious?: boolean;
  /** Accessible label for the pagination */
  accessibilityLabel?: string;
  /** Callback when next button is clicked */
  onNext?(): void;
  /** Callback when previous button is clicked */
  onPrevious?(): void;
}

export interface Props extends PaginationDescriptor {
  /** A more subdued control for use in headers */
  plain?: boolean;
}

export type CombinedProps = Props & WithAppProviderProps;

function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  plain,
  accessibilityLabel,
  polaris: {intl},
}: CombinedProps) {
  let label: string;

  if (accessibilityLabel) {
    label = accessibilityLabel;
  } else {
    label = intl.translate('Polaris.Pagination.pagination');
  }

  const className = classNames(styles.Pagination, plain && styles.plain);

  const previousButton = previousURL ? (
    <UnstyledLink
      className={styles.Button}
      url={previousURL}
      onMouseUp={handleMouseUpByBlurring}
      aria-label={intl.translate('Polaris.Pagination.previous')}
    >
      <Icon source="arrowLeft" />
    </UnstyledLink>
  ) : (
    <button
      onClick={onPrevious}
      onMouseUp={handleMouseUpByBlurring}
      className={styles.Button}
      aria-label={intl.translate('Polaris.Pagination.previous')}
      disabled={!hasPrevious}
    >
      <Icon source="arrowLeft" />
    </button>
  );

  const nextButton = nextURL ? (
    <UnstyledLink
      className={styles.Button}
      url={nextURL}
      onMouseUp={handleMouseUpByBlurring}
      aria-label={intl.translate('Polaris.Pagination.next')}
    >
      <Icon source="arrowRight" />
    </UnstyledLink>
  ) : (
    <button
      onClick={onNext}
      onMouseUp={handleMouseUpByBlurring}
      className={styles.Button}
      aria-label={intl.translate('Polaris.Pagination.next')}
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

export default withAppProvider<Props>()(Pagination);
