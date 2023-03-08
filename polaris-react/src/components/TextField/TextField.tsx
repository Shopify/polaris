import React, {
  createElement,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {useUniqueId} from '../../utilities/unique-id';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import {Labelled, LabelledProps, helpTextID, labelID} from '../Labelled';
import {Connected} from '../Connected';
import {Error, Key} from '../../types';
import {Icon} from '../Icon';
import {Text} from '../Text';

import {Resizer, Spinner, SpinnerProps} from './components';
import styles from './TextField.scss';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency'
  | 'integer';

type Alignment = 'left' | 'center' | 'right';

type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

interface SelectSuggestion {
  suggestion?: string;
}

interface SelectTextOnFocus {
  selectTextOnFocus?: true;
}

interface Readonly {
  readonly?: true;
}

interface Disabled {
  disabled?: true;
}

interface Interactive {
  onChange(value: string, id: string): void;
}

interface NonMutuallyExclusiveProps {
  /** Text to display before value */
  prefix?: React.ReactNode;
  /** Text to display after value */
  suffix?: React.ReactNode;
  /** Content to vertically display above the input value */
  verticalContent?: React.ReactNode;
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  value?: string;
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Label for the input */
  label: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
  /** Indicates whether or not the entire value should be selected on focus. */
  selectTextOnFocus?: boolean;
  /** An inline autocomplete suggestion containing the input value. The characters that complete the input value are selected for ease of deletion on input change or keypress of Backspace/Delete. The selected substring is visually highlighted with subdued styling. */
  suggestion?: string;
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Allow for multiple lines of input */
  multiline?: boolean | number;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** An element connected to the right of the input */
  connectedRight?: React.ReactNode;
  /** An element connected to the left of the input */
  connectedLeft?: React.ReactNode;
  /** Determine type of input */
  type?: Type;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Defines a specific role attribute for the input */
  role?: string;
  /** Limit increment value for numeric and date-time inputs */
  step?: number;
  /** Enable automatic completion by the browser. Set to "off" when you do not want the browser to fill in info */
  autoComplete: string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Maximum height of the input element. Only applies when `multiline` is `true` */
  maxHeight?: number | string;
  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  min?: number | string;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: InputMode;
  /** Indicate whether value should have spelling checked */
  spellCheck?: boolean;
  /** Indicates the id of a component owned by the input */
  ariaOwns?: string;
  /** Indicates whether or not a Popover is displayed */
  ariaExpanded?: boolean;
  /** Indicates the id of a component controlled by the input */
  ariaControls?: string;
  /** Indicates the id of a related component’s visually focused element to the input */
  ariaActiveDescendant?: string;
  /** Indicates what kind of user input completion suggestions are provided */
  ariaAutocomplete?: string;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Determines the alignment of the text in the input */
  align?: Alignment;
  /** Visual required indicator, adds an asterisk to label */
  requiredIndicator?: boolean;
  /** Indicates whether or not a monospaced font should be used */
  monospaced?: boolean;
  /** Callback fired when clear button is clicked */
  onClearButtonClick?(id: string): void;
  /** Callback fired when value is changed */
  onChange?(value: string, id: string): void;
  /** Callback fired when input is focused */
  onFocus?: (event?: React.FocusEvent) => void;
  /** Callback fired when input is blurred */
  onBlur?(event?: React.FocusEvent): void;
}

export type MutuallyExclusiveSelectionProps =
  | SelectSuggestion
  | SelectTextOnFocus;

export type MutuallyExclusiveInteractionProps =
  | Interactive
  | Readonly
  | Disabled;

export type TextFieldProps = NonMutuallyExclusiveProps &
  MutuallyExclusiveInteractionProps &
  MutuallyExclusiveSelectionProps;

export function TextField({
  prefix,
  suffix,
  verticalContent,
  placeholder,
  value = '',
  helpText,
  label,
  labelAction,
  labelHidden,
  disabled,
  clearButton,
  readOnly,
  autoFocus,
  focused,
  multiline,
  error,
  connectedRight,
  connectedLeft,
  type = 'text',
  name,
  id: idProp,
  role,
  step,
  autoComplete,
  max,
  maxLength,
  maxHeight,
  min,
  minLength,
  pattern,
  inputMode,
  spellCheck,
  ariaOwns,
  ariaControls,
  ariaExpanded,
  ariaActiveDescendant,
  ariaAutocomplete,
  showCharacterCount,
  align,
  requiredIndicator,
  monospaced,
  selectTextOnFocus,
  suggestion,
  onClearButtonClick,
  onChange,
  onFocus,
  onBlur,
}: TextFieldProps) {
  const i18n = useI18n();
  const [height, setHeight] = useState<number | null>(null);
  const [focus, setFocus] = useState(Boolean(focused));
  const isAfterInitial = useIsAfterInitialMount();

  const id = useUniqueId('TextField', idProp);

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const prefixRef = useRef<HTMLDivElement>(null);
  const suffixRef = useRef<HTMLDivElement>(null);
  const verticalContentRef = useRef<HTMLDivElement>(null);
  const buttonPressTimer = useRef<number>();
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input = multiline ? textAreaRef.current : inputRef.current;
    if (!input || focused === undefined) return;
    focused ? input.focus() : input.blur();
  }, [focused, verticalContent, multiline]);

  useEffect(() => {
    const input = inputRef.current;
    const isSupportedInputType =
      type === 'text' ||
      type === 'tel' ||
      type === 'search' ||
      type === 'url' ||
      type === 'password';

    if (!input || !isSupportedInputType || !suggestion) {
      return;
    }

    input.setSelectionRange(value.length, suggestion.length);
  }, [focus, value, type, suggestion]);

  const normalizedValue = suggestion ? suggestion : value;
  const normalizedStep = step != null ? step : 1;
  const normalizedMax = max != null ? max : Infinity;
  const normalizedMin = min != null ? min : -Infinity;

  const className = classNames(
    styles.TextField,
    Boolean(normalizedValue) && styles.hasValue,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
    error && styles.error,
    multiline && styles.multiline,
    focus && styles.focus,
  );

  const inputType = type === ('currency' || 'integer') ? 'text' : type;

  const prefixMarkup = prefix ? (
    <div className={styles.Prefix} id={`${id}-Prefix`} ref={prefixRef}>
      {prefix}
    </div>
  ) : null;

  const suffixMarkup = suffix ? (
    <div className={styles.Suffix} id={`${id}-Suffix`} ref={suffixRef}>
      {suffix}
    </div>
  ) : null;

  let characterCountMarkup = null;
  if (showCharacterCount) {
    const characterCount = normalizedValue.length;
    const characterCountLabel = maxLength
      ? i18n.translate('Polaris.TextField.characterCountWithMaxLength', {
          count: characterCount,
          limit: maxLength,
        })
      : i18n.translate('Polaris.TextField.characterCount', {
          count: characterCount,
        });

    const characterCountClassName = classNames(
      styles.CharacterCount,
      multiline && styles.AlignFieldBottom,
    );

    const characterCountText = !maxLength
      ? characterCount
      : `${characterCount}/${maxLength}`;

    characterCountMarkup = (
      <div
        id={`${id}-CharacterCounter`}
        className={characterCountClassName}
        aria-label={characterCountLabel}
        aria-live={focus ? 'polite' : 'off'}
        aria-atomic="true"
        onClick={handleClickChild}
      >
        {characterCountText}
      </div>
    );
  }

  const clearButtonVisible = normalizedValue !== '';

  const clearButtonMarkup =
    clearButton && clearButtonVisible ? (
      <button
        type="button"
        className={styles.ClearButton}
        onClick={handleClearButtonPress}
        disabled={disabled}
      >
        <Text variant="bodySm" as="span" visuallyHidden>
          {i18n.translate('Polaris.Common.clear')}
        </Text>
        <Icon source={CircleCancelMinor} color="base" />
      </button>
    ) : null;

  const handleNumberChange = useCallback(
    (steps: number) => {
      if (onChange == null) {
        return;
      }
      // Returns the length of decimal places in a number
      const dpl = (num: number) => (num.toString().split('.')[1] || []).length;

      const numericValue = value ? parseFloat(value) : 0;
      if (isNaN(numericValue)) {
        return;
      }

      const roundedStep =
        type === 'integer' ? Math.round(normalizedStep) : normalizedStep;

      // Making sure the new value has the same length of decimal places as the
      // step / value has.
      const decimalPlaces = Math.max(dpl(numericValue), dpl(roundedStep));

      const newValue = Math.min(
        Number(normalizedMax),
        Math.max(numericValue + steps * roundedStep, Number(normalizedMin)),
      );

      onChange(String(newValue.toFixed(decimalPlaces)), id);
    },
    [id, normalizedMax, normalizedMin, onChange, normalizedStep, value, type],
  );

  const handleButtonRelease = useCallback(() => {
    clearTimeout(buttonPressTimer.current);
  }, []);

  const handleButtonPress: SpinnerProps['onMouseDown'] = useCallback(
    (onChange) => {
      const minInterval = 50;
      const decrementBy = 10;
      let interval = 200;

      const onChangeInterval = () => {
        if (interval > minInterval) interval -= decrementBy;
        onChange(0);
        buttonPressTimer.current = window.setTimeout(
          onChangeInterval,
          interval,
        );
      };

      buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);

      document.addEventListener('mouseup', handleButtonRelease, {
        once: true,
      });
    },
    [handleButtonRelease],
  );

  const spinnerMarkup =
    (type === 'number' || type === 'integer') &&
    step !== 0 &&
    !disabled &&
    !readOnly ? (
      <Spinner
        onClick={handleClickChild}
        onChange={handleNumberChange}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        ref={spinnerRef}
        onBlur={handleOnBlur}
      />
    ) : null;

  const style = multiline && height ? {height, maxHeight} : null;

  const handleExpandingResize = useCallback((height: number) => {
    setHeight(height);
  }, []);

  const resizer =
    multiline && isAfterInitial ? (
      <Resizer
        contents={normalizedValue || placeholder}
        currentHeight={height}
        minimumLines={typeof multiline === 'number' ? multiline : 1}
        onHeightChange={handleExpandingResize}
      />
    ) : null;

  const describedBy: string[] = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (showCharacterCount) {
    describedBy.push(`${id}-CharacterCounter`);
  }

  const labelledBy: string[] = [];

  if (prefix) {
    labelledBy.push(`${id}-Prefix`);
  }

  if (suffix) {
    labelledBy.push(`${id}-Suffix`);
  }

  if (verticalContent) {
    labelledBy.push(`${id}-VerticalContent`);
  }

  labelledBy.unshift(labelID(id));

  const inputClassName = classNames(
    styles.Input,
    align && styles[variationName('Input-align', align)],
    suffix && styles['Input-suffixed'],
    clearButton && styles['Input-hasClearButton'],
    monospaced && styles.monospaced,
    suggestion && styles.suggestion,
  );

  const handleOnFocus = (
    event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLInputElement>,
  ) => {
    setFocus(true);

    if (selectTextOnFocus && !suggestion) {
      const input = multiline ? textAreaRef.current : inputRef.current;
      input?.select();
    }

    if (onFocus) {
      onFocus(event as React.FocusEvent<HTMLInputElement>);
    }
  };

  const inputPattern =
    pattern ?? (type === 'integer' ? '^[-]?[0-9]*' : pattern);

  const input = createElement(multiline ? 'textarea' : 'input', {
    name,
    id,
    disabled,
    readOnly,
    role,
    autoFocus,
    value: normalizedValue,
    placeholder,
    style,
    autoComplete,
    className: inputClassName,
    ref: multiline ? textAreaRef : inputRef,
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern: inputPattern,
    inputMode,
    type: inputType,
    rows: getRows(multiline),
    'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
    'aria-labelledby': labelledBy.join(' '),
    'aria-invalid': Boolean(error),
    'aria-owns': ariaOwns,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-autocomplete': ariaAutocomplete,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-required': requiredIndicator,
    ...normalizeAriaMultiline(multiline),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onClick: handleClickChild,
    onKeyPress: handleKeyPress,
    onChange: !suggestion ? handleChange : undefined,
    onInput: suggestion ? handleChange : undefined,
  });

  const inputWithVerticalContentMarkup = verticalContent ? (
    <div
      className={styles.VerticalContent}
      id={`${id}-VerticalContent`}
      ref={verticalContentRef}
      onClick={handleClickChild}
    >
      {verticalContent}
      {input}
    </div>
  ) : null;

  const inputMarkup = verticalContent ? inputWithVerticalContentMarkup : input;

  const backdropMarkup = (
    <div
      className={classNames(
        styles.Backdrop,
        connectedLeft && styles['Backdrop-connectedLeft'],
        connectedRight && styles['Backdrop-connectedRight'],
      )}
    />
  );

  return (
    <Labelled
      label={label}
      id={id}
      error={error}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
      requiredIndicator={requiredIndicator}
    >
      <Connected left={connectedLeft} right={connectedRight}>
        <div className={className} onClick={handleClick}>
          {prefixMarkup}
          {inputMarkup}
          {suffixMarkup}
          {characterCountMarkup}
          {clearButtonMarkup}
          {spinnerMarkup}
          {backdropMarkup}
          {resizer}
        </div>
      </Connected>
    </Labelled>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {value} = event.currentTarget;
    const integerSpec = /^[-]?[0-9]*$/;

    if (onChange) {
      if (
        type !== 'integer' ||
        (type === 'integer' && integerSpec.test(value))
      ) {
        onChange(value, id);
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    const {target} = event;

    // For TextFields used with Combobox, focus needs to be set again even
    // if the TextField is already focused to trigger the logic to open the
    // Combobox activator
    const inputRefRole = inputRef?.current?.getAttribute('role');
    if (target === inputRef.current && inputRefRole === 'combobox') {
      inputRef.current?.focus();
      handleOnFocus(event);
      return;
    }

    if (
      isPrefixOrSuffix(target) ||
      isVerticalContent(target) ||
      isInput(target) ||
      isSpinner(target) ||
      focus
    ) {
      return;
    }

    inputRef.current?.focus();
  }

  function handleClickChild(event: React.MouseEvent) {
    if (!isSpinner(event.target) && !isInput(event.target)) {
      event.stopPropagation();
    }

    if (
      isPrefixOrSuffix(event.target) ||
      isVerticalContent(event.target) ||
      isInput(event.target) ||
      focus
    ) {
      return;
    }

    setFocus(true);
  }

  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    const {key, which} = event;
    const numbersSpec = /[\d.eE+-]$/;
    if (type !== 'number' || which === Key.Enter || numbersSpec.test(key)) {
      return;
    }

    event.preventDefault();
  }

  function handleOnBlur(event: React.FocusEvent) {
    setFocus(false);

    if (onBlur) {
      onBlur(event);
    }
  }

  function isInput(target: HTMLElement | EventTarget) {
    return (
      target instanceof HTMLElement &&
      inputRef.current &&
      (inputRef.current.contains(target) ||
        inputRef.current.contains(document.activeElement))
    );
  }

  function isPrefixOrSuffix(target: Element | EventTarget) {
    return (
      target instanceof Element &&
      ((prefixRef.current && prefixRef.current.contains(target)) ||
        (suffixRef.current && suffixRef.current.contains(target)))
    );
  }

  function isSpinner(target: Element | EventTarget) {
    return (
      target instanceof Element &&
      spinnerRef.current &&
      spinnerRef.current.contains(target)
    );
  }

  function isVerticalContent(target: Element | EventTarget) {
    return (
      target instanceof Element &&
      verticalContentRef.current &&
      (verticalContentRef.current.contains(target) ||
        verticalContentRef.current.contains(document.activeElement))
    );
  }
}

function getRows(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return typeof multiline === 'number' ? multiline : 1;
}

function normalizeAriaMultiline(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return Boolean(multiline) || multiline > 0
    ? {'aria-multiline': true}
    : undefined;
}
