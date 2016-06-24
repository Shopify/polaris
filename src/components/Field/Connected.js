import React, {cloneElement, Component, PropTypes} from 'react';
import styles from './Field.scss';

import {css} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

export default class Connected extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {focused: 0};

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

function ConnectedItem({children, onFocus, focused}) {
  const isInput = (children.type === 'div');

  return (
    <div onFocus={onFocus} className={classNameForConnectedItem({isInput, focused})}>{children}</div>
  );
}

ConnectedItem.propTypes = {
  focused: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  children: PropTypes.node,
};

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
