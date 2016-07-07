// @flow

import React, {cloneElement, Component} from 'react';
import styles from './Field.scss';

import {css} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

type Props = {
  children?: any,
};

type State = {
  focused: number,
};

export default class Connected extends Component {
  state: State = {focused: 0};
  props: Props;

  render() {
    const {children} = this.props;

    return (
      <div className={styles.ConnectedWrapper}>
        {elementChildren(children).map((child, index) => (
          <ConnectedItem
            onFocus={() => this.setState({focused: index})}
            focused={index === this.state.focused}
            key={index}
          >
            {cloneElement(child, {labelHidden: true})}
          </ConnectedItem>
        ))}
      </div>
    );
  }
}

type ItemProps = {
  focused: boolean,
  onFocus: (event: Object) => void,
  children?: any,
};

function ConnectedItem({children, onFocus, focused}: ItemProps) {
  const isInput = (children != null) && (children.type === 'div');

  return (
    <div onFocus={onFocus} className={classNameForConnectedItem({isInput, focused})}>{children}</div>
  );
}

ConnectedItem.defaultProps = {
  focused: false,
};

function classNameForConnectedItem({isInput, focused}) {
  return css([
    styles.ConnectedItem,
    focused && styles.focusedItem,
    isInput && styles.stretch,
  ]);
}
