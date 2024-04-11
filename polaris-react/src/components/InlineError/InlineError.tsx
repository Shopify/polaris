import React from 'react';
import {AlertCircleIcon} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {Text} from '../Text';
import type {Error} from '../../types';

import styles from './InlineError.module.css';

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
        <Icon source={AlertCircleIcon} />
      </div>
      <Text as="span" variant="bodySm">
        {message}
      </Text>
    </div>
  );
}

export function errorTextID(id: string) {
  return `${id}Error`;
}
