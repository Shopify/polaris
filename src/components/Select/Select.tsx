import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled, {Action, helpTextID} from '../Labelled';
import Icon from '../Icon';

import * as styles from './Select.scss';
import arrowIcon from './icons/arrow.svg';

export type Option = string | {
  value: string,
  label: string,
};

export interface Group {
  title: string,
  options: Option[],
}

export interface Props {
  options?: Option[],
  groups?: (Group | Option)[],
  label: string,
  labelAction?: Action,
  labelHidden?: boolean,
  helpText?: React.ReactNode,
  id?: string,
  name?: string,
  error?: boolean,
  disabled?: boolean,
  value?: string,
  placeholder?: string,
  onChange?(selected: string): void,
  onFocus?(): void,
  onBlur?(): void,
}

export default function Select({
  id = uniqueID(),
  name,
  groups,
  options,
  labelHidden,
  labelAction,
  helpText,
  label,
  error,
  value,
  placeholder,
  disabled,
  onChange,
  onFocus,
  onBlur,
}: Props) {
  let optionsMarkup: React.ReactNode;

  if (options != null) {
    optionsMarkup = options.map(renderOption);
  } else if (groups != null) {
    optionsMarkup = groups.map(renderGroup);
  }

  const isPlaceholder = value == null && placeholder != null;
  const className = classNames(
    styles.Select,
    error && styles.error,
    disabled && styles.disabled,
    isPlaceholder && styles.placeholder,
  );

  const handleChange = onChange && (({currentTarget}: React.FormEvent<HTMLSelectElement>) => {
    onChange(currentTarget.value);
  });

  const describedBy = helpText
    ? helpTextID(id)
    : null;

  const placeholderOption = isPlaceholder
    ? <option label={placeholder} selected disabled hidden />
    : null;

  return (
    <Labelled
      id={id}
      label={label}
      error={error}
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
          aria-describedby={describedBy}
        >
          {placeholderOption}
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

function renderGroup(groupOrOption: Group | Option) {
  if (groupOrOption.hasOwnProperty('title')) {
    const {title, options} = groupOrOption as Group;
    return (
      <optgroup label={title} key={title}>
        {options.map(renderOption)}
      </optgroup>
    );
  }

  return renderOption(groupOrOption as Option);
}

let id = 1;
function uniqueID() {
  return `Select${id++}`;
}
