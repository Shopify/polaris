import React, {cloneElement, isValidElement, Component, PropTypes, Children} from 'react';
import styles from './index.css';

import {css} from '../../utilities/styles';

export default class Connected extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {focused: 0};

  render() {
    const {children} = this.props;

    return (
      <div className={styles.ConnectedWrapper}>
        {Children.toArray(children).filter(isValidElement).map((child, index) => (
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
