import React from 'react';

import {Text} from '../Text';
import {classNames, variationName} from '../../utilities/css';
import type {IconSource} from '../../types';

import styles from './Icon.scss';

type Tone =
  | 'base'
  | 'subdued'
  | 'caution'
  | 'warning'
  | 'critical'
  | 'interactive'
  | 'info'
  | 'success'
  | 'primary'
  | 'emphasis'
  | 'magic'
  | 'textCaution'
  | 'textWarning'
  | 'textCritical'
  | 'textInfo'
  | 'textSuccess'
  | 'textPrimary'
  | 'textMagic';

export interface IconProps {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  tone?: Tone;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}

export function Icon(props: IconProps) {
  const {source: Source, tone, accessibilityLabel} = props;

  const className = classNames(
    styles.Icon,
    tone && styles[variationName('tone', tone)],
    tone && styles.applyColor,
  );

  return (
    <span className={className}>
      {accessibilityLabel && (
        <Text as="span" visuallyHidden>
          {accessibilityLabel}
        </Text>
      )}
      {Source === 'placeholder' ? (
        <div className={styles.Placeholder} />
      ) : (
        <Source className={styles.Svg} focusable="false" aria-hidden="true" />
      )}
    </span>
  );
}
