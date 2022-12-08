import styles from './Lede.module.scss';
import {Box, forwardRef} from '../Box';

export const Lede = forwardRef(({className, ...props}, ref) => (
  <Box
    ref={ref}
    as="p"
    className={[styles.LedeParagraph, className]}
    {...props}
  />
));
