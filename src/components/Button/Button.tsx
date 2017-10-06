import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities';

import {ComplexAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import UnstyledLink from '../UnstyledLink';
import Icon, {Props as IconProps} from '../Icon';
import Spinner from '../Spinner';

import * as styles from './Button.scss';

export type Size = 'slim' | 'large';

export interface Props {
  url?: string,
  children?: string,
  size?: Size,
  fullWidth?: boolean,
  primary?: boolean,
  outline?: boolean,
  destructive?: boolean,
  disabled?: boolean,
  loading?: boolean,
  plain?: boolean,
  external?: boolean,
  submit?: boolean,
  disclosure?: boolean,
  accessibilityLabel?: string,
  icon?: IconProps['source'],
  onClick?(): void,
  onFocus?(): void,
  onBlur?(): void,
}

export default function Button({
  url,
  disabled,
  loading,
  children,
  accessibilityLabel,
  onClick,
  onFocus,
  onBlur,
  external,
  icon,
  primary,
  outline,
  destructive,
  disclosure,
  plain,
  submit,
  size,
  fullWidth,
}: Props) {
  const isDisabled = disabled || loading;
  const className = classNames(
    styles.Button,
    primary && styles.primary,
    outline && styles.outline,
    destructive && styles.destructive,
    isDisabled && styles.disabled,
    loading && styles.loading,
    plain && styles.plain,
    size && styles[variationName('size', size)],
    fullWidth && styles.fullWidth,
    icon && children == null && styles.iconOnly,
  );

  const disclosureIconMarkup = disclosure
    ? <span className={styles.Icon}><Icon source={loading ? 'placeholder' : 'caretDown'} /></span>
    : null;

  const iconMarkup = icon
    ? <span className={styles.Icon}><Icon source={loading ? 'placeholder' : icon} /></span>
    : null;

  const childMarkup = children ? <span>{children}</span> : null;

  const spinnerColor = primary || destructive ? 'white' : 'inkLightest';

  const spinnerSVGMarkup = loading
    ? (
      <span className={styles.Spinner}>
        <Spinner size="small" color={spinnerColor} accessibilityLabel="Loading" />
      </span>
    )
    : null;

  const content = iconMarkup || disclosureIconMarkup
    ? (
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {iconMarkup}
        {childMarkup}
        {disclosureIconMarkup}
      </span>
    )
    : <span className={styles.Content}>{spinnerSVGMarkup}{childMarkup}</span>;

  const type = submit ? 'submit' : 'button';

  return (
    url
    ? (
      <UnstyledLink
        url={url}
        external={external}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseUp={handleMouseUpByBlurring}
        className={className}
        disabled={isDisabled}
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
        onMouseUp={handleMouseUpByBlurring}
        className={className}
        disabled={isDisabled}
        aria-label={accessibilityLabel}
        role={loading ? 'alert' : undefined}
        aria-busy={loading ? true : undefined}
      >
        {content}
      </button>
    )
  );
}

export function buttonsFrom(action: ComplexAction, overrides?: Partial<Props>): React.ReactElement<Props>;
export function buttonsFrom(actions: ComplexAction[], overrides?: Partial<Props>): React.ReactElement<Props>[];
export function buttonsFrom(actions: ComplexAction[] | ComplexAction, overrides: Partial<Props> = {}) {
  if ((actions as ComplexAction[]).length != null) {
    return (actions as ComplexAction[]).map((action, index) => buttonFrom(action, overrides, index));
  } else {
    return buttonFrom(actions, overrides);
  }
}

export function buttonFrom(
  {content, onAction, ...action}: ComplexAction,
  overrides?: Partial<Props>,
  key?: any,
) {
  return (
    <Button
      key={key}
      children={content}
      onClick={onAction}
      {...action}
      {...overrides}
    />
  );
}
