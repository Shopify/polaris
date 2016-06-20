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
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    onChange: noop,
    hasError: false,
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
    const {id, props: {label, labelNote, sideAction}} = this;

    return (
      <div className={styles.LabelWrapper}>
        <Label htmlFor={id} note={labelNote}>{label}</Label>
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
      type,
      name,
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

let index = 1;
function uniqueID() {
  return `Input${index++}`;
}
