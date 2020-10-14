import React, {useRef, useState, useCallback} from 'react';
import {CaretDownMinor} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../utilities/css';
import {
  handleMouseUpByBlurring,
  MouseUpBlurHandler,
} from '../../utilities/focus';
import {useFeatures} from '../../utilities/features';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import type {IconProps, ConnectedDisclosure} from '../../types';
import {Spinner} from '../Spinner';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {UnstyledButton, UnstyledButtonProps} from '../UnstyledButton';

import styles from './Button.scss';

type Size = 'slim' | 'medium' | 'large';
type TextAlign = 'left' | 'right' | 'center';
type IconSource = IconProps['source'];

export interface ButtonProps
  extends Pick<
    UnstyledButtonProps,
    | 'id'
    | 'url'
    | 'external'
    | 'download'
    | 'submit'
    | 'disabled'
    | 'loading'
    | 'pressed'
    | 'accessibilityLabel'
    | 'ariaControls'
    | 'ariaExpanded'
    | 'ariaPressed'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
    | 'onMouseEnter'
    | 'onTouchStart'
  > {
  /** The content to display inside the button */
  children?: string | string[];
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  /** Indicates a dangerous or potentially negative action */
  destructive?: boolean;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: Size;
  /** Changes the inner text alignment of the button */
  textAlign?: TextAlign;
  /** Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops */
  outline?: boolean;
  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;
  /** Displays the button with a disclosure icon. Defaults to `down` when set to true */
  disclosure?: 'down' | 'up' | boolean;
  /** Renders a button that looks like a link */
  plain?: boolean;
  /** Makes `plain` and `outline` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to `plain` Buttons */
  monochrome?: boolean;
  /** Icon to display to the left of the button content */
  icon?: React.ReactElement | IconSource;
  /** Disclosure button connected right of the button. Toggles a popover action list. */
  connectedDisclosure?: ConnectedDisclosure;
}

interface CommonButtonProps {
  id: ButtonProps['id'];
  className: string;
}

interface InteractiveButtonProps
  extends CommonButtonProps,
    Pick<
      ButtonProps,
      | 'accessibilityLabel'
      | 'onClick'
      | 'onFocus'
      | 'onBlur'
      | 'onMouseEnter'
      | 'onTouchStart'
    > {
  onMouseUp: MouseUpBlurHandler;
}

const DEFAULT_SIZE = 'medium';

export function Button({
  id,
  children,
  url,
  disabled,
  external,
  download,
  submit,
  loading,
  pressed,
  accessibilityLabel,
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
  icon,
  primary,
  outline,
  destructive,
  disclosure,
  plain,
  monochrome,
  size = DEFAULT_SIZE,
  textAlign,
  fullWidth,
  connectedDisclosure,
}: ButtonProps) {
  const {newDesignLanguage} = useFeatures();
  const hasGivenDeprecationWarning = useRef(false);

  if (ariaPressed && !hasGivenDeprecationWarning.current) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The ariaPressed prop has been replaced with pressed',
    );
    hasGivenDeprecationWarning.current = true;
  }

  const i18n = useI18n();

  const isDisabled = disabled || loading;

  const className = classNames(
    styles.Button,
    newDesignLanguage && styles.newDesignLanguage,
    primary && styles.primary,
    outline && styles.outline,
    destructive && styles.destructive,
    isDisabled && styles.disabled,
    loading && styles.loading,
    plain && styles.plain,
    pressed && !disabled && !url && styles.pressed,
    monochrome && styles.monochrome,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    textAlign && styles[variationName('textAlign', textAlign)],
    fullWidth && styles.fullWidth,
    icon && children == null && styles.iconOnly,
    connectedDisclosure && styles.connectedDisclosure,
  );

  const disclosureIcon = (
    <Icon source={loading ? 'placeholder' : CaretDownMinor} />
  );

  const disclosureIconMarkup = disclosure ? (
    <span className={styles.Icon}>
      <div
        className={classNames(
          styles.DisclosureIcon,
          disclosure === 'up' && styles.DisclosureIconFacingUp,
          loading && styles.Hidden,
        )}
      >
        {disclosureIcon}
      </div>
    </span>
  ) : null;

  let iconMarkup;

  if (icon) {
    const iconInner = isIconSource(icon) ? (
      <Icon source={loading ? 'placeholder' : icon} />
    ) : (
      icon
    );
    iconMarkup = (
      <span className={classNames(styles.Icon, loading && styles.Hidden)}>
        {iconInner}
      </span>
    );
  }

  const childMarkup = children ? (
    <span className={styles.Text}>{children}</span>
  ) : null;

  const spinnerColor = primary || destructive ? 'white' : 'inkLightest';

  const spinnerSVGMarkup = loading ? (
    <span className={styles.Spinner}>
      <Spinner
        size="small"
        color={spinnerColor}
        accessibilityLabel={i18n.translate(
          'Polaris.Button.spinnerAccessibilityLabel',
        )}
      />
    </span>
  ) : null;

  const content =
    iconMarkup || disclosureIconMarkup ? (
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {iconMarkup}
        {childMarkup}
        {disclosureIconMarkup}
      </span>
    ) : (
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {childMarkup}
      </span>
    );

  const ariaPressedStatus = pressed !== undefined ? pressed : ariaPressed;

  const [disclosureActive, setDisclosureActive] = useState(false);
  const toggleDisclosureActive = useCallback(() => {
    setDisclosureActive((disclosureActive) => !disclosureActive);
  }, []);

  let connectedDisclosureMarkup;

  if (connectedDisclosure) {
    const connectedDisclosureClassName = classNames(
      styles.Button,
      primary && styles.primary,
      outline && styles.outline,
      size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
      textAlign && styles[variationName('textAlign', textAlign)],
      destructive && styles.destructive,
      connectedDisclosure.disabled && styles.disabled,
      styles.iconOnly,
      styles.ConnectedDisclosure,
      newDesignLanguage && styles.newDesignLanguage,
    );

    const defaultLabel = i18n.translate(
      'Polaris.Button.connectedDisclosureAccessibilityLabel',
    );

    const {
      disabled,
      accessibilityLabel: disclosureLabel = defaultLabel,
    } = connectedDisclosure;

    const connectedDisclosureActivator = (
      <button
        type="button"
        className={connectedDisclosureClassName}
        disabled={disabled}
        aria-label={disclosureLabel}
        onClick={toggleDisclosureActive}
        onMouseUp={handleMouseUpByBlurring}
      >
        <span className={styles.Icon}>
          <Icon source={CaretDownMinor} />
        </span>
      </button>
    );

    connectedDisclosureMarkup = (
      <Popover
        active={disclosureActive}
        onClose={toggleDisclosureActive}
        activator={connectedDisclosureActivator}
        preferredAlignment="right"
      >
        <ActionList
          items={connectedDisclosure.actions}
          onActionAnyItem={toggleDisclosureActive}
        />
      </Popover>
    );
  }

  let buttonMarkup;

  const commonProps: CommonButtonProps = {
    id,
    className,
  };
  const interactiveProps: InteractiveButtonProps = {
    ...commonProps,
    accessibilityLabel,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
  };

  if (url) {
    buttonMarkup = isDisabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      <a {...commonProps} aria-label={accessibilityLabel}>
        {content}
      </a>
    ) : (
      <UnstyledButton
        {...interactiveProps}
        url={url}
        external={external}
        download={download}
      >
        {content}
      </UnstyledButton>
    );
  } else {
    buttonMarkup = (
      <UnstyledButton
        {...interactiveProps}
        submit={submit}
        disabled={isDisabled}
        loading={loading}
        ariaControls={ariaControls}
        ariaExpanded={ariaExpanded}
        ariaPressed={ariaPressedStatus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
      >
        {content}
      </UnstyledButton>
    );
  }

  return connectedDisclosureMarkup ? (
    <div className={styles.ConnectedDisclosureWrapper}>
      {buttonMarkup}
      {connectedDisclosureMarkup}
    </div>
  ) : (
    buttonMarkup
  );
}

function isIconSource(x: any): x is IconSource {
  return (
    typeof x === 'string' ||
    (typeof x === 'object' && x.body) ||
    typeof x === 'function'
  );
}
