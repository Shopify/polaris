import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {Checkbox} from '..';

import * as styles from './Option.scss';

export interface Props {
  id: string;
  label: string;
  value: string;
  section: number;
  index: number;
  disabled?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  onClick(section: number, option: number): void;
}

export interface State {
  focused: boolean;
}

export default class Option extends React.Component<Props, State> {
  state: State = {
    focused: false,
  };

  render() {
    const {label, value, id, select, allowMultiple, disabled} = this.props;
    const {focused} = this.state;

    const className = classNames(
      styles.SingleSelectOption,
      focused && styles.focused,
      disabled && styles.disabled,
      select && styles.select,
    );

    const optionMarkup = allowMultiple ? (
      <label htmlFor={id} className={styles.Label}>
        <div className={styles.Checkbox}>
          <Checkbox
            id={id}
            value={value}
            checked={select}
            disabled={disabled}
            onChange={this.handleClick}
          />
        </div>
        {label}
      </label>
    ) : (
      <button
        type="button"
        className={className}
        onClick={this.handleClick}
        disabled={disabled}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
      >
        {label}
      </button>
    );

    return (
      <li key={id} className={styles.Option} tabIndex={-1}>
        {optionMarkup}
      </li>
    );
  }

  @autobind
  private handleClick() {
    const {onClick, section, index, disabled} = this.props;

    if (disabled) {
      return;
    }

    onClick(section, index);
  }

  @autobind
  private toggleFocus() {
    this.setState({focused: !this.state.focused});
  }
}
