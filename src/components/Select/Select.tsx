import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled from '../Labelled';
import Icon from '../Icon';

import * as styles from './Select.scss';
import arrowIcon from './icons/arrow.svg';

export type Option = string | {
  value: string,
  label: string,
};

export interface Props {
  options: Option[],
  label?: React.ReactNode,
  labelNote?: React.ReactNode,
  labelAction?: any,
  labelHidden?: boolean,
  helpText?: React.ReactNode,
  id?: string,
  name?: string,
  error?: boolean,
  disabled?: boolean,
  value?: string,
  onChange?(selected: string): void,
  onFocus?(): void,
  onBlur?(): void,
}

export default function Select({
  id = uniqueID(),
  name,
  options,
  labelNote,
  labelHidden,
  labelAction,
  helpText,
  label,
  error,
  value,
  disabled,
  onChange,
  onFocus,
  onBlur,
}: Props) {
  const optionsMarkup = options.map(renderOption);
  const className = classNames(
    styles.Select,
    error && styles.error,
    disabled && styles.disabled,
  );

  const handleChange = onChange && (({currentTarget}: React.FormEvent<HTMLSelectElement>) => {
    onChange(currentTarget.value);
  });

  return (
    <Labelled
      id={id}
      label={label}
      error={error}
      note={labelNote}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
    >
      <div className={className}>
        <select
          id={id}
          name={name}
          value={value}
          className={styles.Input}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
        >
          {optionsMarkup}
        </select>

        <div className={styles.Icon}>
          <Icon source={arrowIcon} size="fill" />
        </div>
        <div className={styles.Backdrop} />
      </div>
    </Labelled>
  );
}

function renderOption(option: Option) {
  if (typeof option === 'string') {
    return <option key={option} value={option}>{option}</option>;
  } else {
    return <option key={option.value} value={option.value}>{option.label}</option>;
  }
}

let id = 1;
function uniqueID() {
  return `Select${id++}`;
}
