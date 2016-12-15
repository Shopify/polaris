// @flow

import React from 'react';

import Field from '../Field';
import List from '../List';

import styles from './Autocomplete.scss';

type Props = {
  label: string,
  placeholder: string,
  children?: any,
  options: string[],
  value?: ?string,
  onChange?: (value: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
  onItemSelect?: (value: string) => void,
  displaySelectionList?: boolean,
};

export default function Autocomplete({
  label,
  placeholder,
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  onItemSelect,
  displaySelectionList,
  emptyContent,
}: Props) {
  const field = (
    <Field
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );

  let content;

  if (displaySelectionList) {
    if (options.length) {
      content = (
        <div className={styles.Content}>
          <List
            onItemSelect={onItemSelect}
            items={options}
          />
        </div>
      );
    } else if (emptyContent) {
      if (typeof emptyContent === 'string') {
        content = (
          <div className={styles.Content}>
            <p className={styles.EmptyContent}>{emptyContent}</p>
          </div> 
        );
      } else {
        content = <div className={styles.Content}>{emptyContent}</div>;
      }
    }
  }

  return (
    <div className={styles.Autocomplete}>
      {field}
      {content}
    </div>
  );
}
