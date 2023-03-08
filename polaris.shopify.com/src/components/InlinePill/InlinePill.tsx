import styles from './InlinePill.module.scss';
import {forwardRef} from 'react';
import {Box, type WithAsProp} from '../Box';

export interface InlinePillProps {}

const InlinePill = forwardRef(
  ({as = 'span', className, ...props}, forwardedRef) => (
    <Box
      {...props}
      as={as}
      className={[styles.InlinePill, className]}
      ref={forwardedRef}
    />
  ),
) as WithAsProp<InlinePillProps, typeof Box, 'span'>;

InlinePill.displayName = 'InlinePill';

export default InlinePill;
