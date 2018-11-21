import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Key} from '../../../../types';

import {noop} from '../../../../utilities/other';
import Icon from '../../../Icon';

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
  /** Callback when search field cancel button is clicked */
  onCancel?(): void;
}

export default class SearchField extends React.Component<Props, never> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  componentDidMount() {
    const {focused} = this.props;
    const {
      input: {current: input},
    } = this;

    if (input && focused) {
      input.focus();
    }
  }

  componentDidUpdate({focused: wasFocused}: Props) {
    const {
      input: {current: input},
    } = this;
    if (input == null) {
      return;
    }

    const {focused} = this.props;

    if (focused && !wasFocused) {
      input.focus();
    } else if (!focused && wasFocused) {
      input.blur();
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
          ref={this.input}
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
    const {onCancel = noop, onChange} = this.props;
    const {
      input: {current: input},
    } = this;

    onCancel();

    if (input != null) {
      input.value = '';
      onChange('');
      input.focus();
    }
  }

  @autobind
  private handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = this.props;
    onChange(currentTarget.value);
  }
}

function preventDefault(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === Key.Enter) {
    event.preventDefault();
  }
}
