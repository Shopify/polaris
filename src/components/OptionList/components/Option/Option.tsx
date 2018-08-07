import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {Checkbox} from '..';
import {Scrollable} from '../../..';

import * as styles from './Option.scss';

export interface Props {
  id: string;
  label: string;
  value: string;
  section: number;
  index: number;
  disabled?: boolean;
  active?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  role?: string;
  onClick(section: number, option: number): void;
}

export interface State {
  focused: boolean;
  active: boolean;
}

export default class Option extends React.Component<Props, State> {
  state: State = {
    focused: false,
    active: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.active !== this.props.active &&
      nextProps.active !== this.state.active
    ) {
      nextProps.active
        ? this.setState({active: true})
        : this.setState({active: false});
    }
  }

  render() {
    const {
      label,
      value,
      id,
      select,
      active,
      allowMultiple,
      disabled,
      role,
    } = this.props;
    const {focused} = this.state;

    const singleSelectClassName = classNames(
      styles.SingleSelectOption,
      focused && styles.focused,
      disabled && styles.disabled,
      select && styles.select,
      active && styles.active,
    );

    const multiSelectClassName = classNames(
      styles.Label,
      active && styles.active,
    );

    const checkBoxRole = role === 'option' ? 'presentation' : undefined;

    const optionMarkup = allowMultiple ? (
      <label htmlFor={id} className={multiSelectClassName}>
        <div className={styles.Checkbox}>
          <Checkbox
            id={id}
            value={value}
            checked={select}
            active={active}
            disabled={disabled}
            onChange={this.handleClick}
            role={checkBoxRole}
          />
        </div>
        {label}
      </label>
    ) : (
      <button
        type="button"
        className={singleSelectClassName}
        onClick={this.handleClick}
        disabled={disabled}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
      >
        {label}
      </button>
    );

    const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

    return (
      <li
        key={id}
        className={styles.Option}
        tabIndex={-1}
        aria-selected={active}
        role={role}
      >
        {scrollMarkup}
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
