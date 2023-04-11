import React from 'react';
import type {BorderWidthScale, ColorBorderAlias} from '@shopify/polaris-tokens';

import styles from './Divider.scss';

export interface DividerProps {
  borderColor?: ColorBorderAlias | 'transparent';
  borderWidth?: BorderWidthScale;
}

export const Divider = ({
  borderColor = 'border-subdued',
  borderWidth = '1',
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
