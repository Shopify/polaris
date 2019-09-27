import React from 'react';
import {classNames} from '../../../../utilities/css';
import {Checkbox} from '../../../Checkbox';

import styles from './CheckableButton.scss';

export interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  plain?: boolean;
  measuring?: boolean;
  disabled?: boolean;
  onToggleAll?(): void;
}

export function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  selectMode,
  plain,
  measuring,
  disabled,
}: CheckableButtonProps) {
  const className = plain
    ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
    : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
      );

  return (
    <div className={className} onClick={onToggleAll}>
      <div className={styles.Checkbox}>
        <Checkbox
          label={accessibilityLabel}
          labelHidden
          checked={selected}
          disabled={disabled}
          onChange={onToggleAll}
        />
      </div>
      <span className={styles.Label}>{label}</span>
    </div>
  );
}
