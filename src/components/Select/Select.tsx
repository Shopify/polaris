import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Labelled, {Action, Error, helpTextID, errorID} from '../Labelled';
import Icon from '../Icon';

import * as styles from './Select.scss';

export type Option = string | {
  value: string,
  label: string,
  disabled?: boolean,
};

export interface Group {
  title: string,
  options: Option[],
}

export interface Props {
  /** List of options to choose from */
  options?: Option[],
  /** List of option groups to choose from */
  groups?: (Group | Option)[],
  /** Label for the select */
  label: string,
  /** Adds an action to the label */
  labelAction?: Action,
  /** Visually hide the label */
  labelHidden?: boolean,
  /** Disable input */
  disabled?: boolean,
  /** Additional text to aide in use */
  helpText?: React.ReactNode,
  /** Example text to display as placeholder */
  placeholder?: string,
  /** ID for form input */
  id?: string,
  /** Name for form input */
  name?: string,
  /** Value for form input */
  value?: string,
  /** Display an error state */
  error?: Error,
  /** Callback when selection is changed */
  onChange?(selected: string, id: string): void,
  /** Callback when select is focussed */
  onFocus?(): void,
  /** Callback when focus is removed */
  onBlur?(): void,
}

const PLACEHOLDER_VALUE = '__placeholder__';
const getUniqueID = createUniqueIDFactory('Select');

export default function Select({
  id = getUniqueID(),
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

  const handleChange = onChange
    ? ((event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.currentTarget.value, id))
    : undefined;

  const describedBy: string[] = [];
  if (helpText) { describedBy.push(helpTextID(id)); }
  if (error && typeof error === 'string') { describedBy.push(errorID(id)); }

  const placeholderOption = isPlaceholder
    ? <option label={placeholder} value={PLACEHOLDER_VALUE} disabled hidden />
    : null;

  // When we have no onChange, React will complain about providing a `value`
  // (and vice versa for `defaultValue`)
  const defaultValue = onChange ? undefined : (value || PLACEHOLDER_VALUE);
  const finalValue = onChange ? (value || PLACEHOLDER_VALUE) : undefined;

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
          defaultValue={defaultValue}
          value={finalValue}
          className={styles.Input}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
        >
          {placeholderOption}
          {optionsMarkup}
        </select>

        <div className={styles.Icon}>
          <Icon source="arrowUpDown" />
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
    return <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>;
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
