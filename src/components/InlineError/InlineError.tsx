import * as React from 'react';

import Icon from '../Icon';
import {Error} from '../../types';

import styles from './InlineError.scss';

export interface Props {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

function InlineError({message, fieldID}: Props) {
  if (!message) {
    return null;
  }

  return (
    <div id={`${fieldID}Error`} className={styles.InlineError}>
      <div className={styles.Icon}>
        <Icon source="alert" />
      </div>
      {message}
    </div>
  );
}

export default InlineError;
