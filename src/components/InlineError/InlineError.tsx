import * as React from 'react';
import {AlertMinor} from '@shopify/polaris-icons';

import Icon from '../Icon';
import {Error} from '../../types';

import styles from './InlineError.scss';

export interface Props {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

export default function InlineError({message, fieldID}: Props) {
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
