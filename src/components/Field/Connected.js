// @flow

import React, {cloneElement, Component} from 'react';

import {css} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

import styles from './Field.scss';

type Props = {
  children?: any,
};

type State = {
  focused: number,
};

export default class Connected extends Component {
  state: State = {focused: 0};
  props: Props;
  handleFocus = this.handleFocus.bind(this);

  handleFocus(position: number) {
    this.setState({focused: position});
  }

  render() {
    const {children} = this.props;

    return (
      <div className={styles.ConnectedWrapper}>
        {elementChildren(children).map((child, index) => (
          <ConnectedItem
            position={index}
            onFocus={this.handleFocus}
            focused={index === this.state.focused}
            key={index}
          >
            {cloneWithHiddenLabel(child)}
          </ConnectedItem>
        ))}
      </div>
    );
  }
}

function cloneWithHiddenLabel(element) {
  const {type: {defaultProps, propTypes}} = element;
  if (
    (defaultProps == null || defaultProps.labelHidden == null) &&
    (propTypes == null || propTypes.labelHidden == null)
  ) { return element; }

  return cloneElement(element, {labelHidden: true});
}

type ItemProps = {
  focused: boolean,
  onFocus: (position: number) => void,
  position: number,
  children?: any,
};

class ConnectedItem extends Component {
  static defaultProps = {focused: false};
  props: ItemProps;
  handleFocus = this.handleFocus.bind(this);

  handleFocus() {
    this.props.onFocus(this.props.position);
  }

  render() {
    const {children, focused} = this.props;
    const isInput = (children != null) && (children.type === 'div');

    return (
      <div onFocus={this.handleFocus} className={classNameForConnectedItem({isInput, focused})}>{children}</div>
    );
  }
}

function classNameForConnectedItem({isInput, focused}) {
  return css([
    styles.ConnectedItem,
    focused && styles.focusedItem,
    isInput && styles.stretch,
  ]);
}
