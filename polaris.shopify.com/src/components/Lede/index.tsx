import styles from './Lede.module.scss';
import {Box, forwardRef} from '../Box';
import {className as classNames} from '../../utils/various';

export const Lede = forwardRef(({className, ...props}, ref) => (
  <Box
    ref={ref}
    as="p"
    className={classNames(styles.LedeParagraph, className)}
    {...props}
  />
));
