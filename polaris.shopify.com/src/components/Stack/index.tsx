import {forwardRef} from 'react';
import {type SpacingSpaceScale} from '@shopify/polaris-tokens';
import {Box, type WithAsProp} from '../Box';
import styles from './Stack.module.scss';

export interface StackProps {
  gap?: SpacingSpaceScale;
}

export const Stack = forwardRef(
  ({gap = '0', style, className, ...props}, ref) => (
    <Box
      ref={ref}
      className={[styles.Stack, className]}
      style={{
        // @ts-expect-error The types for `style` don't support css vars for
        // some reason
        '--stack-gap-prop': `${gap * 0.25}rem`,
        ...style,
      }}
      {...props}
    />
  ),
) as WithAsProp<StackProps>;

Stack.displayName = 'Stack';

export interface RowProps {
  wrap?: Boolean;
}

export const Row = forwardRef(({className, wrap, style, ...props}, ref) => (
  <Stack
    ref={ref}
    className={[styles.Row, className]}
    style={{
      ...(wrap && {'--row-wrap-prop': 'wrap'}),
      ...style,
    }}
    {...props}
  />
)) as WithAsProp<RowProps, typeof Stack>;

Row.displayName = 'Row';
