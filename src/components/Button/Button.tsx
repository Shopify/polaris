import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities';

import UnstyledLink from '../UnstyledLink';
import Icon, {Props as IconProps} from '../Icon';

import * as styles from './Button.scss';

export type Size = 'slim' | 'large';

export interface Props {
  to?: string,
  children?: React.ReactNode,
  size?: Size,
  fullWidth?: boolean,
  primary?: boolean,
  outline?: boolean,
  destructive?: boolean,
  disabled?: boolean,
  plain?: boolean,
  external?: boolean,
  submit?: boolean,
  accessibilityLabel?: string,
  icon?: IconProps['source'],
  leftIcon?: IconProps['source'],
  rightIcon?: IconProps['source'],
  onClick?(): void,
  onFocus?(): void,
  onBlur?(): void,
}

export default function Button({
  to,
  disabled,
  children,
  accessibilityLabel,
  onClick,
  onFocus,
  onBlur,
  external,
  icon,
  leftIcon,
  rightIcon,
  primary,
  outline,
  destructive,
  plain,
  submit,
  size,
  fullWidth,
}: Props) {
  const className = classNames(
    styles.Button,
    primary && styles.primary,
    outline && styles.outline,
    destructive && styles.destructive,
    disabled && styles.disabled,
    plain && styles.plain,
    size && styles[variationName('size', size)],
    fullWidth && styles.fullWidth,
    icon && styles.iconOnly,
  );

  const leftIconMarkup = leftIcon
    ? <div className={classNames(styles.Icon, styles.left)}><Icon source={leftIcon} /></div>
    : null;

  const rightIconMarkup = rightIcon
    ? <div className={classNames(styles.Icon, styles.right)}><Icon source={rightIcon} /></div>
    : null;

  let content: React.ReactNode;

  if (icon == null) {
    content = leftIcon || rightIcon
      ? (
        <div className={styles.Content}>
          {leftIconMarkup}
          {children}
          {rightIconMarkup}
        </div>
      )
      : <div className={styles.Content}>{children}</div>;
  } else {
    content = <div className={styles.Icon}><Icon source={icon} /></div>;
  }

  const type = submit ? 'submit' : 'button';

  return (
    to
    ? (
      <UnstyledLink
        to={to}
        external={external}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={className}
        disabled={disabled}
        aria-label={accessibilityLabel}
      >
        {content}
      </UnstyledLink>
    )
    : (
      <button
        type={type}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={className}
        disabled={disabled}
        aria-label={accessibilityLabel}
      >
        {content}
      </button>
    )
  );
}

export function buttonsFrom(actions?: Props[] | Props, overrides: Partial<Props> = {}) {
  if (!actions) {
    return null;
  }

  if (Array.isArray(actions)) {
    return (actions).map((action, index) => {
      const props = {...action, ...overrides};
      return <Button key={index} {...props}/>;
    });
  } else {
    const props = {...actions, ...overrides};
    return <Button {...props}/>;
  }
}
