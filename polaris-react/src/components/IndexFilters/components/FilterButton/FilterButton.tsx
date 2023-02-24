import React from 'react';
import type {ReactNode} from 'react';

import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';

import styles from './FilterButton.scss';

export interface FilterButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
  hasDoubleWidthIcon?: boolean;
  disabled?: boolean;
}

export function FilterButton({
  onClick,
  'aria-label': ariaLabel,
  children,
  hasDoubleWidthIcon,
  disabled,
}: FilterButtonProps) {
  const classes = classNames(
    styles.FilterButton,
    hasDoubleWidthIcon && styles.DoubleWidth,
    disabled && styles.Disabled,
  );
  return (
    <UnstyledButton
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </UnstyledButton>
  );
}
