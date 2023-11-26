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

export function Icon({source, tone, accessibilityLabel}: IconProps) {
  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }

  const className = classNames(
    styles.Icon,
    tone && styles[variationName('tone', tone)],
    tone && styles.applyColor,
  );

  const SourceComponent = source;
  const contentMarkup = {
    function: <SourceComponent focusable="false" aria-hidden="true" />,
    placeholder: <div className={styles.Placeholder} />,
    external: (
      <img
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    ),
  };

  return (
    <span className={className}>
      <Text as="span" visuallyHidden>
        {accessibilityLabel}
      </Text>
      {contentMarkup[sourceType]}
    </span>
  );
}
