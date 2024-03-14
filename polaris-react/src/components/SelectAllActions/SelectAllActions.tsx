import React, {useRef, forwardRef} from 'react';
import {Transition} from 'react-transition-group';

import {classNames} from '../../utilities/css';
import type {Action} from '../../types';
import {UnstyledButton} from '../UnstyledButton';
import {Box} from '../Box';
import {Text} from '../Text';
import {InlineStack} from '../InlineStack';
import {CheckableButton} from '../CheckableButton';

import styles from './SelectAllActions.module.css';

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

type AriaLive = 'off' | 'polite' | undefined;
export interface SelectAllActionsProps {
  /** Label for the bulk actions */
  label?: string;
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
  /** If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** Whether there is a Pagination element on the associated table. Disables the vertical appear animation if so */
  hasPagination?: boolean;
  /** @deprecated Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** @deprecated State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** @deprecated Callback when the select all checkbox is clicked */
  onToggleAll?(): void;
}

/**
 * @deprecated Use `BulkActions` instead.
 */
export const SelectAllActions = forwardRef(function SelectAllActions(
  {
    label,
    selectMode,
    paginatedSelectAllText,
    paginatedSelectAllAction,
    disabled,
    isSticky,
    hasPagination,
    accessibilityLabel,
    selected,
    onToggleAll,
  }: SelectAllActionsProps,
  ref,
) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const paginatedSelectAllActionMarkup = paginatedSelectAllAction ? (
    <UnstyledButton
      className={styles.AllAction}
      onClick={paginatedSelectAllAction.onAction}
      size="slim"
      disabled={disabled}
    >
      {paginatedSelectAllAction.content}
    </UnstyledButton>
  ) : null;

  const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;

  const paginatedSelectAllMarkup = paginatedSelectAllActionMarkup ? (
    <div className={styles.PaginatedSelectAll}>
      {paginatedSelectAllActionMarkup}
    </div>
  ) : null;

  const ariaLive: AriaLive = hasTextAndAction ? 'polite' : undefined;

  const checkableButtonProps = {
    accessibilityLabel,
    label: hasTextAndAction ? paginatedSelectAllText : label,
    selected,
    onToggleAll,
    disabled,
    ariaLive,
    ref,
  };

  const checkableButtonMarkup =
    accessibilityLabel && onToggleAll ? (
      <CheckableButton {...checkableButtonProps} />
    ) : null;

  const markup = (
    <Transition timeout={0} in={selectMode} key="markup" nodeRef={nodeRef}>
      {(status: TransitionStatus) => {
        const wrapperClasses = classNames(
          styles.SelectAllActions,
          hasPagination && styles['SelectAllActions-hasPagination'],
          !isSticky && styles['SelectAllActions-not-sticky'],
          status && styles[`SelectAllActions-${status}`],
        );

        return (
          <div className={wrapperClasses} ref={nodeRef}>
            <Box
              background="bg-surface-secondary"
              borderBlockStartWidth="025"
              borderColor="border"
              width="100%"
              paddingBlockStart="300"
              paddingBlockEnd="300"
              paddingInlineStart="300"
              paddingInlineEnd="400"
            >
              <InlineStack gap="200" align="start" blockAlign="center">
                {checkableButtonMarkup}
                <Text as="span" variant="bodySm" fontWeight="medium">
                  {hasTextAndAction ? paginatedSelectAllText : label}
                </Text>
                {paginatedSelectAllMarkup}
              </InlineStack>
            </Box>
          </div>
        );
      }}
    </Transition>
  );
  return markup;
});
