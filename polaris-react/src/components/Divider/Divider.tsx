import React from 'react';

import styles from './Divider.scss';

export type BorderTokenAlias =
  | 'border-subdued'
  | 'border'
  | 'border-inverse'
  | 'transparent';

export interface DividerProps {
  /** Divider border style */
  borderStyle?: BorderTokenAlias;
}

export const Divider = ({borderStyle = 'border-subdued'}: DividerProps) => {
  const style = {
    '--pc-divider-border-style': borderStyle
      ? `var(--p-border-width-1) solid var(--p-color-${borderStyle})`
      : undefined,
  } as React.CSSProperties;

  return <hr className={styles.Divider} style={style} />;
};
