import React, {PureComponent} from 'react';

import {classNames} from '../../../../../../utilities/css';
import styles from '../../ConnectedFilterControl.scss';

interface ItemProps {
  children?: React.ReactNode;
}

interface State {
  focused: boolean;
}

export class Item extends PureComponent<ItemProps, State> {
  state: State = {focused: false};

  render() {
    const {focused} = this.state;
    const {children} = this.props;
    const className = classNames(
      styles.Item,
      focused && styles['Item-focused'],
    );

    return (
      <div
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        className={className}
      >
        {children}
      </div>
    );
  }

  private handleBlur = () => {
    this.setState({focused: false});
  };

  private handleFocus = () => {
    this.setState({focused: true});
  };
}
