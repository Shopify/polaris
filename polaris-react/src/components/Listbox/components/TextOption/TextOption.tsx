import React, {memo, useContext} from 'react';
import {TickMinor} from '@shopify/polaris-icons';

import {Checkbox} from '../../../Checkbox';
import {HorizontalGrid} from '../../../HorizontalGrid';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import {ComboboxListboxOptionContext} from '../../../../utilities/combobox/context';
import {ActionContext} from '../../../../utilities/listbox/context';
import {useFeatures} from '../../../../utilities/features';

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
  const {allowMultiple} = useContext(ComboboxListboxOptionContext);
  const isAction = useContext(ActionContext);
  const {polarisSummerEditions2023} = useFeatures();

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
          <HorizontalGrid columns="1fr auto">
            {children}
            {polarisSummerEditions2023 && selected ? (
              <Icon source={TickMinor} />
            ) : null}
          </HorizontalGrid>
        )}
      </div>
    </div>
  );
});
