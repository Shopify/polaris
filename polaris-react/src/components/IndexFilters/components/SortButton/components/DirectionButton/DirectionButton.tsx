import React from 'react';
import type {ReactNode} from 'react';
import {ArrowDownMinor, ArrowUpMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../../../utilities/css';
import {UnstyledButton} from '../../../../../UnstyledButton';
import {Icon} from '../../../../../Icon';

import styles from './DirectionButton.module.scss';

type DirectionButtonDirection = 'asc' | 'desc';

export interface DirectionButtonProps {
  onClick: (value: string[]) => void;
  active: boolean;
  children: ReactNode;
  direction: DirectionButtonDirection;
  value: string;
}

export function DirectionButton({
  onClick,
  active,
  children,
  direction,
  value,
}: DirectionButtonProps) {
  const classes = classNames(
    styles.DirectionButton,
    active && styles['DirectionButton-active'],
  );
  function handleClick() {
    onClick([value]);
  }
  return (
    <UnstyledButton className={classes} onClick={handleClick}>
      <Icon
        source={direction === 'asc' ? ArrowUpMinor : ArrowDownMinor}
        color={active ? 'interactive' : 'base'}
      />
      <span className={styles.Label}>{children}</span>
    </UnstyledButton>
  );
}
