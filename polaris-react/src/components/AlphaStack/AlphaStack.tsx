import React, {createElement} from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

type ResponsiveProp<T> =
  | T
  | {
      [Breakpoint in BreakpointsAlias]?: T;
    };

export interface AlphaStackProps {
  /** HTML Element type */
  as?: Element;
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust vertical alignment of elements */
  align?: Align;
  /** Toggle elements to be full width */
  fullWidth?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
}

export const AlphaStack = ({
  as = 'div',
  children,
  align = 'start',
  fullWidth,
  spacing = '4',
}: AlphaStackProps) => {
  const className = classNames(
    styles.AlphaStack,
    fullWidth && styles.fullWidth,
    as === 'ul' && styles.listReset,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    ...getResponsiveProps('stack', 'spacing', 'space', spacing),
  } as React.CSSProperties;

  return createElement(
    as,
    {
      className,
      style: sanitizeCustomProperties(style),
    },
    children,
  );
};

const getResponsiveProps = (
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp:
    | string
    | {
        [Breakpoint in BreakpointsAlias]?: string;
      },
) => {
  if (typeof responsiveProp === 'string') {
    return {
      [`--pc-${componentName}-${componentProp}-xs`]: `var(--p-${tokenSubgroup}-${responsiveProp})`,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      `var(--p-${tokenSubgroup}-${aliasOrScale})`,
    ]),
  );
};
