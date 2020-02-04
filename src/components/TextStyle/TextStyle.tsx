import React from 'react';
import {classNames, variationName} from '../../utilities/css';
import styles from './TextStyle.scss';

type Variation = 'positive' | 'negative' | 'strong' | 'subdued' | 'code';

enum VariationValue {
  Positive = 'positive',
  Negative = 'negative',
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

export function TextStyle({variation, children}: TextStyleProps) {
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
