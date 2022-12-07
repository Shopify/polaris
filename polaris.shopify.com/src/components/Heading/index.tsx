import styles from './Heading.module.scss';
import {Box, BoxProps, forwardRef} from '../Box';
import {className as classNames} from '../../utils/various';

export interface HeadingProps extends BoxProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export const Heading = forwardRef(
  ({as = 'h1', className, ...props}: HeadingProps, ref) => (
    <Box
      ref={ref}
      as={as}
      className={classNames(styles[as], className)}
      {...props}
    />
  ),
);
