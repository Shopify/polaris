// @flow

import React, {Component} from 'react';

import Labelled from '../Labelled';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

import Connected from './Connected';
import styles from './Field.scss';

type Props = {
  leftAddon?: any,
  rightAddon?: any,
  placeholder?: string,
  value?: ?string,
  onChange: (value: ?string) => void,
  helpText?: string,
  label?: string,
  labelNote?: string,
  labelAction?: any,
  labelHidden?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
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
    onChange: noop,
    hasError: false,
    labelHidden: false,
    type: 'text',
  };

  state: State = {focused: false};
  props: Props;
  id: string;

  handleFocus = this.handleFocus.bind(this);
  handleBlur = this.handleBlur.bind(this);
  handleChange = this.handleChange.bind(this);

  constructor(props: Props, context: Object) {
    super(props, context);

    this.id = props.id || uniqueID();
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

  handleChange(event: {target: HTMLInputElement}) {
    this.props.onChange(event.target.value);
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
      disabled,
      readOnly,
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
          readOnly={readOnly}
          value={value || ''}
          className={styles.Input}
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        {this.renderRightAddon()}
      </div>
    );
  }

  render() {
    const {
      disabled,
      readOnly,
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
      readOnly,
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

function classNameForField({focused, disabled, readOnly, hasError, hasValue}) {
  return css([
    styles.Field,
    hasValue && styles.hasValue,
    focused && styles.focused,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
    hasError && styles.hasError,
  ]);
}

let index = 1;
function uniqueID() {
  return `Input${index++}`;
}
