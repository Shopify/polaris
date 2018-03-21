import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import Icon from '../Icon/';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import * as styles from './Tag.scss';

export interface Props {
  /** Content to display in the tag */
  children?: string;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is removed */
  onRemove?(): void;
}

export default function Tag({children, disabled = false, onRemove}: Props) {
  const className = classNames(disabled && styles.disabled, styles.Tag);

  return (
    <span className={className}>
      <span>{children}</span>
      <button
        type="button"
        aria-label="Remove"
        className={styles.Button}
        onClick={onRemove}
        onMouseUp={handleMouseUpByBlurring}
        disabled={disabled}
      >
        <Icon source="cancelSmall" />
      </button>
    </span>
  );
}
