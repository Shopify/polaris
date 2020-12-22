import React, {memo, useContext} from 'react';

import {Checkbox} from '../../../Checkbox';
import {classNames} from '../../../../utilities/css';
import {ComboBoxListBoxOptionContext} from '../../../../utilities/combo-box/context';
import {MappedActionContext} from '../../../../utilities/autocomplete';

import styles from './TextOption.scss';

export interface TextOptionProps {
  children: React.ReactNode;
  // Whether the option is selected
  selected?: boolean;
  // Whether the option is disabled
  disabled?: boolean;
}

export const TextOption = memo(function TextOption({
  children,
  selected,
  disabled,
}: TextOptionProps) {
  const {allowMultiple} = useContext(ComboBoxListBoxOptionContext);
  const {isAction} = useContext(MappedActionContext);
  const textOptionClassName = classNames(
    styles.TextOption,
    selected && !allowMultiple && styles.selected,
    disabled && styles.disabled,
    allowMultiple && styles.allowMultiple,
    isAction && styles.isAction,
  );
  return (
    <div className={textOptionClassName}>
      <div className={styles.Content}>
        {allowMultiple ? (
          <Checkbox checked={selected} label={children} />
        ) : (
          children
        )}
      </div>
    </div>
  );
});
