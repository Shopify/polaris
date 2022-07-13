import React from 'react';

import {classNames, variationName} from '../../utilities/css';

import styles from './TextContainer.scss';

type Spacing = 'tight' | 'loose';

export interface TextContainerProps {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing;
  /** The content to render in the text container. */
  children?: React.ReactNode;
}

/**
 * @deprecated The TextContainer component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function TextContainer({spacing, children}: TextContainerProps) {
  const className = classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
  );

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `TextContainer` component has been deprecated. Use the `Text` component instead. See the Polaris component guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }
  return <div className={className}>{children}</div>;
}
