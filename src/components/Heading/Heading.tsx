import type {ReactNode} from 'react';

import type {HeadingTagName} from '../../types';

import styles from './Heading.scss';

export interface HeadingProps {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  element?: HeadingTagName;
  /** The content to display inside the heading */
  children?: ReactNode;
  /** A unique identifier for the heading, used for reference in anchor links  */
  id?: string;
}

export function Heading({element: Element = 'h2', children, id}: HeadingProps) {
  return (
    <Element className={styles.Heading} id={id}>
      {children}
    </Element>
  );
}
