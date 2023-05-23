import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import styles from './Tag.scss';

export interface NonMutuallyExclusiveProps {
  /** Content to display in the tag */
  children?: React.ReactNode;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked or keypressed. Renders without remove button or url when set. */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(): void;
  /** A string to use when tag has more than textual content */
  accessibilityLabel?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  url?: string;
}

export type TagProps = NonMutuallyExclusiveProps &
  (
    | {onClick?(): void; onRemove?: undefined; url?: undefined}
    | {onClick?: undefined; onRemove?(): void; url?: string}
  );

export function Tag({
  children,
  disabled = false,
  onClick,
  onRemove,
  accessibilityLabel,
  url,
}: TagProps) {
  const i18n = useI18n();

  const segmented = onRemove && url;
  const className = classNames(
    styles.Tag,
    disabled && styles.disabled,
    onClick && styles.clickable,
    onRemove && styles.removable,
    url && !disabled && styles.linkable,
    segmented && styles.segmented,
  );

  if (onClick) {
    return (
      <button
        type="button"
        disabled={disabled}
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  let tagTitle = accessibilityLabel;

  if (!tagTitle) {
    tagTitle = typeof children === 'string' ? children : undefined;
  }

  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: tagTitle || '',
  });

  const removeButton = onRemove ? (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classNames(styles.Button, segmented && styles.segmented)}
      onClick={onRemove}
      onMouseUp={handleMouseUpByBlurring}
      disabled={disabled}
    >
      {/* TODO update to new x icon */}
      <Icon source={CancelSmallMinor} />
    </button>
  ) : null;

  const tagContent =
    url && !disabled ? (
      <a
        className={classNames(styles.Link, segmented && styles.segmented)}
        href={url}
      >
        <span title={tagTitle} className={styles.LinkText}>
          {children}
        </span>
      </a>
    ) : (
      <span title={tagTitle} className={styles.TagText}>
        {children}
      </span>
    );

  return (
    <span className={className}>
      {tagContent}
      {removeButton}
    </span>
  );
}
