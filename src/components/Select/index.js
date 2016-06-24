import React, {Component, PropTypes} from 'react';
import styles from './index.scss';

import Labelled from '../Labelled';

import {css} from '../../utilities/styles';

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
    labelNote: PropTypes.string,
    labelAction: PropTypes.node,
    labelHidden: PropTypes.bool,
    id: PropTypes.string,
  };

  static defaultProps = {
    options: [],
    labelHidden: false,
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
