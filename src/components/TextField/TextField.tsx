import * as React from 'react';
import {addEventListener} from '@shopify/javascript-utilities/events';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames, variationName} from '@shopify/css-utilities';
import {CircleCancelMinor} from '@shopify/polaris-icons';
import VisuallyHidden from '../VisuallyHidden';

import Labelled, {Action, helpTextID, labelID} from '../Labelled';
import Connected from '../Connected';

import {Error, Key} from '../../types';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Icon from '../Icon';
import {Resizer, Spinner} from './components';
import styles from './TextField.scss';

export type Type =
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
  | 'currency';

export type Alignment = 'left' | 'center' | 'right';

export interface State {
  height?: number | null;
  focus: boolean;
  id: string;
}

export interface BaseProps {
  /** Text to display before value */
  prefix?: React.ReactNode;
  /** Text to display after value */
  suffix?: React.ReactNode;
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  value?: string;
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Label for the input */
  label: string;
  /** Adds an action to the label */
  labelAction?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
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
  /** Enable automatic completion by the browser */
  autoComplete?: boolean | string;
  /** Mimics the behavior of the native HTML attribute, limiting how high the spinner can increment the value */
  max?: number;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Mimics the behavior of the native HTML attribute, limiting how low the spinner can decrement the value */
  min?: number;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Indicate whether value should have spelling checked */
  spellCheck?: boolean;
  /** Indicates the id of a component owned by the input */
  ariaOwns?: string;
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
  /** Callback when clear button is clicked */
  onClearButtonClick?(id: string): void;
  /** Callback when value is changed */
  onChange?(value: string, id: string): void;
  /** Callback when input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export interface NonMutuallyExclusiveProps extends BaseProps {}

export type Props = NonMutuallyExclusiveProps &
  (
    | {readOnly: true}
    | {disabled: true}
    | {onChange(value: string, id: string): void});

type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('TextField');

class TextField extends React.PureComponent<CombinedProps, State> {
  static getDerivedStateFromProps(nextProps: CombinedProps, prevState: State) {
    return {id: nextProps.id || prevState.id};
  }

  private input: HTMLElement;
  private buttonPressTimer: number;
  private prefix = React.createRef<HTMLDivElement>();
  private suffix = React.createRef<HTMLDivElement>();

  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      height: null,
      focus: props.focused || false,
      id: props.id || getUniqueID(),
    };
  }

  componentDidMount() {
    if (!this.props.focused) {
      return;
    }

    this.input.focus();
  }

  componentDidUpdate({focused: wasFocused}: CombinedProps) {
    const {focused} = this.props;

    if (!wasFocused && focused) {
      this.input.focus();
    } else if (wasFocused && !focused) {
      this.input.blur();
    }
  }

  render() {
    const {
      align,
      ariaActiveDescendant,
      ariaAutocomplete,
      ariaControls,
      ariaOwns,
      autoComplete,
      autoFocus,
      connectedLeft,
      clearButton,
      connectedRight,
      disabled,
      error,
      helpText,
      id = this.state.id,
      label,
      labelAction,
      labelHidden,
      max,
      maxLength,
      min,
      minLength,
      multiline,
      name,
      onBlur,
      onFocus,
      pattern,
      placeholder,
      polaris: {intl},
      prefix,
      readOnly,
      role,
      showCharacterCount,
      spellCheck,
      step,
      suffix,
      type,
      value,
    } = this.props;

    const normalizedValue = value != null ? value : '';

    const {height} = this.state;

    const className = classNames(
      styles.TextField,
      Boolean(normalizedValue) && styles.hasValue,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      error && styles.error,
      multiline && styles.multiline,
      this.state.focus && styles.focus,
    );

    const inputType = type === 'currency' ? 'text' : type;

    const prefixMarkup = prefix ? (
      <div className={styles.Prefix} id={`${id}Prefix`} ref={this.prefix}>
        {prefix}
      </div>
    ) : null;

    const suffixMarkup = suffix ? (
      <div className={styles.Suffix} id={`${id}Suffix`} ref={this.suffix}>
        {suffix}
      </div>
    ) : null;

    const characterCount = normalizedValue.length;
    const characterCountLabel = intl.translate(
      maxLength
        ? 'Polaris.TextField.characterCountWithMaxLength'
        : 'Polaris.TextField.characterCount',
      {count: characterCount, limit: maxLength},
    );

    const characterCountClassName = classNames(
      styles.CharacterCount,
      multiline && styles.AlignFieldBottom,
    );

    const characterCountText = !maxLength
      ? characterCount
      : `${characterCount}/${maxLength}`;

    const characterCountMarkup = showCharacterCount ? (
      <div
        id={`${id}CharacterCounter`}
        className={characterCountClassName}
        aria-label={characterCountLabel}
        aria-live="polite"
        aria-atomic="true"
      >
        {characterCountText}
      </div>
    ) : null;

    const clearButtonMarkup =
      clearButton && normalizedValue !== '' ? (
        <button
          testID="clearButton"
          className={styles.ClearButton}
          onClick={this.handleClearButtonPress}
          disabled={disabled}
        >
          <VisuallyHidden>
            {intl.translate('Polaris.Common.clear')}
          </VisuallyHidden>
          <Icon source={CircleCancelMinor} color="inkLightest" />
        </button>
      ) : null;

    const spinnerMarkup =
      type === 'number' && !disabled && !readOnly ? (
        <Spinner
          onChange={this.handleNumberChange}
          onMouseDown={this.handleButtonPress}
          onMouseUp={this.handleButtonRelease}
        />
      ) : null;

    const style = multiline && height ? {height} : null;

    const resizer = multiline ? (
      <Resizer
        contents={normalizedValue || placeholder}
        currentHeight={height}
        minimumLines={typeof multiline === 'number' ? multiline : 1}
        onHeightChange={this.handleExpandingResize}
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
      describedBy.push(`${id}CharacterCounter`);
    }

    const labelledBy: string[] = [];

    if (prefix) {
      labelledBy.push(`${id}Prefix`);
    }

    if (suffix) {
      labelledBy.push(`${id}Suffix`);
    }

    if (labelledBy.length) {
      labelledBy.unshift(labelID(id));
    }

    const inputClassName = classNames(
      styles.Input,
      align && styles[variationName('Input-align', align)],
      suffix && styles['Input-suffixed'],
      clearButton && styles['Input-hasClearButton'],
    );

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      name,
      id,
      disabled,
      readOnly,
      role,
      autoFocus,
      value: normalizedValue,
      placeholder,
      onFocus,
      onBlur,
      onKeyPress: this.handleKeyPress,
      style,
      autoComplete: normalizeAutoComplete(autoComplete),
      className: inputClassName,
      onChange: this.handleChange,
      ref: this.setInput,
      min,
      max,
      step,
      minLength,
      maxLength,
      spellCheck,
      pattern,
      type: inputType,
      'aria-describedby': describedBy.length
        ? describedBy.join(' ')
        : undefined,
      'aria-labelledby': labelledBy.length ? labelledBy.join(' ') : undefined,
      'aria-invalid': Boolean(error),
      'aria-owns': ariaOwns,
      'aria-activedescendant': ariaActiveDescendant,
      'aria-autocomplete': ariaAutocomplete,
      'aria-controls': ariaControls,
      'aria-multiline': multiline,
    });

    return (
      <Labelled
        label={label}
        id={id}
        error={error}
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
      >
        <Connected left={connectedLeft} right={connectedRight}>
          <div
            className={className}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
          >
            {prefixMarkup}
            {input}
            {suffixMarkup}
            {characterCountMarkup}
            {clearButtonMarkup}
            {spinnerMarkup}
            <div className={styles.Backdrop} />
            {resizer}
          </div>
        </Connected>
      </Labelled>
    );
  }

  private setInput = (input: HTMLElement) => {
    this.input = input;
  };

  private handleNumberChange = (steps: number) => {
    const {
      onChange,
      value,
      step = 1,
      min = -Infinity,
      max = Infinity,
    } = this.props;
    if (onChange == null) {
      return;
    }

    // Returns the length of decimal places in a number
    const dpl = (num: number) => (num.toString().split('.')[1] || []).length;

    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) {
      return;
    }

    // Making sure the new value has the same length of decimal places as the
    // step / value has.
    const decimalPlaces = Math.max(dpl(numericValue), dpl(step));

    const newValue = Math.min(max, Math.max(numericValue + steps * step, min));
    onChange(String(newValue.toFixed(decimalPlaces)), this.state.id);
  };

  private handleClearButtonPress = () => {
    const {
      state: {id},
      props: {onClearButtonClick},
    } = this;

    onClearButtonClick && onClearButtonClick(id);
  };

  private handleExpandingResize = (height: number) => {
    this.setState({height});
  };

  private handleKeyPress = (event: React.KeyboardEvent) => {
    const {key, which} = event;
    const {type} = this.props;
    const numbersSpec = /[\d.eE+-]$/;

    if (type !== 'number' || which === Key.Enter || key.match(numbersSpec)) {
      return;
    }

    event.preventDefault();
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    onChange && onChange(event.currentTarget.value, this.state.id);
  };

  private handleFocus = ({target}: React.FocusEvent) => {
    if (this.containsAffix(target)) {
      return;
    }

    this.setState({focus: true});
  };

  private handleBlur = () => {
    this.setState({focus: false});
  };

  private handleClick = ({target}: React.MouseEvent) => {
    if (this.containsAffix(target)) {
      return;
    }

    this.input.focus();
  };

  private containsAffix(target: HTMLElement | EventTarget) {
    return (
      target instanceof HTMLElement &&
      ((this.prefix.current && this.prefix.current.contains(target)) ||
        (this.suffix.current && this.suffix.current.contains(target)))
    );
  }

  private handleButtonPress = (onChange: Function) => {
    const minInterval = 50;
    const decrementBy = 10;
    let interval = 200;

    const onChangeInterval = () => {
      if (interval > minInterval) interval -= decrementBy;
      onChange();
      this.buttonPressTimer = window.setTimeout(onChangeInterval, interval);
    };
    this.buttonPressTimer = window.setTimeout(onChangeInterval, interval);

    addEventListener(document, 'mouseup', this.handleButtonRelease, {
      once: true,
    });
  };

  private handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  };
}

function normalizeAutoComplete(autoComplete?: boolean | string) {
  if (autoComplete == null) {
    return autoComplete;
  } else if (autoComplete === true) {
    return 'on';
  } else if (autoComplete === false) {
    return 'off';
  } else {
    return autoComplete;
  }
}

export default withAppProvider<Props>()(TextField);
