import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {getRectForNode, Rect} from '@shopify/javascript-utilities/geometry';
import {closest} from '@shopify/javascript-utilities/dom';

import EventListener from '../EventListener';
import Scrollable from '../Scrollable';
import {layer} from '../shared';

import {
  PreferredPosition,
  PreferredAlignment,
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
} from './math';

import * as styles from './PositionedOverlay.scss';

export {PreferredPosition, PreferredAlignment};
export type Positioning = 'above' | 'below';

export interface OverlayDetails {
  left: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  activatorRect: Rect;
}

export interface Props {
  active: boolean;
  activator: HTMLElement;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  fullWidth?: boolean;
  render(overlayDetails: OverlayDetails): React.ReactNode;
  onScrollOut?(): void;
}

export interface State {
  measuring: boolean;
  activatorRect: Rect;
  left: number;
  top: number;
  height: number;
  width: number | null;
  positioning: Positioning;
  zIndex: number | null;
  outsideScrollableContainer: boolean;
}

export default class PositionedOverlay extends React.PureComponent<
  Props,
  State
> {
  state: State = {
    measuring: true,
    activatorRect: getRectForNode(this.props.activator),
    left: 0,
    top: 0,
    height: 0,
    width: null,
    positioning: 'below',
    zIndex: null,
    outsideScrollableContainer: false,
  };

  private overlay: HTMLElement | null;
  private scrollableContainer: HTMLElement | Document | null;

  componentDidMount() {
    this.scrollableContainer = Scrollable.forNode(this.props.activator);
    if (this.scrollableContainer) {
      this.scrollableContainer.addEventListener(
        'scroll',
        this.handleMeasurement,
      );
    }
    this.handleMeasurement();
  }

  componentWillUnmount() {
    if (this.scrollableContainer) {
      this.scrollableContainer.removeEventListener(
        'scroll',
        this.handleMeasurement,
      );
    }
  }

  componentWillReceiveProps() {
    this.handleMeasurement();
  }

  componentDidUpdate() {
    const {outsideScrollableContainer, top} = this.state;
    const {onScrollOut, active} = this.props;

    if (
      active &&
      onScrollOut != null &&
      top !== 0 &&
      outsideScrollableContainer
    ) {
      onScrollOut();
    }
  }

  render() {
    const {left, top, zIndex, width} = this.state;
    const {render} = this.props;

    const style = {
      top: top || undefined,
      left: left || undefined,
      width: width || undefined,
      zIndex: zIndex == null ? undefined : zIndex,
    };

    return (
      <div
        className={styles.PositionedOverlay}
        style={style}
        ref={this.setOverlay}
      >
        <EventListener event="resize" handler={this.handleMeasurement} />
        {render(this.overlayDetails())}
      </div>
    );
  }

  @autobind
  private overlayDetails(): OverlayDetails {
    const {measuring, left, positioning, height, activatorRect} = this.state;

    return {
      measuring,
      left,
      desiredHeight: height,
      positioning,
      activatorRect,
    };
  }

  @autobind
  private setOverlay(node: HTMLElement | null) {
    this.overlay = node;
  }

  @autobind
  private handleMeasurement() {
    this.setState(
      {
        left: 0,
        top: 0,
        height: 0,
        positioning: 'below',
        measuring: true,
      },
      () => {
        if (this.overlay == null || this.scrollableContainer == null) {
          return;
        }
        const {
          activator,
          preferredPosition = 'below',
          preferredAlignment = 'center',
          onScrollOut,
          fullWidth,
        } = this.props;

        const activatorRect = getRectForNode(activator);
        const currentOverlayRect = getRectForNode(this.overlay);
        const scrollableElement = isDocument(this.scrollableContainer)
          ? document.body
          : this.scrollableContainer;
        const scrollableContainerRect = getRectForNode(scrollableElement);

        const overlayRect = fullWidth
          ? {...currentOverlayRect, width: activatorRect.width}
          : currentOverlayRect;

        // If `body` is 100% height, it still acts as though it were not constrained
        // to that size. This adjusts for that.
        if (scrollableElement === document.body) {
          scrollableContainerRect.height = document.body.scrollHeight;
        }

        const overlayMargins = this.overlay.firstElementChild
          ? getMarginsForNode(this.overlay.firstElementChild as HTMLElement)
          : {activator: 0, container: 0, horizontal: 0};
        const containerRect = windowRect();
        const zIndexForLayer = getZIndexForLayerFromNode(activator);
        const zIndex =
          zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
        const verticalPosition = calculateVerticalPosition(
          activatorRect,
          overlayRect,
          overlayMargins,
          scrollableContainerRect,
          containerRect,
          preferredPosition,
        );
        const horizontalPosition = calculateHorizontalPosition(
          activatorRect,
          overlayRect,
          containerRect,
          overlayMargins,
          preferredAlignment,
        );

        this.setState({
          measuring: false,
          activatorRect: getRectForNode(activator),
          left: horizontalPosition,
          top: verticalPosition.top,
          height: verticalPosition.height || 0,
          width: fullWidth ? overlayRect.width : null,
          positioning: verticalPosition.positioning as Positioning,
          outsideScrollableContainer:
            onScrollOut != null &&
            rectIsOutsideOfRect(
              activatorRect,
              intersectionWithViewport(scrollableContainerRect),
            ),
          zIndex,
        });
      },
    );
  }
}

function intersectionWithViewport(rect: Rect) {
  const viewport = windowRect();

  return new Rect({
    top: Math.max(rect.top, 0),
    left: Math.max(rect.left, 0),
    height: Math.min(
      rect.height - rect.top + viewport.top,
      viewport.height,
      viewport.height - rect.top,
    ),
    width: Math.min(
      rect.width - rect.left + viewport.left,
      viewport.width,
      viewport.width - rect.left,
    ),
  });
}

function getMarginsForNode(node: HTMLElement) {
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || ''),
    container: parseFloat(nodeStyles.marginBottom || ''),
    horizontal: parseFloat(nodeStyles.marginLeft || ''),
  };
}

function getZIndexForLayerFromNode(node: HTMLElement) {
  const layerNode = closest(node, layer.selector) || document.body;
  const zIndex = parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return isNaN(zIndex) ? null : zIndex;
}

function windowRect() {
  return new Rect({
    top: window.scrollY,
    left: window.scrollX,
    height: window.innerHeight,
    width: window.innerWidth,
  });
}

function isDocument(node: HTMLElement | Document): node is Document {
  return node === document;
}
