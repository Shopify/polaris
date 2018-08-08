import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Icon from '../../../Icon';

import * as styles from './Checkbox.scss';

export interface Props {
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

export default function Checkbox({
  id = getUniqueID(),
  checked = false,
  disabled,
  active,
  onChange,
  name,
  value,
  role,
}: Props) {
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
        <Icon source="checkmark" />
      </div>
    </div>
  );
}
