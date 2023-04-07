import React from 'react';
import type {ColorBorderAlias} from '@shopify/polaris-tokens';

import styles from './Divider.scss';

export interface DividerProps {
  /** Divider border color */
  borderColor?: ColorBorderAlias;
}

export const Divider = ({borderColor = 'border-subdued'}: DividerProps) => {
  const style = {
    '--pc-divider-border-style': borderColor
      ? `var(--p-border-width-1) solid var(--p-color-${borderColor})`
      : undefined,
  } as React.CSSProperties;

  return <hr className={styles.Divider} style={style} />;
};
