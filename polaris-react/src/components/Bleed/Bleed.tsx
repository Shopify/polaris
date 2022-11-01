import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {sanitizeCustomProperties} from '../../utilities/css';

import styles from './Bleed.scss';

interface Spacing {
  bottom: SpacingSpaceScale;
  left: SpacingSpaceScale;
  right: SpacingSpaceScale;
  top: SpacingSpaceScale;
}

export interface BleedProps {
  /** Elements to display inside tile */
  children: React.ReactNode;
  /** Negative space around the element
   * @default '5'
   */
  spacing?: SpacingSpaceScale;
  /** Negative horizontal space around the element */
  horizontal?: SpacingSpaceScale;
  /** Negative vertical space around the element */
  vertical?: SpacingSpaceScale;
  /** Negative top space around the element */
  top?: SpacingSpaceScale;
  /** Negative bottom space around the element */
  bottom?: SpacingSpaceScale;
  /** Negative left space around the element */
  left?: SpacingSpaceScale;
  /** Negative right space around the element */
  right?: SpacingSpaceScale;
}

export const Bleed = ({
  spacing = '5',
  horizontal,
  vertical,
  top,
  bottom,
  left,
  right,
  children,
}: BleedProps) => {
  const getNegativeMargins = (direction: string) => {
    const xAxis = ['left', 'right'];
    const yAxis = ['top', 'bottom'];

    const directionValues: {[key: string]: string | undefined} = {
      top,
      bottom,
      left,
      right,
      horizontal,
      vertical,
    };

    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (!yAxis.includes(direction) && horizontal) {
      return directionValues.horizontal;
    } else if (!xAxis.includes(direction) && vertical) {
      return directionValues.vertical;
    } else {
      return spacing;
    }
  };

  const negativeMargins = {
    top: getNegativeMargins('top'),
    left: getNegativeMargins('left'),
    right: getNegativeMargins('right'),
    bottom: getNegativeMargins('bottom'),
  } as Spacing;

  const style = {
    '--pc-bleed-margin-bottom': negativeMargins.bottom
      ? `var(--p-space-${negativeMargins.bottom})`
      : undefined,
    '--pc-bleed-margin-left': negativeMargins.left
      ? `var(--p-space-${negativeMargins.left})`
      : undefined,
    '--pc-bleed-margin-right': negativeMargins.right
      ? `var(--p-space-${negativeMargins.right})`
      : undefined,
    '--pc-bleed-margin-top': negativeMargins.top
      ? `var(--p-space-${negativeMargins.top})`
      : undefined,
  } as React.CSSProperties;

  return (
    <div className={styles.Bleed} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
};
