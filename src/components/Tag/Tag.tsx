import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import styles from './Tag.scss';

export interface NonMutuallyExclusiveProps {
  /** Content to display in the tag */
  children?: string;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked or keypressed. Renders without remove button when set. */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(): void;
}

export type TagProps = NonMutuallyExclusiveProps &
  (
    | {onClick?(): void; onRemove?: undefined}
    | {onClick?: undefined; onRemove?(): void}
  );

export function Tag({children, disabled = false, onClick, onRemove}: TagProps) {
  const i18n = useI18n();

  const className = classNames(
    styles.Tag,
    disabled && styles.disabled,
    onClick && styles.clickable,
    onRemove && styles.removable,
  );

  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: children || '',
  });

  const removeButton = onRemove ? (
    <button
      type="button"
      aria-label={ariaLabel}
      className={styles.Button}
      onClick={onRemove}
      onMouseUp={handleMouseUpByBlurring}
      disabled={disabled}
    >
      <Icon source={CancelSmallMinor} />
    </button>
  ) : null;

  const tagMarkup = onClick ? (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <span className={className}>
      <span title={children} className={styles.TagText}>
        {children}
      </span>
      {removeButton}
    </span>
  );
  return tagMarkup;
}
