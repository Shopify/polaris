import React, {memo, useContext} from 'react';
import {CheckIcon} from '@shopify/polaris-icons';

import {Box} from '../../../Box';
import {Checkbox} from '../../../Checkbox';
import {InlineStack} from '../../../InlineStack';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import {ComboboxListboxOptionContext} from '../../../../utilities/combobox/context';
import {ActionContext} from '../../../../utilities/listbox/context';

import styles from './TextOption.module.css';

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

  const textOptionClassName = classNames(
    styles.TextOption,
    selected && !allowMultiple && styles.selected,
    disabled && styles.disabled,
    allowMultiple && styles.allowMultiple,
    isAction && styles.isAction,
  );

  const placeholder = isAction ? null : <Box width="20px" />;

  const optionMarkup = (
    <Box width="100%">
      <InlineStack wrap={false} gap="150">
        {selected ? (
          <span>
            <Icon source={CheckIcon} />
          </span>
        ) : (
          placeholder
        )}
        {children}
      </InlineStack>
    </Box>
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
