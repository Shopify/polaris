import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './TextStyle.scss';

export type Variation = 'positive' | 'negative' | 'strong' | 'subdued';

export interface Props {
  variation?: Variation,
  children?: React.ReactNode,
}

export default function TextStyle({
  variation,
  children,
}: Props) {
  const className = classNames(
    variation && styles[variationName('variation', variation)],
  );
  return (
    <span className={className}>
      {children}
    </span>
  );
}
