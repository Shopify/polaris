// @flow

import React, {Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';

import Popover from './Popover';

import {layeredComponent} from '../../utilities/react';

type Props = {
  activator: React.Element,
  children?: any,
}

type State = {
  active: boolean,
};

class PopoverContainer extends Component {
  static defaultProps = {};

  props: Props;
  state: State = {active: false};
  handleClick: (event: Object) => void;
  handleOutsideClick: (event: Object) => void;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

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
