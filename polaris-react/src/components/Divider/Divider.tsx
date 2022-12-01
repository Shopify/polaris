import React from 'react';
import type {ShapeBorderWidthScale} from '@shopify/polaris-tokens';

import styles from './Divider.scss';

export type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

export interface DividerProps {
  /** Divider color */
  color?: BorderTokenAlias;
  /** Divider width */
  width?: ShapeBorderWidthScale;
}

export const Divider = ({color = 'divider', width = '1'}: DividerProps) => {
  const style = {
    '--pc-divider-color': color ? `var(--p-border-${color})` : undefined,
    '--pc-divider-width': width ? `var(--p-border-width-${width})` : undefined,
  } as React.CSSProperties;

  return <hr className={styles.Divider} style={style} />;
};
