import * as React from 'react';
import classNames from 'classnames';
import {CaretDownMinor} from '@shopify/polaris-icons';

import {handleMouseUpByBlurring} from '../../utilities/focus';
import {IconableAction, DisableableAction} from '../../types';

import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';

import styles from './PlainAction.scss';

export interface Props extends IconableAction, DisableableAction {
  /** Displays the button with a disclosure icon */
  disclosure?: boolean;
}

export default function PlainAction({
  content,
  accessibilityLabel,
  url,
  external,
  icon,
  disclosure,
  disabled,
  onAction,
}: Props) {
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

  const actionClassNames = classNames(
    styles.PlainAction,
    disabled && styles.disabled,
    icon && content == null && styles.iconOnly,
  );

  if (url) {
    return (
      <UnstyledLink
        key={content}
        className={actionClassNames}
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
      key={content}
      className={actionClassNames}
      aria-label={accessibilityLabel}
      disabled={disabled}
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
    >
      {contentMarkup}
    </button>
  );
}
