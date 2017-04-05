import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {TransitionStatus} from '@shopify/react-utilities/animation';

import * as styles from './Slider.scss';

export interface SlideContext {
  currentSlide: number,
  lastSlide: number,
}

export interface SlideRenderer {
  (currentSlide: number, animating?: boolean): React.ReactNode,
}

function slidingDirection(current: number, last: number): 'forwards' | 'backwards' {
  const delta = current - last;
  if (delta >= 0) {
    return 'forwards';
  }
  return 'backwards';
}

export interface SlideProps {
  children?: React.ReactNode,
  index: number,
  slideRenderer: SlideRenderer,
  transitionStatus: TransitionStatus,
}

export default class Slide extends React.Component<SlideProps, {}> {
  static contextTypes = {
    currentSlide: React.PropTypes.number,
    lastSlide: React.PropTypes.number,
  };

  context: SlideContext;

  render() {
    const {index, slideRenderer, transitionStatus} = this.props;

    const {lastSlide, currentSlide} = this.context;

    const statusName = animationStatusName(transitionStatus);
    const direction = slidingDirection(currentSlide, lastSlide);
    const animating = transitionStatus !== TransitionStatus.Shown;

    const className = classNames(
      styles.Slide,
      styles[statusName],
      styles[variationName('sliding', direction)],
    );

    return (
      <div className={className}>
        {slideRenderer(index, animating)}
      </div>
    );
  }
}

function animationStatusName(status: TransitionStatus | undefined) {
  switch (status) {
    case TransitionStatus.EnteringStart:
      return 'enteringStart';
    case TransitionStatus.Entering:
      return 'entering';
    case TransitionStatus.Shown:
      return 'shown';
    case TransitionStatus.LeavingStart:
      return 'leavingStart';
    case TransitionStatus.Leaving:
      return 'leaving';
    default:
      return 'hidden';
  }
}
