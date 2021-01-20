import React, {memo} from 'react';

import {ListBox} from '../ListBox';
import type {ComboBoxOldProps} from '../../Autocomplete';
import type {ArrayElement} from '../../../../types';
import {classNames} from '../../../../utilities/css';

import styles from './MappedOption.scss';

type MappedOption = ArrayElement<ComboBoxOldProps['options']> & {
  selected: boolean;
  singleSelection: boolean;
};

// id was previous used for label/checked or button & react key
// they don't extend the API so we can omit them
export const MappedOption = memo(function MappedOption({
  label,
  value,
  disabled,
  media,
  selected,
  singleSelection,
}: MappedOption) {
  const mediaClassNames = classNames(
    styles.Media,
    disabled && styles.disabledMedia,
    singleSelection && styles.singleSelectionMedia,
  );

  const mediaMarkup = media ? (
    <div className={mediaClassNames}>{media}</div>
  ) : null;

  const accessibilityLabel = typeof label === 'string' ? label : undefined;

  return (
    <ListBox.Option
      accessibilityLabel={accessibilityLabel}
      key={`${value}`}
      selected={selected}
      value={value}
      disabled={disabled}
    >
      <ListBox.TextOption selected={selected} disabled={disabled}>
        {mediaMarkup}
        {label}
      </ListBox.TextOption>
    </ListBox.Option>
  );
});
