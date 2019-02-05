import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {HeadingTagName} from '../../types';
import styles from './DisplayText.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface Props {
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

export default function DisplayText({
  element: Element = 'p',
  children,
  size = 'medium',
}: Props) {
  const className = classNames(
    styles.DisplayText,
    size && styles[variationName('size', size)],
  );

  return <Element className={className}>{children}</Element>;
}
