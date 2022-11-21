import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {sanitizeCustomProperties} from '../../utilities/css';

import styles from './Bleed.scss';

export interface BleedProps {
  children?: React.ReactNode;
  /** Negative horizontal space around children
   * @default '5'
   */
  marginInline?: SpacingSpaceScale;
  /** Negative vertical space around children */
  marginBlock?: SpacingSpaceScale;
  /** Negative top space around children */
  marginBlockStart?: SpacingSpaceScale;
  /** Negative bottom space around children */
  marginBlockEnd?: SpacingSpaceScale;
  /** Negative left space around children */
  marginInlineStart?: SpacingSpaceScale;
  /** Negative right space around children */
  marginInlineEnd?: SpacingSpaceScale;
}

export const Bleed = ({
  marginInline = '5',
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
  marginInlineStart,
  marginInlineEnd,
  children,
}: BleedProps) => {
  const getNegativeMargins = (direction: string) => {
    const xAxis = ['marginInlineStart', 'marginInlineEnd'];
    const yAxis = ['marginBlockStart', 'marginBlockEnd'];

    const directionValues: {[key: string]: string | undefined} = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock,
    };

    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (xAxis.includes(direction) && marginInline) {
      return directionValues.marginInline;
    } else if (yAxis.includes(direction) && marginBlock) {
      return directionValues.marginBlock;
    }
  };

  const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
  const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
  const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
  const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');

  const style = {
    '--pc-bleed-margin-block-start': negativeMarginBlockStart
      ? `var(--p-space-${negativeMarginBlockStart})`
      : undefined,
    '--pc-bleed-margin-block-end': negativeMarginBlockEnd
      ? `var(--p-space-${negativeMarginBlockEnd})`
      : undefined,
    '--pc-bleed-margin-inline-start': negativeMarginInlineStart
      ? `var(--p-space-${negativeMarginInlineStart})`
      : undefined,
    '--pc-bleed-margin-inline-end': negativeMarginInlineEnd
      ? `var(--p-space-${negativeMarginInlineEnd})`
      : undefined,
  } as React.CSSProperties;

  return (
    <div className={styles.Bleed} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
};
