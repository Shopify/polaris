import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Modal.scss';

export interface Props {
  children?: React.ReactNode,
  subdued?: boolean,
}

export default function Section({
  children,
  subdued = false,
}: Props) {
  const className = classNames(
    styles.Section,
    subdued && styles.subdued,
  );

  return <section className={className}>{children}</section>;
}
