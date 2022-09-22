import React from 'react';
import type {breakpoints} from '@shopify/polaris-tokens';

import styles from './ContentBlock.scss';

type BreakpointsTokenGroup = typeof breakpoints;
type BreakpointsTokenName = keyof BreakpointsTokenGroup;

type Breakpoints = BreakpointsTokenName extends `breakpoints-${infer Scale}`
  ? Scale
  : never;

export interface ContentBlockProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust maximum width of container */
  width: Breakpoints;
}

export const ContentBlock = ({children, width}: ContentBlockProps) => {
  const style = {
    '--pc-content-block-width': `var(--p-breakpoints-${width})`,
  } as React.CSSProperties;

  return (
    <div className={styles.ContentBlock} style={style}>
      {children}
    </div>
  );
};
