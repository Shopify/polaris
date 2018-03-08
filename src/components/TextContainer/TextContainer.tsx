import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import * as styles from './TextContainer.scss';

export type Spacing = 'tight' | 'loose';
export interface Props {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing,
  /** The content to render in the text container. */
  children?: React.ReactNode,
}

export default function TextContainer({spacing, children}: Props) {
  const className = classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
  );
  return <div className={className}>{children}</div>;
}
