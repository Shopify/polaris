import React, {Fragment, createElement} from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {Divider, type DividerProps} from '../Divider';
import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface AlphaStackProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Horizontal alignment of children */
  align?: Align;
  /** The spacing between children */
  gap?: Gap;
  /** HTML id attribute */
  id?: string;
  /** Reverse the render order of child items
   * @default false
   */
  reverseOrder?: boolean;
  /** Render a <Divider /> between each stack child. Setting to `true` will
   * render the default style of <Divider />
   * @default false
   */
  withDivider?: boolean | DividerProps['borderStyle'];
}

export const AlphaStack = ({
  as = 'div',
  children,
  align,
  gap,
  id,
  reverseOrder = false,
  withDivider = false,
  ...restProps
}: AlphaStackProps) => {
  const className = classNames(
    styles.AlphaStack,
    (as === 'ul' || as === 'ol') && styles.listReset,
    as === 'fieldset' && styles.fieldsetReset,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    '--pc-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('stack', 'gap', 'space', gap),
  } as React.CSSProperties;

  let dividedChildren = children;

  if (withDivider) {
    const dividerProps =
      typeof withDivider === 'boolean' ? {} : {borderStyle: withDivider};

    dividedChildren = React.Children.map(children, (child, index) => {
      if (index === 0) {
        return child;
      }
      return (
        <Fragment key={index}>
          <Divider {...dividerProps} />
          {child}
        </Fragment>
      );
    });
  }

  return createElement(
    as,
    {
      className,
      style: sanitizeCustomProperties(style),
      ...restProps,
    },
    dividedChildren,
  );
};
