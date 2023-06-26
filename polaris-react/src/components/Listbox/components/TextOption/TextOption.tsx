import React, {memo, useContext} from 'react';
import {TickMinor} from '@shopify/polaris-icons';

import {Box} from '../../../Box';
import {Checkbox} from '../../../Checkbox';
import {HorizontalStack} from '../../../HorizontalStack';
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

  const optionMarkup =
    polarisSummerEditions2023 && selected ? (
      <Box width="100%">
        <HorizontalStack wrap={false} align="space-between" gap="2">
          {children}
          <HorizontalStack align="end">
            <Icon source={TickMinor} />
          </HorizontalStack>
        </HorizontalStack>
      </Box>
    ) : (
      <>{children}</>
    );

  return (
    <div className={textOptionClassName}>
      <div className={styles.Content}>
        {allowMultiple && !isAction ? (
          <div className={styles.Checkbox}>
            <Checkbox disabled={disabled} checked={selected} label={children} />
          </div>
        ) : (
          optionMarkup
        )}
      </div>
    </div>
  );
});
