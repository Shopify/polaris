import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import {IconableAction, DisableableAction} from '../../../../../../types';
import {handleMouseUpByBlurring} from '../../../../../../utilities/focus';
import Icon from '../../../../../Icon';
import UnstyledLink from '../../../../../UnstyledLink';
import styles from './Action.scss';

export interface Props {
  children?: string;
  disclosure?: boolean;
  url?: IconableAction['url'];
  external?: IconableAction['external'];
  icon?: IconableAction['icon'];
  onAction?: IconableAction['onAction'];
  accessibilityLabel?: IconableAction['accessibilityLabel'];
  disabled?: DisableableAction['disabled'];
}

export default function Action({
  icon,
  url,
  external,
  onAction,
  children,
  disclosure,
  accessibilityLabel,
  disabled,
}: Props) {
  const iconMarkup = icon && (
    <span className={styles.ActionIcon}>
      <Icon source={icon} />
    </span>
  );

  const disclosureIconMarkup = disclosure && (
    <span className={styles.ActionIcon}>
      <Icon source="caretDown" />
    </span>
  );

  const contentMarkup =
    iconMarkup || disclosureIconMarkup ? (
      <span className={styles.ActionContent}>
        {iconMarkup}
        <span>{children}</span>
        {disclosureIconMarkup}
      </span>
    ) : (
      children
    );

  if (url) {
    return (
      <UnstyledLink
        key={children}
        external={external}
        url={url}
        onMouseUp={handleMouseUpByBlurring}
        className={styles.Action}
        aria-label={accessibilityLabel}
      >
        {contentMarkup}
      </UnstyledLink>
    );
  }

  const className = classNames(
    styles.Action,
    disabled && styles.disabled,
    icon && children == null && styles.iconOnly,
  );

  return (
    <button
      key={children}
      className={className}
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
      aria-label={accessibilityLabel}
      type="button"
      disabled={disabled}
    >
      {contentMarkup}
    </button>
  );
}
