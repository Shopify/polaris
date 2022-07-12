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
 * major version. Use the Text componant instead. See the
 * Polaris componant guide on how to use Text.
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

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `DisplayText` component has been deprecated. Use the `Text` componant instead. See the Polaris componant guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }

  return <Element className={className}>{children}</Element>;
}
