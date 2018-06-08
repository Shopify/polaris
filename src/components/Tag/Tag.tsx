import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import Icon from '../Icon';
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
      <span>{children}</span>
      <button
        type="button"
        aria-label={ariaLabel}
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

export default withAppProvider<Props>()(Tag);
