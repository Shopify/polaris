import React from 'react';
import {classNames, variationName} from '../../utilities/css';
import {HeadingTagName} from '../../types';
import styles from './DisplayText.scss';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface DisplayTextProps {
  /**
   * Name of element to use for text
   * @default 'p'
   */
  element?: HeadingTagName;
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
  /** Content to display */
  children?: React.ReactNode;
}

export function DisplayText({
  element: Element = 'p',
  children,
  size = 'medium',
}: DisplayTextProps) {
  const className = classNames(
    styles.DisplayText,
    size && styles[variationName('size', size)],
  );

  return <Element className={className}>{children}</Element>;
}
