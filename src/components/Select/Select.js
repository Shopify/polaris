// @flow

import React, {Component} from 'react';

import Labelled from '../Labelled';
import {css} from '../../utilities/styles';

import styles from './Select.scss';

type Props = {
  options: string[],
  label?: string,
  labelNote?: string,
  labelAction?: any,
  labelHidden?: boolean,
  id?: string,
};

type State = {
  focused: boolean,
};

export default class Select extends Component {
  static defaultProps = {
    options: [],
    labelHidden: false,
  };

  state: State = {focused: false};
  props: Props;
  id: string;
  handleFocus: () => void;
  handleBlur: () => void;

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

  render() {
    const {options, labelNote, labelHidden, labelAction, label} = this.props;

    return (
      <div className={classNameForSelect({focused: this.state.focused})}>
        <Labelled label={label} note={labelNote} action={labelAction} id={this.id} labelHidden={labelHidden}>
          <div className={styles.InputWrapper}>
            <select
              className={styles.Input}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              id={this.id}
            >
              {options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
        </Labelled>
      </div>
    );
  }
}

function classNameForSelect({focused}) {
  return css([
    styles.Select,
    focused && styles.focused,
  ]);
}

let id = 1;
function uniqueID() {
  return `Select${id++}`;
}
