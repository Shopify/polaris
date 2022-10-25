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
  spacing?: SpacingSpaceScale;
  horizontal?: SpacingSpaceScale;
  vertical?: SpacingSpaceScale;
  top?: SpacingSpaceScale;
  bottom?: SpacingSpaceScale;
  left?: SpacingSpaceScale;
  right?: SpacingSpaceScale;
}

export const Bleed = ({
  spacing,
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
    ...(negativeMargins.bottom
      ? {'--pc-bleed-margin-bottom': `var(--p-space-${negativeMargins.bottom})`}
      : undefined),
    ...(negativeMargins.left
      ? {'--pc-bleed-margin-left': `var(--p-space-${negativeMargins.left})`}
      : undefined),
    ...(negativeMargins.right
      ? {'--pc-bleed-margin-right': `var(--p-space-${negativeMargins.right})`}
      : undefined),
    ...(negativeMargins.top
      ? {'--pc-bleed-margin-top': `var(--p-space-${negativeMargins.top})`}
      : undefined),
  } as React.CSSProperties;

  return (
    <div className={styles.Bleed} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
};
