import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled, {Action, helpTextID, labelID} from '../Labelled';
import Connected from '../Connected';

import Resizer from './Resizer';
import Spinner from './Spinner';
import * as styles from './TextField.scss';

export type Type = 'text' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null,
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
  multiline?: boolean,
  autoGrow?: boolean,
  error?: boolean,
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
  onChange?(value: string): void,
  onFocus?(): void,
  onBlur?(): void,
};

export default class TextField extends React.PureComponent<Props, State> {
  state: State = {height: null};

  render() {
    const {
      id = uniqueID(),
      value = '',
      placeholder,
      disabled,
      readOnly,
      autoFocus,
      type,
      name,
      error,
      multiline,
      autoGrow,
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
      autoGrow && styles.autoGrow,
    );

    const prefixMarkup = prefix
      ? <div className={styles.Prefix} id={`${id}Prefix`}>{prefix}</div>
      : null;

    const suffixMarkup = suffix
      ? <div className={styles.Suffix} id={`${id}Suffix`}>{suffix}</div>
      : null;

    const spinnerMarkup = type === 'number'
      ? <Spinner onChange={this.handleNumberChange} />
      : null;

    const style = (autoGrow && height) ? {height} : null;

    const resizer = autoGrow
      ? (
        <Resizer
          contents={value || placeholder}
          currentHeight={height}
          onHeightChange={this.handleExpandingResize}
        />
      )
      : null;

    const describedBy = helpText
      ? helpTextID(id)
      : null;

    const labelledBy = [labelID(id)];
    if (prefix) { labelledBy.push(`${id}Prefix`); }
    if (suffix) { labelledBy.push(`${id}Suffix`); }

    const input = React.createElement((multiline || autoGrow) ? 'textarea' : 'input', {
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
      'aria-describedby': describedBy,
      'aria-labelledby': labelledBy.join(' '),
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
          <div className={className}>
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
  private handleNumberChange(steps: number) {
    const {onChange, value, step = 1, min = -Infinity, max = Infinity} = this.props;
    if (onChange == null) { return; }

    const numericValue = value ? Number.parseFloat(value) : 0;
    if (Number.isNaN(numericValue)) { return; }

    const newValue = Math.min(max, Math.max(numericValue + (steps * step), min));
    onChange(String(newValue));
  }

  @autobind
  private handleExpandingResize(height: number) {
    this.setState({height});
  }

  @autobind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const {onChange} = this.props;
    if (onChange == null) { return; }
    onChange(event.currentTarget.value);
  }
}

let index = 1;
function uniqueID() {
  return `Input${index++}`;
}

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) { return autoComplete; }
  return autoComplete ? 'on' : 'off';
}
