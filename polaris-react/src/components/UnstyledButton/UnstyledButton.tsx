import React from 'react';

import type {BaseButton} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {useDisableClick} from '../../utilities/use-disable-interaction';
import {UnstyledLink} from '../UnstyledLink';
import {Box, BoxProps} from '../Box';

export interface UnstyledButtonProps extends BaseButton, BoxProps {
  /** The content to display inside the button */
  children?: React.ReactNode;
  /** A custom class name to apply styles to button */
  // className?: string;
  // [key: string]: any;
}

export function UnstyledButton({
  id,
  children,
  // className,
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
  ariaDescribedBy,
  ariaChecked,
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
  let buttonMarkup;

  const commonProps = {
    id,
    // className,
    'aria-label': accessibilityLabel,
  };
  const interactiveProps = {
    ...commonProps,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
  };

  const handleClick = useDisableClick(disabled, onClick);

  if (url) {
    buttonMarkup = disabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      // ???? what ????
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
    const buttonProps = {
      ...interactiveProps,
      ' aria-disabled': disabled,
      type: submit ? 'submit' : 'button',
      'aria-busy': loading ? true : undefined,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-describedby': ariaDescribedBy,
      'aria-checked': ariaChecked,
      'aria-pressed': pressed,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onClick: handleClick,
      tabIndex: disabled ? -1 : undefined,
      ...rest,
    };
    buttonMarkup = (
      <Box as="button" {...buttonProps}>
        {children}
      </Box>
    );
  }

  return buttonMarkup;
}
