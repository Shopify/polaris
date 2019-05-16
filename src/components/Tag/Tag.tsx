import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';
import {classNames} from '@shopify/react-utilities';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Icon from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import styles from './Tag.scss';

export interface Props {
  /** Content to display in the tag */
  children?: string;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is removed */
  onRemove?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

function Tag({
  children,
  disabled = false,
  onRemove,
  polaris: {intl},
}: CombinedProps) {
  const className = classNames(disabled && styles.disabled, styles.Tag);
  const ariaLabel = intl.translate('Polaris.Tag.ariaLabel', {children});

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

export default withAppProvider<Props>()(Tag);
