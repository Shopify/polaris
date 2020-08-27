import React from 'react';

import type {ButtonProps} from '../../../Button';

import styles from './SecondaryAction.scss';

export function SecondaryAction({
  accessibilityLabel,
  children,
  onClick,
}: ButtonProps) {
  console.log({accessibilityLabel});
  return (
    <button
      // add aria label
      className={styles.SecondaryAction}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
