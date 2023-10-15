import React from 'react';
import {cva, cx} from 'class-variance-authority';
import {
  SelectMinor,
  ChevronDownMinor,
  ChevronUpMinor,
} from '@shopify/polaris-icons';

import type {BaseButton, IconSource} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import type {MouseUpBlurHandler} from '../../utilities/focus';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {Spinner} from '../Spinner';
import {UnstyledButton} from '../UnstyledButton';
import type {UnstyledButtonProps} from '../UnstyledButton';

import styles from './Button.scss';

const button = cva(styles.Button, {
  variants: {
    variant: {
      primary: styles.variantPrimary,
      plain: styles.variantPlain,
      tertiary: styles.variantTertiary,
      monochromePlain: styles.variantMonochromePlain,
    },
    tone: {
      critical: styles.toneCritical,
      success: styles.toneSuccess,
    },
    size: {
      micro: styles.sizeMicro,
      slim: styles.sizeSlim,
      medium: '',
      large: styles.sizeLarge,
    },
    textAlign: {
      left: styles.textAlignLeft,
      right: styles.textAlignRight,
      center: styles.textAlignCenter,
      start: styles.textAlignStart,
      end: styles.textAlignEnd,
    },
    disabled: {true: styles.disabled},
    loading: {true: styles.loading},
    pressed: {true: styles.pressed},
    fullWidth: {true: styles.fullWidth},
    iconOnly: {true: styles.iconOnly},
    removeUnderline: {true: styles.removeUnderline},
  },
  defaultVariants: {
    size: 'medium',
  },
});

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
  /** Removes underline from button text (including on interaction)
   * @deprecated Use a variant instead
   */
  removeUnderline?: boolean;
  /** Icon to display to the left of the button content */
  icon?: React.ReactElement | IconSource;
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
  size = 'medium',
  textAlign,
  fullWidth,
  dataPrimaryLink,
  tone,
  variant,
}: ButtonProps) {
  const i18n = useI18n();

  const isDisabled = disabled || loading;
  const isPressed = pressed && !disabled && !url;
  const isIconOnly = Boolean(icon) && Boolean(children);

  const className = button({
    variant,
    tone,
    loading,
    size,
    textAlign,
    fullWidth,
    removeUnderline,
    disabled: isDisabled,
    pressed: isPressed,
    iconOnly: isIconOnly,
  });

  const disclosureMarkup = disclosure ? (
    <span className={styles.Icon}>
      <div className={cx(styles.DisclosureIcon, loading && styles.hidden)}>
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
    <span className={cx(styles.Icon, loading && styles.hidden)}>
      {iconSource}
    </span>
  ) : null;

  const childMarkup = children ? (
    <span
      className={cx(styles.Text, removeUnderline && styles.removeUnderline)}
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

  return buttonMarkup;
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
