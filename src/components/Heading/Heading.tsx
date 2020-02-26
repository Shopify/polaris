import React from 'react';
import {HeadingTagName} from '../../types';
import {preventOrphans} from '../../utilities/string';
import styles from './Heading.scss';

export interface HeadingProps {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  element?: HeadingTagName;
  /** The content to display inside the heading */
  children?: React.ReactNode;
}

export function Heading({element: Element = 'h2', children}: HeadingProps) {
  const content = React.Children.map(children, (child) => {
    return typeof child === 'string' ? preventOrphans(child) : child;
  });
  return <Element className={styles.Heading}>{content}</Element>;
}
