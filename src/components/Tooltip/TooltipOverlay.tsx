import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';
import {TransitionGroup, TransitionStatus} from '@shopify/react-utilities/animation';

import {default as PositionedOverlay, OverlayDetails, PreferredPosition, Alignment} from '../PositionedOverlay';
import * as styles from './Tooltip.scss';

export interface Props {
  active?: boolean,
  light?: boolean,
  preferredPosition?: PreferredPosition,
  alignment?: Alignment,
  children?: React.ReactNode,
  activator: React.ReactNode,
  onCloseRequest(): void,
}

export interface State {
  maxHeight: number,
}

const INITIAL_MAX_HEIGHT = Infinity;

export default class TooltipOverlay extends React.PureComponent<Props, State> {
  state = {
    maxHeight: INITIAL_MAX_HEIGHT,
  };

  private tooltipContainer: HTMLElement;

  render() {
    const {
      active,
    } = this.props;

    const selector = `.${styles.Tooltip}`;
    const markup = active
      ? (
        <TransitionGroup.TransitionChild
          render={this.renderOverlay}
          selector={selector}
        />
      )
      : null;

    return (
      <TransitionGroup>
        {markup}
      </TransitionGroup>
    );
  }

  @autobind
  private renderOverlay(transitionStatus: TransitionStatus) {
    const {
      active,
      activator,
      alignment = 'center',
      preferredPosition = 'below',
    } = this.props;

    const {maxHeight} = this.state;

    const renderWithOverlayDetails = (overlayDetails: OverlayDetails) => {
      return this.renderTooltip(transitionStatus, overlayDetails);
    };

    return (
      <PositionedOverlay
        maxHeight={maxHeight}
        active={active}
        activator={activator}
        alignment={alignment}
        preferredPosition={preferredPosition}
        render={renderWithOverlayDetails}
      />
    );
  }

  @autobind
  private renderTooltip(transitionStatus: TransitionStatus, overlayDetails: OverlayDetails) {
    const {
      left,
      desiredHeight,
      positioning,
      activatorRect,
    } = overlayDetails;
    const {children, light} = this.props;

    const tipStyle = calculateTipPosition(activatorRect.center.x, left);

    const containerClassName = classNames(
      styles.Tooltip,
      transitionStatus && animationVariations(transitionStatus),
      light && styles.light,
    );

    const contentStyles = {
      maxHeight: (desiredHeight > this.state.maxHeight)
        ? this.state.maxHeight
        : desiredHeight,
    };

    const tipClassName = classNames(
      styles.Tip,
      positioning === 'above' && styles.positionedAbove,
    );

    const wrapperClassName = classNames(
      styles.Wrapper,
    );

    return (
      <div className={containerClassName}>
        <div style={tipStyle} className={tipClassName}/>
        <div className={wrapperClassName} ref={this.getMaxHeight}>
          <div className={styles.Content} style={contentStyles}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  @autobind
  private getMaxHeight(node: HTMLElement | null) {
    if (node == null || node === this.tooltipContainer) { return; }

    this.tooltipContainer = node;

    const cssMaxHeight = window.getComputedStyle(node).maxHeight || 'none';
    const maxHeight = parseInt(cssMaxHeight, 10);

    this.setState({
      maxHeight: Number.isNaN(maxHeight) ? INITIAL_MAX_HEIGHT : maxHeight,
    });
  }
}

function calculateTipPosition(activatorRectXAxisCenter: number, left: number) {
  return {left: activatorRectXAxisCenter - left};
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case TransitionStatus.EnteringStart:
    case TransitionStatus.Leaving:
    case TransitionStatus.Hidden:
      return styles.hidden;
    default:
      return null;
  }
}
