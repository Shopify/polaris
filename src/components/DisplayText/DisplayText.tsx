import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {HeadingTagName} from '../types';

import * as styles from './DisplayText.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface Props {
  element?: HeadingTagName,
  children?: React.ReactNode,
  size?: Size,
};

export default function DisplayText({
  element: Element = 'p',
  children,
  size = 'medium',
}: Props) {
  const className = classNames(
    styles.Display,
    size && styles[variationName('size', size)],
  );

  return <Element className={className}>{children}</Element>;
}
