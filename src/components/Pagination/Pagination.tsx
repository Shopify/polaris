import React from 'react';
import {ArrowLeftMinor, ArrowRightMinor} from '@shopify/polaris-icons';
import {TextStyle} from '../TextStyle';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {isInputFocused} from '../../utilities/is-input-focused';
import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import {Tooltip} from '../Tooltip';
import {KeypressListener} from '../KeypressListener';
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
  /** Text to provide more context in between the arrow buttons */
  label?: string;
}

export interface PaginationProps extends PaginationDescriptor {
  /** A more subdued control for use in headers */
  plain?: boolean;
}

export function Pagination({
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
  label,
}: PaginationProps) {
  const intl = useI18n();

  const node: React.RefObject<HTMLElement> = React.createRef();

  const navLabel =
    accessibilityLabel || intl.translate('Polaris.Pagination.pagination');

  const className = classNames(styles.Pagination, plain && styles.plain);
  const previousClassName = classNames(
    styles.Button,
    styles.PreviousButton,
    label && styles.ButtonWithLabel,
  );
  const nextClassName = classNames(
    styles.Button,
    styles.NextButton,
    label && styles.ButtonWithLabel,
  );

  const previousButton = previousURL ? (
    <UnstyledLink
      className={previousClassName}
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
      className={previousClassName}
      aria-label={intl.translate('Polaris.Pagination.previous')}
      disabled={!hasPrevious}
    >
      <Icon source={ArrowLeftMinor} />
    </button>
  );

  const nextButton = nextURL ? (
    <UnstyledLink
      className={nextClassName}
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
      className={nextClassName}
      aria-label={intl.translate('Polaris.Pagination.next')}
      disabled={!hasNext}
    >
      <Icon source={ArrowRightMinor} />
    </button>
  );

  const constructedPrevious =
    previousTooltip && hasPrevious ? (
      <Tooltip content={previousTooltip}>{previousButton}</Tooltip>
    ) : (
      previousButton
    );

  const constructedNext =
    nextTooltip && hasNext ? (
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

  const labelTextMarkup =
    hasNext && hasPrevious ? (
      <TextStyle>{label}</TextStyle>
    ) : (
      <TextStyle variation="subdued">{label}</TextStyle>
    );

  const labelMarkup = label ? (
    <div className={styles.Label} aria-live="polite">
      {labelTextMarkup}
    </div>
  ) : null;

  return (
    <nav className={className} aria-label={navLabel} ref={node}>
      {previousButtonEvents}
      {constructedPrevious}
      {labelMarkup}
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
