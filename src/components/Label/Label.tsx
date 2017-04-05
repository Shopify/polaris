import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import Button from '../Button';
import * as styles from './Label.scss';

export interface Action {
  content: React.ReactNode,
  to?: string,
  onClick?(): void,
}

export interface Props {
  children?: React.ReactNode,
  id: string,
  error?: boolean,
  note?: React.ReactNode,
  action?: Action,
};

export default function Label({children, note, id, action, error}: Props) {
  const className = classNames(
    styles.Label,
    error && styles.error,
  );

  const actionMarkup = action
    ? <Button plain to={action.to} onClick={action.onClick}>{action.content}</Button>
    : null;

  return (
    <div className={styles.LabelWrapper}>
      <label htmlFor={id} className={className}>{children} {note}</label>
      {actionMarkup}
    </div>
  );
}
