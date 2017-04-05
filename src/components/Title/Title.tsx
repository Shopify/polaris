import * as React from 'react';

import {HeadingTagName} from '../types';

import * as styles from './Title.scss';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
}

export default function Title({
  element: Element = 'h1',
  children,
}: Props) {

  return <Element className={styles.Title}>{children}</Element>;
}
