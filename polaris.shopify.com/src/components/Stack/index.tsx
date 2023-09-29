import {forwardRef} from 'react';
import {type SpaceScale} from '@shopify/polaris-tokens';
import {Box, type WithAsProp} from '../Box';
import styles from './Stack.module.scss';

export interface StackProps {
  gap?: SpaceScale;
}

export const Stack = forwardRef(
  ({gap = '0', style, className, as, ...props}, ref) => (
    <Box
      as={as}
      ref={ref}
      className={[
        styles.Stack,
        className,
        as === 'ul' ? styles.List : undefined,
      ]}
      style={{
        '--stack-gap-prop': `var(--p-space-${gap})`,
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
