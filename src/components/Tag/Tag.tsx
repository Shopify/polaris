import React from 'react';
import {ButtonGroup} from '../ButtonGroup';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import styles from './Tag.scss';

export interface TagProps {
  /** Content to display in the tag */
  children?: string;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked or keypressed. Renders without remove button when set. */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(): void;
}

export function Tag({children, disabled = false, onClick, onRemove}: TagProps) {
  const i18n = useI18n();

  const tagClassName = classNames(
    styles.Tag,
    disabled && styles.disabled,
    onClick && styles.clickable,
    onRemove && styles.removable,
    onClick && onRemove && styles.segmented,
  );

  const removeClassName = classNames(
    styles.Button,
    styles.clickable,
    onClick && onRemove && styles.segmented,
  );

  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: children || '',
  });

  const removeButton = onRemove ? (
    <button
      type="button"
      aria-label={ariaLabel}
      className={removeClassName}
      onClick={onRemove}
      onMouseUp={handleMouseUpByBlurring}
      disabled={disabled}
    >
      <Icon source={CancelSmallMinor} />
    </button>
  ) : null;

  const tagButton = onClick ? (
    <button
      type="button"
      disabled={disabled}
      className={tagClassName}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <span className={tagClassName}>
      <span title={children} className={styles.TagText}>
        {children}
      </span>
      {removeButton}
    </span>
  );

  if (onClick && onRemove) {
    return <ButtonGroup segmented>
      {tagButton}
      {removeButton}
    </ButtonGroup>
  }

  return tagButton;
}
