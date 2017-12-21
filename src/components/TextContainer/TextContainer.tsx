import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import * as styles from './TextContainer.scss';

export type Spacing = 'tight' | 'loose';
export interface Props {
  spacing?: Spacing,
  children?: React.ReactNode,
}

export default function TextContainer({spacing, children}: Props) {
  const className = classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
  );
  return <div className={className}>{children}</div>;
}
