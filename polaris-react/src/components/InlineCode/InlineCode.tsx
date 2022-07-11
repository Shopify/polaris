import React from 'react';

import styles from './InlineCode.scss';

export interface InlineCodeProps {
  /** The content to render inside the code block */
  children?: React.ReactNode;
}

export const InlineCode = ({children}: InlineCodeProps) => (
  <code className={styles.Code}>{children}</code>
);
