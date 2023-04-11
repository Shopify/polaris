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

/** @deprecated Use AlphaStack instead */
export function TextContainer({spacing, children}: TextContainerProps) {
  const className = classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
  );
  return <div className={className}>{children}</div>;
}
