import React from 'react';
import type {ReactNode} from 'react';

import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';
import {DisabledTooltipWrapper} from '../../../DisabledTooltipWrapper';

import styles from './FilterButton.scss';

export interface FilterButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
  hasDoubleWidthIcon?: boolean;
  disabled?: boolean;
  disabledTooltipMessage?: string;
}

export function FilterButton({
  onClick,
  'aria-label': ariaLabel,
  children,
  hasDoubleWidthIcon,
  disabled,
  disabledTooltipMessage,
}: FilterButtonProps) {
  const classes = classNames(
    styles.FilterButton,
    hasDoubleWidthIcon && styles.DoubleWidth,
    disabled && styles.Disabled,
  );
  return (
    <DisabledTooltipWrapper
      disabled={{isDisabled: disabled, tooltipMessage: disabledTooltipMessage}}
    >
      <UnstyledButton
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </UnstyledButton>
    </DisabledTooltipWrapper>
  );
}
