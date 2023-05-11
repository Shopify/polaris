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
      <Tooltip activatorWrapper="span" content={previousTooltip}>
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
      <Tooltip activatorWrapper="span" content={nextTooltip}>
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

  const labelTextMarkup =
    hasNext && hasPrevious ? (
      <span>{label}</span>
    ) : (
      <Text color="subdued" as="span">
        {label}
      </Text>
    );

  const labelMarkup = label ? (
    <div aria-live="polite">{labelTextMarkup}</div>
  ) : null;

  return (
    <nav aria-label={navLabel} ref={node}>
      {previousButtonEvents}
      {nextButtonEvents}
      <ButtonGroup segmented={!label}>
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
