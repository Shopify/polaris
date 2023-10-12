import React, {useRef, useImperativeHandle, forwardRef} from 'react';

import type {CheckboxHandles} from '../../types';
import {classNames} from '../../utilities/css';
import {Checkbox} from '../Checkbox';

import styles from './CheckableButton.scss';

export interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  disabled?: boolean;
  onToggleAll?(): void;
  ariaLive?: 'off' | 'polite';
}

export const CheckableButton = forwardRef(function CheckableButton(
  {
    accessibilityLabel,
    label = '',
    onToggleAll,
    selected,
    disabled,
    ariaLive,
  }: CheckableButtonProps,
  ref,
) {
  const checkBoxRef = useRef<CheckboxHandles>(null);

  function focus() {
    checkBoxRef?.current?.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus,
    };
  });

  const className = classNames(styles.CheckableButton);

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
      {label ? (
        <span className={styles.Label} aria-live={ariaLive}>
          {label}
        </span>
      ) : null}
    </div>
  );
});
