import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';

import styles from './Section.scss';

export interface SectionProps {
  children?: ReactNode;
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
    flush && styles.flush,
    subdued && styles.subdued,
    titleHidden && styles.titleHidden,
  );

  return <section className={className}>{children}</section>;
}
