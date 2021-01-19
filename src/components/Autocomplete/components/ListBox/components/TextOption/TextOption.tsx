import React, {memo} from 'react';

import {classNames} from '../../../../../../utilities/css';

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
  const textOptionClassName = classNames(
    styles.TextOption,
    selected && styles.selected,
    disabled && styles.disabled,
  );
  return (
    <div className={textOptionClassName}>
      <div className={styles.Content}>{children}</div>
    </div>
  );
});
