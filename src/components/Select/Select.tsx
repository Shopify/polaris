import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Icon from 'components/Icon';
import {Error} from 'types';
import Labelled, {Action, helpTextID} from 'components/Labelled';
import * as styles from './Select.scss';

interface StrictOption {
  /** Machine value of the option; this is the value passed to `onChange` */
  value: string;
  /** Human-readable text for the option */
  label: string;
  /** Option will be visible, but not selectable */
  disabled?: boolean;
}

interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

export type Option = string | StrictOption;

export interface Group {
  title: string;
  options: Option[];
}

export interface BaseProps {
  /** List of options or option groups to choose from */
  options?: (Option | Group)[];
  /** @deprecated List of grouped options to choose from */
  groups?: (Option | Group)[];
  /** Label for the select */
  label: string;
  /** Adds an action to the label */
  labelAction?: Action;
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
  /** Value for form input */
  value?: string;
  /** Display an error state */
  error?: Error | boolean;
  /** Callback when selection is changed */
  onChange?(selected: string, id: string): void;
  /** Callback when select is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export interface Props extends BaseProps {}

const PLACEHOLDER_VALUE = '';
const getUniqueID = createUniqueIDFactory('Select');

export default function Select({
  options: optionsProp,
  groups: groupsProp,
  label,
  labelAction,
  labelHidden: labelHiddenProp,
  labelInline,
  disabled,
  helpText,
  placeholder,
  id = getUniqueID(),
  name,
  value = PLACEHOLDER_VALUE,
  error,
  onChange,
  onFocus,
  onBlur,
}: Props) {
  const labelHidden = labelInline ? true : labelHiddenProp;

  const className = classNames(
    styles.Select,
    error && styles.error,
    disabled && styles.disabled,
  );

  const handleChange = onChange
    ? (event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.currentTarget.value, id)
    : undefined;

  const describedBy: string[] = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (error) {
    describedBy.push(`${id}Error`);
  }

  if (groupsProp != null) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: the `groups` prop is deprecated and will be removed in the next major version. Pass groups to the `options` prop instead.',
    );
  }

  const options = optionsProp || groupsProp || [];
  let normalizedOptions = options.map(normalizeOption);

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

  const contentMarkup = (
    <div className={styles.Content} aria-hidden>
      {inlineLabelMarkup}
      <span className={styles.SelectedOption}>{selectedOption}</span>
      <span className={styles.Icon}>
        <Icon source="arrowUpDown" />
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
        >
          {optionsMarkup}
        </select>
        {contentMarkup}
        <div className={styles.Backdrop} />
      </div>
    </Labelled>
  );
}

function isString(option: Option | Group): option is string {
  return typeof option === 'string';
}

function isGroup(option: Option | Group): option is Group {
  return (option as Group).options != null;
}

function normalizeStringOption(option: string): StrictOption {
  return {
    label: option,
    value: option,
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(
  option: Option | Group,
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const {title, options} = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option) ? normalizeStringOption(option) : option;
      }),
    };
  }

  return option;
}

/**
 * Gets the text to display in the UI, for the currently selected option
 */
function getSelectedOption(
  options: (HideableStrictOption | StrictGroup)[],
  value: string,
): string {
  const flatOptions = flattenOptions(options);
  let selectedOption = flatOptions.find((option) => value === option.value);

  if (selectedOption === undefined) {
    // Get the first visible option (not the hidden placeholder)
    selectedOption = flatOptions.find((option) => !option.hidden);
  }

  return selectedOption ? selectedOption.label : '';
}

/**
 * Ungroups an options array
 */
function flattenOptions(
  options: (HideableStrictOption | StrictGroup)[],
): HideableStrictOption[] {
  let flatOptions: HideableStrictOption[] = [];

  options.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });

  return flatOptions;
}

function renderSingleOption(option: HideableStrictOption): React.ReactNode {
  const {value, label, ...rest} = option;
  return (
    <option key={value} value={value} {...rest}>
      {label}
    </option>
  );
}

function renderOption(
  optionOrGroup: HideableStrictOption | StrictGroup,
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
