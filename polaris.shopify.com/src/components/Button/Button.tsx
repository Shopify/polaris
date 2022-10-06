import React, {forwardRef, useRef, useState, useLayoutEffect} from 'react';
import Link, {LinkProps} from 'next/link';
import type {HTMLProps, PropsWithChildren} from 'react';
import {mergeRefs} from 'react-merge-refs';
import {className} from '../../utils/various';
import styles from './Button.module.scss';

interface Props {
  small?: boolean;
  pill?: boolean;
  primary?: boolean;
  fill?: boolean;
}

interface ButtonProps extends Props, HTMLProps<HTMLButtonElement> {}
interface LinkButtonProps extends Props, PropsWithChildren<LinkProps> {
  download?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {small, pill, primary, fill, children, className: classNameProp, ...rest},
    ref,
  ) => {
    return (
      <button
        className={className(
          styles.Button,
          small && styles.small,
          pill && styles.pill,
          primary && styles.primary,
          fill && styles.fill,
          classNameProp,
        )}
        {...rest}
        type="button"
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export function LinkButton({
  small,
  pill,
  href,
  primary,
  download,
  fill,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} passHref>
      <a
        className={className(
          styles.Button,
          small && styles.small,
          pill && styles.pill,
          primary && styles.primary,
          fill && styles.fill,
        )}
        download={download}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}

export default Button;
