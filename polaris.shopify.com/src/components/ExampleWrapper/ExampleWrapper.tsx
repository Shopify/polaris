import {forwardRef} from 'react';
import {Box, type WithAsProp} from '../Box';
import styles from './ExampleWrapper.module.scss';

type Props = {
  as?: string;
  className?: string;
  children: React.ReactNode;
  renderFrameActions?: () => React.ReactNode;
};

const ExampleWrapper = forwardRef(
  ({as = 'div', className, children, renderFrameActions, ...props}, ref) => (
    <Box
      ref={ref}
      as={as}
      className={[styles.ExampleFrame, className]}
      {...props}
    >
      {children}
      {renderFrameActions ? (
        <Box className={[styles.Buttons, 'light-mode']}>
          {renderFrameActions()}
        </Box>
      ) : null}
    </Box>
  ),
) as WithAsProp<Props, typeof Box, 'div'>;

ExampleWrapper.displayName = 'ExampleWrapper';

export default ExampleWrapper;
