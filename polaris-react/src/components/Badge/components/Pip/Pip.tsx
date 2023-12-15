import React from 'react';

import {classNames, variationName} from '../../../../utilities/css';
import type {Progress, Tone} from '../../types';
import {Text} from '../../../Text';
import {useI18n} from '../../../../utilities/i18n';
import {getDefaultAccessibilityLabel} from '../../utils';

import styles from './Pip.module.scss';

export interface PipProps {
  tone?: Tone;
  progress?: Progress;
  accessibilityLabelOverride?: string;
}

export function Pip({
  tone,
  progress = 'complete',
  accessibilityLabelOverride,
}: PipProps) {
  const i18n = useI18n();
  const className = classNames(
    styles.Pip,
    tone && styles[variationName('tone', tone)],
    progress && styles[variationName('progress', progress)],
  );

  const accessibilityLabel = accessibilityLabelOverride
    ? accessibilityLabelOverride
    : getDefaultAccessibilityLabel(i18n, progress, tone);

  return (
    <span className={className}>
      <Text as="span" visuallyHidden>
        {accessibilityLabel}
      </Text>
    </span>
  );
}
