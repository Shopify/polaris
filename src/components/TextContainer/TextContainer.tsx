import * as React from 'react';
import * as styles from './TextContainer.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function TextContainer({children}: Props) {
  return <div className={styles.TextContainer}>{children}</div>;
}
