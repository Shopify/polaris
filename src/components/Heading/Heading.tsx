import * as React from 'react';
import {HeadingTagName} from 'types';
import * as styles from './Heading.scss';

export interface Props {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  element?: HeadingTagName;
  /** The content to display inside the heading */
  children?: React.ReactNode;
}

export default function Heading({element: Element = 'h2', children}: Props) {
  return <Element className={styles.Heading}>{children}</Element>;
}
