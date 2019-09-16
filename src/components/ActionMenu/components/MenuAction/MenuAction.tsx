import React from 'react';
import {CaretDownMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';
import {ComplexAction} from '../../../../types';

import {Icon} from '../../../Icon';
import {UnstyledLink} from '../../../UnstyledLink';

import styles from './MenuAction.scss';

export interface MenuActionProps extends ComplexAction {
  /** Whether or not the action discloses a menu group */
  disclosure?: boolean;
}

export function MenuAction({
  content,
  accessibilityLabel,
  url,
  external,
  icon,
  disclosure,
  disabled,
  onAction,
}: MenuActionProps) {
  const iconMarkup = icon && (
    <span className={styles.IconWrapper}>
      <Icon source={icon} />
    </span>
  );

  const disclosureIconMarkup = disclosure && (
    <span className={styles.IconWrapper}>
      <Icon source={CaretDownMinor} />
    </span>
  );

  const contentMarkup =
    iconMarkup || disclosureIconMarkup ? (
      <span className={styles.ContentWrapper}>
        {iconMarkup}
        <span className={styles.Content}>{content}</span>
        {disclosureIconMarkup}
      </span>
    ) : (
      content
    );

  const menuActionClassNames = classNames(
    styles.MenuAction,
    disabled && styles.disabled,
  );

  if (url) {
    return (
      <UnstyledLink
        className={menuActionClassNames}
        url={url}
        external={external}
        aria-label={accessibilityLabel}
        onMouseUp={handleMouseUpByBlurring}
      >
        {contentMarkup}
      </UnstyledLink>
    );
  }

  return (
    <button
      type="button"
      className={menuActionClassNames}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
    >
      {contentMarkup}
    </button>
  );
}
