import React from 'react';
import type {BorderWidthScale, ColorBorderAlias} from '@shopify/polaris-tokens';

import styles from './Divider.module.scss';

export interface DividerProps {
  /**
   * Divider border color
   * @default 'border-secondary'
   */
  borderColor?: ColorBorderAlias | 'transparent';
  /**
   * Divider border width
   * @default '025'
   */
  borderWidth?: BorderWidthScale;
}

export const Divider = ({
  borderColor = 'border-secondary',
  borderWidth = '025',
}: DividerProps) => {
  const borderColorValue =
    borderColor === 'transparent'
      ? borderColor
      : `var(--p-color-${borderColor})`;

  return (
    <hr
      className={styles.Divider}
      style={{
        borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`,
      }}
    />
  );
};
