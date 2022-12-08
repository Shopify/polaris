import {Box, BoxProps, forwardRef} from '../Box';
import styles from './Stack.module.scss';

export interface StackProps extends BoxProps {
  gap?:
    | '0'
    | '025'
    | '05'
    | '1'
    | '10'
    | '12'
    | '16'
    | '2'
    | '20'
    | '24'
    | '28'
    | '3'
    | '32'
    | '4'
    | '5'
    | '6'
    | '8';
}

export const Stack = forwardRef(
  ({gap = '0', className, ...props}: StackProps, ref) => (
    <Box
      ref={ref}
      className={[styles.Stack, className]}
      style={{'--stack-gap-prop': `var(--p-space-${gap})`}}
      {...props}
    />
  ),
);
