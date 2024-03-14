import React from 'react';

import {Box} from '../../../Box';
import styles from '../../Popover.module.css';

export interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return (
    <div className={styles.Section}>
      <Box
        paddingInlineStart="300"
        paddingInlineEnd="300"
        paddingBlockStart="200"
        paddingBlockEnd="150"
      >
        {children}
      </Box>
    </div>
  );
}
