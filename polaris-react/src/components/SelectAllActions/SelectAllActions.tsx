import React, {forwardRef, useRef} from 'react';
import {Transition} from 'react-transition-group';

import {classNames} from '../../utilities/css';
import type {Action} from '../../types';
import {UnstyledButton} from '../UnstyledButton';
import {CheckableButton} from '../CheckableButton';

import styles from './SelectAllActions.scss';

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
type AriaLive = 'off' | 'polite' | undefined;

export interface SelectAllActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Label for the bulk actions */
  label?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
  /** Callback when the select all checkbox is clicked */
  onToggleAll?(): void;
}

export const SelectAllActions = forwardRef(function SelectAllActions(
  {
    accessibilityLabel,
    label,
    selected,
    selectMode,
    paginatedSelectAllText,
    paginatedSelectAllAction,
    disabled,
    onToggleAll,
  }: SelectAllActionsProps,
  ref,
) {
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const markup = (
    <Transition timeout={0} in={selectMode} key="markup" nodeRef={wrapperRef}>
      {(status: TransitionStatus) => {
        const wrapperClasses = classNames(
          styles.SelectAllActions,
          styles[`SelectAllActions-${status}`],
        );
        return (
          <div className={wrapperClasses} ref={wrapperRef}>
            <CheckableButton {...checkableButtonProps} />
            {paginatedSelectAllMarkup}
          </div>
        );
      }}
    </Transition>
  );
  return markup;
});
