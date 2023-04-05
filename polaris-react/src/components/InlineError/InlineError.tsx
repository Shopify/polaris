import React from 'react';
import {AlertMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import type {Error} from '../../types';

import styles from './InlineError.module.scss';

export interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

export function InlineError({message, fieldID}: InlineErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div id={errorTextID(fieldID)} className={styles.InlineError}>
      <div className={styles.Icon}>
        <Icon source={AlertMinor} />
      </div>
      {message}
    </div>
  );
}

export function errorTextID(id: string) {
  return `${id}Error`;
}
