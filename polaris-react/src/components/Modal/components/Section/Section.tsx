import React from 'react';

import {Box} from '../../../Box';
import {classNames} from '../../../../utilities/css';

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
  const className = classNames(
    styles.Section,
    titleHidden && styles.titleHidden,
  );

  return (
    <div className={className}>
      <Box
        as="section"
        padding={flush ? '0' : '5'}
        {...(titleHidden && {paddingRight: '0'})}
        {...(subdued && {background: 'surface-subdued'})}
      >
        {children}
      </Box>
    </div>
  );
}
