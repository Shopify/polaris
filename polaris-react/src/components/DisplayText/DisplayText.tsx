import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import type {HeadingTagName} from '../../types';

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

/**
 * @deprecated The DisplayText component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
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
