import React from 'react';

import {classNames, variationName} from '../../utilities/css';

import styles from './TextStyle.scss';

type Variation =
  | 'positive'
  | 'negative'
  | 'warning'
  | 'strong'
  | 'subdued'
  | 'code';

enum VariationValue {
  Positive = 'positive',
  Negative = 'negative',
  Warning = 'warning',
  Strong = 'strong',
  Subdued = 'subdued',
  Code = 'code',
}

export interface TextStyleProps {
  /** Give text additional visual meaning */
  variation?: Variation;
  /** The content that should get the intended styling */
  children?: React.ReactNode;
}

/**
 * @deprecated The TextStyle component will be removed in the next
 * major version. Use the Text componant instead. See the
 * Polaris componant guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function TextStyle({variation, children}: TextStyleProps) {
  const className = classNames(
    variation && styles[variationName('variation', variation)],
    variation === VariationValue.Code && styles.code,
  );

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `TextStyle` component has been deprecated. Use the `Text` componant instead. See the Polaris componant guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }

  const Element = variationElement(variation);

  return <Element className={className}>{children}</Element>;
}

function variationElement(variation?: Variation) {
  return variation === VariationValue.Code ? 'code' : 'span';
}
