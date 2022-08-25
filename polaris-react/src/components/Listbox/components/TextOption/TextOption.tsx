import React, {memo, useContext} from 'react';

import {Checkbox} from '../../../Checkbox';
import {classNames} from '../../../../utilities/css';
import {ComboboxListboxOptionContext} from '../../../../utilities/combobox/context';
import {useListbox} from '../../../../utilities/listbox';
import {ActionContext} from '../../../../utilities/listbox/context';

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
  const {allowMultiple: allowMultipleCombobox} = useContext(
    ComboboxListboxOptionContext,
  );
  const {allowMultiple: allowMultipleListbox} = useListbox();
  const isAction = useContext(ActionContext);

  const allowMultiple = allowMultipleListbox || allowMultipleCombobox;

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
        {allowMultiple && !isAction ? (
          <div className={styles.Checkbox}>
            <Checkbox disabled={disabled} checked={selected} label={children} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
});
