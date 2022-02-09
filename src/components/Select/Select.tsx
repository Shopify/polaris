import React from 'react';
import {SelectMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useUniqueId} from '../../utilities/unique-id';
import {Labelled, LabelledProps, helpTextID} from '../Labelled';
import {Icon} from '../Icon';
import type {Error} from '../../types';

import styles from './Select.scss';

interface StrictOption<TValue extends string = string> {
  /** Machine value of the option; this is the value passed to `onChange` */
  value: TValue;
  /** Human-readable text for the option */
  label: string;
  /** Option will be visible, but not selectable */
  disabled?: boolean;
  /** Element to display to the left of the option label. Does not show in the dropdown. */
  prefix?: React.ReactNode;
}

interface HideableStrictOption<TValue extends string = string>
  extends StrictOption<TValue> {
  hidden?: boolean;
}

interface StrictGroup<TValue extends string = string> {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption<TValue>[];
}

export type SelectOption<TValue extends string = string> =
  | TValue
  | StrictOption<TValue>;

export interface SelectGroup<TValue extends string = string> {
  title: string;
  options: SelectOption<TValue>[];
}

export interface SelectProps<TValue extends string = string> {
  /** List of options or option groups to choose from */
  options?: (SelectOption<TValue> | SelectGroup<TValue>)[];
  /** Label for the select */
  label: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Show the label to the left of the value, inside the control */
  labelInline?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Example text to display as placeholder */
  placeholder?: string;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** TValue for form input */
  value?: TValue | '';
  /** Display an error state */
  error?: Error | boolean;
  /** Callback when selection is changed */
  onChange?(selected: TValue | '', id: string): void;
  /** Callback when select is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
}

const PLACEHOLDER_VALUE = '';

export function Select<TValue extends string = string>({
  options: optionsProp,
  label,
  labelAction,
  labelHidden: labelHiddenProp,
  labelInline,
  disabled,
  helpText,
  placeholder,
  id: idProp,
  name,
  value = PLACEHOLDER_VALUE,
  error,
  onChange,
  onFocus,
  onBlur,
  requiredIndicator,
}: SelectProps<TValue>) {
  const id = useUniqueId('Select', idProp);
  const labelHidden = labelInline ? true : labelHiddenProp;

  const className = classNames(
    styles.Select,
    error && styles.error,
    disabled && styles.disabled,
  );

  const handleChange = onChange
    ? (event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.currentTarget.value as TValue, id)
    : undefined;

  const describedBy: string[] = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (error) {
    describedBy.push(`${id}Error`);
  }

  const options = optionsProp || [];
  let normalizedOptions: (
    | HideableStrictOption<TValue | ''>
    | StrictGroup<TValue | ''>
  )[] = options.map(normalizeOption);

  if (placeholder) {
    normalizedOptions = [
      {
        label: placeholder,
        value: PLACEHOLDER_VALUE,
        disabled: true,
      },
      ...normalizedOptions,
    ];
  }

  const inlineLabelMarkup = labelInline && (
    <span className={styles.InlineLabel}>{label}</span>
  );

  const selectedOption = getSelectedOption(normalizedOptions, value);

  const prefixMarkup = selectedOption.prefix && (
    <div className={styles.Prefix}>{selectedOption.prefix}</div>
  );

  const contentMarkup = (
    <div className={styles.Content} aria-hidden aria-disabled={disabled}>
      {inlineLabelMarkup}
      {prefixMarkup}
      <span className={styles.SelectedOption}>{selectedOption.label}</span>
      <span className={styles.Icon}>
        <Icon source={SelectMinor} />
      </span>
    </div>
  );

  const optionsMarkup = normalizedOptions.map(renderOption);

  return (
    <Labelled
      id={id}
      label={label}
      error={error}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
      requiredIndicator={requiredIndicator}
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
          aria-invalid={Boolean(error)}
          aria-describedby={
            describedBy.length ? describedBy.join(' ') : undefined
          }
          aria-required={requiredIndicator}
        >
          {optionsMarkup}
        </select>
        {contentMarkup}
        <div className={styles.Backdrop} />
      </div>
    </Labelled>
  );
}

function isString<TValue extends string = string>(
  option: SelectOption<TValue> | SelectGroup<TValue>,
): option is TValue {
  return typeof option === 'string';
}

function isGroup<TValue extends string = string>(
  option: SelectOption<TValue> | SelectGroup<TValue>,
): option is SelectGroup<TValue> {
  return (
    typeof option === 'object' && 'options' in option && option.options != null
  );
}

function normalizeStringOption<TValue extends string = string>(
  option: TValue,
): StrictOption<TValue> {
  return {
    label: option,
    value: option,
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption<TValue extends string = string>(
  option: SelectOption<TValue> | SelectGroup<TValue>,
): HideableStrictOption<TValue> | StrictGroup<TValue> {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const {title, options} = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option)
          ? normalizeStringOption(option)
          : (option as StrictOption<TValue>);
      }),
    };
  }

  return option as StrictOption<TValue>;
}

/**
 * Gets the text to display in the UI, for the currently selected option
 */
function getSelectedOption<TValue extends string = string>(
  options: (HideableStrictOption<TValue> | StrictGroup<TValue>)[],
  value: TValue,
): HideableStrictOption<TValue | ''> {
  const flatOptions = flattenOptions(options);
  let selectedOption = flatOptions.find((option) => value === option.value);

  if (selectedOption === undefined) {
    // Get the first visible option (not the hidden placeholder)
    selectedOption = flatOptions.find((option) => !option.hidden);
  }

  return selectedOption || {value: '', label: ''};
}

/**
 * Ungroups an options array
 */
function flattenOptions<TValue extends string = string>(
  options: (HideableStrictOption<TValue> | StrictGroup<TValue>)[],
): HideableStrictOption<TValue>[] {
  let flatOptions: HideableStrictOption<TValue>[] = [];

  options.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });

  return flatOptions;
}

function renderSingleOption<TValue extends string = string>(
  option: HideableStrictOption<TValue>,
): React.ReactNode {
  const {value, label, prefix: _prefix, ...rest} = option;
  return (
    <option key={value} value={value} {...rest}>
      {label}
    </option>
  );
}

function renderOption<TValue extends string = string>(
  optionOrGroup: HideableStrictOption<TValue> | StrictGroup<TValue>,
): React.ReactNode {
  if (isGroup(optionOrGroup)) {
    const {title, options} = optionOrGroup;
    return (
      <optgroup label={title} key={title}>
        {options.map(renderSingleOption)}
      </optgroup>
    );
  }

  return renderSingleOption(optionOrGroup);
}
