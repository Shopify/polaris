import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Connected.scss';

export enum Position {
  Left,
  Primary,
  Right,
}

export interface Props {
  position: Position;
  children?: React.ReactNode;
}

export interface State {
  focused: boolean;
}

export default class Item extends React.PureComponent<Props, State> {
  state: State = {focused: false};

  render() {
    const {focused} = this.state;
    const {children, position} = this.props;
    const className = classNames(
      styles.Item,
      focused && styles['Item-focused'],
      position === Position.Primary
        ? styles['Item-primary']
        : styles['Item-connection'],
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

  @autobind
  private handleBlur() {
    this.setState({focused: false});
  }

  @autobind
  private handleFocus() {
    this.setState({focused: true});
  }
}
