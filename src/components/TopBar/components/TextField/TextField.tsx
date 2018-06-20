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
    if (this.input && this.props.focused) {
      this.input.focus();
    }
  }

  componentDidUpdate({focused: wasFocused}: Props) {
    if (this.input == null) {
      return;
    }

    if (this.props.focused && !wasFocused) {
      this.input.focus();
    } else if (!this.props.focused && wasFocused) {
      this.input.blur();
    }
  }

  render() {
    const {value, focused, active, placeholder} = this.props;

    const clearMarkup =
      value === '' ? null : (
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
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  @autobind
  private handleBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  @autobind
  private handleClear() {
    this.props.onChange('');

    if (this.input) {
      this.input.focus();
    }
  }

  @autobind
  private handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(currentTarget.value);
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
