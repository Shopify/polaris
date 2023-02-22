import React from 'react';

import {classNames} from '../../../../../../utilities/css';
import {UnstyledButton} from '../../../../../UnstyledButton';

import styles from './UpdateButton.scss';

export interface UpdateButtonProps {
  onClick: () => unknown;
  children: string;
  plain?: boolean;
  disabled?: boolean;
}

export function UpdateButton({
  onClick,
  children,
  plain,
  disabled,
}: UpdateButtonProps) {
  const classes = classNames(
    styles.UpdateButton,
    plain && styles['UpdateButton-plain'],
  );
  return (
    <UnstyledButton className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </UnstyledButton>
  );
}
