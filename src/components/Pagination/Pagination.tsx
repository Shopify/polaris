import * as React from 'react';
import {ArrowLeftMinor, ArrowRightMinor} from '@shopify/polaris-icons';
import {classNames} from '@shopify/react-utilities';
import isInputFocused from '../../utilities/isInputFocused';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import Tooltip from '../Tooltip';
import KeypressListener from '../KeypressListener';
import {Key} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import styles from './Pagination.scss';

export interface PaginationDescriptor {
  /** Keyboard shortcuts for the next button */
  nextKeys?: Key[];
  /** Keyboard shortcuts for the previous button */
  previousKeys?: Key[];
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
  const node: React.RefObject<HTMLElement> = React.createRef();
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
      <Icon source={ArrowLeftMinor} />
    </UnstyledLink>
  ) : (
    <button
      onClick={onPrevious}
      type="button"
      onMouseUp={handleMouseUpByBlurring}
      className={styles.Button}
      aria-label={intl.translate('Polaris.Pagination.previous')}
      disabled={!hasPrevious}
    >
      <Icon source={ArrowLeftMinor} />
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
      <Icon source={ArrowRightMinor} />
    </UnstyledLink>
  ) : (
    <button
      onClick={onNext}
      type="button"
      onMouseUp={handleMouseUpByBlurring}
      className={styles.Button}
      aria-label={intl.translate('Polaris.Pagination.next')}
      disabled={!hasNext}
    >
      <Icon source={ArrowRightMinor} />
    </button>
  );

  const constructedPrevious = previousTooltip ? (
    <Tooltip content={previousTooltip}>{previousButton}</Tooltip>
  ) : (
    previousButton
  );

  const constructedNext = nextTooltip ? (
    <Tooltip content={nextTooltip}>{nextButton}</Tooltip>
  ) : (
    nextButton
  );

  const previousButtonEvents =
    previousKeys &&
    (previousURL || onPrevious) &&
    hasPrevious &&
    previousKeys.map((key) => (
      <KeypressListener
        key={key}
        keyCode={key}
        handler={
          previousURL
            ? handleCallback(clickPaginationLink('previousURL', node))
            : handleCallback(onPrevious as () => void)
        }
      />
    ));

  const nextButtonEvents =
    nextKeys &&
    (nextURL || onNext) &&
    hasNext &&
    nextKeys.map((key) => (
      <KeypressListener
        key={key}
        keyCode={key}
        handler={
          nextURL
            ? handleCallback(clickPaginationLink('nextURL', node))
            : handleCallback(onNext as () => void)
        }
      />
    ));

  return (
    <nav className={className} aria-label={label} ref={node}>
      {previousButtonEvents}
      {constructedPrevious}
      {nextButtonEvents}
      {constructedNext}
    </nav>
  );
}

function clickPaginationLink(id: string, node: React.RefObject<HTMLElement>) {
  return () => {
    if (node.current == null) {
      return;
    }

    const link: HTMLAnchorElement | null = node.current.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}

function handleCallback(fn: () => void) {
  return () => {
    if (isInputFocused()) {
      return;
    }

    fn();
  };
}

export default withAppProvider<Props>()(Pagination);
