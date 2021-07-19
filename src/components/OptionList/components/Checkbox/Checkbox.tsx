import React, {useState} from 'react';
import {TickSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useUniqueId} from '../../../../utilities/unique-id';
import {Icon} from '../../../Icon';

import styles from './Checkbox.scss';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  active?: boolean;
  id?: string;
  name?: string;
  value?: string;
  role?: string;
  onChange(): void;
}

export function Checkbox({
  id: idProp,
  checked = false,
  disabled,
  active,
  onChange,
  name,
  value,
  role,
}: CheckboxProps) {
  const id = useUniqueId('Checkbox', idProp);
  const [keyFocused, setKeyFocused] = useState(false);

  const className = classNames(styles.Checkbox, active && styles.active);

  const handleBlur = () => {
    setKeyFocused(false);
  };

  const handleKeyUp = () => {
    !keyFocused && setKeyFocused(true);
  };

  const inputClassName = classNames(
    styles.Input,
    keyFocused && styles.keyFocused,
  );

  return (
    <div className={className}>
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={inputClassName}
        aria-checked={checked}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        role={role}
      />
      <div className={styles.Backdrop} />
      <div className={styles.Icon}>
        <Icon source={TickSmallMinor} />
      </div>
    </div>
  );
}
