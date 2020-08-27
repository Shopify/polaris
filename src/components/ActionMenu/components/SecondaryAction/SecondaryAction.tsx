import React from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';

import styles from './SecondaryAction.scss';

export function SecondaryAction({children, ...rest}: ButtonProps) {
  return (
    <span className={styles.SecondaryAction}>
      <Button {...rest}>{children}</Button>
    </span>
  );
}
