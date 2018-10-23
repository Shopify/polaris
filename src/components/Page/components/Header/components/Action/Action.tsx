import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import {handleMouseUpByBlurring} from 'utilities/focus';
import Indicator from 'components/Indicator';
import {Icon, UnstyledLink} from 'components';
import {IconableAction, DisableableAction} from 'types';
import * as styles from './Action.scss';

export interface Props {
  children?: string;
  disclosure?: boolean;
  url?: IconableAction['url'];
  external?: IconableAction['external'];
  icon?: IconableAction['icon'];
  onAction?: IconableAction['onAction'];
  accessibilityLabel?: IconableAction['accessibilityLabel'];
  disabled?: DisableableAction['disabled'];
  showIndicator?: boolean;
  hasIndicator?: boolean;
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
  showIndicator,
  hasIndicator,
}: Props) {
  const iconMarkup = icon ? (
    <span className={styles.ActionIcon}>
      <Icon source={icon} />
    </span>
  ) : null;

  const disclosureIconMarkup = disclosure ? (
    <span className={styles.ActionIcon}>
      <Icon source="caretDown" />
    </span>
  ) : null;

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

  const indicatorMarkup = false &&
    showIndicator &&
    !hasIndicator && <Indicator />;

  const className = classNames(
    styles.Action,
    disabled && styles.disabled,
    icon && children == null && styles.iconOnly,
    false && showIndicator && styles['Action-outline'],
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
      {indicatorMarkup}
      {contentMarkup}
    </button>
  );
}
