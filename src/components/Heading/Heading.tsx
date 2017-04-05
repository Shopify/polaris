import * as React from 'react';

import {HeadingTagName} from '../types';

import * as styles from './Heading.scss';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
}

export default function Heading({
  element: Element = 'h2',
  children,
}: Props) {

  return <Element className={styles.Heading}>{children}</Element>;
}
