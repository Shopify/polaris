import React, {PureComponent} from 'react';

import {classNames} from '../../utilities/css';
import {getRectForNode, Rect} from '../../utilities/geometry';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import {layer, dataPolarisTopBar} from '../shared';

import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
  intersectionWithViewport,
  windowRect,
} from './utilities/math';
import type {PreferredPosition, PreferredAlignment} from './utilities/math';
import styles from './PositionedOverlay.module.scss';

type Positioning = 'above' | 'below' | 'left' | 'right';

interface OverlayDetails {
  left?: number;
  right?: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  activatorRect: Rect;
  chevronOffset: number;
}

export interface PositionedOverlayProps {
  active: boolean;
  activator: HTMLElement;
  preferInputActivator?: boolean;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  fullWidth?: boolean;
  fixed?: boolean;
  preventInteraction?: boolean;
  classNames?: string;
  zIndexOverride?: number;
  transform?: string;
  render(overlayDetails: OverlayDetails): React.ReactNode;
  onScrollOut?(): void;
}

interface State {
  measuring: boolean;
  activatorRect: Rect;
  left?: number;
  right?: number;
  top: number;
  height: number;
  width: number | null;
  positioning: Positioning;
  zIndex: number | null;
  outsideScrollableContainer: boolean;
  lockPosition: boolean;
  chevronOffset: number;
}

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  // attributeFilter: ['style'],
};

export class PositionedOverlay extends PureComponent<
  PositionedOverlayProps,
  State
> {
  state: State = {
    measuring: true,
    activatorRect: getRectForNode(this.props.activator),
    right: undefined,
    left: undefined,
    top: 0,
    height: 0,
    width: null,
    positioning: 'below',
    zIndex: null,
    outsideScrollableContainer: false,
    lockPosition: false,
    chevronOffset: 0,
  };

  private overlay: HTMLElement | null = null;
  private scrollableContainers: (HTMLElement | Document)[] = [];
  private observer: MutationObserver;

  constructor(props: PositionedOverlayProps) {
    super(props);

    this.observer = new MutationObserver(this.handleMeasurement);
  }

  componentDidMount() {
    this.setScrollableContainers();

    if (this.scrollableContainers.length && !this.props.fixed) {
      this.registerScrollHandlers();
    }

    this.handleMeasurement();
  }

  componentWillUnmount() {
    this.observer.disconnect();

    if (this.scrollableContainers.length && !this.props.fixed) {
      this.unregisterScrollHandlers();
    }
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
    const {left, right, top, zIndex, width} = this.state;
    const {
      render,
      fixed,
      preventInteraction,
      classNames: propClassNames,
      zIndexOverride,
      transform,
    } = this.props;

    const style = {
      transform,
      top: top == null || isNaN(top) ? undefined : top,
      left: left == null || isNaN(left) ? undefined : left,
      right: right == null || isNaN(right) ? undefined : right,
      width: width == null || isNaN(width) ? undefined : width,
      zIndex: zIndexOverride || zIndex || undefined,
    };

    const className = classNames(
      styles.PositionedOverlay,
      fixed && styles.fixed,
      preventInteraction && styles.preventInteraction,
      propClassNames,
    );

    return (
      <div className={className} style={style} ref={this.setOverlay}>
        <EventListener event="resize" handler={this.handleMeasurement} />
        {render(this.overlayDetails())}
      </div>
    );
  }

  get firstScrollableContainer(): HTMLElement | Document | null {
    return this.scrollableContainers[0] ?? null;
  }

  forceUpdatePosition() {
    // Wait a single animation frame before re-measuring.
    // Consumer's may also need to setup their own timers for
    // triggering forceUpdatePosition() `children` use animation.
    // Ideally, forceUpdatePosition() is fired at the end of a transition event.
    requestAnimationFrame(this.handleMeasurement);
  }

  private overlayDetails = (): OverlayDetails => {
    const {
      measuring,
      left,
      right,
      positioning,
      height,
      activatorRect,
      chevronOffset,
    } = this.state;

    return {
      measuring,
      left,
      right,
      desiredHeight: height,
      positioning,
      activatorRect,
      chevronOffset,
    };
  };

  private setOverlay = (node: HTMLElement | null) => {
    this.overlay = node;
  };

  private isScrollContainer = (node: HTMLElement) => {
    const yOverflow = node.scrollHeight > node.clientHeight;
    const xOverflow = node.scrollWidth > node.clientWidth;

    if (!yOverflow && !xOverflow) {
      return false;
    }

    const styles = window.getComputedStyle(node);
    const yScroll =
      styles.overflowY === 'auto' || styles.overflowY === 'scroll';
    const xScroll =
      styles.overflowX === 'auto' || styles.overflowX === 'scroll';

    if ((yOverflow && yScroll) || (xOverflow && xScroll)) {
      return true;
    }

    return false;
  };

  private setScrollableContainers = () => {
    const containers: (HTMLElement | Document)[] = [];
    let currentNode: HTMLElement | ParentNode | null = this.props.activator;

    while (currentNode !== null) {
      if (
        currentNode instanceof HTMLElement &&
        this.isScrollContainer(currentNode)
      ) {
        containers.push(currentNode);
      }

      currentNode = currentNode.parentNode;
    }

    if (!containers.length) {
      containers.push(document);
    }

    this.scrollableContainers = containers;
  };

  private registerScrollHandlers = () => {
    this.scrollableContainers.forEach((node) => {
      node.addEventListener('scroll', this.handleMeasurement);
    });
  };

  private unregisterScrollHandlers = () => {
    this.scrollableContainers.forEach((node) => {
      node.removeEventListener('scroll', this.handleMeasurement);
    });
  };

  private handleMeasurement = () => {
    const {lockPosition, top} = this.state;

    this.observer.disconnect();

    this.setState(
      ({left, top, right}) => ({
        left,
        right,
        top,
        height: 0,
        positioning: 'below',
        measuring: true,
      }),
      () => {
        if (this.overlay == null || this.firstScrollableContainer == null) {
          return;
        }

        const {
          activator,
          preferredPosition = 'below',
          preferredAlignment = 'center',
          onScrollOut,
          fullWidth,
          fixed,
          preferInputActivator = true,
        } = this.props;

        const preferredActivator = preferInputActivator
          ? activator.querySelector('input') || activator
          : activator;

        const activatorRect = getRectForNode(preferredActivator);

        const currentOverlayRect = getRectForNode(this.overlay);
        const scrollableElement = isDocument(this.firstScrollableContainer)
          ? document.body
          : this.firstScrollableContainer;
        const scrollableContainerRect = getRectForNode(scrollableElement);

        const overlayRect = fullWidth
          ? new Rect({...currentOverlayRect, width: activatorRect.width})
          : currentOverlayRect;
        // : getRectForNode(this.overlay.firstElementChild);

        // If `body` is 100% height, it still acts as though it were not constrained to that size. This adjusts for that.
        if (scrollableElement === document.body) {
          scrollableContainerRect.height = document.body.scrollHeight;
        }

        let topBarOffset = 0;
        const topBarElement = scrollableElement.querySelector(
          `${dataPolarisTopBar.selector}`,
        );
        if (topBarElement) {
          topBarOffset = topBarElement.clientHeight;
        }

        const overlayMargins =
          this.overlay.firstElementChild &&
          this.overlay.firstChild instanceof HTMLElement
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
          fixed,
          topBarOffset,
        );

        const positionHorizontal =
          preferredPosition === 'left' || preferredPosition === 'right';

        const horizontalPosition = calculateHorizontalPosition(
          activatorRect,
          overlayRect,
          containerRect,
          overlayMargins,
          preferredAlignment,
          scrollableContainerRect,
          positionHorizontal ? preferredPosition : undefined,
        );

        const chevronOffset =
          activatorRect.center.x -
          horizontalPosition.position +
          overlayMargins.horizontal * 2;

        let width = null;

        if (fullWidth) width = overlayRect.width;
        else if (positionHorizontal) width = horizontalPosition.width;

        this.setState(
          {
            measuring: false,
            activatorRect: getRectForNode(activator),
            left:
              preferredAlignment !== 'right' || preferredPosition === 'left'
                ? horizontalPosition.position
                : undefined,
            right:
              preferredAlignment === 'right' || preferredPosition === 'right'
                ? horizontalPosition.position
                : undefined,
            top: lockPosition ? top : verticalPosition.top,
            lockPosition: Boolean(fixed),
            height: verticalPosition.height || 0,
            width,
            positioning: verticalPosition.positioning as Positioning,
            outsideScrollableContainer:
              onScrollOut != null &&
              rectIsOutsideOfRect(
                activatorRect,
                intersectionWithViewport(scrollableContainerRect),
              ),
            zIndex,
            chevronOffset,
          },
          () => {
            if (!this.overlay) return;
            this.observer.observe(this.overlay, OBSERVER_CONFIG);
            this.observer.observe(activator, OBSERVER_CONFIG);
          },
        );
      },
    );
  };
}

function getMarginsForNode(node: HTMLElement) {
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || '0'),
    container: parseFloat(nodeStyles.marginBottom || '0'),
    horizontal: parseFloat(nodeStyles.marginLeft || '0'),
  };
}

function getZIndexForLayerFromNode(node: HTMLElement) {
  const layerNode = node.closest(layer.selector) || document.body;
  const zIndex =
    layerNode === document.body
      ? 'auto'
      : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return zIndex === 'auto' || isNaN(zIndex) ? null : zIndex;
}

function isDocument(node: HTMLElement | Document): node is Document {
  return node === document;
}
