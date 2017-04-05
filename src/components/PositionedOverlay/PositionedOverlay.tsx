import * as React from 'react';

import autobind from '@shopify/javascript-utilities/autobind';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';
import {closest} from '@shopify/javascript-utilities/dom';
import {classNames} from '@shopify/react-utilities/styles';
import {getRectForNode, Rect} from '@shopify/javascript-utilities/geometry';

import {
  Alignment,
  PreferredPosition,
  calculateVerticalPosition,
  calculateHorizontalPosition,
} from './math';

import * as styles from './PositionedOverlay.scss';

export type Positioning = 'above' | 'below';

export interface OverlayDetails {
  left: number,
  desiredHeight: number,
  positioning: Positioning,
  measuring: boolean,
  activatorRect: Rect,
}

export interface Props {
  maxHeight: number,
  active?: boolean,
  preferredPosition?: PreferredPosition,
  alignment?: Alignment,
  activator?: React.ReactNode,
  render(overlayDetails: OverlayDetails): React.ReactNode,
}

export interface State {
  measuring: boolean,
  activatorRect: Rect,
  left: number,
  top: number,
  bottom: number,
  height: number,
  positioning: Positioning,
}

const CONTAINER = '[data-quilt-container]';
const SCROLLABLE_CONTAINER = '[data-quilt-scrollable]';

export default class PositionedOverlay extends React.PureComponent<Props, State> {
  private overlay: HTMLElement;

  private scrollableContainer: HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      measuring: true,
      activatorRect: getRectForNode(props.activator),
      left: 0,
      top: 0,
      bottom: 0,
      height: 0,
      positioning: 'below',
    };
  }

  componentDidMount() {
    this.scrollableContainer = closest(this.props.activator as HTMLElement, SCROLLABLE_CONTAINER) as HTMLElement || document.body;
    addEventListener(this.scrollableContainer, 'scroll', this.handleMeasurement);
    addEventListener(window, 'resize', this.handleMeasurement);
    this.handleMeasurement();
  }

  componentWillUnmount() {
    removeEventListener(this.scrollableContainer, 'scroll', this.handleMeasurement);
    removeEventListener(window, 'resize', this.handleMeasurement);
  }

  render() {
    const {left, top, bottom, positioning} = this.state;
    const {render} = this.props;

    const positionDetails = {
      left,
      top: positioning === 'below' ? top : null,
      bottom: positioning === 'above' ? bottom : null,
    };

    const className = classNames(
      styles.PositionedOverlay,
    );

    return (
      <div
        className={className}
        style={positionDetails}
        ref={this.setOverlay}
      >
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
  private setOverlay(node: HTMLElement) {
    this.overlay = node;
  }

  @autobind
  private handleMeasurement(): void {
    this.setState({
      measuring: true,
    } as State, () => {
      const {
        activator,
        alignment = 'center',
        preferredPosition = 'below',
        maxHeight,
      } = this.props;

      const overlayRect = getRectForNode(this.overlay);
      const activatorRect = getRectForNode(activator);
      const scrollableContainerRect = getRectForNode(this.scrollableContainer);
      const containerRect = getRectForNode(closest(activator as HTMLElement, CONTAINER) || window);
      const verticalPosition = calculateVerticalPosition(scrollableContainerRect, preferredPosition, activatorRect, maxHeight);
      const horizontalPosition = calculateHorizontalPosition(alignment, activatorRect, containerRect, overlayRect);

      this.setState({
        measuring: false,
        activatorRect: getRectForNode(activator),
        left: horizontalPosition,
        top: verticalPosition.top,
        bottom: verticalPosition.bottom,
        height: verticalPosition.height,
        positioning: verticalPosition.positioning as Positioning,
      });
    });
  }
}
