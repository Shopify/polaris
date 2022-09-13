import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import styles from './Bleed.scss';

type SpacingTokenName = keyof typeof spacing;

// TODO: Bring this logic into tokens
type SpacingTokenScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

interface Spacing {
  bottom: SpacingTokenScale;
  left: SpacingTokenScale;
  right: SpacingTokenScale;
  top: SpacingTokenScale;
}

export interface BleedProps {
  /** Elements to display inside tile */
  children: React.ReactNode;
  space?: SpacingTokenScale;
  horizontal?: SpacingTokenScale;
  vertical?: SpacingTokenScale;
  top?: SpacingTokenScale;
  bottom?: SpacingTokenScale;
  left?: SpacingTokenScale;
  right?: SpacingTokenScale;
}

export const Bleed = ({
  space,
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
      return space;
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
    <div className={styles.Bleed} style={style}>
      {children}
    </div>
  );
};
