import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Icon} from '../../../../components';

import * as styles from './SearchField.scss';

export interface Props {
  /** Initial value for the input */
  value: string;
  /** Hint text to display */
  placeholder?: string;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Force a state where search is active but the text field component is not focused */
  active?: boolean;
  /** Callback when value is changed */
  onChange(value: string): void;
  /** Callback when input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export default class SearchField extends React.Component<Props, never> {
  private input: HTMLInputElement | null = null;

  componentDidMount() {
    const {focused} = this.props;

    if (this.input && focused) {
      this.input.focus();
    }
  }

  componentDidUpdate({focused: wasFocused}: Props) {
    if (this.input == null) {
      return;
    }

    const {focused} = this.props;

    if (focused && !wasFocused) {
      this.input.focus();
    } else if (!focused && wasFocused) {
      this.input.blur();
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
      styles.SearchField,
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
    const {onChange} = this.props;

    onChange('');

    if (this.input) {
      this.input.focus();
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
