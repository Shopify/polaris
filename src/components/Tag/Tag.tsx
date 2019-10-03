import React from 'react';
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
  /** Callback when tag is removed */
  onRemove?(): void;
}

export function Tag({children, disabled = false, onRemove}: TagProps) {
  const i18n = useI18n();
  const className = classNames(disabled && styles.disabled, styles.Tag);
  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {children});

  return (
    <span className={className}>
      <span title={children} className={styles.TagText}>
        {children}
      </span>
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
    </span>
  );
}
