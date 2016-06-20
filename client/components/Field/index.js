import React, {Component, PropTypes} from 'react';
import styles from './index.css';
import Label from './Label';
import {css, noop} from '../../utilities';

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
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    hasError: PropTypes.bool,
    sideAction: PropTypes.node,
  };

  static defaultProps = {
    value: '',
    onChange: noop,
    hasError: false,
  };

  constructor(...args) {
    super(...args);

    this.state = {focused: false};
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  renderLeftAddon() {
    const {props: {leftAddon}, hasValue} = this;
    return leftAddon
      ? <div className={classNameForLeftAddon({hasValue})}>{leftAddon}</div>
      : null;
  }

  renderRightAddon() {
    const {props: {rightAddon}, hasValue} = this;
    return rightAddon
      ? <div className={classNameForRightAddon({hasValue})}>{rightAddon}</div>
      : null;
  }

  renderHelpText() {
    const {helpText} = this.props;
    return helpText
      ? <p className={styles.HelpText}>{helpText}</p>
      : null;
  }

  renderLabel() {
    const {label, labelNote, sideAction} = this.props;

    return (
      <div className={styles.LabelWrapper}>
        <Label note={labelNote}>{label}</Label>
        {sideAction}
      </div>
    );
  }

  render() {
    const {
      value,
      placeholder,
      onChange,
      disabled,
      readonly,
      hasError,
    } = this.props;

    const details = {
      disabled,
      readonly,
      hasError,
      focused: this.state.focused,
    };

    return (
      <div className={classNameForField(details)}>
        {this.renderLabel()}

        <div className={styles.InputWrapper}>
          {this.renderLeftAddon()}
          <input
            name="name"
            type="text"
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

        {this.renderHelpText()}
      </div>
    );
  }
}

function classNameForLeftAddon({hasValue}) {
  return css([
    styles.LeftAddon,
    hasValue && styles.hasValue,
  ]);
}

function classNameForRightAddon({hasValue}) {
  return css([
    styles.RightAddon,
    hasValue && styles.hasValue,
  ]);
}

function classNameForField({focused, disabled, readonly, hasError}) {
  return css([
    styles.Field,
    focused && styles.focused,
    disabled && styles.disabled,
    readonly && styles.readonly,
    hasError && styles.hasError,
  ]);
}
