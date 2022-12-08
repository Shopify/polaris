import styles from './Heading.module.scss';
import {Box, BoxProps, forwardRef} from '../Box';

export interface HeadingProps extends BoxProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export const Heading = forwardRef(
  ({as = 'h1', className, ...props}: HeadingProps, ref) => (
    <Box ref={ref} as={as} className={[styles[as], className]} {...props} />
  ),
);
