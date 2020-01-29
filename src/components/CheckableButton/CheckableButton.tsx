import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {CheckboxHandles} from '../../types';
import {useFeatures} from '../../utilities/features';
import {classNames} from '../../utilities/css';
import {Checkbox} from '../Checkbox';

import styles from './CheckableButton.scss';

export interface CheckableButtonImperativeHandles {
  focus(): void;
}

export interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  plain?: boolean;
  measuring?: boolean;
  disabled?: boolean;
  labelHidden?: boolean;
  onToggleAll?(): void;
}

export const CheckableButton = forwardRef<
  CheckableButtonImperativeHandles,
  CheckableButtonProps
>(function CheckableButton(
  {
    accessibilityLabel,
    label = '',
    onToggleAll,
    selected,
    selectMode,
    plain,
    measuring,
    disabled,
    labelHidden,
  },
  ref,
) {
  const checkBoxRef = useRef<CheckboxHandles>(null);
  const {unstableGlobalTheming = false} = useFeatures();

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (checkBoxRef.current) {
        checkBoxRef.current.focus();
      }
    },
  }));

  const className = plain
    ? classNames(
        styles.CheckableButton,
        styles['CheckableButton-plain'],
        unstableGlobalTheming && styles.globalTheming,
      )
    : classNames(
        styles.CheckableButton,
        unstableGlobalTheming && styles.globalTheming,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
      );

  const labelMarkup = !labelHidden && (
    <span className={styles.Label}>{label}</span>
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
      {labelMarkup}
    </div>
  );
});
