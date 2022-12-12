import {forwardRef} from 'react';
import styles from './Lede.module.scss';
import {Box, type WithAsProp} from '../Box';

export const Lede = forwardRef(({as = 'p', className, ...props}, ref) => (
  <Box
    ref={ref}
    as={as}
    className={[styles.LedeParagraph, className]}
    {...props}
  />
)) as WithAsProp<{}, typeof Box, 'p'>;

Lede.displayName = 'Lede';
