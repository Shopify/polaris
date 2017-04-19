import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';
import {TransitionGroup, TransitionStatus} from '@shopify/react-utilities/animation';

import {layer} from '../shared';
import PositionedOverlay, {OverlayDetails, PreferredPosition} from '../PositionedOverlay';

import * as styles from './Tooltip.scss';

export interface Props {
  id: string,
  active: boolean,
  light?: boolean,
  preferredPosition?: PreferredPosition,
  children?: React.ReactNode,
  activator: HTMLElement,
  onClose(): void,
}

export default class TooltipOverlay extends React.PureComponent<Props, never> {
  render() {
    const selector = `.${styles.Tooltip}`;
    const markup = this.props.active
      ? (
        <TransitionGroup.TransitionChild
          render={this.renderOverlay}
          selector={selector}
          skipAppearing
          skipEntering
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
      preferredPosition = 'below',
    } = this.props;

    return (
      <PositionedOverlay
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        render={this.renderTooltip.bind(this, transitionStatus)}
      />
    );
  }

  @autobind
  private renderTooltip(transitionStatus: TransitionStatus, overlayDetails: OverlayDetails) {
    const {
      left,
      measuring,
      desiredHeight,
      positioning,
      activatorRect,
    } = overlayDetails;
    const {id, children, light} = this.props;

    const tipStyle = calculateTipPosition(activatorRect.center.x, left);

    const containerClassName = classNames(
      styles.Tooltip,
      light && styles.light,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove,
      transitionStatus && animationVariations(transitionStatus),
    );

    const contentStyles = measuring
      ? undefined
      : {maxHeight: desiredHeight};

    const tipMarkup = !measuring
      ? <div style={tipStyle} className={styles.Tip} />
      : null;

    return (
      <div className={containerClassName} {...layer.props}>
        {tipMarkup}
        <div className={styles.Wrapper}>
          <div
            id={id}
            role="tooltip"
            className={styles.Content}
            style={contentStyles}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

function calculateTipPosition(activatorRectXAxisCenter: number, left: number) {
  return {left: activatorRectXAxisCenter - left};
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case TransitionStatus.Leaving:
      return styles.leaving;
    default:
      return null;
  }
}
