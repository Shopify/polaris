import React from 'react';

import {
  classNames,
  sanitizeCustomProperties,
  variationName,
} from '../../utilities/css';

import styles from './SkeletonDisplayText.scss';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SkeletonDisplayTextProps {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
  /**
   * Maxium width of the text
   * @default '120px'
   */
  maxWidth?: `${number}ch` | `${number}%`;
}

export function SkeletonDisplayText({
  size = 'medium',
  maxWidth,
}: SkeletonDisplayTextProps) {
  const className = classNames(
    styles.DisplayText,
    size && styles[variationName('size', size)],
  );

  const style = {
    '--pc-skeleton-display-text-max-width': maxWidth ?? undefined,
  } as React.CSSProperties;

  return <div className={className} style={sanitizeCustomProperties(style)} />;
}
