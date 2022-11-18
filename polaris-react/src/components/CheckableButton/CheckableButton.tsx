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
  disabled?: boolean;
  onToggleAll?(): void;
  ariaLive?: 'off' | 'assertive' | 'polite';
}

export function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  disabled,
  ariaLive,
}: CheckableButtonProps) {
  const checkBoxRef = useRef<CheckboxHandles>(null);

  const {registerCheckableButtons} = useContext(ResourceListContext);

  const currentKey: CheckableButtonKey = 'plain';

  useEffect(() => {
    if (checkBoxRef.current && registerCheckableButtons) {
      registerCheckableButtons(currentKey, checkBoxRef.current);
    }
  }, [currentKey, registerCheckableButtons]);

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
      <span className={styles.Label} aria-live={ariaLive}>
        {label}
      </span>
    </div>
  );
}
