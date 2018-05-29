import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Icon from '../../../Icon';

import * as styles from './Checkbox.scss';

export interface Props {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onChange(): void;
}

const getUniqueID = createUniqueIDFactory('Checkbox');

export default function Checkbox({
  id = getUniqueID(),
  checked = false,
  disabled,
  onChange,
  name,
  value,
}: Props) {
  return (
    <div className={styles.Checkbox}>
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
      />
      <div className={styles.Backdrop} />
      <div className={styles.Icon}>
        <Icon source="checkmark" />
      </div>
    </div>
  );
}
