import React from 'react';
import styles from './LinkButton.module.scss';
import {className as classNames} from '../../../utils/various';

type Props = React.ComponentProps<'button'>;

const LinkButton = React.forwardRef<HTMLButtonElement, Props>(
  function LinkButton({className, ...props}: Props, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(styles.Link, className)}
      />
    );
  },
);

export default LinkButton;
