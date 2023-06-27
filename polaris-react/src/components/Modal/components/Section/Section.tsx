import React from 'react';

import {Box} from '../../../Box';
import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';

import styles from './Section.scss';

export interface SectionProps {
  children?: React.ReactNode;
  flush?: boolean;
  subdued?: boolean;
  titleHidden?: boolean;
}

export function Section({
  children,
  flush = false,
  subdued = false,
  titleHidden = false,
}: SectionProps) {
  const {polarisSummerEditions2023} = useFeatures();

  const className = classNames(
    styles.Section,
    titleHidden && styles.titleHidden,
  );

  return (
    <div className={className}>
      <Box
        as="section"
        // eslint-disable-next-line no-nested-ternary
        padding={flush ? '0' : polarisSummerEditions2023 ? '4' : '5'}
        {...(titleHidden && {paddingInlineEnd: '0'})}
        {...(subdued && {
          background: polarisSummerEditions2023
            ? 'bg-secondary-experimental'
            : 'bg-subdued',
        })}
      >
        {children}
      </Box>
    </div>
  );
}
