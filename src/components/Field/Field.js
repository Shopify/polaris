import React, {Component, PropTypes} from 'react';
import styles from './Field.scss';

import Labelled from '../Labelled';
import Connected from './Connected';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

export default class Field extends Component {
  static propTypes = {
    leftAddon: PropTypes.node,
    rightAddon: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    helpText: PropTypes.string,
    label: PropTypes.string,
    labelNote: PropTypes.string,
    labelAction: PropTypes.node,
    labelHidden: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    hasError: PropTypes.bool,
    connectedRight: PropTypes.node,
    connectedLeft: PropTypes.node,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    onChange: noop,
    hasError: false,
    labelHidden: false,
    type: 'text',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {focused: false};
    this.id = props.id || uniqueID();
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidReceiveProps(newProps) {
    this.id = newProps.id || uniqueID();
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleBlur() {
    this.setState({focused: false});
  }

  get hasValue() {
    return Boolean(this.props.value);
  }

  get hasConnectionOnRight() {
    return Boolean(this.props.connectedRight);
  }

  get hasConnectionOnLeft() {
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
