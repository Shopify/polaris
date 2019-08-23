import React from 'react';

import {classNames} from '../../../../utilities/css';
import {Props as ButtonProps} from '../../../Button';

import styles from '../../ButtonGroup.scss';

export interface ItemProps {
  button: React.ReactElement<ButtonProps>;
}

interface State {
  focused: boolean;
}

export class Item extends React.PureComponent<ItemProps, State> {
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

  private handleFocus = () => {
    this.setState({focused: true});
  };

  private handleBlur = () => {
    this.setState({focused: false});
  };
}
