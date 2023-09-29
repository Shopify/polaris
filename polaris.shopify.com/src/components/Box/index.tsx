import {forwardRef} from 'react';
import {
  className as classNames,
  getResponsiveProps,
  ResponsiveProp,
} from '../../utils/various';
import type {ClassName} from '../../utils/various';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import {SpaceScale} from '@shopify/polaris-tokens';
import styles from './Box.module.scss';

export interface BoxProps {
  className?: ClassName;
  padding?: ResponsiveProp<SpaceScale>;
  paddingInlineStart?: ResponsiveProp<SpaceScale>;
  paddingInlineEnd?: ResponsiveProp<SpaceScale>;
  paddingBlockStart?: ResponsiveProp<SpaceScale>;
  paddingBlockEnd?: ResponsiveProp<SpaceScale>;
  /** Minimum height of container */
  minHeight?: string;
  /** Minimum width of container */
  minWidth?: string;
  /** Maximum width of container */
  maxWidth?: string;
}

export type OwnProps<T> = Polymorphic.OwnProps<T>;

type PolymorphicBox = Polymorphic.ForwardRefComponent<any, BoxProps>;

/**
 * Box is the most abstract component on top of which other components are
 * built. It renders a `div` element by default, customisable via the `as` prop.
 */
export const Box = forwardRef(
  (
    {
      as: Tag = 'div',
      className,
      minHeight,
      minWidth,
      maxWidth,
      padding = '0',
      paddingBlockStart,
      paddingBlockEnd,
      paddingInlineStart,
      paddingInlineEnd,
      ...props
    },
    forwardedRef,
  ) => {
    const style = {
      ...getResponsiveProps(
        'box',
        'padding-block-start',
        'space',
        paddingBlockStart || padding,
      ),
      ...getResponsiveProps(
        'box',
        'padding-block-end',
        'space',
        paddingBlockEnd || padding,
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-start',
        'space',
        paddingInlineStart || padding,
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-end',
        'space',
        paddingInlineEnd || padding,
      ),
      '--pc-box-min-height': minHeight,
      '--px-box-min-width': minWidth,
      '--px-box-max-width': maxWidth,
    } as React.CSSProperties;
    return (
      <Tag
        style={style}
        className={classNames(styles.Box, className)}
        {...props}
        ref={forwardedRef}
      />
    );
  },
) as PolymorphicBox;

Box.displayName = 'Box';

/**
 * Creating a component which extends Box and forwards the "as" prop requires
 * this special type.
 *
 * If you need to customize the `as` prop, use
 *
 * import style from './Stack.module.scss';
 * import {forwardRef} from 'react';
 * import {Box, type WithAsProp} from '../Box';
 *
 * export interface StackProps {}
 *
 * const Stack = forwardRef(
 *   ({className, ...props}, ref) => (
 *     <Box
 *       {...props}
 *       className={[styles.Stack, className]}
 *       ref={ref}
 *     />
 *   ),
 * ) as WithAsProp<StackProps>;
 *
 * Stack.displayName = 'Stack';
 */
export type WithAsProp<
  Props,
  Forwardee = typeof Box,
  // Useful for customizing the intrinsic element, eg; 'div', 'button', etc.
  // Will infer the correct intrinsic element from a component which uses
  // WithAsProp.
  As = Forwardee,
> = Polymorphic.ForwardRefComponent<
  // If it's a component which already wraps <Box>, infer the intrinsic element
  As extends Polymorphic.ForwardRefComponent<infer I, any>
    ? I
    : // Otherwise, we only accept strings represending one of React's intrinsic
    // elements.
    As extends keyof JSX.IntrinsicElements
    ? As
    : never,
  Forwardee extends Polymorphic.ForwardRefComponent<any, any>
    ? Polymorphic.OwnProps<Forwardee> & Props
    : Props
>;
