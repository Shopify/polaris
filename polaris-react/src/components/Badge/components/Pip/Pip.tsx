import React from 'react';

import {classNames, variationName} from '../../../../utilities/css';
import type {Progress, Status} from '../../types';
import {VisuallyHidden} from '../../../VisuallyHidden';
import {useI18n} from '../../../../utilities/i18n';
import {getDefaultAccessibilityLabel} from '../../utils';

import styles from './Pip.scss';

export interface PipProps {
  status?: Status;
  progress?: Progress;
  accessibilityLabelOverride?: string;
}

export function Pip({
  status = 'info',
  progress = 'complete',
  accessibilityLabelOverride,
}: PipProps) {
  const i18n = useI18n();
  const className = classNames(
    styles.Pip,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)],
  );

  return (
    <span className={className}>
      <VisuallyHidden>
        {accessibilityLabelOverride
          ? accessibilityLabelOverride
          : getDefaultAccessibilityLabel(i18n, progress, status)}
      </VisuallyHidden>
    </span>
  );
}
