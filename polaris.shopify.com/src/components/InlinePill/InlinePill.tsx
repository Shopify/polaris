import styles from './InlinePill.module.scss';
import {Box, BoxProps} from '../Box';

export interface InlinePillProps extends BoxProps {}

const InlinePill = ({as = 'button', className, ...rest}: InlinePillProps) => (
  <Box as={as} className={[styles.InlinePill, className]} {...rest} />
);

export default InlinePill;
