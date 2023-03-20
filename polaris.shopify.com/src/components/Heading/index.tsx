import {forwardRef} from 'react';
import styles from './Heading.module.scss';
import {Box, type WithAsProp} from '../Box';

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export const Heading = forwardRef(({as = 'h1', className, ...props}, ref) => (
  <Box ref={ref} as={as} className={[styles[as], className]} {...props} />
)) as WithAsProp<HeadingProps, typeof Box, 'h1'>;

Heading.displayName = 'Heading';
