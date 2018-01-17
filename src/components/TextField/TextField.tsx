import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled, {Action, Error, helpTextID, errorID, labelID} from '../Labelled';
import Connected from '../Connected';

import Resizer from './Resizer';
import Spinner from './Spinner';
import * as styles from './TextField.scss';

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null,
  focus: boolean,
  id: string,
}

export interface Props {
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  placeholder?: string,
  value?: string,
  helpText?: React.ReactNode,
  label: string,
  labelAction?: Action,
  labelHidden?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
  autoFocus?: boolean,
  focused?: boolean,
  multiline?: boolean | number,
  error?: Error,
  connectedRight?: React.ReactNode,
  connectedLeft?: React.ReactNode,
  type?: Type,
  name?: string,
  id?: string,
  step?: number,
  autoComplete?: boolean,
  max?: number,
  maxLength?: number,
  min?: number,
  minLength?: number,
  pattern?: string,
  spellCheck?: boolean,
  onChange?(value: string, id: string): void,
  onFocus?(): void,
  onBlur?(): void,
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
    if (this.input && focused !== this.props.focused && this.props.focused === true) {
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
      ...rest,
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

    const prefixMarkup = prefix
      ? <div className={styles.Prefix} id={`${id}Prefix`}>{prefix}</div>
      : null;

    const suffixMarkup = suffix
      ? <div className={styles.Suffix} id={`${id}Suffix`}>{suffix}</div>
      : null;

    const spinnerMarkup = (type === 'number' && !disabled)
      ? <Spinner onChange={this.handleNumberChange} />
      : null;

    const style = (multiline && height) ? {height} : null;

    const resizer = multiline != null
      ? (
        <Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 1}
          onHeightChange={this.handleExpandingResize}
        />
      )
      : null;

    const describedBy: string[] = [];
    if (error && typeof error === 'string') { describedBy.push(errorID(id)); }
    if (helpText) { describedBy.push(helpTextID(id)); }

    const labelledBy = [labelID(id)];
    if (prefix) { labelledBy.push(`${id}Prefix`); }
    if (suffix) { labelledBy.push(`${id}Suffix`); }

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      name,
      id,
      type,
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
      'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
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
        <Connected
          left={connectedLeft}
          right={connectedRight}
        >
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
    const {onChange, value, step = 1, min = -Infinity, max = Infinity} = this.props;
    if (onChange == null) { return; }

    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) { return; }

    const newValue = Math.min(max, Math.max(numericValue + (steps * step), min));
    onChange(String(newValue), this.state.id);
  }

  @autobind
  private handleExpandingResize(height: number) {
    this.setState({height});
  }

  @autobind
  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = this.props;
    if (onChange == null) { return; }
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
  if (autoComplete == null) { return autoComplete; }
  return autoComplete ? 'on' : 'off';
}
