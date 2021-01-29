import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import type {IconSource} from '../../types';

import styles from './Icon.scss';

type Color =
  | 'base'
  | 'subdued'
  | 'critical'
  | 'warning'
  | 'highlight'
  | 'success'
  | 'primary';

export interface IconProps {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}

export function Icon({source, color, backdrop, accessibilityLabel}: IconProps) {
  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }

  if (color && sourceType === 'external') {
    // eslint-disable-next-line no-console
    console.warn(
      'Recoloring external SVGs is not supported. Set the intended color on your SVG instead.',
    );
  }

  const className = classNames(
    styles.Icon,
    color && styles[variationName('color', color)],
    color && styles.isColored,
    backdrop && styles.hasBackdrop,
  );

  const SourceComponent = source;
  const contentMarkup = {
    function: (
      <SourceComponent
        className={styles.Svg}
        focusable="false"
        aria-hidden="true"
      />
    ),
    placeholder: <div className={styles.Placeholder} />,
    external: (
      <img
        className={styles.Img}
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    ),
  };

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {contentMarkup[sourceType]}
    </span>
  );
}
