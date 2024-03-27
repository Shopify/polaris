import React from 'react';
import type {ReactNode} from 'react';
import {ArrowDownIcon, ArrowUpIcon} from '@shopify/polaris-icons';

import {classNames} from '../../../../../../utilities/css';
import {UnstyledButton} from '../../../../../UnstyledButton';
import {Icon} from '../../../../../Icon';
import {Text} from '../../../../../Text';

import styles from './DirectionButton.module.css';

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
        source={direction === 'asc' ? ArrowUpIcon : ArrowDownIcon}
        tone="base"
      />
      <Text as="span" variant="bodySm" fontWeight="medium">
        {children}
      </Text>
    </UnstyledButton>
  );
}
