import React, {useCallback, useState} from 'react';
import {CaretDownMinor} from '@shopify/polaris-icons';

import type {BaseButton, ConnectedDisclosure, IconSource} from '../../types';
import {classNames, variationName} from '../../utilities/css';
import {
  handleMouseUpByBlurring,
  MouseUpBlurHandler,
} from '../../utilities/focus';
import {useFeatures} from '../../utilities/features';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {Spinner} from '../Spinner';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {UnstyledButton, UnstyledButtonProps} from '../UnstyledButton';

import styles from './Button.scss';

export interface ButtonProps extends BaseButton {
  /** The content to display inside the button */
  children?: string | string[];
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  /** Provides extra visual weight and identifies the success state of the button */
  success?: boolean;
  /** Provides extra visual weight and identifies the attention state of the button */
  attention?: boolean;
  /** Provides extra visual weight and identifies the info state of the button */
  info?: boolean;
  /** Provides extra visual weight and identifies the warning state of the button */
  warning?: boolean;
  /** Indicates a dangerous or potentially negative action */
  destructive?: boolean;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'slim' | 'medium' | 'large';
  /** Changes the inner text alignment of the button */
  textAlign?: 'left' | 'right' | 'center';
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

interface CommonButtonProps
  extends Pick<
    ButtonProps,
    | 'id'
    | 'accessibilityLabel'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'onMouseEnter'
    | 'onTouchStart'
  > {
  className: UnstyledButtonProps['className'];
  onMouseUp: MouseUpBlurHandler;
}

type LinkButtonProps = Pick<ButtonProps, 'url' | 'external' | 'download'>;

type ActionButtonProps = Pick<
  ButtonProps,
  | 'submit'
  | 'disabled'
  | 'loading'
  | 'ariaControls'
  | 'ariaExpanded'
  | 'ariaPressed'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onKeyPress'
>;

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
  success,
  attention,
  info,
  warning,
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
  const i18n = useI18n();

  const isDisabled = disabled || loading;

  const className = classNames(
    styles.Button,
    newDesignLanguage && styles.newDesignLanguage,
    primary && styles.primary,
    success && styles.success,
    attention && styles.attention,
    info && styles.info,
    warning && styles.warning,
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

  const spinnerColor =
    primary || success || attention || destructive ? 'white' : 'inkLightest';

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
      success && styles.success,
      attention && styles.attention,
      info && styles.info,
      warning && styles.warning,
      outline && styles.outline,
      size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
      textAlign && styles[variationName('textAlign', textAlign)],
      destructive && styles.destructive,
      connectedDisclosure.disabled && styles.disabled,
      styles.iconOnly,
      styles.ConnectedDisclosure,
      monochrome && styles.monochrome,
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

  const commonProps: CommonButtonProps = {
    id,
    className,
    accessibilityLabel,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
  };
  const linkProps: LinkButtonProps = {
    url,
    external,
    download,
  };
  const actionProps: ActionButtonProps = {
    submit,
    disabled: isDisabled,
    loading,
    ariaControls,
    ariaExpanded,
    ariaPressed: ariaPressedStatus,
    onKeyDown,
    onKeyUp,
    onKeyPress,
  };

  const buttonMarkup = (
    <UnstyledButton {...commonProps} {...linkProps} {...actionProps}>
      {content}
    </UnstyledButton>
  );

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
