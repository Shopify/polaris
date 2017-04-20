import * as React from 'react';
import {HeadingTagName} from '../../types';
import * as styles from './Subheading.scss';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
}

export default function Subheading({
  element: Element = 'h3',
  children,
}: Props) {
  const ariaLabel = typeof children === 'string' ? children : null;
  return <Element aria-label={ariaLabel} className={styles.Subheading}>{children}</Element>;
}
