import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled, {
  Action,
  Error,
  helpTextID,
  errorID,
  labelID,
} from '../Labelled';
import Connected from '../Connected';

import Resizer from './Resizer';
import Spinner from './Spinner';
import * as styles from './TextField.scss';

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

export interface State {
  height?: number | null;
  focus: boolean;
  id: string;
}

export interface Props {
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
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Allow for multiple lines of input */
  multiline?: boolean | number;
  /** Error to display beneath the label */
  error?: Error;
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
  /** Limit increment value for numeric and date-time inputs */
  step?: number;
  /** Enable automatic completion by the browser */
  autoComplete?: boolean;
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
  /** Callback when value is changed */
  onChange?(value: string, id: string): void;
  /** Callback when input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

const getUniqueID = createUniqueIDFactory('TextField');

export default class TextField extends React.PureComponent<Props, State> {
  private input: HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      height: null,
      focus: false,
      id: props.id || getUniqueID(),
    };
  }

  componentDidUpdate({focused}: Props) {
    if (
      this.input &&
      focused !== this.props.focused &&
      this.props.focused === true
    ) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      id: newProps.id || this.state.id,
    });
  }

  render() {
    const {
      id = this.state.id,
      value = '',
      placeholder,
      disabled,
      readOnly,
      autoFocus,
      type,
      name,
      error,
      multiline,
      connectedRight,
      connectedLeft,
      label,
      labelAction,
      labelHidden,
      helpText,
      prefix,
      suffix,
      onFocus,
      onBlur,
      autoComplete,
      focused,
      ...rest
    } = this.props;

    const {height} = this.state;

    const className = classNames(
      styles.TextField,
      Boolean(value) && styles.hasValue,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      error && styles.error,
      multiline && styles.multiline,
      this.state.focus && styles.focus,
    );

    const inputType = type === 'currency' ? 'text' : type;

    const prefixMarkup = prefix ? (
      <div className={styles.Prefix} id={`${id}Prefix`}>
        {prefix}
      </div>
    ) : null;

    const suffixMarkup = suffix ? (
      <div className={styles.Suffix} id={`${id}Suffix`}>
        {suffix}
      </div>
    ) : null;

    const spinnerMarkup =
      type === 'number' && !disabled ? (
        <Spinner onChange={this.handleNumberChange} />
      ) : null;

    const style = multiline && height ? {height} : null;

    const resizer =
      multiline != null ? (
        <Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 1}
          onHeightChange={this.handleExpandingResize}
        />
      ) : null;

    const describedBy: string[] = [];
    if (error && typeof error === 'string') {
      describedBy.push(errorID(id));
    }
    if (helpText) {
      describedBy.push(helpTextID(id));
    }

    const labelledBy = [labelID(id)];
    if (prefix) {
      labelledBy.push(`${id}Prefix`);
    }
    if (suffix) {
      labelledBy.push(`${id}Suffix`);
    }

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      name,
      id,
      disabled,
      readOnly,
      autoFocus,
      value,
      placeholder,
      onFocus,
      onBlur,
      style,
      autoComplete: normalizeAutoComplete(autoComplete),
      className: styles.Input,
      onChange: this.handleChange,
      ref: this.setInput,
      type: inputType,
      'aria-describedby': describedBy.length
        ? describedBy.join(' ')
        : undefined,
      'aria-labelledby': labelledBy.join(' '),
      'aria-invalid': Boolean(error),
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
            {spinnerMarkup}
            <div className={styles.Backdrop} />
            {resizer}
          </div>
        </Connected>
      </Labelled>
    );
  }

  @autobind
  private setInput(input: HTMLElement) {
    this.input = input;
  }

  @autobind
  private handleNumberChange(steps: number) {
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
  }

  @autobind
  private handleExpandingResize(height: number) {
    this.setState({height});
  }

  @autobind
  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = this.props;
    if (onChange == null) {
      return;
    }
    onChange(event.currentTarget.value, this.state.id);
  }

  @autobind
  private handleFocus() {
    this.setState({focus: true});
  }

  @autobind
  private handleBlur() {
    this.setState({focus: false});
  }

  @autobind
  private handleClick() {
    this.input.focus();
  }
}

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) {
    return autoComplete;
  }
  return autoComplete ? 'on' : 'off';
}
