import React from 'react';
import type {ReactNode} from 'react';
import {ArrowDownMinor, ArrowUpMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../../../utilities/css';
import {UnstyledButton} from '../../../../../UnstyledButton';
import {Icon} from '../../../../../Icon';

import styles from './OrderButton.scss';

type OrderButtonDirection = 'asc' | 'desc';

export interface OrderButtonProps {
  onClick: (value: string[]) => void;
  active: boolean;
  children: ReactNode;
  direction: OrderButtonDirection;
  value: string;
}

export function OrderButton({
  onClick,
  active,
  children,
  direction,
  value,
}: OrderButtonProps) {
  const classes = classNames(
    styles.OrderButton,
    active && styles['OrderButton-active'],
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
