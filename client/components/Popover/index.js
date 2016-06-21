import React, {Component, PropTypes, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import Popover from './Popover';
import {layeredComponent} from '../../utilities';

class PopoverContainer extends Component {
  static propTypes = {
    activator: PropTypes.node,
    children: PropTypes.node,
  };

  static defaultProps = {};

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  state = {active: false};

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
      <Layer
        activator={this.activatorNode}
        active={this.state.active}
        onCloseRequest={this.handleOutsideClick}
      >
        {this.props.children}
      </Layer>
    );
  }

  render() {
    return cloneElement(this.props.activator, {
      onPress: this.handleClick,
    });
  }
}

export default layeredComponent({idPrefix: 'Popover'})(PopoverContainer);
