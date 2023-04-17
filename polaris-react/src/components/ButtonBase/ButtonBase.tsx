import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './ButtonBase.scss';

export type Target = '_blank' | '_self' | '_parent' | '_top';

interface CommonProps {
  className?: string;
  /** A unique identifier for the button */
  id?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: string;
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: 'false' | 'true';
  /** Indicates the element has a popup or sub-level menu associated with it */
  ariaHaspopup?: boolean;
  /** Indicates whether the element is pressed or selected */
  ariaPressed?: boolean;
  /** Callback when clicked */
  onClick?(): unknown;
  /** Callback when button becomes focussed */
  onFocus?(): void;
  /** Callback when focus leaves button */
  onBlur?(): void;
  /** Callback when a keypress event is registered on the button */
  onKeyPress?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when a keyup event is registered on the button */
  onKeyUp?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when a keydown event is registered on the button */
  onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
  /** Callback when pointerdown event is being triggered */
  onPointerDown?(): void;
}

type ButtonProps = CommonProps & {
  /** Sets the element to button */
  as?: 'button';
  /** Sets the button type to determines behavior */
  type?: 'button' | 'submit' | 'reset';
};

type AnchorProps = CommonProps & {
  /** Sets the element type to anchor */
  as?: 'a';
  /** Specifies the relationship between the linked resource and the current document */
  rel?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  to?: string;
};

export type ButtonBaseProps = ButtonProps | AnchorProps;

export const ButtonBase = React.forwardRef<'button' | 'a', ButtonBaseProps>(
  (props, ref) => {
    const {className = '', disabled = false, ...restProps} = props;

    if (props.as === 'a') {
      return <a rel={props.rel} href={props.to} />;
    }

    return (
      <button
        ref={ref}
        type={props.type}
        className={classNames(styles.ButtonBase, className)}
        {...restProps}
      />
    );
  },
);

ButtonBase.displayName = 'ButtonBase';
