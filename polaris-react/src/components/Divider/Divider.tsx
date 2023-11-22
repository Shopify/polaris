import React from 'react';
import type {BorderWidthScale, ColorBorderAlias} from '@shopify/polaris-tokens';

import styles from './Divider.scss';

export interface DividerProps {
  /**
   * Divider border color
   * @default 'border-secondary'
   */
  borderColor?: ColorBorderAlias;
  /**
   * Divider border width
   * @default '025'
   */
  borderWidth?: BorderWidthScale;
}

export const Divider = ({
  borderColor = 'border-secondary',
  borderWidth = '025',
}: DividerProps) => (
  <hr
    className={styles.Divider}
    style={{
      borderBlockStart: `var(--p-border-width-${borderWidth}) solid var(--p-color-${borderColor})`,
    }}
  />
);
