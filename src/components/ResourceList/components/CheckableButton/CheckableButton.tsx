import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Checkbox} from '../../../';

import * as styles from './CheckableButton.scss';

export interface Props {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  plain?: boolean;
  measuring?: boolean;
  onToggleAll?(): void;
}

export default function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  selectMode,
  plain,
  measuring,
}: Props) {
  const className = plain
    ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
    : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
      );

  return (
    <div
      aria-label={accessibilityLabel || label}
      className={className}
      onClick={onToggleAll}
    >
      <div className={styles.Checkbox}>
        <Checkbox label={label} labelHidden checked={selected} />
      </div>
      <span className={styles.Label}>{label}</span>
    </div>
  );
}
