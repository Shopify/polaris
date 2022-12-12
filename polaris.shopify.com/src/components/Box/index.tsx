import {forwardRef} from 'react';
import {className as classNames} from '../../utils/various';
import type {ClassName} from '../../utils/various';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

export interface BoxProps {
  className?: ClassName;
}

type PolymorphicBox = Polymorphic.ForwardRefComponent<'div', BoxProps>;

/**
 * Box is the most abstract component on top of which other components are
 * built. It renders a `div` element by default, customisable via the `as` prop.
 */
export const Box = forwardRef(
  ({as: Tag = 'div', className, ...props}, forwardedRef) => (
    <Tag
      {...(className
        ? {
            className: classNames(className),
          }
        : null)}
      {...props}
      ref={forwardedRef}
    />
  ),
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
  Forwardee extends typeof Box = typeof Box,
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
  Polymorphic.OwnProps<Forwardee> & Props
>;
