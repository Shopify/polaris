import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import EventListener from '../../../EventListener';
import * as styles from '../../ColorPicker.scss';

export interface Position {
  x: number;
  y: number;
}

export interface State {
  dragging: boolean;
}

export interface Props {
  draggerX?: number;
  draggerY?: number;
  onChange(position: Position): void;
  onDraggerHeight?(height: number): void;
}

export default class Slidable extends React.PureComponent<Props, State> {
  state: State = {
    dragging: false,
  };

  private node: HTMLElement | null = null;
  private draggerNode: HTMLElement | null = null;

  componentDidMount() {
    const {onDraggerHeight} = this.props;
    if (onDraggerHeight == null) {
      return;
    }

    const {draggerNode} = this;
    if (draggerNode == null) {
      return;
    }

    onDraggerHeight(draggerNode.clientWidth);

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        onDraggerHeight(draggerNode.clientWidth);
      }, 0);
    }
  }

  render() {
    const {dragging} = this.state;
    const {draggerX = 0, draggerY = 0} = this.props;

    const draggerPositioning = {
      transform: `translate3d(${draggerX}px, ${draggerY}px, 0)`,
    };

    const moveListener = dragging ? (
      <EventListener event="mousemove" handler={this.handleMove} />
    ) : null;

    const touchMoveListener = dragging ? (
      <EventListener event="touchmove" handler={this.handleMove} />
    ) : null;

    const endDragListener = dragging ? (
      <EventListener event="mouseup" handler={this.handleDragEnd} />
    ) : null;

    const touchEndListener = dragging ? (
      <EventListener event="touchend" handler={this.handleDragEnd} />
    ) : null;

    const touchCancelListener = dragging ? (
      <EventListener event="touchcancel" handler={this.handleDragEnd} />
    ) : null;

    return (
      <div
        ref={this.setNode}
        className={styles.Slidable}
        onMouseDown={this.startDrag}
        onTouchStart={this.startDrag}
      >
        {endDragListener}
        {moveListener}
        {touchMoveListener}
        {touchEndListener}
        {touchCancelListener}
        <div
          style={draggerPositioning}
          className={styles.Dragger}
          ref={this.setDraggerNode}
        />
      </div>
    );
  }

  @autobind
  private setDraggerNode(node: HTMLElement | null) {
    this.draggerNode = node;
  }

  @autobind
  private setNode(node: HTMLElement | null) {
    this.node = node;
  }

  @autobind
  private startDrag(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) {
    if (event.type === 'mousedown') {
      const mouseEvent = event as React.MouseEvent<HTMLDivElement>;
      this.handleDraggerMove(mouseEvent.clientX, mouseEvent.clientY);
    }

    this.setState({dragging: true});
  }

  @autobind
  private handleDragEnd() {
    this.setState({dragging: false});
  }

  @autobind
  private handleMove(event: MouseEvent | TouchEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    if (event.type === 'mousemove') {
      const mouseEvent = event as MouseEvent;
      this.handleDraggerMove(mouseEvent.clientX, mouseEvent.clientY);
      return;
    }

    const touchEvent = event as TouchEvent;
    this.handleDraggerMove(
      touchEvent.touches[0].clientX,
      touchEvent.touches[0].clientY,
    );
  }

  @autobind
  private handleDraggerMove(x: number, y: number) {
    if (this.node == null) {
      return;
    }

    const {onChange} = this.props;

    const rect = this.node.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
    onChange({x: offsetX, y: offsetY});
  }
}
