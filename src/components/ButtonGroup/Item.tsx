import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';
import {Props as ButtonProps} from '../Button';
import * as styles from './ButtonGroup.scss';

export interface Props {
  button: React.ReactElement<ButtonProps>,
}

export interface State {
  focused: boolean,
}

export default class Item extends React.PureComponent<Props, State> {
  state: State = {focused: false};

  render() {
    const {button} = this.props;
    const {focused} = this.state;

    const className = classNames(
      styles.Item,
      focused && styles['Item-focused'],
      button.props.plain && styles['Item-plain'],
    );

    return (
      <div
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {button}
      </div>
    );
  }

  @autobind
  private handleFocus() {
    this.setState({focused: true});
  }

  @autobind
  private handleBlur() {
    this.setState({focused: false});
  }
}
