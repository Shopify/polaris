import React, {memo} from 'react';

import {ListBox} from '../../../ListBox';
import type {OptionDescriptor} from '../../../OptionList';
import type {ArrayElement} from '../../../../types';
import {classNames} from '../../../../utilities/css';

import styles from './MappedOption.scss';

type MappedOption = ArrayElement<OptionDescriptor[]> & {
  selected: boolean;
  singleSelection: boolean;
};

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
      key={value}
      selected={selected}
      value={value}
      disabled={disabled}
    >
      <ListBox.TextOption selected={selected} disabled={disabled}>
        <div className={styles.Content}>
          {mediaMarkup}
          {label}
        </div>
      </ListBox.TextOption>
    </ListBox.Option>
  );
});
