import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import styles from './TopBarButton.module.css';
import {classNames} from '../../../../utilities/css';

export const TopBarButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function TopBarButton({children, className, ...props}, ref) {
  return (
    <button
      type="button"
      {...props}
      className={classNames(className, styles.TopBarButton)}
      ref={ref}
    >
      {children}
    </button>
  );
});
