import React from 'react';
import {classNames} from '@shopify/css-utilities';
import styles from '../../ConnectedFilterControl.scss';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
  focused: boolean;
}

export default class Item extends React.PureComponent<Props, State> {
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
