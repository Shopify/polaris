import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';
import React, {createRef} from 'react';

import type {Key} from '../../types';
import {useI18n} from '../../utilities/i18n';
import {isInputFocused} from '../../utilities/is-input-focused';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {KeypressListener} from '../KeypressListener';
import {Text} from '../Text';
import {Tooltip} from '../Tooltip';
import {Box} from '../Box';
import {InlineStack} from '../InlineStack';
import {classNames} from '../../utilities/css';

import styles from './Pagination.scss';

interface AccessibilityLabels {
  previous: string;
  next: string;
}

export interface PaginationProps {
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
  /** Accessible labels for the buttons and UnstyledLinks */
  accessibilityLabels?: AccessibilityLabels;
  /** Callback when next button is clicked */
  onNext?(): void;
  /** Callback when previous button is clicked */
  onPrevious?(): void;
  /** Text to provide more context in between the arrow buttons */
  label?: React.ReactNode;
  /** Layout structure of the component */
  type?: 'page' | 'table';
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
  accessibilityLabel,
  accessibilityLabels,
  label,
  type = 'page',
}: PaginationProps) {
  const i18n = useI18n();

  const node: React.RefObject<HTMLElement> = createRef();

  const navLabel =
    accessibilityLabel || i18n.translate('Polaris.Pagination.pagination');

  const previousLabel =
    accessibilityLabels?.previous ||
    i18n.translate('Polaris.Pagination.previous');

  const nextLabel =
    accessibilityLabels?.next || i18n.translate('Polaris.Pagination.next');

  const prev = (
    <Button
      icon={ChevronLeftMinor}
      accessibilityLabel={previousLabel}
      url={previousURL}
      onClick={onPrevious}
      disabled={!hasPrevious}
      id="previousURL"
    />
  );
  const constructedPrevious =
    previousTooltip && hasPrevious ? (
      <Tooltip
        activatorWrapper="span"
        content={previousTooltip}
        preferredPosition="below"
      >
        {prev}
      </Tooltip>
    ) : (
      prev
    );

  const next = (
    <Button
      icon={ChevronRightMinor}
      accessibilityLabel={nextLabel}
      url={nextURL}
      onClick={onNext}
      disabled={!hasNext}
      id="nextURL"
    />
  );
  const constructedNext =
    nextTooltip && hasNext ? (
      <Tooltip
        activatorWrapper="span"
        content={nextTooltip}
        preferredPosition="below"
      >
        {next}
      </Tooltip>
    ) : (
      next
    );

  const previousHandler = onPrevious || noop;
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
            : handleCallback(previousHandler)
        }
      />
    ));

  const nextHandler = onNext || noop;
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
            : handleCallback(nextHandler)
        }
      />
    ));

  if (type === 'table') {
    const labelMarkup = label ? (
      <Text as="span" variant="bodySm" fontWeight="medium">
        {label}
      </Text>
    ) : null;

    return (
      <nav
        aria-label={navLabel}
        ref={node}
        className={classNames(styles.Pagination, styles.table)}
      >
        {previousButtonEvents}
        {nextButtonEvents}
        <Box
          background="bg-surface-secondary"
          paddingBlockStart="150"
          paddingBlockEnd="150"
          paddingInlineStart="300"
          paddingInlineEnd="200"
        >
          <InlineStack
            align={labelMarkup ? 'space-between' : 'end'}
            blockAlign="center"
          >
            {labelMarkup}
            <ButtonGroup variant="segmented">
              {constructedPrevious}
              {constructedNext}
            </ButtonGroup>
          </InlineStack>
        </Box>
      </nav>
    );
  }

  const labelTextMarkup =
    hasNext && hasPrevious ? (
      <span>{label}</span>
    ) : (
      <Text tone="subdued" as="span">
        {label}
      </Text>
    );

  const labelMarkup = label ? (
    <Box padding="300" paddingBlockStart="0" paddingBlockEnd="0">
      <div aria-live="polite">{labelTextMarkup}</div>
    </Box>
  ) : null;

  return (
    <nav aria-label={navLabel} ref={node} className={styles.Pagination}>
      {previousButtonEvents}
      {nextButtonEvents}
      <ButtonGroup variant="segmented">
        {constructedPrevious}
        {labelMarkup}
        {constructedNext}
      </ButtonGroup>
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

function noop() {}
