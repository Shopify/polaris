import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './TextStyle.scss';

export type Variation = 'positive' | 'negative' | 'strong' | 'subdued' | 'code';

enum VariationValue {
  Positive = 'positive',
  Negative = 'negative',
  Strong = 'strong',
  Subdued = 'subdued',
  Code = 'code',
}

export interface Props {
  /** Give text additional visual meaning */
  variation?: Variation;
  /** The content that should get the intended styling */
  children?: React.ReactNode;
}

export default function TextStyle({variation, children}: Props) {
  const className = classNames(
    variation && styles[variationName('variation', variation)],
    variation === VariationValue.Code && styles.code,
  );
  const Element = variationElement(variation);

  return <Element className={className}>{children}</Element>;
}

function variationElement(variation?: Variation) {
  return variation === VariationValue.Code ? 'code' : 'span';
}
