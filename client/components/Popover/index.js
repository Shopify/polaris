import React, {Component, PropTypes, cloneElement} from 'react';
import {render, unmountComponentAtNode, findDOMNode} from 'react-dom';
import styles from './index.css';
import {css} from '../../utilities';
import {getRectForNode, Rect} from '../../utilities/geometry';

export default class Popover extends Component {
  static propTypes = {
    activator: PropTypes.node,
    children: PropTypes.node,
  };

  static defaultProps = {};

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleReposition = this.handleReposition.bind(this);
  }

  state = {active: false};

  componentWillMount() {
    const node = document.createElement('div');
    node.id = uniqueID();
    this.popoverContainerNode = node;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleReposition);
    document.body.appendChild(this.popoverContainerNode);
    this.renderPopover();
  }

  componentDidUpdate() {
    this.renderPopover();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleReposition);

    const {popoverContainerNode} = this;
    const {parent} = popoverContainerNode;

    unmountComponentAtNode(popoverContainerNode);
    if (parent) { parent.removeChild(popoverContainerNode); }
  }

  get activatorNode() {
    return findDOMNode(this);
  }

  handleClick() {
    this.setState({active: !this.state.active});
  }

  handleReposition() {
    this.renderPopover();
  }

  renderPopover() {
    render((
      <PopoverContainer activator={this.activatorNode} active={this.state.active}>
        {this.props.children}
      </PopoverContainer>
    ), this.popoverContainerNode);
  }

  render() {
    return cloneElement(this.props.activator, {
      onPress: this.handleClick,
    });
  }
}

class PopoverContainer extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    activator: PropTypes.instanceOf(HTMLElement),
  };

  static defaultProps = {
    active: false,
  };

  state = {
    needsMeasurement: true,
    popoverRect: Rect.zero,
  };

  performMeasurement = (node) => {
    this.setState({
      needsMeasurement: false,
      popoverRect: getRectForNode(node),
    });
  };

  render() {
    const {needsMeasurement, popoverRect} = this.state;
    const {children, activator, active} = this.props;

    if (!active) { return null; }

    const activatorRect = getRectForNode(activator);
    const parent = activator.closest('[data-quilt-container]') || window;
    const parentRect = getRectForNode(parent);
    const relativePosition = (activatorRect.center.x - parentRect.left) / parentRect.width;

    const style = {
      top: activatorRect.top + activatorRect.height,
      left: activatorRect.center.x - (popoverRect.width * relativePosition),
    };

    const tipStyle = {
      left: popoverRect.width * relativePosition,
    };

    return (
      <div style={style} className={classNameForPopover({needsMeasurement})} ref={this.performMeasurement}>
        <div style={tipStyle} className={styles.Tip} />
        <div className={styles.Wrapper}>
          <div className={styles.Content}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

function classNameForPopover({needsMeasurement}) {
  return css([
    styles.Popover,
    needsMeasurement && styles.calculating,
  ]);
}

let id = 1;
function uniqueID() {
  return `Popover${id++}`;
}
