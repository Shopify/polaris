// @flow

import React, {Component} from 'react';
import styles from './Field.scss';

import Labelled from '../Labelled';
import Connected from './Connected';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

type Props = {
  leftAddon?: any,
  rightAddon?: any,
  placeholder?: string,
  value: string,
  onChange: (event: Object) => void,
  helpText?: string,
  label?: string,
  labelNote?: string,
  labelAction?: any,
  labelHidden?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  hasError?: boolean,
  connectedRight?: any,
  connectedLeft?: any,
  type?: string,
  name?: string,
  id?: string,
};

type State = {
  focused: boolean,
};

export default class Field extends Component {
  static defaultProps = {
    value: '',
    onChange: noop,
    hasError: false,
    labelHidden: false,
    type: 'text',
  };

  state: State = {focused: false};
  props: Props;
  id: string;
  handleFocus: (event: Object) => void;
  handleBlur: (event: Object) => void;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.id = props.id || uniqueID();
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidReceiveProps(newProps: Props) {
    this.id = newProps.id || uniqueID();
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleBlur() {
    this.setState({focused: false});
  }

  get hasValue(): boolean {
    return Boolean(this.props.value);
  }

  get hasConnectionOnRight(): boolean {
    return Boolean(this.props.connectedRight);
  }

  get hasConnectionOnLeft(): boolean {
    return Boolean(this.props.connectedLeft);
  }

  renderLeftAddon() {
    const {leftAddon} = this.props;
    return leftAddon && <div className={styles.LeftAddon}>{leftAddon}</div>;
  }

  renderRightAddon() {
    const {rightAddon} = this.props;
    return rightAddon && <div className={styles.RightAddon}>{rightAddon}</div>;
  }

  renderHelpText() {
    const {helpText} = this.props;
    return helpText
      ? <p className={styles.HelpText}>{helpText}</p>
      : null;
  }

  renderInput() {
    const {
      value,
      placeholder,
      onChange,
      disabled,
      readonly,
      type,
      name,
    } = this.props;

    return (
      <div className={styles.InputWrapper}>
        {this.renderLeftAddon()}
        <input
          name={name}
          id={this.id}
          type={type}
          disabled={disabled}
          readonly={readonly}
          value={value}
          className={styles.Input}
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={onChange}
        />
        {this.renderRightAddon()}
      </div>
    );
  }

  render() {
    const {
      disabled,
      readonly,
      connectedRight,
      connectedLeft,
      hasError,
      label,
      labelNote,
      labelAction,
      labelHidden,
    } = this.props;

    const details = {
      disabled,
      readonly,
      hasError,
      hasValue: this.hasValue,
      focused: this.state.focused,
    };

    let fullInput = this.renderInput();

    if (this.hasConnectionOnRight || this.hasConnectionOnLeft) {
      fullInput = (
        <Connected>
          {connectedLeft}
          {fullInput}
          {connectedRight}
        </Connected>
      );
    }

    return (
      <div className={classNameForField(details)}>
        <Labelled
          label={label}
          id={this.id}
          note={labelNote}
          action={labelAction}
          labelHidden={labelHidden}
        >
          {fullInput}
        </Labelled>
        {this.renderHelpText()}
      </div>
    );
  }
}

function classNameForField({focused, disabled, readonly, hasError, hasValue}) {
  return css([
    styles.Field,
    hasValue && styles.hasValue,
    focused && styles.focused,
    disabled && styles.disabled,
    readonly && styles.readonly,
    hasError && styles.hasError,
  ]);
}

let index = 1;
function uniqueID() {
  return `Input${index++}`;
}
