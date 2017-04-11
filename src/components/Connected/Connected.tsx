import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Connected.scss';

export enum Position {
  Left,
  Primary,
  Right,
}

const {Children} = React;

export interface Props {
  left?: React.ReactNode,
  right?: React.ReactNode,
  children?: React.ReactNode,
}

export interface State {
  focused?: Position | null,
}

export default class Connected extends React.PureComponent<Props, State> {
  state: State = {focused: null};

  render() {
    const {children, left, right} = this.props;
    const {focused} = this.state;

    if (left == null && right == null) {
      return Children.only(children);
    }

    const leftConnection = left
      ? (
        <Item
          position={Position.Left}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          focused={focused === Position.Left}
        >
          {left}
        </Item>
      )
      : null;

    const rightConnection = right
      ? (
        <Item
          position={Position.Right}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          focused={focused === Position.Right}
        >
          {right}
        </Item>
      )
      : null;

    return (
      <div className={styles.Connected}>
        {leftConnection}
        <Item
          position={Position.Primary}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          focused={focused === Position.Primary}
        >
          {children}
        </Item>
        {rightConnection}
      </div>
    );
  }

  @autobind
  private handleFocus(position: Position) {
    this.setState({focused: position});
  }

  @autobind
  private handleBlur(position: Position) {
    if (position === this.state.focused) {
      this.setState({focused: null});
    }
  }
}

export interface ItemProps {
  focused: boolean,
  position: Position,
  children?: React.ReactNode,
  onBlur(position: Position): void,
  onFocus(position: Position): void,
};

function Item({children, focused, position, onBlur, onFocus}: ItemProps) {
  const className = classNames(
    styles.Item,
    focused && styles.focused,
    position === Position.Primary ? styles.primary : styles.connection,
  );

  return (
    <div
      onBlur={onBlur.bind(null, position)}
      onFocus={onFocus.bind(null, position)}
      className={className}
    >
      {children}
    </div>
  );
}
