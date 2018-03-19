import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Section.scss';

export interface Props {
  children?: React.ReactNode,
  flush?: boolean,
  subdued?: boolean,
}

export default function Section({
  children,
  flush = false,
  subdued = false,
}: Props) {
  const className = classNames(
    styles.Section,
    flush && styles.flush,
    subdued && styles.subdued,
  );

  return <section className={className}>{children}</section>;
}
