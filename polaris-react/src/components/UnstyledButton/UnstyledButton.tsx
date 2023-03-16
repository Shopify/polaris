import React, {useRef, forwardRef, useImperativeHandle} from 'react';

import type {BaseButton} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {useDisableClick} from '../../utilities/use-disable-interaction';
import {UnstyledLink} from '../UnstyledLink';

export interface UnstyledButtonProps extends BaseButton {
  /** The content to display inside the button */
  children?: React.ReactNode;
  /** A custom class name to apply styles to button */
  className?: string;
  [key: string]: any;
}

export const UnstyledButton = forwardRef(
  (
    {
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
      overrideRef,
      target,
      ...rest
    }: UnstyledButtonProps,
    ref,
  ) => {
    let buttonMarkup;
    const localButtonRef: React.RefObject<HTMLButtonElement> = useRef(null);
    const localLinkRef: React.RefObject<HTMLAnchorElement> = useRef(null);

    useImperativeHandle(ref, () => {
      return {
        focus: () =>
          url
            ? localLinkRef?.current?.focus()
            : localButtonRef?.current?.focus(),
      };
    });

    const commonProps = {
      id,
      className,
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
        <a {...commonProps} ref={localLinkRef}>
          {children}
        </a>
      ) : (
        <UnstyledLink
          {...interactiveProps}
          url={url}
          external={external}
          download={download}
          target={target}
          {...rest}
          ref={localLinkRef}
        >
          {children}
        </UnstyledLink>
      );
    } else {
      buttonMarkup = (
        <button
          {...interactiveProps}
          aria-disabled={disabled}
          type={submit ? 'submit' : 'button'}
          aria-busy={loading ? true : undefined}
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-describedby={ariaDescribedBy}
          aria-checked={ariaChecked}
          aria-pressed={pressed}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          onClick={handleClick}
          tabIndex={disabled ? -1 : undefined}
          ref={localButtonRef}
          {...rest}
        >
          {children}
        </button>
      );
    }

    return buttonMarkup;
  },
);
UnstyledButton.displayName = 'UnstyledButton';
