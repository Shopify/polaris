import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {
  Checkbox,
  withAppProvider,
  WithAppProviderProps,
} from '@shopify/polaris';

import * as styles from './CheckableButton.scss';

export interface Props {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  disabled?: boolean;
  plain?: boolean;
  measuring?: boolean;
  hasHeadings?: boolean;
  onToggleAll?(): void;
}
export type CombinedProps = Props & WithAppProviderProps;

function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  selectMode,
  plain,
  measuring,
  hasHeadings,
  disabled,
}: CombinedProps) {
  const className = plain
    ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
    : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
      );

  const labelClassName = classNames(
    styles.Label,
    hasHeadings && styles['Label-hasHeadings'],
  );

  const labelMarkup = label ? (
    <span className={labelClassName}>{label}</span>
  ) : null;

  return (
    <div className={className} onClick={onToggleAll}>
      <div className={styles.Checkbox}>
        <Checkbox
          label={accessibilityLabel}
          labelHidden
          checked={selected}
          disabled={disabled}
        />
      </div>
      {labelMarkup}
    </div>
  );
}

export default withAppProvider<Props>()(CheckableButton);
