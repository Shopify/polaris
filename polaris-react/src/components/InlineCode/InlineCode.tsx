import React from 'react';
import type {ReactNode} from 'react';

import styles from './InlineCode.module.scss';

export interface InlineCodeProps {
  /** The content to render inside the code block */
  children: ReactNode;
}

export const InlineCode = ({children}: InlineCodeProps) => (
  <code className={styles.Code}>{children}</code>
);
