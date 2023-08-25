import React from 'react';

import {Box} from '../../../Box';
import styles from '../../Popover.scss';

export interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return (
    <div className={styles.Section}>
      <Box
        paddingInlineStart="3"
        paddingInlineEnd="3"
        paddingBlockStart="2"
        paddingBlockEnd="1_5-experimental"
      >
        {children}
      </Box>
    </div>
  );
}
