import * as React from 'react';
import {TransitionGroup, TransitionStatus} from '@shopify/react-utilities/animation';
import Slide, {SlideRenderer, SlideContext} from './Slide';
import * as styles from './Slider.scss';

export interface Props {
  slideRenderer: SlideRenderer,
  currentSlide: number,
}

export interface State {
  lastSlide: number,
}

function SlideContainer(props: {children?: React.ReactElement<{}>}): React.ReactElement<{}> {
  return (
    <div className={styles.SlideContainer}>
      {props.children}
    </div>
  );
}

export default class Slider extends React.Component<Props, State> {
  static childContextTypes = {
    currentSlide: React.PropTypes.number,
    lastSlide: React.PropTypes.number,
  };

  state = {
    lastSlide: this.props.currentSlide,
  };

  componentWillReceiveProps() {
    this.setState({
      lastSlide: this.props.currentSlide,
    });
  }

  getChildContext(): SlideContext {
    return {
      currentSlide: this.props.currentSlide,
      lastSlide: this.state.lastSlide,
    };
  }

  render() {
    const {currentSlide, slideRenderer} = this.props;

    const renderSlideWithTransition = (transitionStatus: TransitionStatus) => {
      return (
        <Slide
          transitionStatus={transitionStatus}
          index={currentSlide}
          slideRenderer={slideRenderer}
        />
      );
    };

    return (
      <div className={styles.Slider}>
        <TransitionGroup component={SlideContainer}>
          <TransitionGroup.TransitionChild
            skipAppearing
            key={currentSlide}
            render={renderSlideWithTransition}
          />
        </TransitionGroup>
      </div>
    );
  }
}
