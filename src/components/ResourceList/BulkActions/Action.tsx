import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import Icon from '../../Icon';
import UnstyledLink from '../../UnstyledLink';
import {DisableableAction} from '../../../types';

import {handleMouseUpByBlurring} from '../../../utilities/focus';

import * as styles from './BulkActions.scss';

export interface Props {
  children?: string,
  disclosure?: boolean,
  url?: DisableableAction['url'],
  external?: DisableableAction['external'],
  onAction?: DisableableAction['onAction'],
  accessibilityLabel?: DisableableAction['accessibilityLabel'],
  disabled?: DisableableAction['disabled'],
}

export default function Action({
  url,
  external,
  onAction,
  children,
  disclosure,
  accessibilityLabel,
  disabled,
}: Props) {


  const disclosureIconMarkup = disclosure
    ? (
      <span className={styles.ActionIcon}>
        <Icon source="caretDown" />
      </span>
    )
    : null;

  const contentMarkup = disclosureIconMarkup
    ? (
      <span className={styles.ActionContent}>
        <span>{children}</span>
        {disclosureIconMarkup}
      </span>
    )
    : children;

  if (url) {
    return (
      <UnstyledLink
        key={children}
        external={external}
        url={url}
        onMouseUp={handleMouseUpByBlurring}
        className={styles.Button}
        aria-label={accessibilityLabel}
      >
        {contentMarkup}
      </UnstyledLink>
    );
  }

  const className = classNames(
    styles.Button,
    disabled && styles.disabled,
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
