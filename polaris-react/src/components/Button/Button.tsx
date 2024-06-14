import React from 'react';
import {
  SelectIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@shopify/polaris-icons';

import {useBreakpoints} from '../../utilities/breakpoints';
import type {BaseButton, IconSource} from '../../types';
import {classNames, variationName} from '../../utilities/css';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import type {MouseUpBlurHandler} from '../../utilities/focus';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {Spinner} from '../Spinner';
import {Text} from '../Text';
import type {TextProps} from '../Text';
import {UnstyledButton} from '../UnstyledButton';
import type {UnstyledButtonProps} from '../UnstyledButton';

import styles from './Button.module.css';

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
  variant?: 'plain' | 'primary' | 'secondary' | 'tertiary' | 'monochromePlain';
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
  textAlign = 'center',
  fullWidth,
  dataPrimaryLink,
  tone,
  variant = 'secondary',
}: ButtonProps) {
  const i18n = useI18n();
  const isDisabled = disabled || loading;
  const {mdUp} = useBreakpoints();

  const className = classNames(
    styles.Button,
    styles.pressable,
    styles[variationName('variant', variant)],
    styles[variationName('size', size)],
    styles[variationName('textAlign', textAlign)],
    fullWidth && styles.fullWidth,
    disclosure && styles.disclosure,
    icon && children && styles.iconWithText,
    icon && children == null && styles.iconOnly,
    isDisabled && styles.disabled,
    loading && styles.loading,
    pressed && !disabled && !url && styles.pressed,
    removeUnderline && styles.removeUnderline,
    tone && styles[variationName('tone', tone)],
  );

  const disclosureMarkup = disclosure ? (
    <span
      className={classNames(
        styles.DisclosureIcon,
        loading ? styles.hidden : styles.Icon,
      )}
    >
      <Icon
        source={
          loading
            ? 'placeholder'
            : getDisclosureIconSource(
                disclosure,
                ChevronUpIcon,
                ChevronDownIcon,
              )
        }
      />
    </span>
  ) : null;

  const iconSource = isIconSource(icon) ? (
    <Icon source={loading ? 'placeholder' : icon} />
  ) : (
    icon
  );
  const iconMarkup = iconSource ? (
    <span className={loading ? styles.hidden : styles.Icon}>{iconSource}</span>
  ) : null;

  const hasPlainText = ['plain', 'monochromePlain'].includes(variant);
  let textFontWeight: TextProps['fontWeight'] = 'medium';
  if (hasPlainText) {
    textFontWeight = 'regular';
  } else if (variant === 'primary') {
    textFontWeight = mdUp ? 'medium' : 'semibold';
  }

  let textVariant: TextProps['variant'] = 'bodySm';
  if (size === 'large' || (hasPlainText && size !== 'micro')) {
    textVariant = 'bodyMd';
  }

  const childMarkup = children ? (
    <Text
      as="span"
      variant={textVariant}
      fontWeight={textFontWeight}
      // Fixes Safari bug that doesn't re-render button text to correct color
      key={disabled ? 'text-disabled' : 'text'}
    >
      {children}
    </Text>
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
      {spinnerSVGMarkup}
      {iconMarkup}
      {childMarkup}
      {disclosureMarkup}
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
    return SelectIcon;
  }

  return disclosure === 'up' ? upIcon : downIcon;
}
