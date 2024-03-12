import React from 'react';

import {Text} from '../Text';
import {classNames, variationName} from '../../utilities/css';
import {useBreakpoints} from '../../utilities/breakpoints';
import type {IconSource} from '../../types';

import styles from './Icon.module.scss';

type Tone =
  | 'base'
  | 'inherit'
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
  /** Set the size of the icon */
  size?: 'base' | 'micro';
  /** Set the color for the SVG fill */
  tone?: Tone;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}

export function Icon({
  source,
  size = 'base',
  tone,
  accessibilityLabel,
}: IconProps) {
  const {mdDown} = useBreakpoints();
  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }

  if (
    tone &&
    sourceType === 'external' &&
    process.env.NODE_ENV === 'development'
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      'Recoloring external SVGs is not supported. Set the intended color on your SVG instead.',
    );
  }

  const className = classNames(
    styles.Icon,
    tone && styles[variationName('tone', tone)],
    size && styles[variationName('size', size)],
  );

  const shouldMagnifyIcon = mdDown && size === 'base';
  const SourceComponent = source;
  const contentMarkup = {
    function: (
      <SourceComponent
        className={styles.Svg}
        focusable="false"
        aria-hidden="true"
        // On Mobile we're scaling the viewBox to 18x18 to make the icons bigger
        // Also, we're setting the viewport origin to 1x1 to center the icon
        // We use this syntax so we don't override the existing viewBox value if we don't need to.
        {...(shouldMagnifyIcon ? {viewBox: '1 1 18 18'} : {})}
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
    <span className={className}>
      {accessibilityLabel && (
        <Text as="span" visuallyHidden>
          {accessibilityLabel}
        </Text>
      )}
      {contentMarkup[sourceType]}
    </span>
  );
}
