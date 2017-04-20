import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import VisuallyHidden from '../VisuallyHidden';
import * as styles from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export interface Props {
  children?: string,
  status?: Status,
  progress?: Progress,
}

const PROGRESS_LABELS = {
  incomplete: 'Incomplete',
  partiallyComplete: 'Partially complete',
  complete: 'Complete',
};

const STATUS_LABELS = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  attention: 'Attention',
};

export default function Badge({children, status, progress}: Props) {
  const className = classNames(
    styles.Badge,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)],
  );

  const pipMarkup = progress
    ? (
      <span className={styles.Pip}>
        <VisuallyHidden>{PROGRESS_LABELS[progress]}</VisuallyHidden>
      </span>
    )
    : null;

  const statusLabelMarkup = status
    ? <VisuallyHidden>{STATUS_LABELS[status]}</VisuallyHidden>
    : null;

  return (
    <span className={className}>
      {statusLabelMarkup}
      {pipMarkup}
      {children}
    </span>
  );
}
