import {memo} from 'react';

import type {OptionDescriptor, ArrayElement} from '../../../../types';
import {Listbox} from '../../../Listbox';
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
    <Listbox.Option
      accessibilityLabel={accessibilityLabel}
      key={value}
      selected={selected}
      value={value}
      disabled={disabled}
    >
      <Listbox.TextOption selected={selected} disabled={disabled}>
        <div className={styles.Content}>
          {mediaMarkup}
          {label}
        </div>
      </Listbox.TextOption>
    </Listbox.Option>
  );
});
