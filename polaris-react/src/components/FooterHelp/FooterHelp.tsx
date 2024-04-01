import React from 'react';

import {Text} from '../Text';

import styles from './FooterHelp.module.css';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
  /** Horizontal alignment of the component */
  align?: 'start' | 'center' | 'end';
}

export function FooterHelp({children, align = 'center'}: FooterHelpProps) {
  const style = {
    '--pc-footer-help-align': align,
  } as React.CSSProperties;

  return (
    <div className={styles.FooterHelp} style={style}>
      <Text as="p" variant="bodyLg">
        {children}
      </Text>
    </div>
  );
}
