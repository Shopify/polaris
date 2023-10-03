import React from 'react';

import {Box} from '../../../Box';
import {useFeatures} from '../../../../utilities/features';
import styles from '../../Popover.scss';

export interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  const {polarisSummerEditions2023} = useFeatures();

  return (
    <div className={styles.Section}>
      <Box
        padding={polarisSummerEditions2023 ? undefined : '400'}
        paddingInlineStart={polarisSummerEditions2023 ? '300' : undefined}
        paddingInlineEnd={polarisSummerEditions2023 ? '300' : undefined}
        paddingBlockStart={polarisSummerEditions2023 ? '200' : undefined}
        paddingBlockEnd={polarisSummerEditions2023 ? '150' : undefined}
      >
        {children}
      </Box>
    </div>
  );
}
