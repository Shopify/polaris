import * as React from 'react';

import {HeadingTagName} from '../types';

import * as styles from './Micro.scss';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
}

export default function Micro({
  element: Element = 'p',
  children,
  }: Props) {

  return <Element className={styles.Micro}>{children}</Element>;
}
