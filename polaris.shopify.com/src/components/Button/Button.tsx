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

export const StableButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    // We want to change the button's text on hover, but that would change the
    // button's width which can look janky. So we capture the button's width
    // immediately after it's rendered, and set that as a width: style attribute
    // so it wont change when the text changes.
    const [buttonWidth, setButtonWidth] = useState<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useLayoutEffect(() => {
      if (!buttonRef.current) {
        return;
      }
      setButtonWidth(buttonRef.current.offsetWidth);
    }, []);

    return (
      <Button
        ref={mergeRefs([buttonRef, ref])}
        {...props}
        style={{
          ...(buttonWidth !== null && {width: buttonWidth}),
        }}
      />
    );
  },
);
StableButton.displayName = 'StableButton';

export default Button;
