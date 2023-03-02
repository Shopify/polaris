import React from 'react';
import type {ReactNode} from 'react';

import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';

import styles from './FilterButton.scss';

export interface FilterButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
  disabled?: boolean;
}

export function FilterButton({
  onClick,
  'aria-label': ariaLabel,
  children,
  disabled,
}: FilterButtonProps) {
  const classes = classNames(styles.FilterButton, disabled && styles.Disabled);
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
