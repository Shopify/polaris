import React from 'react';

import {classNames, variationName} from '../../utilities/css';

import styles from './SkeletonDisplayText.scss';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SkeletonDisplayTextProps {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
}

export function SkeletonDisplayText({
  size = 'medium',
}: SkeletonDisplayTextProps) {
  const className = classNames(
    styles.DisplayText,
    size && styles[variationName('size', size)],
  );

  return <div className={className} />;
}
