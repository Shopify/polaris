import React, {useCallback, useState} from 'react';
import {
  SelectMinor,
  ChevronDownMinor,
  ChevronUpMinor,
} from '@shopify/polaris-icons';

import type {BaseButton, ConnectedDisclosure, IconSource} from '../../types';
import {classNames, variationName} from '../../utilities/css';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import type {MouseUpBlurHandler} from '../../utilities/focus';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {Spinner} from '../Spinner';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {UnstyledButton} from '../UnstyledButton';
import type {UnstyledButtonProps} from '../UnstyledButton';
import {useDisableClick} from '../../utilities/use-disable-interaction';

import styles from './Button.scss';

export interface ButtonProps extends BaseButton {
  /** The content to display inside the button */
  children?: string | string[];
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'micro' | 'slim' | 'medium' | 'large';
  /** Changes the inner text alignment of the button */
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;
  /** Displays the button with a disclosure icon. Defaults to `down` when set to true */
  disclosure?: 'down' | 'up' | 'select' | boolean;
  /** Removes underline from button text (including on interaction) */
  removeUnderline?: boolean;
  /** Icon to display to the left of the button content */
  icon?: React.ReactElement | IconSource;
  /** @deprecated See the split example to replicate this prop */
  connectedDisclosure?: ConnectedDisclosure;
  /** Indicates whether or not the button is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
  /** Sets the color treatment of the Button. */
  tone?: 'critical' | 'success';
  /** Changes the visual appearance of the Button. */
  variant?: 'plain' | 'primary' | 'tertiary' | 'monochromePlain';
}

interface CommonButtonProps
  extends Pick<
    ButtonProps,
    | 'id'
    | 'accessibilityLabel'
    | 'ariaDescribedBy'
    | 'role'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'onMouseEnter'
    | 'onTouchStart'
  > {
  className: UnstyledButtonProps['className'];
  onMouseUp: MouseUpBlurHandler;
  'data-primary-link'?: boolean;
}

type LinkButtonProps = Pick<
  ButtonProps,
  'url' | 'external' | 'download' | 'target'
>;

type ActionButtonProps = Pick<
  ButtonProps,
  | 'submit'
  | 'disabled'
  | 'loading'
  | 'ariaControls'
  | 'ariaExpanded'
  | 'ariaChecked'
  | 'pressed'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onKeyPress'
  | 'onPointerDown'
>;

const DEFAULT_SIZE = 'medium';

export function Button({
  id,
  children,
  url,
  disabled,
  external,
  download,
  target,
  submit,
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
  onPointerDown,
  icon,
  disclosure,
  removeUnderline,
  size = DEFAULT_SIZE,
  textAlign,
  fullWidth,
  connectedDisclosure,
  dataPrimaryLink,
  tone,
  variant,
}: ButtonProps) {
  const i18n = useI18n();

  const isDisabled = disabled || loading;

  const className = classNames(
    styles.Button,
    variant === 'primary' && styles.primary,
    variant === 'plain' && styles.plain,
    variant === 'tertiary' && styles.primary,
    variant === 'tertiary' && styles.tertiary,
    variant === 'monochromePlain' && styles.monochrome,
    variant === 'monochromePlain' && styles.plain,
    tone === 'critical' && styles.destructive,
    tone === 'success' && styles.success,
    isDisabled && styles.disabled,
    loading && styles.loading,
    pressed && !disabled && !url && styles.pressed,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    textAlign && styles[variationName('textAlign', textAlign)],
    fullWidth && styles.fullWidth,
    icon && children == null && styles.iconOnly,
    connectedDisclosure && styles.connectedDisclosure,
    removeUnderline && styles.removeUnderline,
  );

  const disclosureMarkup = disclosure ? (
    <span className={styles.Icon}>
      <div
        className={classNames(styles.DisclosureIcon, loading && styles.hidden)}
      >
        <Icon
          source={
            loading
              ? 'placeholder'
              : getDisclosureIconSource(
                  disclosure,
                  ChevronUpMinor,
                  ChevronDownMinor,
                )
          }
        />
      </div>
    </span>
  ) : null;

  const iconSource = isIconSource(icon) ? (
    <Icon source={loading ? 'placeholder' : icon} />
  ) : (
    icon
  );
  const iconMarkup = iconSource ? (
    <span className={classNames(styles.Icon, loading && styles.hidden)}>
      {iconSource}
    </span>
  ) : null;

  const childMarkup = children ? (
    <span
      className={classNames(
        styles.Text,
        removeUnderline && styles.removeUnderline,
      )}
      // Fixes Safari bug that doesn't re-render button text to correct color
      key={disabled ? 'text-disabled' : 'text'}
    >
      {children}
    </span>
  ) : null;

  const spinnerSVGMarkup = loading ? (
    <span className={styles.Spinner}>
      <Spinner
        size="small"
        accessibilityLabel={i18n.translate(
          'Polaris.Button.spinnerAccessibilityLabel',
        )}
      />
    </span>
  ) : null;

  const [disclosureActive, setDisclosureActive] = useState(false);
  const toggleDisclosureActive = useCallback(() => {
    setDisclosureActive((disclosureActive) => !disclosureActive);
  }, []);

  const handleClick = useDisableClick(disabled, toggleDisclosureActive);

  let connectedDisclosureMarkup;

  if (connectedDisclosure) {
    const connectedDisclosureClassName = classNames(
      styles.Button,
      variant === 'primary' && styles.primary,
      variant === 'monochromePlain' && styles.monochrome,
      variant === 'monochromePlain' && styles.plain,
      size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
      textAlign && styles[variationName('textAlign', textAlign)],
      tone === 'critical' && styles.destructive,
      connectedDisclosure.disabled && styles.disabled,
      styles.iconOnly,
      styles.ConnectedDisclosure,
    );

    const defaultLabel = i18n.translate(
      'Polaris.Button.connectedDisclosureAccessibilityLabel',
    );

    const {disabled, accessibilityLabel: disclosureLabel = defaultLabel} =
      connectedDisclosure;

    const connectedDisclosureActivator = (
      <button
        type="button"
        className={connectedDisclosureClassName}
        aria-disabled={disabled}
        aria-label={disclosureLabel}
        aria-describedby={ariaDescribedBy}
        aria-checked={ariaChecked}
        onClick={handleClick}
        onMouseUp={handleMouseUpByBlurring}
        tabIndex={disabled ? -1 : undefined}
      >
        <span className={styles.Icon}>
          <Icon source={ChevronDownMinor} />
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
    ariaDescribedBy,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
    'data-primary-link': dataPrimaryLink,
  };
  const linkProps: LinkButtonProps = {
    url,
    external,
    download,
    target,
  };
  const actionProps: ActionButtonProps = {
    submit,
    disabled: isDisabled,
    loading,
    ariaControls,
    ariaExpanded,
    ariaChecked,
    pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onPointerDown,
  };

  const buttonMarkup = (
    <UnstyledButton {...commonProps} {...linkProps} {...actionProps}>
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {iconMarkup}
        {childMarkup}
        {disclosureMarkup}
      </span>
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

function getDisclosureIconSource(
  disclosure: NonNullable<ButtonProps['disclosure']>,
  upIcon: IconSource,
  downIcon: IconSource,
) {
  if (disclosure === 'select') {
    return SelectMinor;
  }

  return disclosure === 'up' ? upIcon : downIcon;
}
