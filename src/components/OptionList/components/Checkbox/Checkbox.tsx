import React from 'react';
import {TickSmallMinor} from '@shopify/polaris-icons';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames} from '../../../../utilities/css';
import Icon from '../../../Icon';

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

const getUniqueID = createUniqueIDFactory('Checkbox');

export function Checkbox({
  id = getUniqueID(),
  checked = false,
  disabled,
  active,
  onChange,
  name,
  value,
  role,
}: CheckboxProps) {
  const className = classNames(styles.Checkbox, active && styles.active);
  return (
    <div className={className}>
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={styles.Input}
        aria-checked={checked}
        onChange={onChange}
        role={role}
      />
      <div className={styles.Backdrop} />
      <div className={styles.Icon}>
        <Icon source={TickSmallMinor} />
      </div>
    </div>
  );
}
