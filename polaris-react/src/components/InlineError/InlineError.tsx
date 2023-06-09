import React from 'react';
import {DiamondAlertMinor, CircleAlertMajor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import type {Error} from '../../types';
import {useFeatures} from '../../utilities/features';

import styles from './InlineError.scss';

export interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

export function InlineError({message, fieldID}: InlineErrorProps) {
  const {polarisSummerEditions2023} = useFeatures();

  if (!message) {
    return null;
  }

  return (
    <div id={errorTextID(fieldID)} className={styles.InlineError}>
      <div className={styles.Icon}>
        <Icon
          source={
            polarisSummerEditions2023 ? CircleAlertMajor : DiamondAlertMinor
          }
        />
      </div>
      {message}
    </div>
  );
}

export function errorTextID(id: string) {
  return `${id}Error`;
}
