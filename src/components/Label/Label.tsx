import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Action} from '../types';
import {buttonFrom} from '../Button';
import * as styles from './Label.scss';

export {Action};

export interface Props {
  children?: string,
  id: string,
  error?: boolean,
  action?: Action,
  hidden?: boolean,
};

export function labelID(id: string) {
  return `${id}Label`;
}

export default function Label({children, id, action, error, hidden}: Props) {
  const className = classNames(
    styles.Label,
    error && styles.error,
    hidden && styles.hidden,
  );

  const actionMarkup = action
    ? buttonFrom(action, {plain: true})
    : null;

  return (
    <div className={className}>
      <label id={labelID(id)} htmlFor={id} className={styles.Text}>{children}</label>
      {actionMarkup}
    </div>
  );
}
