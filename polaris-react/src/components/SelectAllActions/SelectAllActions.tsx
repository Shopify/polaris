import React from 'react';
import {Transition} from 'react-transition-group';

import {classNames} from '../../utilities/css';
import type {Action} from '../../types';
import {Button} from '../Button';
import {CheckableButton} from '../CheckableButton';

import styles from './SelectAllActions.scss';

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface SelectAllActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Whether to render the small screen BulkActions or not */
  smallScreen?: boolean;
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

export function SelectAllActions({
  accessibilityLabel,
  smallScreen,
  label,
  selected,
  selectMode,
  paginatedSelectAllText,
  paginatedSelectAllAction,
  disabled,
  onToggleAll,
}: SelectAllActionsProps) {
  const paginatedSelectAllActionMarkup = paginatedSelectAllAction ? (
    <Button
      onClick={paginatedSelectAllAction.onAction}
      plain
      disabled={disabled}
    >
      {paginatedSelectAllAction.content}
    </Button>
  ) : null;

  const paginatedSelectAllTextMarkup =
    paginatedSelectAllText && paginatedSelectAllAction ? (
      <span aria-live="polite">{paginatedSelectAllText}</span>
    ) : (
      paginatedSelectAllText
    );

  const paginatedSelectAllMarkup =
    paginatedSelectAllActionMarkup || paginatedSelectAllTextMarkup ? (
      <div className={styles.PaginatedSelectAll}>
        {paginatedSelectAllTextMarkup} {paginatedSelectAllActionMarkup}
      </div>
    ) : null;

  const checkableButtonProps = {
    accessibilityLabel,
    label,
    selected,
    selectMode,
    onToggleAll,
    disabled,
    plain: !smallScreen,
    autoWidth: true,
  };
  const markup = (
    <Transition timeout={0} in={selectMode} key="markup">
      {(status: TransitionStatus) => {
        const wrapperClasses = classNames(
          styles.SelectAllActions,
          styles[`SelectAllActions-${status}`],
        );
        return (
          <div className={wrapperClasses}>
            <CheckableButton {...checkableButtonProps} />
            {paginatedSelectAllMarkup}
          </div>
        );
      }}
    </Transition>
  );
  return markup;
}
