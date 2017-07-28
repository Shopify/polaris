import * as React from 'react';

import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import {IconableAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import * as styles from './Page.scss';

export interface Props {
  children?: string,
  disclosure?: boolean,
  url?: IconableAction['url'],
  icon?: IconableAction['icon'],
  onAction?: IconableAction['onAction'],
  accessibilityLabel?: IconableAction['accessibilityLabel'],
}

export default function Action({
  icon,
  url,
  onAction,
  children,
  disclosure,
  accessibilityLabel,
}: Props) {
  const iconMarkup = icon
    ? (
      <span className={styles.ActionIcon}>
        <Icon source={icon} />
      </span>
    )
    : null;

  const disclosureIconMarkup = disclosure
    ? (
      <span className={styles.ActionIcon}>
        <Icon source="caretDown" />
      </span>
    )
    : null;

  const contentMarkup = iconMarkup || disclosureIconMarkup
    ? (
      <span className={styles.ActionContent}>
        {iconMarkup}
        <span>{children}</span>
        {disclosureIconMarkup}
      </span>
    )
    : children;

  if (url) {
    return (
      <UnstyledLink
        key={children}
        url={url}
        onMouseUp={handleMouseUpByBlurring}
        className={styles.Action}
        aria-label={accessibilityLabel}
      >
        {contentMarkup}
      </UnstyledLink>
    );
  }

  return (
    <button
      key={children}
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
      className={styles.Action}
      aria-label={accessibilityLabel}
      type="button"
    >
      {contentMarkup}
    </button>
  );
}
