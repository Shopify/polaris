import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import styles from './index.css';

import EventListener from '../EventListener';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';
import {nodeContainsDescendant} from '../../utilities/dom';
import {getRectForNode, Rect} from '../../utilities/geometry';

export default class Popover extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    activator: PropTypes.instanceOf(HTMLElement),
    onCloseRequest: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onCloseRequest: noop,
  };

  constructor(props, context) {
    super(props, context);

    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMeasurement = this.handleMeasurement.bind(this);

    this.state = {
      needsMeasurement: true,
      popoverRect: Rect.zero,
      activatorRect: getRectForNode(props.activator),
    };
  }

  get node() {
    return findDOMNode(this);
  }

  handleMeasurement(node) {
    this.setState({
      needsMeasurement: false,
      popoverRect: getRectForNode(node),
      activatorRect: getRectForNode(this.props.activator),
    });
  }

  handleResize() {
    this.setState({
      activatorRect: getRectForNode(this.props.activator),
    });
  }

  handleClick({target}) {
    const {node, props: {activator, onCloseRequest}} = this;
    if (
      nodeContainsDescendant(node, target) ||
      nodeContainsDescendant(activator, target)
    ) { return; }
    onCloseRequest();
  }

  render() {
    const {needsMeasurement, popoverRect, activatorRect} = this.state;
    const {children, activator, active} = this.props;

    if (!active) { return null; }

    const containerRect = getRectForNode(activator.closest('[data-quilt-container]') || window);
    const position = calculatePosition({activatorRect, containerRect, popoverRect});
    const tipStyle = {left: activatorRect.center.x - position.left};

    return (
      <div
        style={position}
        className={classNameForPopover({needsMeasurement})}
        ref={this.handleMeasurement}
      >
        <EventListener event="click" handler={this.handleClick} />
        <EventListener event="resize" handler={this.handleResize} />

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

function calculatePosition({activatorRect, containerRect, popoverRect}) {
  const relativePosition = (activatorRect.center.x - containerRect.left) / containerRect.width;
  const relativeShift = popoverRect.width * relativePosition;
  const left = activatorRect.center.x - (
    relativePosition < 0.5
      ? Math.max(0.5 * activatorRect.width, relativeShift)
      : Math.min(popoverRect.width - (activatorRect.width / 2), relativeShift)
  );

  return {top: activatorRect.top + activatorRect.height, left};
}

function classNameForPopover({needsMeasurement}) {
  return css([
    styles.Popover,
    needsMeasurement && styles.calculating,
  ]);
}
