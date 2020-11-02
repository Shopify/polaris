import React, {useRef} from 'react';

import type {BaseButton} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {UnstyledLink} from '../UnstyledLink';

export interface UnstyledButtonProps extends BaseButton {
  /** The content to display inside the button */
  children?: React.ReactNode;
  /** A custom class name to apply styles to button */
  className?: string;
  [key: string]: any;
}

const ARIA_ROLE_ALERT = 'alert';

export function UnstyledButton({
  id,
  children,
  className,
  url,
  external,
  download,
  submit,
  disabled,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaPressed,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  ...rest
}: UnstyledButtonProps) {
  const hasGivenDeprecationWarning = useRef(false);

  if (ariaPressed && !hasGivenDeprecationWarning.current) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The ariaPressed prop has been replaced with pressed',
    );
    hasGivenDeprecationWarning.current = true;
  }

  const ariaPressedStatus = pressed !== undefined ? pressed : ariaPressed;

  let buttonMarkup;
  const buttonRole = loading
    ? [...new Set([ARIA_ROLE_ALERT, ...(role?.split(' ') || [])])].join(' ')
    : role;

  const commonProps = {
    id,
    className,
    'aria-label': accessibilityLabel,
  };
  const interactiveProps = {
    ...commonProps,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
  };

  if (url) {
    buttonMarkup = disabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      <a {...commonProps}>{children}</a>
    ) : (
      <UnstyledLink
        {...interactiveProps}
        url={url}
        external={external}
        download={download}
        {...rest}
      >
        {children}
      </UnstyledLink>
    );
  } else {
    buttonMarkup = (
      <button
        {...interactiveProps}
        type={submit ? 'submit' : 'button'}
        disabled={disabled}
        role={buttonRole}
        aria-busy={loading ? true : undefined}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressedStatus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return buttonMarkup;
}
