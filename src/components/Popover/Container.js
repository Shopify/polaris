// @flow

import React, {Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import {layeredComponent} from '@shopify/react-utilities/components';

import Popover from './Popover';

type Props = {
  activator: React$Element<*>,
  children?: any,
};

type State = {
  active: boolean,
};

class PopoverContainer extends Component {
  static defaultProps = {};

  props: Props;
  state: State = {active: false};
  handleClick = this.handleClick.bind(this);
  handleOutsideClick = this.handleOutsideClick.bind(this);

  get activatorNode() {
    return findDOMNode(this);
  }

  handleClick() {
    this.setState({active: !this.state.active});
  }

  handleOutsideClick() {
    this.setState({active: false});
  }

  renderLayer() {
    return (
      <Popover
        activator={this.activatorNode}
        active={this.state.active}
        onCloseRequest={this.handleOutsideClick}
      >
        {this.props.children}
      </Popover>
    );
  }

  render() {
    return cloneElement(this.props.activator, {
      onClick: this.handleClick,
    });
  }
}

export default layeredComponent({idPrefix: 'Popover'})(PopoverContainer);
