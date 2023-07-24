import React from 'react';
import type {ReactNode} from 'react';
import {ArrowDownMinor, ArrowUpMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../../../utilities/css';
import {UnstyledButton} from '../../../../../UnstyledButton';
import {Icon} from '../../../../../Icon';
import {useFeatures} from '../../../../../../utilities/features';

import styles from './DirectionButton.scss';

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
  const {polarisSummerEditions2023} = useFeatures();

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
        color={
          // eslint-disable-next-line no-nested-ternary
          polarisSummerEditions2023 ? 'base' : active ? 'interactive' : 'base'
        }
      />
      <span className={styles.Label}>{children}</span>
    </UnstyledButton>
  );
}
