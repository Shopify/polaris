import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import ToolTip from '../Tooltip';
import KeypressListener from '../KeypressListener';
import {Keys} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import * as styles from './Pagination.scss';

export interface PaginationDescriptor {
  /** Keyboard shortcuts for the next button */
  nextKeys?: Keys[];
  /** Keyboard shortcuts for the previous button */
  previousKeys?: Keys[];
  /** Tooltip for the next button */
  nextTooltip?: string;
  /** Tooltip for the previous button */
  previousTooltip?: string;
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
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
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
      id="previousURL"
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
      id="nextURL"
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

  const constructedPrevious = previousTooltip ? (
    <ToolTip content={previousTooltip}>{previousButton}</ToolTip>
  ) : (
    previousButton
  );

  const constructedNext = nextTooltip ? (
    <ToolTip content={nextTooltip}>{nextButton}</ToolTip>
  ) : (
    nextButton
  );

  const previousButtonEvents =
    previousKeys &&
    (previousURL || onPrevious) &&
    previousKeys.map((key, idx) => (
      <KeypressListener
        key={idx}
        keyCode={key}
        handler={
          previousURL
            ? clickPaginationLink('previousURL')
            : (onPrevious as () => void)
        }
      />
    ));

  const nextButtonEvents =
    nextKeys &&
    (nextURL || onNext) &&
    nextKeys.map((key, idx) => (
      <KeypressListener
        key={idx}
        keyCode={key}
        handler={
          nextURL ? clickPaginationLink('nextURL') : (onNext as () => void)
        }
      />
    ));

  return (
    <nav className={className} aria-label={label}>
      {previousButtonEvents}
      {constructedPrevious}
      {nextButtonEvents}
      {constructedNext}
    </nav>
  );
}

function clickPaginationLink(id: string) {
  return () => {
    const link = document.getElementById(id);
    if (link) {
      link.click();
    }
  };
}

export default withAppProvider<Props>()(Pagination);
