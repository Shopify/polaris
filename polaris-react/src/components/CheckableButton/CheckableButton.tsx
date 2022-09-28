import React, {useContext, useRef, useEffect} from 'react';

import type {CheckboxHandles} from '../../types';
import {classNames} from '../../utilities/css';
import {Checkbox} from '../Checkbox';
import {
  ResourceListContext,
  CheckableButtonKey,
} from '../../utilities/resource-list';

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
  autoWidth?: boolean;
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
  autoWidth,
}: CheckableButtonProps) {
  const checkBoxRef = useRef<CheckboxHandles>(null);

  const {registerCheckableButtons} = useContext(ResourceListContext);

  let currentKey: CheckableButtonKey = 'plain';

  if (autoWidth) {
    currentKey = 'selectAll';
  }

  useEffect(() => {
    if (checkBoxRef.current && registerCheckableButtons) {
      registerCheckableButtons(currentKey, checkBoxRef.current);
    }
  }, [currentKey, registerCheckableButtons]);

  const className = plain
    ? classNames(
        styles.CheckableButton,
        styles['CheckableButton-plain'],
        autoWidth && styles['CheckableButton-autoWidth'],
      )
    : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
        autoWidth && styles['CheckableButton-autoWidth'],
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
          ref={checkBoxRef}
        />
      </div>
      <span className={styles.Label}>{label}</span>
    </div>
  );
}
