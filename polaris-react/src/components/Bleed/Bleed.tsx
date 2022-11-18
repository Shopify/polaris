import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {sanitizeCustomProperties} from '../../utilities/css';

import styles from './Bleed.scss';

export interface BleedProps {
  /** Elements to display inside tile */
  children: React.ReactNode;
  /** Negative horizontal space around the element
   * * @default '5'
   */
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
  horizontal = '5',
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
    }
  };

  const negativeTop = getNegativeMargins('top');
  const negativeLeft = getNegativeMargins('left');
  const negativeRight = getNegativeMargins('right');
  const negativeBottom = getNegativeMargins('bottom');

  const style = {
    '--pc-bleed-margin-bottom': negativeBottom
      ? `var(--p-space-${negativeBottom})`
      : undefined,
    '--pc-bleed-margin-left': negativeLeft
      ? `var(--p-space-${negativeLeft})`
      : undefined,
    '--pc-bleed-margin-right': negativeRight
      ? `var(--p-space-${negativeRight})`
      : undefined,
    '--pc-bleed-margin-top': negativeTop
      ? `var(--p-space-${negativeTop})`
      : undefined,
  } as React.CSSProperties;

  return (
    <div className={styles.Bleed} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
};
