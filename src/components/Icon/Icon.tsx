import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import type {IconProps} from '../../types';

import styles from './Icon.scss';

// This is needed for the polaris
// styleguide to generate the props explorer
interface Props extends IconProps {}

export function Icon({source, color, backdrop, accessibilityLabel}: Props) {
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
    backdrop && styles.hasBackdrop,
    color && styles[variationName('color', color)],
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
