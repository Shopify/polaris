import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Icon} from '../../../../components';

import * as styles from './TextField.scss';

export interface Props {
  value: string;
  placeholder?: string;
  focused?: boolean;
  active?: boolean;
  onChange(value: string): void;
  onFocus?(): void;
  onBlur?(): void;
}

export default class TextField extends React.Component<Props, never> {
  private input: HTMLInputElement | null = null;

  componentDidMount() {
    const {input, props} = this;
    const {focused} = props;

    if (input && focused) {
      input.focus();
    }
  }

  componentDidUpdate({focused: wasFocused}: Props) {
    const {input} = this;

    if (input == null) {
      return;
    }

    const {focused} = this.props;
    const {focus, blur} = input;

    if (focused && !wasFocused) {
      focus();
    } else if (!focused && wasFocused) {
      blur();
    }
  }

  render() {
    const {value, focused, active, placeholder} = this.props;

    const clearMarkup = value !== '' && (
      <button
        type="button"
        aria-label="Clear"
        className={styles.Clear}
        onClick={this.handleClear}
      >
        <Icon source="circleCancel" />
      </button>
    );

    const className = classNames(
      styles.TextField,
      (focused || active) && styles.focused,
    );

    return (
      <div
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <input
          className={styles.Input}
          placeholder={placeholder}
          type="search"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          ref={this.setInput}
          value={value}
          onChange={this.handleChange}
          onKeyDown={preventDefault}
        />
        <span className={styles.Icon}>
          <Icon source="search" />
        </span>

        {clearMarkup}
        <div className={styles.Backdrop} />
      </div>
    );
  }

  @autobind
  private handleFocus() {
    const {onFocus} = this.props;

    if (onFocus) {
      onFocus();
    }
  }

  @autobind
  private handleBlur() {
    const {onBlur} = this.props;

    if (onBlur) {
      onBlur();
    }
  }

  @autobind
  private handleClear() {
    const {input, props} = this;
    const {onChange} = props;

    onChange('');

    if (input) {
      input.focus();
    }
  }

  @autobind
  private handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = this.props;
    onChange(currentTarget.value);
  }

  @autobind
  private setInput(node: HTMLInputElement | null) {
    this.input = node;
  }
}

function preventDefault(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}
