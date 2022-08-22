import React from 'react';

import {classNames, variationName} from '../../../../utilities/css';
import type {Progress, Status} from '../../types';
import {VisuallyHidden} from '../../../VisuallyHidden';

import styles from './Pip.scss';

export interface PipProps {
  status?: Status;
  progress?: Progress;
  accessibilityLabel?: string;
}

export function Pip({
  status,
  progress = 'complete',
  accessibilityLabel,
}: PipProps) {
  const className = classNames(
    styles.Pip,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)],
  );

  return (
    <span className={className}>
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
    </span>
  );
}
