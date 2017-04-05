import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled, {Action} from '../Labelled';
import Connected from '../Connected';
import Icon from '../Icon';

import * as styles from './Field.scss';

export interface Props {
  leftAddon?: any,
  rightAddon?: any,
  placeholder?: string,
  value?: string,
  helpText?: React.ReactNode,
  label?: React.ReactNode,
  labelNote?: React.ReactNode,
  labelAction?: Action,
  labelHidden?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
  autoFocus?: boolean,
  error?: boolean,
  connectedRight?: React.ReactNode,
  connectedLeft?: React.ReactNode,
  type?: string,
  name?: string,
  id?: string,
  step?: number,
  onChange?(value: string): void,
  onFocus?(): void,
  onBlur?(): void,
};

export default class Field extends React.PureComponent<Props, {}> {
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
      connectedRight,
      connectedLeft,
      label,
      labelNote,
      labelAction,
      labelHidden,
      helpText,
      leftAddon,
      rightAddon,
      onFocus,
      onBlur,
    } = this.props;

    const className = classNames(
      styles.Field,
      Boolean(value) && styles.hasValue,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      error && styles.error,
    );

    const leftAddonMarkup = leftAddon
      ? <div className={styles.LeftAddon}>{leftAddon}</div>
      : null;

    const rightAddonMarkup = rightAddon
      ? <div className={styles.RightAddon}>{rightAddon}</div>
      : null;

    const spinnerMarkup = type === 'number'
      ? (
        <div className={styles.Spinner}>
          <div
            role="button"
            className={styles.Segment}
            tabIndex={-1}
            onClick={this.handleNumberChange.bind(this, 1)}
          >
            <Icon source="caretUp" size={12} />
          </div>

          <div
            role="button"
            className={styles.Segment}
            tabIndex={-1}
            onClick={this.handleNumberChange.bind(this, -1)}
          >
            <Icon source="caretDown" size={12} />
          </div>
        </div>
      )
      : null;

    return (
      <Labelled
        label={label}
        id={id}
        error={error}
        note={labelNote}
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
      >
        <Connected
          left={connectedLeft}
          right={connectedRight}
        >
          <div className={className}>
            {leftAddonMarkup}
            <input
              name={name}
              id={id}
              type={type}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              value={value}
              className={styles.Input}
              placeholder={placeholder}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={this.handleChange}
            />
            {rightAddonMarkup}
            {spinnerMarkup}
            <div className={styles.Backdrop} />
          </div>
        </Connected>
      </Labelled>
    );
  }

  private handleNumberChange(steps: number) {
    const {onChange, value, step = 1} = this.props;
    if (onChange == null) { return; }

    const numericValue = value ? Number.parseFloat(value) : 0;
    if (Number.isNaN(numericValue)) { return; }
    onChange(String(numericValue + (steps * step)));
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
