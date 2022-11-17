import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import styles from './Inline.scss';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

export interface InlineProps {
  /** Adjust horizontal alignment of elements
   * @default 'start'
   */
  align?: Align;
  /** Adjust vertical alignment of elements
   * @default 'center'
   */
  blockAlign?: BlockAlign;
  /** The spacing between elements
   * @default '4'
   */
  gap?: SpacingSpaceScale;
  /** Wrap stack elements to additional rows as needed on small screens
   * @default true
   */
  wrap?: boolean;
  /** Elements to display inside stack */
  children?: React.ReactNode;
}

export const Inline = function Inline({
  align = 'start',
  blockAlign = 'center',
  gap = '4',
  wrap = true,
  children,
}: InlineProps) {
  const style = {
    '--pc-inline-align': align,
    '--pc-inline-block-align': blockAlign,
    '--pc-inline-wrap': wrap ? 'wrap' : 'nowrap',
    '--pc-inline-gap': `var(--p-space-${gap})`,
  } as React.CSSProperties;

  return (
    <div className={styles.Inline} style={style}>
      {children}
    </div>
  );
};
